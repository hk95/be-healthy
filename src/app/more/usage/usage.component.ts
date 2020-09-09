import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss'],
})
export class UsageComponent implements OnInit {
  constructor(private otherShellService: OthreShellService) {
    this.otherShellService.setTitle('使用方法');
  }

  ngOnInit(): void {}
}
