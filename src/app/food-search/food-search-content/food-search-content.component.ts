import { Component, Input, OnInit } from '@angular/core';
import { Food } from 'src/app/interfaces/food';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-food-search-content',
  templateUrl: './food-search-content.component.html',
  styleUrls: ['./food-search-content.component.scss'],
})
export class FoodSearchContentComponent implements OnInit {
  @Input() date: string;
  @Input() isAddable: boolean;
  @Input() pageTitle: 'mealPage' | 'setPage';

  loading = this.searchService.loading;
  foods: Food[];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  _setFoods(event: Food[]) {
    this.foods = event;
  }
}
