import { Subject } from "rxjs/Subject";

import { Ingredient } from "../domain/ingredient";

export class ShoppingListService {
  ingredientsChanged: Subject<Ingredient[]>;
  ingredientEditingStarted: Subject<number>;

  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Orange", 10)
  ];

  constructor() {
    this.ingredientsChanged = new Subject<Ingredient[]>();
    this.ingredientEditingStarted = new Subject<number>();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

  updateIngredient(index: number, newIngredient: Ingredient): void {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.getIngredients());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }
}
