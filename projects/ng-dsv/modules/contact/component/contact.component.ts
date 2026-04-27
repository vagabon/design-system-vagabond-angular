import { Component } from '@angular/core';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { DsvChipComponent } from '@ng-vagabond-lab/ng-dsv/ds/chip';
import { RouterExternalPipe } from '@ng-vagabond-lab/ng-dsv/router';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';

@Component({
    selector: 'dsv-auth',
    imports: [DsvCardComponent, DsvChipComponent, RouterExternalPipe, DsvButtonComponent],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {}
