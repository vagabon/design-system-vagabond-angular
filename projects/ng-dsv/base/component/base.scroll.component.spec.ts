import { Component, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EnvironmentService } from '@ng-vagabond-lab/ng-dsv/environment';
import { Subject } from 'rxjs';
import { ScrollService } from '../public-api';
import { BaseScrollComponent } from './base.scroll.component';

@Component({
    template: '',
})
class TestScrollComponent extends BaseScrollComponent { }

describe('BaseScrollComponent', () => {
    let fixture: ComponentFixture<TestScrollComponent>;
    let component: TestScrollComponent;

    const routerEvents$ = new Subject<any>();

    const environmentServiceMock = {
        isScrollDown: signal(false),
    };

    const scrollServiceMock = {
        getScroll: jasmine.createSpy('getScroll').and.returnValue(100),
        saveScroll: jasmine.createSpy('saveScroll'),
    };

    beforeEach(() => {
        const divMock = document.createElement('div');
        divMock.id = 'scroll';
        divMock.scrollTo = jasmine.createSpy('scrollTo');
        divMock.scrollTop = 100;
        document.body.appendChild(divMock);

        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                provideZonelessChangeDetection(),
                { provide: ScrollService, useValue: scrollServiceMock },
                { provide: EnvironmentService, useValue: environmentServiceMock },
                { provide: Router, useValue: { events: routerEvents$.asObservable() } },
            ],
        });

        fixture = TestBed.createComponent(TestScrollComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        document.getElementById('scroll')?.remove();
        routerEvents$.complete();
    });

    it('should call saveScroll and update isScrollDown on onScroll()', () => {
        component.onScroll();
        expect(scrollServiceMock.saveScroll).toHaveBeenCalled();
    });
});
