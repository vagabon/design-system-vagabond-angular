import { ElementRef, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FileUploadComponent],
            providers: [provideZonelessChangeDetection()],
        }).compileComponents();

        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;

        component.inputRef = {
            nativeElement: document.createElement('input'),
        } as unknown as ElementRef<HTMLInputElement>;

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should set file signal and emit filesChanged when addFiles is called', (done) => {
        const file = new File(['hello'], 'hello.png', { type: 'image/png' });

        const fileList = createMockFileList([file]);

        const filesChangedSpy = vi.fn();
        component.filesChanged.subscribe((files) => {
            filesChangedSpy(files);
            expect(files[0]).toBe(file);
        });

        component.addFiles(fileList);

        setTimeout(() => {
            expect(component.file()).toContain('data:image/png;base64');
        }, 500);
    });

    it('should handle drag and drop', () => {
        const file = new File(['content'], 'drag.png', { type: 'image/png' });
        const fileList = createMockFileList([file]);

        const dragEvent = createMockDragEvent({ files: fileList });

        vi.spyOn(component, 'addFiles');

        Object.defineProperty(component.inputRef.nativeElement, 'files', {
            value: fileList,
            writable: true,
            configurable: true,
        });

        component.handleFileDrop(dragEvent);

        expect(component.addFiles).toHaveBeenCalledWith(fileList);
        expect(component.inputRef.nativeElement.files).toBe(fileList);
    });

    it('should respect input properties defaults', () => {
        expect(component.multiple()).toBe(false);
        expect(component.fileType()).toBe('image/*');
        expect(component.dragDropEnabled()).toBe(true);
    });
});

function createMockFileList(files: File[]): FileList {
    const fileList = {
        length: files.length,
        item: (index: number) => files[index] || null,
        [Symbol.iterator]: function* () {
            for (const f of files) yield f;
        },
    } as FileList;

    files.forEach((f, i) => ((fileList as any)[i] = f));
    return fileList;
}

function createMockDragEvent(dataTransfer: { files: FileList }): DragEvent {
    return {
        dataTransfer,
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
    } as unknown as DragEvent;
}
