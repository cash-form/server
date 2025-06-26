import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credit } from '../entities/credit.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { PaginationService } from 'src/common/services/pagination.service';
import PaginationDto from 'src/common/dtos/pagination.dto';
import { PaginationModel } from 'src/common/models/pagination.model';
import CreditModel from '../models/credit.model';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepository: Repository<Credit>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly paginationService: PaginationService,
  ) {}

  async findById(id: number): Promise<Credit> {
    const credit = await this.creditRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!credit) {
      throw new Error('크레딧을 찾을 수 없습니다.');
    }

    return credit;
  }

  async findList(
    paginationDto: PaginationDto,
  ): Promise<PaginationModel<CreditModel>> {
    // const searchFields = ['title'];
    // const relations = ['author'];

    const result = await this.paginationService.paginate<Credit>(
      this.creditRepository,
      paginationDto,
      // relations,
      // searchFields,
    );

    // Survey 엔티티를 SurveyModel로 변환
    const transformedList = result.list.map((credit) =>
      plainToInstance(CreditModel, credit, {
        excludeExtraneousValues: false,
        exposeUnsetFields: false,
      }),
    );

    return {
      ...result,
      list: transformedList,
    };
  }
}
