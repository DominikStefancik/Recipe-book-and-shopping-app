import { Ingredient } from '../domain/ingredient';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 10)
  ];

  getIngredients():Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient:Ingredient):void {
    this.ingredients.push(ingredient);
  }
}
