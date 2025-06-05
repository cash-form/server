import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './entities/survey.entity';
import { SurveyGuide } from './entities/surveyGuide.entity';
import { SurveyQuestion } from './entities/surveyQuestion.entity';
import { SurveyService } from './services/survey.service';
import { SurveyController } from './controllers/survey.controller';
import { AuthModule } from '../auth/auth.module';
import { User } from '../user/entities/user.entity';
import { PaginationModule } from 'src/common/modules/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, SurveyGuide, SurveyQuestion, User]),
    forwardRef(() => AuthModule),
    PaginationModule,
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
  exports: [SurveyService],
})
export class SurveyModule {}
