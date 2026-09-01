import { Component, inject, input, output, signal } from '@angular/core';
import { ApiService, JSONObject } from '@ng-vagabond-lab/ng-dsv/api';
import { DsvFileShowComponent } from '../../public-api';

@Component({
    selector: 'dsv-file-upload-container',
    imports: [DsvFileShowComponent],
    templateUrl: './file-upload.container.html',
    styleUrl: './file-upload.container.scss',
})
export class FileUploadContainer {
    private readonly apiService = inject(ApiService);

    public readonly directory = input<string>('');
    public readonly image = input<string>('');

    protected readonly callback = output<string>();

    private readonly file = signal<File | null>(null);

    addFiles(files: FileList | null) {
        Array.from(files ?? []).forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                this.file.set(file);

                const formData = new FormData();
                formData.append('fileForm', this.file()!);

                return this.apiService.post(`/file/upload?directory=${this.directory()}`, formData, (res) => {
                    this.callback.emit(res['path' as keyof JSONObject]);
                });
            };
            reader.readAsDataURL(file);
        });
    }
}
