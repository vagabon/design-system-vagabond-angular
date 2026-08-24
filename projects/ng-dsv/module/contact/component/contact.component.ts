import { Component, input } from '@angular/core';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { DsvChipComponent } from '@ng-vagabond-lab/ng-dsv/ds/chip';
import { RouterExternalPipe } from '@ng-vagabond-lab/ng-dsv/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'dsv-contact',
    imports: [DsvCardComponent, DsvChipComponent, RouterExternalPipe, DsvButtonComponent, TranslatePipe],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    readonly contactEmail = input<string>('vagabond.git@gmail.com');
}
