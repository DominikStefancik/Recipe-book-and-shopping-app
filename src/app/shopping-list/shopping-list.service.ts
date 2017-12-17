import { EventEmitter } from '@angular/core';

import { Ingredient } from '../domain/ingredient';

export class ShoppingListService {
  ingredientsChanged: EventEmitter<Ingredient[]>;
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 10)
  ];

  constructor() {
    this.ingredientsChanged = new EventEmitter<Ingredient[]>();
  }

  getIngredients():Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient):void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
