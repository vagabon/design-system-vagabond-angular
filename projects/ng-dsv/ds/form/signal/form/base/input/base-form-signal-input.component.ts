import { Directive, effect, input, output, signal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Directive()
export abstract class DsvBaseFormSignalInputComponent<T> {
    readonly form = input.required<FieldTree<T, string | number>>();
    readonly fieldName = input.required<string>();
    readonly label = input<string>();
    readonly withLabel = input<boolean>(true);
    readonly placeholder = input<string>('');
    readonly required = input<boolean>(false);
    readonly debug = input<boolean>(false);

    readonly isError = signal<boolean>(false);

    readonly callbackSend = output<string>();
    readonly callbackChange = output<string>();

    constructor() {
        effect(() => {
            this.isError.set(this.getSignal()().touched() && this.getSignal()().errors().length > 0);
        });
    }

    isTouched(): boolean {
        return this.getSignal()().touched() ?? false;
    }

    getSignal(): FieldTree<string, string | number> {
        return this.form()?.[this.fieldName() as keyof FieldTree<T, string | number>] as FieldTree<
            string,
            string | number
        >;
    }

    doOnSend(): void {
        this.getValue() && this.callbackSend.emit(this.getValue());
    }

    doChange(): void {
        this.callbackChange.emit(this.getValue());
    }

    protected getValue(): string {
        const signal = this.getSignal();
        if (signal) {
            const value = signal().value();
            this.debug() && console.log(signal, signal().errors(), value);
            return value;
        }
        return '';
    }
}
