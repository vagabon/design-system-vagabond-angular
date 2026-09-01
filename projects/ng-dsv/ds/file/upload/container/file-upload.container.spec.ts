import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '@ng-vagabond-lab/ng-dsv/api';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FileUploadContainer } from './file-upload.container';

describe('FileUploadContainer', () => {
    let component: FileUploadContainer;
    let fixture: ComponentFixture<FileUploadContainer>;
    let componentRef: ComponentRef<FileUploadContainer>;

    const mockApiService = {
        post: vi.fn(),
    };

    beforeEach(async () => {
        vi.clearAllMocks();

        await TestBed.configureTestingModule({
            imports: [FileUploadContainer],
            providers: [{ provide: ApiService, useValue: mockApiService }],
        }).compileComponents();

        fixture = TestBed.createComponent(FileUploadContainer);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef;
        fixture.detectChanges();
    });

    it('doit être instancié', () => {
        expect(component).toBeTruthy();
    });

    it('ne doit rien faire si la liste de fichiers est nulle ou vide', () => {
        component.addFiles(null);
        expect(mockApiService.post).not.toHaveBeenCalled();
    });

    it('doit lire le fichier, envoyer le FormData au service et émettre le path via le callback', async () => {
        const mockDirectory = 'news';
        componentRef.setInput('directory', mockDirectory);

        const mockFile = new File(['dummy content'], 'test.png', { type: 'image/png' });
        const mockFileList = [mockFile] as unknown as FileList;

        const spyCallback = vi.fn();
        component['callback'].subscribe(spyCallback);

        mockApiService.post.mockImplementation((url, formData, callback) => {
            callback({ path: '/news/test.png' });
        });

        component.addFiles(mockFileList);

        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(mockApiService.post).toHaveBeenCalledWith(
            `/file/upload?directory=${mockDirectory}`,
            expect.any(FormData),
            expect.any(Function),
        );

        const actualFormData = mockApiService.post.mock.calls[0][1] as FormData;
        expect(actualFormData.get('fileForm')).toBe(mockFile);

        expect(spyCallback).toHaveBeenCalledWith('/news/test.png');
    });
});
