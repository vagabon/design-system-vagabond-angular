import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsvImgComponent } from './img.component';

describe('DsvImgComponent', () => {
    let component: DsvImgComponent;
    let fixture: ComponentFixture<DsvImgComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvImgComponent],
            providers: [],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvImgComponent);
        component = fixture.componentInstance;

        fixture.componentRef.setInput('src', 'url');

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set load to true when doLoad is called', () => {
        component.doLoad();
        expect(component.load()).toBe(true);
    });

    it('should set error to true when onImageError is called', () => {
        component.onImageError();
        expect(component.error()).toBe(true);
    });
});
