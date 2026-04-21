import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private readonly states = signal<Map<string, boolean>>(new Map());

    getSignal(id: string): boolean {
        return this.states().get(id) ?? false;
    }

    open(id: string) {
        this.states.update((map) => new Map(map).set(id, true));
    }

    close(id: string) {
        this.states.update((map) => new Map(map).set(id, false));
    }

    toggle(id: string) {
        this.states.update((map) => new Map(map).set(id, !map.get(id)));
    }
}
