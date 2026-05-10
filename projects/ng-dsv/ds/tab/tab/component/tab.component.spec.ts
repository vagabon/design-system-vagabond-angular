import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TabDto } from '../dto/tab.dto';
import { DsvTabComponent } from './tab.component';

describe('TabComponent', () => {
    let component: DsvTabComponent;
    let fixture: ComponentFixture<DsvTabComponent>;

    const tabMock: TabDto = { id: 'tab1', title: 'Tab 1' };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvTabComponent, TranslatePipe],
            providers: [
                provideTranslateService(),
                { provide: ActivatedRoute, useValue: { snapshot: {}, params: {} } },
                { provide: Router, useValue: { navigate: vi.fn(), navigateByUrl: vi.fn(), events: of() } },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvTabComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('tab', tabMock);
    });

    it('should create the component', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should render tab title', () => {
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.textContent).toContain(tabMock.title);
    });

    it('should apply selected class when isSelected is true', () => {
        fixture.componentRef.setInput('isSelected', true);
        fixture.detectChanges();
        const button = fixture.debugElement.query(By.css('button'));
        expect(button.nativeElement.classList.contains('selected')).toBe(true);
    });

    it('should emit callback if tab has no URL', () => {
        const button = fixture.debugElement.query(By.css('button'));
        const callbackSpy = vi.fn();
        component.callback.subscribe(callbackSpy);

        const event = new Event('click');
        vi.spyOn(event, 'stopPropagation');

        fixture.detectChanges();

        button.triggerEventHandler('click', event);
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(callbackSpy).toHaveBeenCalledWith(tabMock);
    });

    it('should not emit callback if tab has URL', () => {
        const tabWithUrl: TabDto = { id: 'tab2', title: 'Tab 2', url: '/test' };
        fixture.componentRef.setInput('tab', tabWithUrl);
        fixture.detectChanges();

        const button = fixture.debugElement.query(By.css('button'));
        const callbackSpy = vi.fn();
        component.callback.subscribe(callbackSpy);

        const event = new Event('click');
        vi.spyOn(event, 'stopPropagation');

        button.triggerEventHandler('click', event);
        expect(event.stopPropagation).not.toHaveBeenCalled();
        expect(callbackSpy).not.toHaveBeenCalled();
    });
});
