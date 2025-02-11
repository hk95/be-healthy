import { Component, OnInit } from '@angular/core';
import { MainShellService } from '../services/main-shell.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: false,
})
export class ToolbarComponent implements OnInit {
  constructor(public mainShellService: MainShellService) {}

  ngOnInit(): void {}
}
