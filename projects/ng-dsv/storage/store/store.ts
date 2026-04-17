import { signal } from '@angular/core';
import { removeDuplicate } from '../utils/storage.utils';

export class Store<T> {
    data = signal<T[]>([]);

    update(id: number, data: T, add?: T) {
        this.data.update((values) => {
            values[id] = { ...data, ...add };
            return [...values];
        });
    }

    updateTable(id: number, data: T) {
        this.data.update((values) => {
            values[id] = [...(data as T[])] as T;
            return [...values];
        });
    }

    updateForPage(page: number, data: T[]) {
        this.data.update((values) => {
            let newValues = page === 1 ? [] : [...values];
            return [...removeDuplicate([...newValues, ...data])];
        });
    }
}
