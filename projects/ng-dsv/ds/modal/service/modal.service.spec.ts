// modal.service.spec.ts
import { beforeEach, describe, expect, it } from 'vitest';
import { ModalService } from './modal.service';

describe('ModalService', () => {
    let service: ModalService;

    beforeEach(() => {
        service = new ModalService();
    });

    describe('getSignal', () => {
        it('retourne false par défaut pour un nouvel id', () => {
            expect(service.getSignal('modal-1')).toBe(false);
        });

        it('crée un signal indépendant pour chaque id', () => {
            service.getSignal('modal-1');
            service.open('modal-1');
            expect(service.getSignal('modal-1')).toBe(true);
            expect(service.getSignal('modal-2')).toBe(false);
        });

        it('retourne la valeur courante du signal existant', () => {
            service.getSignal('modal-1');
            service.open('modal-1');
            expect(service.getSignal('modal-1')).toBe(true);
        });
    });

    describe('open', () => {
        it('passe le signal à true', () => {
            service.getSignal('modal-1');
            service.open('modal-1');
            expect(service.getSignal('modal-1')).toBe(true);
        });

        it('ne plante pas si l\'id n\'existe pas', () => {
            expect(() => service.open('inexistant')).not.toThrow();
        });
    });

    describe('close', () => {
        it('passe le signal à false après ouverture', () => {
            service.getSignal('modal-1');
            service.open('modal-1');
            service.close('modal-1');
            expect(service.getSignal('modal-1')).toBe(false);
        });

        it('ne plante pas si l\'id n\'existe pas', () => {
            expect(() => service.close('inexistant')).not.toThrow();
        });
    });

    describe('toggle', () => {
        it('passe à true si le signal est false', () => {
            service.getSignal('modal-1');
            service.toggle('modal-1');
            expect(service.getSignal('modal-1')).toBe(true);
        });

        it('passe à false si le signal est true', () => {
            service.getSignal('modal-1');
            service.open('modal-1');
            service.toggle('modal-1');
            expect(service.getSignal('modal-1')).toBe(false);
        });

        it('alterne correctement plusieurs fois', () => {
            service.getSignal('modal-1');
            service.toggle('modal-1');
            service.toggle('modal-1');
            service.toggle('modal-1');
            expect(service.getSignal('modal-1')).toBe(true);
        });

        it('ne plante pas si l\'id n\'existe pas', () => {
            expect(() => service.toggle('inexistant')).not.toThrow();
        });
    });
});