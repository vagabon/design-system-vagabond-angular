import { beforeEach, describe, expect, it } from 'vitest';
import { StoreMap } from './store.map';

interface MovieDto {
    id: string;
    title: string;
    year: number;
}

class MovieStore extends StoreMap<string, MovieDto> {}

describe('StoreMap', () => {
    let store: MovieStore;

    const movie1: MovieDto = { id: 'tt001', title: 'Inception', year: 2010 };
    const movie2: MovieDto = { id: 'tt002', title: 'Dune', year: 2021 };
    const movie3: MovieDto = { id: 'tt003', title: 'Oppenheimer', year: 2023 };

    beforeEach(() => {
        store = new MovieStore();
    });

    describe('état initial', () => {
        it('démarre avec une Map vide', () => {
            expect(store.data().size).toBe(0);
            expect(store.size()).toBe(0);
        });

        it('values() et keys() retournent des tableaux vides', () => {
            expect(store.values()).toEqual([]);
            expect(store.keys()).toEqual([]);
        });
    });

    describe('set()', () => {
        it('ajoute une entrée', () => {
            store.set(movie1.id, movie1);

            expect(store.size()).toBe(1);
            expect(store.get(movie1.id)).toEqual(movie1);
        });

        it('écrase une entrée existante', () => {
            store.set(movie1.id, movie1);
            const updated = { ...movie1, title: 'Inception (4K)' };
            store.set(movie1.id, updated);

            expect(store.size()).toBe(1);
            expect(store.get(movie1.id)?.title).toBe('Inception (4K)');
        });

        it('crée une nouvelle référence de Map (immutabilité)', () => {
            const before = store.data();
            store.set(movie1.id, movie1);
            expect(store.data()).not.toBe(before);
        });
    });

    describe('patch()', () => {
        it('met à jour partiellement une entrée existante', () => {
            store.set(movie1.id, movie1);
            store.patch(movie1.id, { title: 'Inception Redux' });

            expect(store.get(movie1.id)).toEqual({ ...movie1, title: 'Inception Redux' });
        });

        it('ne modifie pas le reste de la Map', () => {
            store.set(movie1.id, movie1);
            store.set(movie2.id, movie2);
            store.patch(movie1.id, { year: 2011 });

            expect(store.get(movie2.id)).toEqual(movie2);
        });

        it('ne fait rien si la clé est absente', () => {
            store.patch('inconnu', { title: 'Ghost' });
            expect(store.size()).toBe(0);
        });

        it('préserve les champs non patchés', () => {
            store.set(movie1.id, movie1);
            store.patch(movie1.id, { year: 2099 });

            const result = store.get(movie1.id);
            expect(result?.title).toBe('Inception');
            expect(result?.year).toBe(2099);
        });
    });

    describe('setMany()', () => {
        it('ajoute plusieurs entrées en une passe', () => {
            store.setMany([
                [movie1.id, movie1],
                [movie2.id, movie2],
                [movie3.id, movie3],
            ]);

            expect(store.size()).toBe(3);
            expect(store.get(movie2.id)).toEqual(movie2);
        });

        it('fusionne avec les entrées existantes', () => {
            store.set(movie1.id, movie1);
            store.setMany([[movie2.id, movie2]]);

            expect(store.size()).toBe(2);
            expect(store.get(movie1.id)).toEqual(movie1);
        });

        it('écrase les doublons dans le batch', () => {
            const override = { ...movie1, title: 'Inception v2' };
            store.setMany([
                [movie1.id, movie1],
                [movie1.id, override],
            ]);

            expect(store.size()).toBe(1);
            expect(store.get(movie1.id)?.title).toBe('Inception v2');
        });
    });

    describe('delete()', () => {
        it('supprime une entrée existante', () => {
            store.set(movie1.id, movie1);
            store.delete(movie1.id);

            expect(store.has(movie1.id)).toBe(false);
            expect(store.size()).toBe(0);
        });

        it('ne plante pas sur une clé absente', () => {
            expect(() => store.delete('fantome')).not.toThrow();
        });

        it('ne supprime que la cible', () => {
            store.set(movie1.id, movie1);
            store.set(movie2.id, movie2);
            store.delete(movie1.id);

            expect(store.has(movie2.id)).toBe(true);
        });
    });

    describe('clear()', () => {
        it('vide complètement le store', () => {
            store.setMany([
                [movie1.id, movie1],
                [movie2.id, movie2],
            ]);
            store.clear();

            expect(store.size()).toBe(0);
            expect(store.values()).toEqual([]);
        });
    });

    describe('computed signals', () => {
        it('values() réfléchit toutes les entrées', () => {
            store.setMany([
                [movie1.id, movie1],
                [movie2.id, movie2],
            ]);
            const vals = store.values();

            expect(vals).toHaveLength(2);
            expect(vals).toContainEqual(movie1);
        });

        it('keys() réfléchit toutes les clés', () => {
            store.setMany([
                [movie1.id, movie1],
                [movie2.id, movie2],
            ]);
            expect(store.keys()).toContain(movie1.id);
            expect(store.keys()).toContain(movie2.id);
        });

        it('size() est réactif après mutation', () => {
            expect(store.size()).toBe(0);
            store.set(movie1.id, movie1);
            expect(store.size()).toBe(1);
            store.delete(movie1.id);
            expect(store.size()).toBe(0);
        });
    });

    describe('has() / get()', () => {
        it('has() retourne false pour une clé absente', () => {
            expect(store.has('nope')).toBe(false);
        });

        it('get() retourne undefined pour une clé absente', () => {
            expect(store.get('nope')).toBeUndefined();
        });
    });
});
