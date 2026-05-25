import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLanguageFormComponent } from './menu-language-form.component';

describe('MenuLanguageFormComponent', () => {
    let component: MenuLanguageFormComponent;
    let fixture: ComponentFixture<MenuLanguageFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MenuLanguageFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MenuLanguageFormComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
