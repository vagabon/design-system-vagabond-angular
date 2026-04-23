import { computed, signal } from '@angular/core';

export class StoreMap<K, V> {
    private readonly _data = signal<Map<K, V>>(new Map());

    readonly data = this._data.asReadonly();
    readonly values = computed(() => Array.from(this._data().values()));
    readonly keys = computed(() => Array.from(this._data().keys()));
    readonly size = computed(() => this._data().size);

    get(key: K): V | undefined {
        return this._data().get(key);
    }

    has(key: K): boolean {
        return this._data().has(key);
    }

    set(key: K, value: V): void {
        this._data.update((map) => new Map(map).set(key, value));
    }

    patch(key: K, partial: Partial<V>): void {
        this._data.update((map) => {
            const existing = map.get(key);
            if (!existing) return map;
            return new Map(map).set(key, { ...existing, ...partial });
        });
    }

    setMany(entries: [K, V][]): void {
        this._data.update((map) => {
            const next = new Map(map);
            entries.forEach(([k, v]) => next.set(k, v));
            return next;
        });
    }

    delete(key: K): void {
        this._data.update((map) => {
            const next = new Map(map);
            next.delete(key);
            return next;
        });
    }

    clear(): void {
        this._data.set(new Map());
    }
}
