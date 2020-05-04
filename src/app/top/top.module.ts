
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';
import { UserComponent } from './user/user.component';

import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [TopComponent, UserComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    MatButtonModule
  ],
  providers: [DatePipe]
})
export class TopModule { }
