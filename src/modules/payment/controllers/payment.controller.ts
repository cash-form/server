import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentService } from '../services/payment.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types';
import { PaymentDto } from '../dtos/payment.dto';
import PaymentModel from '../models/payment.model';
import { InsertPaymentSwagger } from '../swagger/payment.swagger';

@ApiTags('결제')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @InsertPaymentSwagger()
  async createPayment(
    @Req() req: AuthenticatedRequest,
    @Body() paymentDto: PaymentDto,
  ): Promise<PaymentModel> {
    const userId = req.user.sub;
    return await this.paymentService.createPayment(userId, paymentDto);
  }
}
