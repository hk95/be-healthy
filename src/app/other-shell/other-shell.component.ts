import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OthreShellService } from '../services/othre-shell.service';

@Component({
  selector: 'app-other-shell',
  templateUrl: './other-shell.component.html',
  styleUrls: ['./other-shell.component.scss'],
})
export class OtherShellComponent implements OnInit {
  title$: Observable<string> = this.othreShellService.title$;
  constructor(private othreShellService: OthreShellService) {}

  ngOnInit(): void {}
}
