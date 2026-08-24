import { Component, effect, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvChipComponent } from '@ng-vagabond-lab/ng-dsv/ds/chip';
import { AuthService } from '@ng-vagabond-lab/ng-dsv/module/auth';
import { NotificationService } from '../../service/notification.service';

@Component({
    selector: 'app-notification-button-container',
    imports: [DsvButtonComponent, DsvChipComponent, RouterLink],
    templateUrl: './notification-button.container.html',
    styleUrls: ['./notification-button.container.scss'],
})
export class NotificationButtonContainer {
    readonly authService = inject(AuthService);
    readonly notificationService = inject(NotificationService);

    readonly nbRead = signal<string>('');

    constructor() {
        effect(() => {
            const nbRead = this.notificationService.nbRead();
            if (nbRead > 99) {
                this.nbRead.set('99+');
            } else if (nbRead > 0) {
                this.nbRead.set(nbRead.toString());
            } else {
                this.nbRead.set('');
            }
        });
    }
}
