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

export const PaymentStatusType = {
  1: 'SUCCESS',
  2: 'FAILED',
  3: 'PENDING',
  4: 'CANCELED',
  5: 'REFUNDED',
} as const;
export type PaymentStatusType =
  (typeof PaymentStatusType)[keyof typeof PaymentStatusType];

export const PaymentType = {
  1: 'SURVEY',
} as const;
export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export const PaymentMethodType = {
  1: 'CARD',
  2: 'BANK',
} as const;
export type PaymentMethodType =
  (typeof PaymentMethodType)[keyof typeof PaymentMethodType];
