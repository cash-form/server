import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditService } from './services/credit.service';
import { CreditController } from './controllers/credit.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/entities/user.entity';
import { PaginationModule } from 'src/common/modules/pagination.module';
import { Credit } from './entities/credit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Credit, User]),
    forwardRef(() => AuthModule),
    PaginationModule,
  ],
  providers: [CreditService],
  controllers: [CreditController],
  exports: [CreditService],
})
export class CreditModule {}
