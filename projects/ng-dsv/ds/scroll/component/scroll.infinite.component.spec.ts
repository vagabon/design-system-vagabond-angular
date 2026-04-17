import { Component, provideZonelessChangeDetection, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollService } from '@ng-vagabond-lab/ng-dsv/base';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ScrollInfiniteContainer } from './scroll.infinite.component';

describe('ScrollInfiniteContainer', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ScrollInfiniteContainer;
    let scrollServiceMock: { saveScroll: ReturnType<typeof vi.fn>; scroll: ReturnType<typeof signal> };

    @Component({
        template: `
            <dsv-scroll-infinite
                [class]="'my-scroll'"
                (callback)="onScrollEnd()"
            >
                <div style="height: 2000px;"></div>
            </dsv-scroll-infinite>
        `,
        imports: [ScrollInfiniteContainer],
    })
    class TestHostComponent {
        @ViewChild(ScrollInfiniteContainer) scrollComp!: ScrollInfiniteContainer;
        onScrollEnd = vi.fn();
    }

    beforeEach(async () => {
        scrollServiceMock = {
            saveScroll: vi.fn(),
            scroll: signal(0),
        };

        await TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [
                provideZonelessChangeDetection(),
                { provide: ScrollService, useValue: scrollServiceMock },
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
