import { Component, effect, input, output } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { ApiDto, ID } from "@ng-vagabond-lab/ng-dsv/api";
import { DsvChipComponent } from "@ng-vagabond-lab/ng-dsv/ds/chip";
import { BaseFormComponent, FormCheckboxComponent, FormComponent, FormInputComponent } from "@ng-vagabond-lab/ng-dsv/ds/form";
import { AdminSearchModalContainer } from "../../container/modal/admin.search.modal.container";
import { FormDto } from "../../dto/admin.dto";

@Component({
    selector: 'dsv-admin-form-component',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        DsvChipComponent,
        FormComponent,
        FormInputComponent,
        AdminSearchModalContainer,
        FormCheckboxComponent
    ],
    templateUrl: './admin.form.component.html',
    styleUrls: ['./admin.form.component.scss']
})
export class AdminFormComponent extends BaseFormComponent {
    urlBack = input<string>();
    data = input.required<ApiDto>();
    formConf = input.required<FormDto[]>();

    callback = output<ApiDto>();

    constructor() {
        super();
        effect(() => {
            this.formBuilder.control('a')

            let formControl = {} as { [key: string]: FormControl };
            this.formConf().forEach(conf => {
                let value = this.data()[conf.name as keyof ApiDto];
                if (conf.type === 'datetime-local' && value) {
                    value = (value as string).substring(0, 16);
                }
                const required = conf.required || false;
                formControl[conf.name] = new FormControl({ value, disabled: conf.disabled ?? false }, required ? Validators.required : null);
            })
            this.form = this.formBuilder.group(formControl);
        })
    }

    sendForm(data: ApiDto) {
        this.callback.emit(data);
    }

    removeValue = (name: string, id: ID) => () => {
        this.form.value[name] = this.form.value[name].filter((value: ApiDto) => value.id !== id);
    }

    addValue = (name: string) => (data: ApiDto) => {
        const find = this.form.value[name].find((value: ApiDto) => value.id === data.id);
        if (!find) {
            this.form.value[name].push(data);
        }
    }
}