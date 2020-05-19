import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.scss'],
})
export class LegalComponent implements OnInit {
  constructor(private othreShellService: OthreShellService) {
    this.othreShellService.setTitle('特定商取引法に基づく表示');
  }

  ngOnInit(): void {}
}
