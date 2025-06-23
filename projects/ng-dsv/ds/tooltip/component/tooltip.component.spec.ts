import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { TooltipPosition, TooltipPositionEnum } from '../dto/tooltip.dto';
import { DsvTooltipComponent } from './tooltip.component';

@Component({
    imports: [DsvTooltipComponent],
    template: `<dsv-tooltip [text]="'Test Tooltip'" [position]="position">Hover me</dsv-tooltip>`
})
class TestHostComponent {
    position: TooltipPosition = TooltipPositionEnum.TOP;
}

describe('DsvTooltipComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [provideZonelessChangeDetection(), provideTranslateService()],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show tooltip on mouse enter', () => {
        const tooltipComponent = fixture.debugElement.query(By.directive(DsvTooltipComponent)).componentInstance;
        const tooltipElement = fixture.debugElement.query(By.css('.dsv-tooltip'));

        expect(tooltipElement).toBeNull();

        fixture.debugElement.query(By.css('dsv-tooltip')).triggerEventHandler('mouseenter', null);
        fixture.detectChanges();

        expect(tooltipComponent.visible()).toBeTrue();
        expect(fixture.debugElement.query(By.css('.dsv-tooltip'))).toBeTruthy();
    });

    it('should hide tooltip on mouse leave', () => {
        const tooltipComponent = fixture.debugElement.query(By.directive(DsvTooltipComponent)).componentInstance;

        fixture.debugElement.query(By.css('dsv-tooltip')).triggerEventHandler('mouseenter', null);
        fixture.detectChanges();

        expect(tooltipComponent.visible()).toBeTrue();

        fixture.debugElement.query(By.css('dsv-tooltip')).triggerEventHandler('mouseleave', null);
        fixture.detectChanges();

        expect(tooltipComponent.visible()).toBeFalse();
        expect(fixture.debugElement.query(By.css('.dsv-tooltip'))).toBeNull();
    });

    it('should adjust tooltip position based on window boundaries', () => {
        const tooltipComponent = fixture.debugElement.query(By.directive(DsvTooltipComponent)).componentInstance;
        spyOn(tooltipComponent, 'adjustPosition').and.callThrough();

        fixture.debugElement.query(By.css('dsv-tooltip')).triggerEventHandler('mouseenter', null);
        fixture.detectChanges();

        expect(tooltipComponent.adjustPosition).toHaveBeenCalled();
    });
});
