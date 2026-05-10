import { signal } from '@angular/core';
import { removeDuplicate } from '../utils/storage.utils';

export class Store<T> {
    readonly data = signal<T[]>([]);

    update(id: number, data: T, add?: T): void {
        this.data.update((values) => {
            values[id] = { ...data, ...add };
            return [...values];
        });
    }

    updateForPage(page: number, data: T[]): void {
        this.data.update((values) => {
            let newValues = page === 1 ? [] : [...values];
            return [...removeDuplicate([...newValues, ...data])];
        });
    }
}
