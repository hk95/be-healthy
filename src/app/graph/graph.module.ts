import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { GraphComponent } from './graph/graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [GraphComponent],
  imports: [CommonModule, GraphRoutingModule, NgxChartsModule],
})
export class GraphModule {}
