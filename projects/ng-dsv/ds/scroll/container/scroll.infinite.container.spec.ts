import { Component, provideZonelessChangeDetection, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollService } from '@ng-vagabond-lab/ng-dsv/base';
import { ScrollInfiniteContainer } from './scroll.infinite.container';

describe('ScrollInfiniteContainer', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ScrollInfiniteContainer;
    let scrollServiceMock: jasmine.SpyObj<ScrollService>;

    @Component({
        template: `
      <dsv-scroll-infinite
        [class]="'my-scroll'"
        (callback)="onScrollEnd()"
      >
        <div style="height: 2000px;"></div>
      </dsv-scroll-infinite>
    `,
        standalone: true,
        imports: [ScrollInfiniteContainer]
    })
    class TestHostComponent {
        @ViewChild(ScrollInfiniteContainer) scrollComp!: ScrollInfiniteContainer;
        onScrollEnd = jasmine.createSpy('onScrollEnd');
    }

    beforeEach(() => {
        scrollServiceMock = jasmine.createSpyObj('ScrollService', ['saveScroll'], {
            scroll: signal(0)
        });

        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [
                provideZonelessChangeDetection(),
                { provide: ScrollService, useValue: scrollServiceMock }
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TestHostComponent);
        fixture.detectChanges();

        component = fixture.componentInstance.scrollComp;
    });

    it('should emit callback when near bottom', () => {
        const divEl: HTMLElement = document.getElementsByClassName('my-scroll')[0] as HTMLElement;

        divEl.scrollTop = 500;

        component.doScroll();

        expect(scrollServiceMock.saveScroll).toHaveBeenCalled();
        expect(fixture.componentInstance.onScrollEnd).toHaveBeenCalled();
    });
});
