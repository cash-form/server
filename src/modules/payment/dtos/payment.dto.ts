import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty({
    description: '결제 상품 ID - 설문조사인 경우 해당 설문조사의 ID',
    example: 2,
    type: Number,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Expose({ name: 'target' })
  public readonly target: number;

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
