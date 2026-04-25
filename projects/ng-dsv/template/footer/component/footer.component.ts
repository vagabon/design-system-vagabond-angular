import { Component, input } from '@angular/core';
import { scrollOnClassTo } from '@ng-vagabond-lab/ng-dsv/ds/scroll';
import { RouterExternalPipe, RouterInternalPipe } from '@ng-vagabond-lab/ng-dsv/router';

@Component({
    selector: 'app-footer',
    imports: [RouterInternalPipe, RouterExternalPipe],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    copyright = input.required<string>();
    withMentions = input<boolean>(true);
    withX = input<boolean>(true);

    doClick() {
        scrollOnClassTo('scroll', 0, 0);
    }
}
