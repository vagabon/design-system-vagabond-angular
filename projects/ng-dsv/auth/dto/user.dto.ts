import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';

export interface UserDto extends ApiDto {
  avatar?: string;
  creationDate?: string;
  facebookId?: string;
  googleId?: string;
  username?: string;
  profiles?: [];
}

export interface UserConnectedDto {
  googleToken?: string;
  jwt?: string;
  jwtRefresh?: string;
  user?: UserDto;
}

export interface GoogleRequest {
  googleToken: string;
}
