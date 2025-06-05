import { Injectable } from '@nestjs/common';
import { Repository, SelectQueryBuilder, ObjectLiteral } from 'typeorm';
import { PaginationModel } from '../models/pagination.model';
import PaginationDto from '../dtos/pagination.dto';

@Injectable()
export class PaginationService {
  async paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    paginationDto: PaginationDto,
    relations?: string[],
    searchFields?: string[],
  ): Promise<PaginationModel<T>> {
    const { page, size, sort, order, keyword } = paginationDto;

    const queryBuilder = repository.createQueryBuilder('entity');

    // 관계 추가
    if (relations && relations.length > 0) {
      relations.forEach((relation) => {
        queryBuilder.leftJoinAndSelect(`entity.${relation}`, relation);
      });
    }

    // 키워드 검색
    if (keyword && searchFields && searchFields.length > 0) {
      const whereConditions = searchFields
        .map((field) => `entity.${field} LIKE :keyword`)
        .join(' OR ');
      queryBuilder.where(`(${whereConditions})`, { keyword: `%${keyword}%` });
    }

    // 삭제되지 않은 항목만 조회 (엔티티에 isDeleted 필드가 있는 경우)
    queryBuilder.andWhere('entity.isDeleted = :isDeleted', {
      isDeleted: false,
    });

    // 정렬
    queryBuilder.orderBy(`entity.${sort}`, order as 'ASC' | 'DESC');

    // 페이지네이션
    const skip = (page - 1) * size;
    queryBuilder.skip(skip).take(size);

    const [list, total] = await queryBuilder.getManyAndCount();

    const paginationModel = new PaginationModel<T>();
    paginationModel.list = list;
    paginationModel.total = total;
    paginationModel.page = page;
    paginationModel.size = size;

    return paginationModel;
  }

  async paginateWithQueryBuilder<T extends ObjectLiteral>(
    queryBuilder: SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
  ): Promise<PaginationModel<T>> {
    const { page, size, sort, order } = paginationDto;

    // 정렬
    queryBuilder.orderBy(
      `${queryBuilder.alias}.${sort}`,
      order as 'ASC' | 'DESC',
    );

    // 페이지네이션
    const skip = (page - 1) * size;
    queryBuilder.skip(skip).take(size);

    const [list, total] = await queryBuilder.getManyAndCount();

    const paginationModel = new PaginationModel<T>();
    paginationModel.list = list;
    paginationModel.total = total;
    paginationModel.page = page;
    paginationModel.size = size;

    return paginationModel;
  }
}
