import { JwtPayload } from 'src/modules/auth/jwt.strategy';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

export class BooleanResponseType {
  result: Boolean = true;
}

export enum UserStatusType {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
  BANNED = 3,
  DELETED = 4,
}
