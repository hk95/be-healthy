import { Component, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
})
export class GraphComponent implements OnInit {
  constructor(private mainShellService: MainShellService) {
    this.mainShellService.setTitle('グラフ');
  }

  ngOnInit(): void {}
}
