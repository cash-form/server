import { AuthDto } from '../dtos/auth.dto';
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { User } from 'src/modules/user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../jwt.strategy';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { TokenModel } from 'src/common/models/token.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly configService: ConfigService,

    private readonly userService: UserService,

    private readonly jwtService: JwtService,
  ) {}

  async createUser(userDto: AuthDto): Promise<TokenModel> {
    const { email, password } = userDto;
    const existUser = await this.userRepository.findOne({
      where: { email },
    });

    if (existUser) {
      throw new ConflictException('이미 존재하는 계정 아이디입니다.');
    }

    if (existUser!.nickname === userDto.nickname) {
      throw new ConflictException('이미 존재하는 닉네임입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = this.userRepository.create({
      ...userDto,
      password: hashedPassword,
    });

    const savedUser: User = await this.userRepository.save(user);

    const tokens = await this.generateTokens(savedUser);

    return plainToInstance(TokenModel, tokens, {
      excludeExtraneousValues: true,
    });
  }

  async login(
    loginDto: AuthDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('잘못된 계정 또는 비밀번호입니다.');
    }
    return this.generateTokens(user);
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET ?? 'default-refresh-secret',
      });
      const user = await this.userService.validateRefreshToken(
        payload.sub,
        refreshToken,
      );
      if (!user) {
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
      }
      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || user.isDeleted) {
      throw new ForbiddenException('유효하지 않은 사용자입니다.');
    }
    await this.userRepository.update(userId, { refreshToken });
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (user.isDeleted) {
      throw new ForbiddenException(
        '탈퇴한 사용자는 토큰을 발행할 수 없습니다.',
      );
    }
    const payload: JwtPayload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret:
        this.configService.get<string>('JWT_REFRESH_SECRET') ??
        'default-refresh-secret',
      expiresIn: '7d',
    });
    await this.saveRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }
}
