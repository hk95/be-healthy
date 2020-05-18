import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editor-breakfast',
  templateUrl: './editor-breakfast.component.html',
  styleUrls: ['./editor-breakfast.component.scss'],
})
export class EditorBreakfastComponent implements OnInit {
  @Input() user: User;
  constructor(private location: Location) {}
  back(): void {
    this.location.back();
  }
  ngOnInit(): void {}
}
