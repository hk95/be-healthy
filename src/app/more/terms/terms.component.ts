import { Component, OnInit } from '@angular/core';
import { OthreShellService } from 'src/app/services/othre-shell.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  standalone: false,
})
export class TermsComponent implements OnInit {
  constructor(private othreShellService: OthreShellService) {
    this.othreShellService.title = this.othreShellService.PAGE_TITLES.terms;
  }

  ngOnInit(): void {}
}
