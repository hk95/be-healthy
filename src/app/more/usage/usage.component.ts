import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss'],
})
export class UsageComponent implements OnInit {
  constructor(private otherShellService: OthreShellService) {
    this.otherShellService.title = this.otherShellService.PAGE_TITLES.usage;
  }

  ngOnInit(): void {}
}
