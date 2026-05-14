import { Component, input } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { DsvChipComponent } from '@ng-vagabond-lab/ng-dsv/ds/chip';
import { RouterExternalPipe } from '@ng-vagabond-lab/ng-dsv/router';

@Component({
    selector: 'dsv-auth',
    imports: [DsvCardComponent, DsvChipComponent, RouterExternalPipe, DsvButtonComponent],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    readonly contactEmail = input<string>('vagabond.git@gmail.com');
}
