import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private datepipe: DatePipe) {}
  today: string = this.getDate();

  getDate() {
    const d = new Date();
    return this.datepipe.transform(d, 'yy.MM.dd(E)');
  }

  ngOnInit(): void {}
}
