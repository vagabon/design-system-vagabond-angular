import { Component, effect, input, output, signal } from "@angular/core";
import { FieldTree } from "@angular/forms/signals";

@Component({
    template: ``
})
export abstract class FormSignalInputBase<T> {
    form = input.required<FieldTree<T, string | number>>();
    fieldName = input.required<string>();
    withLabel = input<boolean>(true);
    required = input<boolean>(false);

    isError = signal<boolean>(false);

    onSend = output<string>();
    change = output<string>();

    constructor() {
        effect(() => {
            this.isError.set(this.getSignal()?.().errors().length > 0);
        });
    }

    getSignal() {
        return this.form()?.[this.fieldName() as keyof FieldTree<T, string | number>] as FieldTree<any, string | number>;
    }

    doOnSend() {
        this.getValue() && this.onSend.emit(this.getValue());
    }

    doChange() {
        this.getValue() && this.change.emit(this.getValue());
    }

    protected getValue() {
        const signal = this.getSignal();
        if (signal) {
            const value = signal().value();
            console.log(signal, signal().errors(), value);
            return value;
        }
        return undefined;
    }
}
