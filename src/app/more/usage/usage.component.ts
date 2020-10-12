import { Component, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-usage',
  templateUrl: './usage.component.html',
  styleUrls: ['./usage.component.scss'],
})
export class UsageComponent implements OnInit {
  constructor(
    private otherShellService: OthreShellService,
    private mainShellService: MainShellService
  ) {}

  ngOnInit(): void {
    this.otherShellService.title = this.otherShellService.PAGE_TITLES.usage;
    this.mainShellService.title = this.otherShellService.PAGE_TITLES.usage;
  }
}
