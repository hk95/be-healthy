import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  constructor(private othreShellService: OthreShellService) {
    this.othreShellService.setTitle('お問い合わせ');
  }

  ngOnInit(): void {}
}
