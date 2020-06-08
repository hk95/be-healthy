import { Component, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private mainShellService: MainShellService) {
    this.mainShellService.setTitle('My Menu');
  }

  ngOnInit(): void {}
}
