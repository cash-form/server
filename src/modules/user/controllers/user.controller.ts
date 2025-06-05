import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types';
import {
  CheckDuplicateEmailSwagger,
  CheckDuplicateNicknameSwagger,
  DeleteUserSwagger,
  FindMeSwagger,
} from '../swagger/user.swagger';
import UserModel from '../models/user.model';

@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @FindMeSwagger()
  async getMe(@Req() req: AuthenticatedRequest): Promise<UserModel> {
    const id = req.user.sub;
    return await this.userService.findById(id);
  }

  @Get('duplicate/account')
  @HttpCode(HttpStatus.OK)
  @CheckDuplicateEmailSwagger()
  async checkDuplicateAccount(
    @Query() params: { email: string },
  ): Promise<{ result: boolean }> {
    const result = await this.userService.checkDuplicateAccount(params.email);
    return { result };
  }

  @Get('duplicate/name')
  @HttpCode(HttpStatus.OK)
  @CheckDuplicateNicknameSwagger()
  async checkDuplicateName(
    @Query() params: { nickname: string },
  ): Promise<{ result: boolean }> {
    const result = await this.userService.checkDuplicateNickname(
      params.nickname,
    );
    return { result };
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @DeleteUserSwagger()
  async delete(@Req() req: AuthenticatedRequest): Promise<void> {
    const userId = req.user.sub;
    return await this.userService.deleteUser(userId);
  }
}
