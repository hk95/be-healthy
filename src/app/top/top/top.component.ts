import { Component, OnInit, } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {
user: User = {
  id: 1,
  name: 'hk',
  weight: 65,
  fat: 13.4,
  totalCal: 2000
};

  constructor() { }

  ngOnInit(): void {
  }

}
