import { InputSignal, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUploadDirective } from '../directive/file-upload-directives';
import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;
    let mockFileReader: any;

    beforeEach(async () => {
        // Mock FileReader
        mockFileReader = {
            readAsDataURL: jest.fn(),
            onload: null,
            result: null,
        };

        (window as any).FileReader = jest.fn(() => mockFileReader) as any;

        await TestBed.configureTestingModule({
            imports: [FileUploadComponent, FileUploadDirective],
            providers: [
                provideZonelessChangeDetection(),
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Component initialization', () => {
        it('should create', () => {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should have default input values', () => {
            fixture.detectChanges();
            expect(component.multiple()).toBe(false);
            expect(component.fileType()).toBe('image/*');
            expect(component.dragDropEnabled()).toBe(true);
        });

        it('should initialize file signal to undefined', () => {
            fixture.detectChanges();
            expect(component.file()).toBeUndefined();
        });

        it('should have inputRef ViewChild', () => {
            fixture.detectChanges();
            expect(component.inputRef).toBeDefined();
            expect(component.inputRef.nativeElement).toBeInstanceOf(HTMLInputElement);
        });
    });

    describe('Input properties', () => {
        it('should accept multiple input', () => {
            component.multiple = signal(true) as unknown as InputSignal<boolean>;
            fixture.detectChanges();
            expect(component.multiple()).toBe(true);
        });

        it('should accept fileType input', () => {
            component.fileType = signal('application/pdf') as unknown as InputSignal<string>;
            fixture.detectChanges();
            expect(component.fileType()).toBe('application/pdf');
        });

        it('should accept dragDropEnabled input', () => {
            component.dragDropEnabled = signal(false) as unknown as InputSignal<boolean>;
            fixture.detectChanges();
            expect(component.dragDropEnabled()).toBe(false);
        });
    });

    describe('addFiles method', () => {
        it('should read file and set file signal', (done) => {
            const mockFile = new File(['content'], 'test.png', { type: 'image/png' });
            const mockFileList = createMockFileList([mockFile]);
            const mockBase64 = 'data:image/png;base64,mockdata';

            jest.spyOn(component.filesChanged, 'emit');

            component.addFiles(mockFileList);

            // Simuler le comportement de FileReader
            mockFileReader.result = mockBase64;
            mockFileReader.onload();

            setTimeout(() => {
                expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
                expect(component.file()).toBe(mockBase64);
                expect(component.filesChanged.emit).toHaveBeenCalledWith(mockFileList);
                done();
            }, 0);
        });

        it('should emit filesChanged event', () => {
            const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' });
            const mockFileList = createMockFileList([mockFile]);

            jest.spyOn(component.filesChanged, 'emit');

            component.addFiles(mockFileList);

            fixture.detectChanges();

            expect(component.filesChanged.emit).toHaveBeenCalledWith(mockFileList);
        });

        it('should handle empty FileList', () => {
            const mockFileList = createMockFileList([]);

            jest.spyOn(component.filesChanged, 'emit');

            component.addFiles(mockFileList);

            fixture.detectChanges();

            expect(component.filesChanged.emit).toHaveBeenCalledWith(mockFileList);
        });

        it('should only read first file when multiple files provided', () => {
            const mockFile1 = new File(['content1'], 'test1.png', { type: 'image/png' });
            const mockFile2 = new File(['content2'], 'test2.png', { type: 'image/png' });
            const mockFileList = createMockFileList([mockFile1, mockFile2]);

            component.addFiles(mockFileList);

            fixture.detectChanges();

            expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile1);
            expect(mockFileReader.readAsDataURL).toHaveBeenCalledTimes(1);
        });
    });

    describe('handleFileDrop method', () => {
        it('should handle file drop with valid files', () => {
            const mockFile = new File(['file content'], 'dropped.png', { type: 'image/png' });
            const mockFileList = createMockFileList([mockFile]);

            const mockDataTransfer = {
                files: mockFileList,
            };

            const dropEvent = createMockDragEvent('drop', mockDataTransfer);

            jest.spyOn(component, 'addFiles');

            fixture.detectChanges();

            // Mock la propriété files avec Object.defineProperty
            Object.defineProperty(component.inputRef.nativeElement, 'files', {
                value: mockFileList,
                writable: true,
                configurable: true,
            });

            component.handleFileDrop(dropEvent);

            expect(component.addFiles).toHaveBeenCalledWith(mockFileList);
        });

        it('should not handle drop when no files in dataTransfer', () => {
            const mockDataTransfer = {
                files: createMockFileList([]),
            };

            const dropEvent = createMockDragEvent('drop', mockDataTransfer);

            jest.spyOn(component, 'addFiles');

            component.handleFileDrop(dropEvent);

            fixture.detectChanges();

            expect(component.addFiles).not.toHaveBeenCalled();
        });

        it('should not handle drop when dataTransfer is null', () => {
            const dropEvent = createMockDragEvent('drop', null);

            jest.spyOn(component, 'addFiles');

            component.handleFileDrop(dropEvent);

            fixture.detectChanges();

            expect(component.addFiles).not.toHaveBeenCalled();
        });

        it('should not handle drop when event is null', () => {
            jest.spyOn(component, 'addFiles');

            component.handleFileDrop(null as any);

            fixture.detectChanges();

            expect(component.addFiles).not.toHaveBeenCalled();
        });

        it('should handle multiple files drop', () => {
            const mockFile1 = new File(['content1'], 'file1.png', { type: 'image/png' });
            const mockFile2 = new File(['content2'], 'file2.png', { type: 'image/png' });
            const mockFileList = createMockFileList([mockFile1, mockFile2]);

            const mockDataTransfer = {
                files: mockFileList,
            };

            const dropEvent = createMockDragEvent('drop', mockDataTransfer);

            jest.spyOn(component, 'addFiles');

            fixture.detectChanges();

            // Mock la propriété files
            Object.defineProperty(component.inputRef.nativeElement, 'files', {
                value: mockFileList,
                writable: true,
                configurable: true,
            });

            component.handleFileDrop(dropEvent);

            expect(component.addFiles).toHaveBeenCalledWith(mockFileList);
        });
    });

    describe('Template rendering', () => {
        it('should display ng-content when no file is set', () => {
            component.file.set(undefined);

            fixture.detectChanges();

            const ngContent = fixture.nativeElement.querySelector('.drag-zone');
            expect(ngContent).toBeTruthy();

            const img = fixture.nativeElement.querySelector('img');
            expect(img).toBeNull();
        });

        it('should display image when file is set', () => {
            const mockBase64 = 'data:image/png;base64,mockdata';
            component.file.set(mockBase64);

            fixture.detectChanges();

            const img = fixture.nativeElement.querySelector('img');
            expect(img).toBeTruthy();
            expect(img.src).toContain(mockBase64);
            expect(img.alt).toBe('Aperçu du Meme');
        });

        it('should have correct input attributes', () => {
            const input = fixture.nativeElement.querySelector('input[type="file"]');

            fixture.detectChanges();

            expect(input).toBeTruthy();
            expect(input.accept).toBe('image/*');
            expect(input.multiple).toBe(false);
            expect(input.classList.contains('visually-hidden')).toBe(true);
        });

        it('should update input accept attribute when fileType changes', () => {
            component.fileType = signal('application/pdf') as unknown as InputSignal<string>;

            fixture.detectChanges();

            const input = fixture.nativeElement.querySelector('input[type="file"]');
            expect(input.accept).toBe('application/pdf');
        });

        it('should update input multiple attribute when multiple changes', () => {
            component.multiple = signal(true) as unknown as InputSignal<boolean>;

            fixture.detectChanges();

            const input = fixture.nativeElement.querySelector('input[type="file"]');
            expect(input.multiple).toBe(true);
        });

        it('should have drag-zone label', () => {
            const label = fixture.nativeElement.querySelector('label.drag-zone');

            fixture.detectChanges();

            expect(label).toBeTruthy();
        });

        it('should have appDragDrop directive on label', () => {
            const label = fixture.debugElement.query(By.css('label.drag-zone'));
            const directive = label.injector.get(FileUploadDirective, null);

            fixture.detectChanges();

            expect(directive).toBeTruthy();
        });
    });

    describe('File input change event', () => {
        it('should call addFiles when file input changes', () => {
            const mockFile = new File(['content'], 'upload.png', { type: 'image/png' });
            const mockFileList = createMockFileList([mockFile]);

            jest.spyOn(component, 'addFiles');

            const input = fixture.nativeElement.querySelector('input[type="file"]');

            // Mock files property
            Object.defineProperty(input, 'files', {
                value: mockFileList,
                writable: false,
                configurable: true,
            });

            // Trigger change event
            const changeEvent = new Event('change', { bubbles: true });
            input.dispatchEvent(changeEvent);

            fixture.detectChanges();

            expect(component.addFiles).toHaveBeenCalledWith(mockFileList);
        });
    });

    describe('Integration tests', () => {
        it('should handle complete file upload flow', (done) => {
            const mockFile = new File(['content'], 'test.png', { type: 'image/png' });
            const mockFileList = createMockFileList([mockFile]);
            const mockBase64 = 'data:image/png;base64,mockdata';

            jest.spyOn(component.filesChanged, 'emit');

            // Initial state
            expect(component.file()).toBeUndefined();

            // Add files
            component.addFiles(mockFileList);

            fixture.detectChanges();

            // Simulate FileReader completion
            mockFileReader.result = mockBase64;
            mockFileReader.onload();

            setTimeout(() => {
                // Check final state
                expect(component.file()).toBe(mockBase64);
                expect(component.filesChanged.emit).toHaveBeenCalledWith(mockFileList);

                // Check DOM update
                fixture.detectChanges();
                const img = fixture.nativeElement.querySelector('img');
                expect(img).toBeTruthy();
                expect(img.src).toContain(mockBase64);

                done();
            }, 0);
        });

        it('should handle drag and drop flow', (done) => {
            const mockFile = new File(['content'], 'dropped.png', { type: 'image/png' });
            const mockFileList = createMockFileList([mockFile]);
            const mockBase64 = 'data:image/png;base64,droppeddata';

            const mockDataTransfer = {
                files: mockFileList,
            };

            const dropEvent = createMockDragEvent('drop', mockDataTransfer);

            jest.spyOn(component.filesChanged, 'emit');

            fixture.detectChanges();

            // Mock la propriété files
            Object.defineProperty(component.inputRef.nativeElement, 'files', {
                value: mockFileList,
                writable: true,
                configurable: true,
            });

            // Handle drop
            component.handleFileDrop(dropEvent);

            // Simulate FileReader completion
            mockFileReader.result = mockBase64;
            mockFileReader.onload();

            setTimeout(() => {
                expect(component.file()).toBe(mockBase64);
                expect(component.filesChanged.emit).toHaveBeenCalledWith(mockFileList);

                fixture.detectChanges();
                const img = fixture.nativeElement.querySelector('img');
                expect(img).toBeTruthy();

                done();
            }, 0);
        });
    });

    describe('Edge cases', () => {
        it('should handle FileReader error gracefully', () => {
            const mockFile = new File(['content'], 'test.png', { type: 'image/png' });
            const mockFileList = createMockFileList([mockFile]);

            mockFileReader.onerror = null;

            expect(() => {
                component.addFiles(mockFileList);
            }).not.toThrow();
        });

        it('should handle null file in FileList', () => {
            const mockFileList = {
                length: 1,
                item: (index: number) => null,
                [Symbol.iterator]: function* () {
                    yield null as any;
                },
            } as FileList;

            expect(() => {
                component.addFiles(mockFileList);
            }).not.toThrow();
        });

        it('should replace previous file when new file is added', (done) => {
            const mockFile1 = new File(['content1'], 'first.png', { type: 'image/png' });
            const mockFile2 = new File(['content2'], 'second.png', { type: 'image/png' });
            const mockBase64_1 = 'data:image/png;base64,first';
            const mockBase64_2 = 'data:image/png;base64,second';

            // Add first file
            component.addFiles(createMockFileList([mockFile1]));
            mockFileReader.result = mockBase64_1;
            mockFileReader.onload();

            setTimeout(() => {
                expect(component.file()).toBe(mockBase64_1);

                // Add second file
                component.addFiles(createMockFileList([mockFile2]));
                mockFileReader.result = mockBase64_2;
                mockFileReader.onload();

                setTimeout(() => {
                    expect(component.file()).toBe(mockBase64_2);
                    done();
                }, 0);
            }, 0);
        });
    });
});

// Helper function pour créer un mock de FileList
function createMockFileList(files: File[]): FileList {
    const fileList = {
        length: files.length,
        item: (index: number) => files[index] || null,
        [Symbol.iterator]: function* () {
            for (const file of files) {
                yield file;
            }
        },
    } as FileList;

    files.forEach((file, index) => {
        (fileList as any)[index] = file;
    });

    return fileList;
}

// Helper function pour créer un mock de DragEvent
function createMockDragEvent(type: string, dataTransfer: any): any {
    return {
        type,
        dataTransfer,
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        bubbles: true,
        cancelable: true,
        target: null,
        currentTarget: null,
    };
}