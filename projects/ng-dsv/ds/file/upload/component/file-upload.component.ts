import { Component, ElementRef, input, output, signal, ViewChild } from '@angular/core';
import { FileUploadDirective } from '../directive/file-upload-directives';

@Component({
  selector: 'dsv-file-upload',
  imports: [FileUploadDirective],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  multiple = input<boolean>(false);
  fileType = input<string>('image/*');
  dragDropEnabled = input<boolean>(true);

  filesChanged = output<FileList>();

  file = signal<string | undefined>(undefined);

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

  handleFileDrop(event: DragEvent) {
    if (event?.dataTransfer?.files?.length) {
      const files = event.dataTransfer.files;
      this.inputRef.nativeElement.files = files;
      this.addFiles(files);
    }
  }
}
