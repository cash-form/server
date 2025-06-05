import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethodType, PaymentStatusType, PaymentType } from 'src/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @ApiProperty({
    description: '결제건 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '결제 유저 아이디',
    example: 1,
    type: Number,
  })
  @Column()
  userId: number;

  @ApiProperty({
    description: '결제 상품 ID - 설문조사인 경우 해당 설문조사의 ID',
    example: 2,
    type: Number,
    required: true,
  })
  @Column({ nullable: true })
  target: number;

  @ApiProperty({
    description: '결제 시점',
    example: '2023-10-01T00:00:00.000Z',
    type: Date,
  })
  @CreateDateColumn()
  date: Date;

  @ApiProperty({
    description:
      '결제상태값 - 1: SUCCESS, 2: FAILED, 3: PENDING, 4: CANCELED, 5: REFUNDED',
    example: 1,
    enum: PaymentStatusType,
  })
  @Column({ nullable: true, default: PaymentStatusType.SUCCESS })
  status: PaymentStatusType;

  @ApiProperty({
    description: '결제 상품 명',
    type: String,
    required: true,
  })
  @Column({ nullable: true })
  product: string;

  @ApiProperty({
    description: '결제 금액',
    example: 40000,
    type: Number,
    required: true,
  })
  @Column({ nullable: true })
  amount: number;

  @ApiProperty({
    description: '결제 대상 - 1: "SURVEY", 2: "CREDIT"',
    example: 1,
    required: true,
  })
  @Column({ nullable: true, default: PaymentType.SURVEY })
  type: PaymentType;

  @ApiProperty({
    description: '결제수단 - 1: "CARD", 2: "BANK"',
    enum: PaymentMethodType,
    required: true,
    example: 1,
  })
  @Column({ nullable: true })
  method: PaymentMethodType;
}
