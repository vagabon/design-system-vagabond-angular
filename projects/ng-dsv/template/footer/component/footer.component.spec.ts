import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
    let component: FooterComponent;
    let fixture: ComponentFixture<FooterComponent>;

    beforeEach(async () => {
        (window as any).google = { accounts: { id: { prompt: () => {} } } };
        await TestBed.configureTestingModule({
            imports: [FooterComponent],
            providers: [provideTranslateService()],
        }).compileComponents();
        fixture = TestBed.createComponent(FooterComponent);
        component = fixture.componentInstance;
    });

    it('should render', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
