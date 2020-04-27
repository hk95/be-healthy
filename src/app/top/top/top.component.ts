import { Component, OnInit, } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
