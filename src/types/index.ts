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
  BUSINESS = 2,
  ADMIN = 3,
}
