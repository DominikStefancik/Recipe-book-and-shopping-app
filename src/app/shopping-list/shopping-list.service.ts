import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../domain/ingredient';

export class ShoppingListService {
  ingredientsChanged: Subject<Ingredient[]>;
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 10)
  ];

  constructor() {
    this.ingredientsChanged = new Subject<Ingredient[]>();
  }

  getIngredients():Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient):void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]):void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
