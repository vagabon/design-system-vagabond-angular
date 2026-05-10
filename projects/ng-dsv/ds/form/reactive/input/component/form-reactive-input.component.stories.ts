import { FormControl, FormGroup } from '@angular/forms';
import { type Meta, type StoryObj } from '@storybook/angular';
import { DsvFormReactiveInputComponent } from '../../public-api';

const meta: Meta<DsvFormReactiveInputComponent> = {
    title: 'dsv/Form/Reactive/input',
    component: DsvFormReactiveInputComponent,
    excludeStories: /.*Data$/,
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: [
                'text',
                'password',
                'textarea',
                'email',
                'number',
                'date',
                'time',
                'datetime-local',
                'month',
                'week',
                'url',
                'search',
                'tel',
                'color',
                'range',
                'file',
                'hidden',
            ],
        },
        callbackSend: { action: 'callbackSend' },
    },
};

export default meta;
type Story = StoryObj<DsvFormReactiveInputComponent>;

export interface CustomFormGroup extends FormGroup {
    toJSON: () => null;
}

const MY_FORM = new FormGroup({
    exampleField: new FormControl(''),
}) as unknown as CustomFormGroup;

MY_FORM['toJSON'] = () => null;

export const Default: Story = {
    args: {
        form: MY_FORM,
        field: 'exampleField',
        type: 'text',
    },
};
