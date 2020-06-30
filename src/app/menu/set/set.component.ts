import { Component, OnInit } from '@angular/core';
import { SetService } from 'src/app/services/set.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.scss'],
})
export class SetComponent implements OnInit {
  setId: string;
  constructor(private setService: SetService, private router: Router) {}
  forwardbackToForm() {
    this.setId = this.setService.getTentativeRecipeId();
    this.router.navigate(['/set-create'], {
      queryParams: {
        id: this.setId,
      },
    });
  }
  ngOnInit(): void {}
}
