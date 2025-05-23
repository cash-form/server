import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthLoginSwagger,
  AuthRefreshSwagger,
  AuthRegisterSwagger,
} from '../swagger/auth.swagger';
import { TokenModel } from 'src/common/models/token.model';
import { LoginDto } from '../dtos/login.dto';

@Controller('auth')
@ApiTags('인증')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @AuthRegisterSwagger()
  async register(@Body() userDto: AuthDto): Promise<TokenModel> {
    const { accessToken, refreshToken } =
      await this.authService.createUser(userDto);
    return { accessToken, refreshToken };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @AuthLoginSwagger()
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @AuthRefreshSwagger()
  async refresh(
    @Body('refreshToken') { refreshToken }: { refreshToken: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.refreshToken(refreshToken);
  }
}
