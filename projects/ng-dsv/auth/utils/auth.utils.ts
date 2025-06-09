import { ApiDto } from "@ng-vagabond-lab/ng-dsv/api";

export const hasRole = (role: string, userRoles?: ApiDto[]) => {
    return userRoles?.find(userRole => userRole['name' as keyof ApiDto] === role) !== undefined;
}