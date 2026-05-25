import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { RouterExternalPipe } from '@ng-vagabond-lab/ng-dsv/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-not-found',
    imports: [DsvCardComponent, RouterExternalPipe, DsvButtonComponent, RouterLink, TranslatePipe],
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
    readonly contactEmail = input<string>('vagabond.git@gmail.com');
}
