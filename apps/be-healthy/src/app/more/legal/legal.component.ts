import { Component, OnInit } from '@angular/core';
import { OthreShellService } from '../../services/othre-shell.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  constructor(private othreShellService: OthreShellService) {
    this.othreShellService.title = this.othreShellService.PAGE_TITLES.legal;
  }

  ngOnInit(): void {}
}
