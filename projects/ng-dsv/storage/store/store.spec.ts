import { describe, expect, it, vi } from 'vitest';
import { Store } from './store';

vi.mock('app/module/person/utils/person.utils', () => ({
    removeDuplicate: (arr: any[]) =>
        arr.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id)),
}));

interface FakeEntity {
    id: number;
    name: string;
    age?: number;
}

describe('Store', () => {
    it('should update value by id', () => {
        const store = new Store<FakeEntity>();

        store.update(1, { id: 1, name: 'John' });

        const result = store.data();

        expect(result[1]).toEqual({ id: 1, name: 'John' });
    });

    it('should merge additional data when update is called with add param', () => {
        const store = new Store<FakeEntity>();

        store.update(2, { id: 2, name: 'Jane' }, { age: 30 } as unknown as FakeEntity);

        const result = store.data();

        expect(result[2]).toEqual({
            id: 2,
            name: 'Jane',
            age: 30,
        });
    });

    it('should replace data when page = 1', () => {
        const store = new Store<FakeEntity>();

        store.updateForPage(1, [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' },
        ]);

        const result = store.data();

        expect(result.length).toBe(2);
        expect(result[0]).toEqual({ id: 1, name: 'A' });
    });

    it('should append data when page > 1', () => {
        const store = new Store<FakeEntity>();

        store.updateForPage(1, [{ id: 1, name: 'A' }]);

        store.updateForPage(2, [{ id: 2, name: 'B' }]);

        const result = store.data();

        expect(result.length).toBe(2);
        expect(result.find((e) => e.id === 2)).toBeTruthy();
    });

    it('should remove duplicates when updating page', () => {
        const store = new Store<FakeEntity>();

        store.updateForPage(1, [{ id: 1, name: 'A' }]);

        store.updateForPage(2, [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' },
        ]);

        const result = store.data();

        expect(result.length).toBe(2);
    });
});
