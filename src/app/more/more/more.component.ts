import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
})
export class MoreComponent implements OnInit {
  constructor(private othreShellService: OthreShellService) {
    this.othreShellService.setTitle('その他');
  }

  ngOnInit(): void {}
}
