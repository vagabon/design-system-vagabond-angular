import { Component, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { FileUploadDirective } from '../directive/file-upload-directives';

@Component({
    selector: 'dsv-file-upload',
    imports: [FileUploadDirective],
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class DsvFileUploadComponent {
    readonly multiple = input<boolean>(false);
    readonly fileType = input<string>('image/*');
    readonly imgAlt = input<string>("Apperçu de l'image");
    readonly dragDropEnabled = input<boolean>(true);

    readonly filesChanged = output<FileList>();

    readonly file = signal<string | undefined>(undefined);

    @ViewChild('fileInput')
    inputRef!: ElementRef<HTMLInputElement>;

    addFiles(files: FileList): void {
        const reader = new FileReader();
        reader.onload = () => {
            this.file.set(reader.result as string);
        };
        reader.readAsDataURL(files.item(0) as Blob);
        this.filesChanged.emit(files);
    }

    handleFileDrop(event: DragEvent): void {
        if (event?.dataTransfer?.files?.length) {
            const files = event.dataTransfer.files;
            this.inputRef.nativeElement.files = files;
            this.addFiles(files);
        }
    }
}
