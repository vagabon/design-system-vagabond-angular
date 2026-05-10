import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListDragService } from '../../../list/service/list-drag.service';
import { DsvListItemDragComponent } from './list-item-drag.component';

const mockListDragService = {
    dragSrcIndex: signal<number | null>(null),
    touchDragging: signal<boolean>(false),
};

describe('ListItemDragComponent', () => {
    let fixture: ComponentFixture<DsvListItemDragComponent>;
    let component!: DsvListItemDragComponent;

    beforeEach(async () => {
        mockListDragService.touchDragging.set(false);
        mockListDragService.dragSrcIndex.set(null);

        await TestBed.configureTestingModule({
            imports: [DsvListItemDragComponent],
            providers: [{ provide: ListDragService, useValue: mockListDragService }],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvListItemDragComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onHandleMouseDown', () => {
        it('should set draggable to true on closest li', () => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            li.appendChild(button);

            const event = new MouseEvent('mousedown');
            Object.defineProperty(event, 'currentTarget', { value: button });

            component.onHandleMouseDown(event);

            expect(li.draggable).toBe(true);
        });

        it('should do nothing if no closest li found', () => {
            const button = document.createElement('button');

            const event = new MouseEvent('mousedown');
            Object.defineProperty(event, 'currentTarget', { value: button });

            expect(() => component.onHandleMouseDown(event)).not.toThrow();
        });

        it('should set draggable on closest li', () => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            li.appendChild(button);

            const event = new MouseEvent('mousedown');
            Object.defineProperty(event, 'currentTarget', { value: button });

            component.onHandleMouseDown(event);

            expect(li.draggable).toBe(true);
        });

        it('should do nothing if no closest li found', () => {
            const div = document.createElement('div');
            const button = document.createElement('button');
            div.appendChild(button);

            const event = new MouseEvent('mousedown');
            Object.defineProperty(event, 'currentTarget', { value: button });

            expect(() => component.onHandleMouseDown(event)).not.toThrow();
            expect(div.draggable).toBe(undefined);
        });
    });

    describe('onTouchStart', () => {
        it('should set touchDragging to true', () => {
            component.onTouchStart();
            expect(mockListDragService.touchDragging()).toBe(true);
        });

        it('should not affect dragSrcIndex', () => {
            component.onTouchStart();
            expect(mockListDragService.dragSrcIndex()).toBeNull();
        });
    });

    describe('template', () => {
        it('should render dsv-button with correct attributes', () => {
            const button = fixture.nativeElement.querySelector('dsv-button');
            expect(button).toBeTruthy();
            expect(button.classList.contains('drag-handle')).toBe(true);
        });
    });
});
