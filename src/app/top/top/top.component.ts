import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MainShellService } from 'src/app/services/main-shell.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];

  constructor(private mainShellService: MainShellService) {
    this.mainShellService.setTitle('TOP');
  }

  ngOnInit(): void {}
}
