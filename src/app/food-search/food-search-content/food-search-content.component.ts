import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food, SentFood } from 'src/app/interfaces/food';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-food-search-content',
  templateUrl: './food-search-content.component.html',
  styleUrls: ['./food-search-content.component.scss'],
  standalone: false,
})
export class FoodSearchContentComponent implements OnInit {
  @Input() date: string;
  @Input() isAddable: boolean;
  @Input() pageTitle: 'mealPage' | 'setPage';
  @Output() addFoodEvent = new EventEmitter<SentFood>();

  loading = this.searchService.loading;
  foods: Food[];

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {}

  _setFoods(event: Food[]) {
    this.foods = event;
  }

  _addFood(event: SentFood): void {
    this.addFoodEvent.emit(event);
  }
}
