import { Component, effect, input, output, signal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({
    template: ``,
})
export abstract class FormSignalInputBase<T> {
    form = input.required<FieldTree<T, string | number>>();
    fieldName = input.required<string>();
    label = input<string>();
    withLabel = input<boolean>(true);
    placeholder = input<string>('');
    required = input<boolean>(false);
    debug = input<boolean>(false);

    isError = signal<boolean>(false);

    callbackSend = output<string>();
    callbackChange = output<string>();

    constructor() {
        effect(() => {
            this.isError.set(this.getSignal()?.().touched() && this.getSignal()?.().errors().length > 0);
        });
    }

    isTouched() {
        return this.getSignal()().touched();
    }

    getSignal() {
        return this.form()?.[this.fieldName() as keyof FieldTree<T, string | number>] as FieldTree<
            string,
            string | number
        >;
    }

    doOnSend() {
        this.getValue() && this.callbackSend.emit(this.getValue());
    }

    doChange() {
        this.callbackChange.emit(this.getValue());
    }

    protected getValue() {
        const signal = this.getSignal();
        if (signal) {
            const value = signal().value();
            this.debug() && console.log(signal, signal().errors(), value);
            return value;
        }
        return '';
    }
}
