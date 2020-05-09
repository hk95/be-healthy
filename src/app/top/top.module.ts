
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { DetailComponent } from './detail/detail.component';




@NgModule({
  declarations: [TopComponent,  DetailComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [DatePipe]
})
export class TopModule { }
