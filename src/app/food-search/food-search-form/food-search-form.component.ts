import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Food } from 'src/app/interfaces/food';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-food-search-form',
  templateUrl: './food-search-form.component.html',
  styleUrls: ['./food-search-form.component.scss'],
})
export class FoodSearchFormComponent implements OnInit {
  @Output() readonly setFoods = new EventEmitter<Food[]>();
  readonly index = this.searchService.index;

  hitFoods: Food[] = [];

  readonly form = this.fb.group({
    query: [''],
  });
  constructor(private searchService: SearchService, private fb: FormBuilder) {}

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
        hitsPerPage: 10,
      })
      .then(({ hits }) => {
        this.hitFoods = (hits as unknown) as Food[];
        this.setFoods.emit(this.hitFoods);
        this.searchService.loading = false;
      });
  }

  clearForm(): void {
    this.form.reset();
  }
}
