import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { MainShellService } from 'src/app/services/main-shell.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  date: string;
  weelList = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];

  calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    theme: 'standart',
    headerToolbar: {
      left: 'prev',
      center: 'title',
      right: 'next',
    },
    locale: 'ja',
    businessHours: true,
    dateClick: this.handleDateClick.bind(this),
  };

  constructor(
    private mainShellService: MainShellService,
    private router: Router
  ) {
    this.mainShellService.setTitle('TOP');
  }
  handleDateClick(arg) {
    const week = this.weelList[arg.dayEl.cellIndex];
    this.date = arg.dateStr.slice(2).replace(/-/g, '.').replace(/$/, week);
    console.log(this.date);

    this.router.navigate(['/daily-detail'], {
      queryParams: {
        date: this.date,
      },
    });
  }

  ngOnInit(): void {}
}
