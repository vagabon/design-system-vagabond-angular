import { Component, effect, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { form } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { DateFormatPipe } from '@ng-vagabond-lab/ng-dsv/date';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvFormSignalCheckboxComponent } from '@ng-vagabond-lab/ng-dsv/ds/form/signal';
import { NotificationDto } from '../dto/notification.dto';

@Component({
    selector: 'app-notification',
    imports: [DateFormatPipe, DsvButtonComponent, RouterLink, DsvFormSignalCheckboxComponent],
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
    readonly notification = input<NotificationDto>();
    readonly readonly = input<boolean>(false);

    readonly callback = output<NotificationDto>();

    readonly checkboxRef = viewChild<ElementRef>('checkbox');

    readonly url = signal<string>('');

    readonly readForm = form(
        signal({
            read: this.notification()?.read,
        }),
    );

    constructor() {
        effect(() => {
            try {
                this.notification()?.url && this.url.set(new URL(this.notification()?.url!).pathname);
            } catch (error) {
                console.error('Error occurred while processing notification URL:', this.notification()?.url, error);
            }
        });
        effect(() => {
            this.readForm().reset({
                read: this.notification()?.read,
            });
        });
    }

    triggerCheckbox(): void {
        this.checkboxRef()?.nativeElement.querySelector('input').click();
    }
}
