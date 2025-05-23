import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.isDeleted) {
      return null; // 탈퇴한 사용자는 null 반환
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async checkDuplicateAccount(email: string): Promise<boolean> {
    if (!email) throw new BadRequestException('계정 아이디를 입력해주세요.');

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('이미 존재하는 계정 아이디입니다.');
    }

    return true; // 사용자가 없으면 사용 가능
  }

  async checkDuplicateNickname(nickname: string): Promise<boolean> {
    if (!nickname) throw new BadRequestException('닉네임을 입력해주세요.');

    const existingUser = await this.userRepository.findOne({
      where: { nickname },
    });

    if (existingUser) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    return true; // 사용자가 없으면 사용 가능
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user || user.isDeleted) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const transformUser = plainToInstance(User, user, {
      excludeExtraneousValues: false,
    });

    return transformUser;
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    if (user.isDeleted) {
      throw new ForbiddenException('이미 탈퇴한 사용자입니다.');
    }
    user.isDeleted = true;
    user.refreshToken = ''; // 리프레시 토큰 초기화
    await this.userRepository.save(user);
  }

  async validateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || user.isDeleted || user.refreshToken !== refreshToken) {
      return null;
    }

    return user;
  }
}
