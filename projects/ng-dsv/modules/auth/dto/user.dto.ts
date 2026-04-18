import { ApiDto, BaseUserTokenDto } from '@ng-vagabond-lab/ng-dsv/api';

export interface UserDto extends ApiDto {
    avatar?: string;
    creationDate?: string;
    facebookId?: string;
    googleId?: string;
    username?: string;
    profiles?: [];
}

export interface UserSigninDto extends BaseUserTokenDto {
    user?: UserDto;
}

export interface GoogleRequest {
    googleToken: string;
}
