import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it } from 'vitest';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;

    beforeEach(async () => {
        (window as any).google = { accounts: { id: { prompt: () => {} } } };
        await TestBed.configureTestingModule({
            imports: [ContactComponent],
            providers: [provideTranslateService()],
        }).compileComponents();
        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
    });

    it('should render', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });
});
