import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentStatusType } from 'src/types';

export default class PaymentModel {
  @ApiProperty({
    description: '결제건 ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'id' })
  id: number;

  @ApiProperty({
    description: '결제 유저 아이디',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'userId' })
  userId: number;

  @ApiProperty({
    description: '결제 시점',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  @Expose({ name: 'date' })
  date: Date;

  @ApiProperty({
    description: '결제상태값',
    example: 'SUCCESS',
    enum: PaymentStatusType,
  })
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'status' })
  status: PaymentStatusType;

  @ApiProperty({
    description: '결제금액',
    example: 40000,
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'amount' })
  public readonly amount: number;

  @ApiProperty({
    description: '결제 타입(대상)',
    example: 'SURVEY',
  })
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'type' })
  public readonly type: string;

  @ApiProperty({
    description: '결제 상품명',
    example: 'BASIC',
  })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'product' })
  public readonly product: string = '';

  @ApiProperty({
    description: '결제수단',
    example: 'CARD',
  })
  @IsString()
  @IsNotEmpty()
  @Expose({ name: 'method' })
  public readonly method: string = '';
}
