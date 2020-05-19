import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  constructor(private othreShellService: OthreShellService) {
    this.othreShellService.setTitle('アカウント');
  }

  ngOnInit(): void {}
}
