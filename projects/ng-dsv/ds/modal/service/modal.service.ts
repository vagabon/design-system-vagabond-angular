import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ModalService {
    private readonly states = new Map<string, ReturnType<typeof signal<boolean>>>();

    getSignal(id: string) {
        if (!this.states.has(id)) {
            const newSignal = signal<boolean>(false);
            this.states.set(id, newSignal);
        }
        return this.states.get(id)?.() ?? false;
    }

    open(id: string) {
        this.states.get(id)?.set(true);
    }

    close(id: string) {
        this.states.get(id)?.set(false);
    }

    toggle(id: string) {
        const s = this.states.get(id);
        if (s) s.update(v => !v);
    }
}