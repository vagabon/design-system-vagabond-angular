import { Component, input } from '@angular/core';
import { RouterExternalPipe, RouterInternalPipe } from '@ng-vagabond-lab/ng-dsv/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    imports: [RouterInternalPipe, RouterExternalPipe, TranslatePipe],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
    readonly contactEmail = input<string>('vagabond.git@gmail.com');

    readonly copyright = input<string>();
    readonly withMentions = input<boolean>(true);
    readonly withX = input<boolean>(true);
}
