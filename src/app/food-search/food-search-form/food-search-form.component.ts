import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Food } from 'src/app/interfaces/food';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-food-search-form',
  templateUrl: './food-search-form.component.html',
  styleUrls: ['./food-search-form.component.scss'],
})
export class FoodSearchFormComponent implements OnInit {
  @Input() pageTitle: 'mealPage' | 'setPage';
  @Output() readonly setFoods = new EventEmitter<Food[]>();
  readonly index = this.searchService.index;

  readonly form = this.fb.group({
    query: [''],
  });
  constructor(
    private searchService: SearchService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.search('こめ');
  }

  submitQuery(): void {
    this.search(this.form.value.query);
  }

  private search(query: string): void {
    this.searchService.loading = true;
    this.index
      .search(query, {
        hitsPerPage: this.pageTitle === 'mealPage' ? 10 : 5,
      })
      .then(({ hits }) => {
        const hitFoods: Food[] = (hits as unknown) as Food[];
        this.setFoods.emit(hitFoods);
        this.searchService.loading = false;
      });
  }

  clearForm(): void {
    this.form.reset();
  }
}
