import { Component, input, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';
import { INPUT_TYPE } from '@ng-vagabond-lab/ng-dsv/type';
import { type Meta, type StoryObj } from '@storybook/angular';
import { FormSignalInputComponent } from '../../public-api';

interface Test {
    name: string;
}

@Component({
    selector: 'story-signal-input',
    standalone: true,
    imports: [FormSignalInputComponent, FormField],
    template: `
        @if (myForm) {
            <dsv-form-signal-input
                [form]="myForm"
                fieldName="name"
                [type]="type()"
                (callbackSend)="onSend($event)"
            />
        }
    `,
})
class StorySignalInput {
    value = input<string>('name');
    myForm = form<Test>(signal({ name: this.value() }), (path) => {
        required(path.name);
    });
    type = input<INPUT_TYPE>('text');
    onSend = () => {};
}

const meta: Meta<StorySignalInput> = {
    title: 'dsv/Form/Signal/input',
    component: StorySignalInput,
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
        onSend: { action: 'callbackSend' },
    },
};

export default meta;
type Story = StoryObj<StorySignalInput>;

export const Default: Story = {
    args: {
        value: 'name',
        type: 'text',
    },
    parameters: {
        docs: {
            source: {
                code: `
          <dsv-form-signal-input [form]="myForm" fieldName="name" [type]="type()" (callbackSend)="onSend($event)" />
        `,
            },
        },
    },
};
