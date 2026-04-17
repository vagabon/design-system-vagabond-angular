import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileUploadDirective } from './file-upload-directives';

@Component({
    imports: [FileUploadDirective],
    template: `<div
        [appDragDrop]="enabled"
        (dropped)="onDrop($event)"
    ></div>`,
})
class TestComponent {
    enabled = true;
    droppedEvent: any;

    onDrop(event: any) {
        this.droppedEvent = event;
    }
}

describe('FileUploadDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let divEl: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [provideZonelessChangeDetection()],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        divEl = fixture.debugElement.query(By.directive(FileUploadDirective)).nativeElement;
    });

    it('should create directive instance', () => {
        const directiveInstance = fixture.debugElement
            .query(By.directive(FileUploadDirective))
            .injector.get(FileUploadDirective);
        expect(directiveInstance).toBeTruthy();
    });

    it('should add dragging class on dragover and remove on dragleave', () => {
        const dragoverEvent = new MouseEvent('dragover', {
            bubbles: true,
            cancelable: true,
        });
        Object.defineProperty(dragoverEvent, 'dataTransfer', {
            value: { types: ['Files'] },
        });

        divEl.dispatchEvent(dragoverEvent);
        fixture.detectChanges();
        expect(divEl.classList.contains('dragging')).toBe(true);

        const dragleaveEvent = new MouseEvent('dragleave', {
            bubbles: true,
            cancelable: true,
        });
        divEl.dispatchEvent(dragleaveEvent);
        fixture.detectChanges();
        expect(divEl.classList.contains('dragging')).toBe(false);
    });

    it('should emit dropped event on drop', () => {
        const dropEvent = new MouseEvent('drop', {
            bubbles: true,
            cancelable: true,
        });
        Object.defineProperty(dropEvent, 'dataTransfer', {
            value: { files: [] },
        });

        vi.spyOn(component, 'onDrop');

        divEl.dispatchEvent(dropEvent);
        fixture.detectChanges();

        expect(component.onDrop).toHaveBeenCalledWith(dropEvent);
        expect(component.droppedEvent).toBe(dropEvent);
    });
});
