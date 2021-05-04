import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Food, SentFood } from 'src/app/interfaces/food';

@Component({
  selector: 'app-food-list-for-set',
  templateUrl: './food-list-for-set.component.html',
  styleUrls: ['./food-list-for-set.component.scss'],
})
export class FoodListForSetComponent implements OnInit {
  @Input() foods: Food[];
  @Input() isAddable: boolean;
  @Output() addFoodEvent = new EventEmitter<SentFood>();

  constructor() {}

  ngOnInit(): void {}

  addFood(amount: number, food: Food): void {
    this.addFoodEvent.emit({ amount, food });
  }
}
