import { ApiDto } from '@ng-vagabond-lab/ng-dsv/api';
import { describe, expect, it } from 'vitest';
import { hasRole } from './auth.utils';

const makeRole = (name: string, roles?: string) => ({ name, ...(roles ? { roles } : {}) });

describe('hasRole', () => {
    it('When userRoles is undefined, Then should return false', () => {
        expect(hasRole('admin', undefined)).toBe(false);
    });

    it('When userRoles is empty, Then should return false', () => {
        expect(hasRole('admin', [])).toBe(false);
    });

    it('When role matches by name, Then should return true', () => {
        expect(hasRole('admin', [makeRole('admin') as ApiDto])).toBe(true);
    });

    it('When role matches by roles field, Then should return true', () => {
        expect(hasRole('admin', [makeRole('user', 'admin,moderator') as ApiDto])).toBe(true);
    });

    it('When role does not match, Then should return false', () => {
        expect(hasRole('superadmin', [makeRole('admin', 'moderator') as ApiDto])).toBe(false);
    });

    it('When multiple roles are passed and one matches by name, Then should return true', () => {
        expect(hasRole('admin,moderator', [makeRole('moderator') as ApiDto])).toBe(true);
    });

    it('When multiple roles are passed and one matches by roles field, Then should return true', () => {
        expect(hasRole('admin,moderator', [makeRole('user', 'moderator,viewer') as ApiDto])).toBe(true);
    });

    it('When multiple roles are passed and none match, Then should return false', () => {
        expect(hasRole('admin,moderator', [makeRole('viewer', 'editor') as ApiDto])).toBe(false);
    });
});
