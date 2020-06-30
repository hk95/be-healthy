import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetCreateRoutingModule } from './set-create-routing.module';
import { SetCreateComponent } from './set-create.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgAisModule } from 'angular-instantsearch';

@NgModule({
  declarations: [SetCreateComponent],
  imports: [
    CommonModule,
    SetCreateRoutingModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    NgAisModule,
  ],
})
export class SetCreateModule {}
