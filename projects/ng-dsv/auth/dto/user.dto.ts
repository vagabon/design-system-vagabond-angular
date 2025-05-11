import { IApiDto } from '@ng-vagabond-lab/ng-dsv/api';

export interface IUserDto extends IApiDto {
  avatar?: string;
  creationDate?: string;
  facebookId?: string;
  googleId?: string;
  username?: string;
  profiles?: [];
}

export interface IUserConnectedDto {
  googleToken?: string;
  jwt?: string;
  jwtRefresh?: string;
  user?: IUserDto;
}

export interface IGoogleRequest {
  googleToken: string;
}
