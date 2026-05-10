import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { provideTranslateService } from '@ngx-translate/core';
import { ModalService } from '../../service/modal.service';
import { DsvModalComponent } from '../modal.component';
import { DsvModalAlertComponent } from './modal-alert.component';

class MockModalService {
    private state = new Map<string, boolean>();

    getSignal(id: string) {
        return this.state.get(id) ?? true;
    }

    toggle(id: string) {
        this.state.set(id, !this.getSignal(id));
    }

    close(id: string) {
        this.state.set(id, false);
    }
}

describe('DsvModalAlertComponent', () => {
    let component: DsvModalAlertComponent;
    let fixture: ComponentFixture<DsvModalAlertComponent>;
    let modalService: ModalService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvModalAlertComponent, DsvModalComponent, DsvButtonComponent],
            providers: [provideTranslateService(), { provide: ModalService, useClass: MockModalService }],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvModalAlertComponent);
        modalService = TestBed.inject(ModalService);

        component = fixture.componentInstance;
        fixture.componentRef.setInput('id', 'testModal');
        fixture.componentRef.setInput('titleText', 'title');
        fixture.componentRef.setInput('text', 'text');
        fixture.componentRef.setInput('button', 'oui');
        fixture.componentRef.setInput('buttonClose', 'non');

        fixture.detectChanges();
    });

    it('should emit callback and toggle modal on confirm click', () => {
        vi.spyOn(component.callback, 'emit');
        const buttons = fixture.nativeElement.querySelectorAll('.dsv-button');
        buttons[2].click();
        fixture.detectChanges();

        expect(component.callback.emit).toHaveBeenCalled();
    });

    it('should call close on modal service on cancel click', () => {
        vi.spyOn(modalService, 'close');
        const buttons = fixture.nativeElement.querySelectorAll('.dsv-button');
        buttons[1].click();
        fixture.detectChanges();

        expect(modalService.close).toHaveBeenCalled();
    });
});
