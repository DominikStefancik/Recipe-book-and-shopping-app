import { Subject } from "rxjs/Subject";

import { Recipe } from "../domain/recipe";
import { Ingredient } from "../domain/ingredient";

export class RecipesService {
  recipesChanged: Subject<Recipe[]>;

  private recipes: Recipe[] = [
    new Recipe("Tasty Schnitzel",
               "Super tasty schnitzel",
               "https://upload.wikimedia.org/wikipedia/commons/a/ae/Wiener-Schnitzel02.jpg",
               [
                 new Ingredient("Meat", 1),
                 new Ingredient("French Fries", 20)
               ]),
    new Recipe("Big fat burger",
               "Tasty but unhealthy",
               "https://upload.wikimedia.org/wikipedia/commons/6/65/Jumbo_Burger_The_Home_Chef_India.jpg",
               [
                 new Ingredient("Buns", 2),
                 new Ingredient("Meat", 1)
               ]),
    new Recipe("Strawberry and Kiwi cake",
               "Delicious",
               "https://upload.wikimedia.org/wikipedia/commons/6/67/Pavlova_dessert.JPG",
               [
                 new Ingredient("Strawberries", 30),
                 new Ingredient("Kiwis", 20),
                 new Ingredient("Flour", 1)
               ])
  ];

  constructor () {
    this.recipesChanged = new Subject<Recipe[]>();
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // get a copy of the recipes array, so other objects cannot change the original
  }

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }
}
