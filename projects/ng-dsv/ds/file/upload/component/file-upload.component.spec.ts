import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsvFileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
    let component: DsvFileUploadComponent;
    let fixture: ComponentFixture<DsvFileUploadComponent>;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DsvFileUploadComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(DsvFileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        const mockInput = document.createElement('input');
        vi.spyOn(component, 'inputRef').mockReturnValue({
            nativeElement: mockInput,
        } as ElementRef<HTMLInputElement>);
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

        component.handleFileDrop(dragEvent);

        expect(component.addFiles).toHaveBeenCalledWith(fileList);
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
