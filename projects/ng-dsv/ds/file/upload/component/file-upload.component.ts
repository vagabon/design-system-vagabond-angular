import { Component, ElementRef, input, output, ViewChild } from '@angular/core';
import { FileUploadDirective } from '../direcitve/file-upload-directives';

@Component({
  selector: 'dsv-file-upload',
  standalone: true,
  imports: [FileUploadDirective],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  multiple = input<boolean>(false);
  fileType = input<string>('');
  dragDropEnabled = input<boolean>(true);

  filesChanged = output<FileList>();

  @ViewChild('fileInput')
  inputRef!: ElementRef<HTMLInputElement>;

  addFiles(files: FileList): void {
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
