import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvButtonComponent } from '@ng-vagabond-lab/ng-dsv/ds/button';
import { provideTranslateService } from '@ngx-translate/core';
import { ModalService } from '../../service/modal.service';
import { ModalComponent } from '../modal.component';
import { ModalAlertComponent } from './modal-alert.component';

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

describe('ModalAlertComponent', () => {
  let component: ModalAlertComponent;
  let fixture: ComponentFixture<ModalAlertComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAlertComponent, ModalComponent, DsvButtonComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideTranslateService(),
        { provide: ModalService, useClass: MockModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAlertComponent);
    modalService = TestBed.inject(ModalService);

    component = fixture.componentInstance;
    component.id = signal('testModal') as unknown as InputSignal<string>;
    component.title = signal('title') as unknown as InputSignal<string>;
    component.text = signal('text') as unknown as InputSignal<string>;
    component.button = signal('oui') as unknown as InputSignal<string>;
    component.buttonClose = signal('non') as unknown as InputSignal<string | undefined>;

    fixture.detectChanges();
  });

  it('should emit callback and toggle modal on confirm click', () => {
    spyOn(component.callback, 'emit');
    const buttons = fixture.nativeElement.querySelectorAll('.dsv-button');
    buttons[2].click();
    fixture.detectChanges();

    expect(component.callback.emit).toHaveBeenCalled();
  });

  it('should call close on modal service on cancel click', () => {
    spyOn(modalService, 'close');
    const buttons = fixture.nativeElement.querySelectorAll('.dsv-button');
    buttons[1].click();
    fixture.detectChanges();

    expect(modalService.close).toHaveBeenCalled();
  });
});
