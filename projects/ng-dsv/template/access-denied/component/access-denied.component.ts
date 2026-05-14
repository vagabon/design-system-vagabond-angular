import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';

@Component({
    selector: 'lib-access-denied',
    imports: [DsvCardComponent, DsvButtonComponent, RouterLink],
    templateUrl: './access-denied.component.html',
    styleUrl: './access-denied.component.scss',
})
export class AccessDeniedComponent {
    readonly contactEmail = input<string>('vagabond.git@gmail.com');
}
