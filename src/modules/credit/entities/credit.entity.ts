import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Credit {
  @ApiProperty({
    description: '크레딧 고유아이디',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;
}
