import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';

export const hasRole = (roles: string, userRoles?: ApiDto[]) => {
    const roleSplit = roles.split(',');
    let find = false;
    roleSplit.forEach((role) => {
        if (
            userRoles?.find(
                (userRole) =>
                    userRole['roles' as keyof ApiDto]?.toString().includes(role) ||
                    userRole['name' as keyof ApiDto] === role,
            )
        ) {
            find = true;
        }
    });
    return find;
};
