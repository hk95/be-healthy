import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatInputModule, MatButtonModule, MatIconModule],
  exports: [MatInputModule, MatButtonModule, MatIconModule],
})
export class SharedModule {}
