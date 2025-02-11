import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-cropper',
  imports: [CommonModule],
  template: `
    <div class="cropper-container">
      <input
        type="file"
        (change)="fileChangeEvent($event)"
        accept="image/*"
        #fileInput
      />

      <div class="img-container" *ngIf="imageUrl">
        <img
          #image
          [src]="imageUrl"
          crossorigin="anonymous"
          style="max-width: 100%"
        />
      </div>

      <div class="controls" *ngIf="cropper">
        <button (click)="rotate(-90)">左回転</button>
        <button (click)="rotate(90)">右回転</button>
        <button (click)="flipHorizontal()">水平反転</button>
        <button (click)="flipVertical()">垂直反転</button>
        <button (click)="resetImage()">リセット</button>
        <button (click)="crop()">切り取り</button>
      </div>
    </div>
  `,
  styles: [
    `
      .cropper-container {
        max-width: 900px;
        margin: 20px auto;
      }
      .img-container {
        margin: 20px 0;
      }
      .controls {
        margin-top: 10px;
        display: flex;
        gap: 10px;
        justify-content: center;
      }
    `,
  ],
})
export class ImageCropperComponent implements AfterViewInit {
  @ViewChild('image') imageElement: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() croppedImage = new EventEmitter<string>();
  @Output() loadError = new EventEmitter<string>();

  @Input() imageFile: File;
  @Input() maintainAspectRatio: boolean = true;
  @Input() aspectRatio: number = 1;

  imageUrl: string = '';
  cropper: Cropper;

  cropperOptions: Cropper.Options = {
    aspectRatio: 1,
    viewMode: 1,
    dragMode: 'move',
    autoCropArea: 0.8,
    responsive: true,
    guides: true,
    center: true,
    highlight: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: false,
  };

  ngAfterViewInit() {
    if (this.imageUrl) {
      this.initCropper();
    }
  }

  fileChangeEvent(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        if (this.cropper) {
          this.cropper.destroy();
        }
        this.initCropper();
      };
      reader.onerror = () => {
        this.loadError.emit('ファイルの読み込みに失敗しました');
      };
      reader.readAsDataURL(file);
    }
  }

  initCropper(): void {
    if (this.imageElement && this.imageElement.nativeElement) {
      if (this.cropper) {
        this.cropper.destroy();
      }
      this.cropper = new Cropper(
        this.imageElement.nativeElement,
        this.cropperOptions
      );
    }
  }

  rotate(deg: number): void {
    if (this.cropper) {
      this.cropper.rotate(deg);
    }
  }

  flipHorizontal(): void {
    if (this.cropper) {
      this.cropper.scaleX(-this.cropper.getData().scaleX || -1);
    }
  }

  flipVertical(): void {
    if (this.cropper) {
      this.cropper.scaleY(-this.cropper.getData().scaleY || -1);
    }
  }

  resetImage(): void {
    if (this.cropper) {
      this.cropper.reset();
    }
  }

  crop(): void {
    if (this.cropper) {
      const croppedCanvas = this.cropper.getCroppedCanvas({
        width: 800,
        height: 800,
        fillColor: '#fff',
      });

      const croppedImage = croppedCanvas.toDataURL('image/png');
      this.croppedImage.emit(croppedImage);
    }
  }

  ngOnDestroy() {
    if (this.cropper) {
      this.cropper.destroy();
    }
  }
}

export function base64ToFile(base64Image: string): Blob {
  // Base64文字列からデータとMIMEタイプを抽出
  const split = base64Image.split(',');
  const type = split[0].match(/image\/[^;]*/)?.[0] || 'image/png';
  const bytes = atob(split[1]);
  const len = bytes.length;
  const buffer = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    buffer[i] = bytes.charCodeAt(i);
  }

  return new Blob([buffer], { type });
}
