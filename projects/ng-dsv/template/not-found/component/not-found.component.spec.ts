import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

    beforeEach(async () => {
        (window as any).google = { accounts: { id: { prompt: () => {} } } };
        await TestBed.configureTestingModule({
            imports: [NotFoundComponent],
            providers: [provideTranslateService(), provideRouter([])],
        }).compileComponents();
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
    });

    it('should render', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
