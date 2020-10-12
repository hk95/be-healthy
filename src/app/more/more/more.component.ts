import { Component, OnInit } from '@angular/core';
import { MainShellService } from 'src/app/services/main-shell.service';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {
  constructor(
    private othreShellService: OthreShellService,
    private mainShellService: MainShellService
  ) {
    this.othreShellService.title = this.othreShellService.PAGE_TITLES.more;
    this.mainShellService.title = this.mainShellService.PAGE_TITLES.more;
  }

  ngOnInit(): void {}
}
