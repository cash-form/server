import { JwtPayload } from 'src/modules/auth/jwt.strategy';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export class BooleanResponseType {
  result: Boolean = true;
}

export enum UserStatusType {
  NORMAL = 1,
  BANNED = 2,
  DELETED = 3,
}

export enum UserType {
  NORMAL = 1,
  ADMIN = 2,
}

export const SurveyProductType = {
  1: 'BASIC',
  2: 'DELUXE',
  3: 'PREMIUM',
  4: 'PROFESSIONAL',
} as const;
export type SurveyProductType =
  (typeof SurveyProductType)[keyof typeof SurveyProductType];

export const SurveyGuideType = {
  1: 'HEADER',
  2: 'FOOTER',
} as const;
export type SurveyGuideType =
  (typeof SurveyGuideType)[keyof typeof SurveyGuideType];

export const SurveyStatusType = {
  1: 'BEFORE',
  2: 'PROGRESS',
  3: 'FINISH',
  4: 'DELETED',
} as const;
export type SurveyStatusType =
  (typeof SurveyStatusType)[keyof typeof SurveyStatusType];

export const SurveyQuestionType = {
  1: 'multiple',
  2: 'subjective',
  3: 'descriptive',
  4: 'ox',
  5: 'point',
} as const;
export type SurveyQuestionType =
  (typeof SurveyQuestionType)[keyof typeof SurveyQuestionType];
