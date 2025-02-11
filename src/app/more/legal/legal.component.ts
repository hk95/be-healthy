import { Component } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
  standalone: false,
})
export class LegalComponent {
  constructor(private othreShellService: OthreShellService) {
    this.othreShellService.title = this.othreShellService.PAGE_TITLES.legal;
  }
}
