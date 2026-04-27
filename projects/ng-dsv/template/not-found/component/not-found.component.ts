import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { DsvCardComponent } from '@ng-vagabond-lab/ng-dsv/ds/card';
import { RouterExternalPipe } from '@ng-vagabond-lab/ng-dsv/router';

@Component({
    selector: 'app-not-found',
    imports: [DsvCardComponent, RouterExternalPipe, DsvButtonComponent, RouterLink],
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {}
