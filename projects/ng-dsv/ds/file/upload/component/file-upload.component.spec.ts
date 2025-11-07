import { ElementRef, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadDirective } from '../directive/file-upload-directives';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FileUploadComponent, FileUploadDirective],
            providers: [
                provideZonelessChangeDetection(),
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit filesChanged when addFiles is called', () => {
        const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });
        const mockFileList: FileList = {
            0: mockFile,
            length: 1,
            item: (index: number) => mockFile
        };

        spyOn(component.filesChanged, 'emit');
        component.addFiles(mockFileList);
        expect(component.filesChanged.emit).toHaveBeenCalledWith(mockFileList);
    });

    it('should handle file drop', () => {
        const mockFile = new File(['file content'], 'mock.txt', { type: 'text/plain' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(mockFile);

        const dropEvent = new DragEvent('drop', {
            dataTransfer
        });

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fixture.nativeElement.appendChild(fileInput);
        component.inputRef = { nativeElement: fileInput } as ElementRef<HTMLInputElement>;

        spyOn(component, 'addFiles');
        component.handleFileDrop(dropEvent);

        expect(component.addFiles).toHaveBeenCalledWith(dataTransfer.files);
        expect(fileInput.files?.[0].name).toBe('mock.txt');
    });
});
