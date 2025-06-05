import { JwtPayload } from 'src/modules/auth/jwt.strategy';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export class BooleanResponseType {
  result: Boolean;
}

export const UserStatusType = {
  NORMAL: 1,
  BANNED: 2,
  DELETED: 3,
} as const;
export type UserStatusType =
  (typeof UserStatusType)[keyof typeof UserStatusType];

export const UserType = {
  NORMAL: 1,
  ADMIN: 2,
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];

export const SurveyProductType = {
  BASIC: 1,
  DELUXE: 2,
  PREMIUM: 3,
  PROFESSIONAL: 4,
} as const;
export type SurveyProductType =
  (typeof SurveyProductType)[keyof typeof SurveyProductType];

export const SurveyGuideType = {
  HEADER: 1,
  FOOTER: 2,
} as const;
export type SurveyGuideType =
  (typeof SurveyGuideType)[keyof typeof SurveyGuideType];

export const SurveyStatusType = {
  BEFORE: 1,
  PROGRESS: 2,
  FINISH: 3,
  DELETED: 4,
} as const;
export type SurveyStatusType =
  (typeof SurveyStatusType)[keyof typeof SurveyStatusType];

export const SurveyQuestionType = {
  multiple: 1,
  subjective: 2,
  descriptive: 3,
  ox: 4,
  point: 5,
} as const;
export type SurveyQuestionType =
  (typeof SurveyQuestionType)[keyof typeof SurveyQuestionType];

export const PaymentStatusType = {
  SUCCESS: 1,
  FAILED: 2,
  PENDING: 3,
  CANCELED: 4,
  REFUNDED: 5,
} as const;
export type PaymentStatusType =
  (typeof PaymentStatusType)[keyof typeof PaymentStatusType];

export const PaymentType = {
  SURVEY: 1,
  CREDIT: 2,
} as const;
export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export const PaymentMethodType = {
  CARD: 1,
  BANK: 2,
} as const;
export type PaymentMethodType =
  (typeof PaymentMethodType)[keyof typeof PaymentMethodType];

export const ImageCategoryType = {
  SURVEY: 1,
  PROFILE: 2,
  PRODUCT: 3,
  GENERAL: 4,
} as const;
export type ImageCategoryType =
  (typeof ImageCategoryType)[keyof typeof ImageCategoryType];

export const getImageCategoryName = (key: number) => {
  Object.keys(ImageCategoryType).forEach((name) => {
    if (ImageCategoryType[name] === key) {
      return name;
    }
  });

  return 'UNKNOWN';
};
