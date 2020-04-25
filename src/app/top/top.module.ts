import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopRoutingModule } from './top-routing.module';
import { TopComponent } from './top/top.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [TopComponent, UserComponent],
  imports: [
    CommonModule,
    TopRoutingModule
  ]
})
export class TopModule { }
