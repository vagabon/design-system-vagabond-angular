import { NO_ERRORS_SCHEMA, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ListItemDragDto } from '../../list/dto/list.dto';
import { ListDragService } from '../../list/service/list.drag.service';
import { ListItemComponent } from './list.item.component';

const mockListDragService = {
    dragSrcIndex: signal<number | null>(null),
    touchDragging: signal<boolean>(false),
};

const makeTouchEvent = (type: string, clientX = 0, clientY = 0) =>
    ({
        preventDefault: vi.fn(),
        touches: [{ clientX, clientY }],
        changedTouches: [{ clientX, clientY }],
    }) as unknown as TouchEvent;

describe('ListItemComponent', () => {
    let fixture: ComponentFixture<ListItemComponent>;
    let component!: ListItemComponent;

    beforeEach(async () => {
        mockListDragService.dragSrcIndex.set(null);
        mockListDragService.touchDragging.set(false);

        await TestBed.configureTestingModule({
            imports: [ListItemComponent],
            providers: [
                provideZonelessChangeDetection(),
                { provide: ListDragService, useValue: mockListDragService },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();

        fixture = TestBed.createComponent(ListItemComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('index', 2);
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onHandleMouseDown', () => {
        it('should set draggable to true on closest div', () => {
            const div = document.createElement('div');
            const span = document.createElement('span');
            div.appendChild(span);

            const event = new MouseEvent('mousedown');
            Object.defineProperty(event, 'currentTarget', { value: span });

            component.onHandleMouseDown(event);

            expect(div.draggable).toBe(true);
        });

        it('should do nothing if no closest div found', () => {
            const span = document.createElement('span');
            const event = new MouseEvent('mousedown');
            Object.defineProperty(event, 'currentTarget', { value: span });

            expect(() => component.onHandleMouseDown(event)).not.toThrow();
        });
    });

    describe('onDragStart', () => {
        it('should set dragSrcIndex in service', () => {
            const event = new DragEvent('dragstart', { dataTransfer: new DataTransfer() });
            component.onDragStart(2, event);
            expect(mockListDragService.dragSrcIndex()).toBe(2);
        });

        it('should set effectAllowed to move', () => {
            const event = new DragEvent('dragstart', { dataTransfer: new DataTransfer() });
            component.onDragStart(0, event);
            expect(event.dataTransfer!.effectAllowed).toBe('move');
        });
    });

    describe('onDragOver', () => {
        it('should prevent default', () => {
            const event = new DragEvent('dragover', { dataTransfer: new DataTransfer() });
            const spy = vi.spyOn(event, 'preventDefault');
            component.onDragOver(event);
            expect(spy).toHaveBeenCalled();
        });

        it('should set dropEffect to move', () => {
            const event = new DragEvent('dragover', { dataTransfer: new DataTransfer() });
            component.onDragOver(event);
            expect(event.dataTransfer!.dropEffect).toBe('move');
        });
    });

    describe('onDrop', () => {
        it('should emit callbackOrder with correct dto', () => {
            mockListDragService.dragSrcIndex.set(0);
            const event = new DragEvent('drop', { dataTransfer: new DataTransfer() });
            const spy = vi.spyOn(event, 'preventDefault');

            let emitted: ListItemDragDto | undefined;
            component.callbackOrder.subscribe((dto) => (emitted = dto));

            component.onDrop(2, event);

            expect(spy).toHaveBeenCalled();
            expect(emitted).toEqual({ dragSrcIndex: 0, targetIndex: 2 });
            expect(mockListDragService.dragSrcIndex()).toBeNull();
        });

        it('should not emit if dragSrcIndex is null', () => {
            mockListDragService.dragSrcIndex.set(null);
            const event = new DragEvent('drop', { dataTransfer: new DataTransfer() });

            let emitted: ListItemDragDto | undefined;
            component.callbackOrder.subscribe((dto) => (emitted = dto));

            component.onDrop(2, event);

            expect(emitted).toBeUndefined();
        });

        it('should not emit if dragSrcIndex equals targetIndex', () => {
            mockListDragService.dragSrcIndex.set(2);
            const event = new DragEvent('drop', { dataTransfer: new DataTransfer() });

            let emitted: ListItemDragDto | undefined;
            component.callbackOrder.subscribe((dto) => (emitted = dto));

            component.onDrop(2, event);

            expect(emitted).toBeUndefined();
        });
    });

    describe('onDragEnd', () => {
        it('should reset dragSrcIndex to null', () => {
            mockListDragService.dragSrcIndex.set(3);
            component.onDragEnd();
            expect(mockListDragService.dragSrcIndex()).toBeNull();
        });
    });

    describe('onTouchStart', () => {
        it('should do nothing if touchDragging is false', () => {
            mockListDragService.touchDragging.set(false);
            const event = makeTouchEvent('touchstart', 100, 200);
            component.onTouchStart(event);
            expect(mockListDragService.dragSrcIndex()).toBeNull();
        });

        it('should set dragSrcIndex when touchDragging is true', () => {
            mockListDragService.touchDragging.set(true);

            vi.spyOn(component.liRef()!, 'nativeElement', 'get').mockReturnValue(null);

            const event = makeTouchEvent('touchstart', 100, 200);
            component.onTouchStart(event);

            expect(mockListDragService.dragSrcIndex()).toBe(2);
        });

        it('should create ghostEl when touchDragging is true and liRef exists', () => {
            mockListDragService.touchDragging.set(true);

            const li = fixture.nativeElement.querySelector('li');
            li.getBoundingClientRect = () =>
                ({
                    top: 100,
                    left: 50,
                    width: 300,
                    height: 50,
                    bottom: 150,
                    right: 350,
                    x: 50,
                    y: 100,
                    toJSON: () => {},
                }) as DOMRect;

            const ul = document.createElement('ul');
            ul.appendChild(li);
            document.body.appendChild(ul);

            const event = makeTouchEvent('touchstart', 100, 200);
            component.onTouchStart(event);

            expect(component.ghostEl).not.toBeNull();

            document.body.removeChild(ul);
        });
    });

    describe('onTouchMove', () => {
        it('should prevent default', () => {
            const event = {
                preventDefault: vi.fn(),
                touches: [{ clientX: 100, clientY: 200 }],
            } as unknown as TouchEvent;

            component.onTouchMove(event);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should move ghostEl when it exists', () => {
            component.ghostEl = document.createElement('li');
            component.ghostEl.style.top = '0px';

            const event = {
                preventDefault: vi.fn(),
                touches: [{ clientX: 100, clientY: 250 }],
            } as unknown as TouchEvent;

            component.onTouchMove(event);

            expect(component.ghostEl.style.top).not.toBe('0px');
        });
    });

    describe('onTouchEnd', () => {
        it('should remove ghostEl', () => {
            const ghost = document.createElement('li');
            document.body.appendChild(ghost);
            component.ghostEl = ghost;

            const touch = new Touch({
                identifier: 1,
                target: document.createElement('li'),
                clientX: 0,
                clientY: 0,
            });
            const event = new TouchEvent('touchend', { changedTouches: [touch] });
            component.onTouchEnd(event);

            expect(component.ghostEl).toBeNull();
        });

        it('should reset dragSrcIndex and touchDragging', () => {
            mockListDragService.dragSrcIndex.set(2);
            mockListDragService.touchDragging.set(true);

            const touch = new Touch({
                identifier: 1,
                target: document.createElement('li'),
                clientX: 0,
                clientY: 0,
            });
            const event = new TouchEvent('touchend', { changedTouches: [touch] });
            component.onTouchEnd(event);

            expect(mockListDragService.dragSrcIndex()).toBeNull();
            expect(mockListDragService.touchDragging()).toBe(false);
        });

        it('should emit callbackOrder when valid target found', () => {
            mockListDragService.dragSrcIndex.set(0);

            const targetLi = document.createElement('li');
            targetLi.dataset['index'] = '2';
            document.body.appendChild(targetLi);

            vi.spyOn(document, 'elementFromPoint').mockReturnValue(targetLi);

            let emitted: ListItemDragDto | undefined;
            component.callbackOrder.subscribe((dto) => (emitted = dto));

            const touch = new Touch({ identifier: 1, target: targetLi, clientX: 100, clientY: 200 });
            const event = new TouchEvent('touchend', { changedTouches: [touch] });
            component.onTouchEnd(event);

            expect(emitted).toEqual({ dragSrcIndex: 0, targetIndex: 2 });
            document.body.removeChild(targetLi);
        });

        it('should not emit if dragSrcIndex equals targetIndex', () => {
            mockListDragService.dragSrcIndex.set(2);

            const targetLi = document.createElement('li');
            targetLi.dataset['index'] = '2';
            vi.spyOn(document, 'elementFromPoint').mockReturnValue(targetLi);

            let emitted: ListItemDragDto | undefined;
            component.callbackOrder.subscribe((dto) => (emitted = dto));

            const touch = new Touch({ identifier: 1, target: targetLi, clientX: 100, clientY: 200 });
            const event = new TouchEvent('touchend', { changedTouches: [touch] });
            component.onTouchEnd(event);

            expect(emitted).toBeUndefined();
        });
    });

    describe('template', () => {
        it('should add dragging class when dragSrcIndex matches index', async () => {
            mockListDragService.dragSrcIndex.set(2);
            await fixture.whenStable();
            const li = fixture.nativeElement.querySelector('li');
            expect(li.classList.contains('dragging')).toBe(true);
        });

        it('should not add dragging class when dragSrcIndex does not match', async () => {
            mockListDragService.dragSrcIndex.set(5);
            await fixture.whenStable();
            const li = fixture.nativeElement.querySelector('li');
            expect(li.classList.contains('dragging')).toBe(false);
        });

        it('should set data-index attribute', async () => {
            await fixture.whenStable();
            const li = fixture.nativeElement.querySelector('li');
            expect(li.getAttribute('data-index')).toBe('2');
        });
    });
});
