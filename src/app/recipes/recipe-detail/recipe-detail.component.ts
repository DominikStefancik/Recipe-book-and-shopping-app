import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Store, select } from "@ngrx/store";

import { Recipe } from "../../domain/recipe";
import { Ingredient } from "../../domain/ingredient";
import { AddIngredientsAction } from "../../shopping-list/store/shopping-list.actions";
import { FeatureState, RecipeState } from "../store/recipe.reducers";
import { DeleteRecipeAction } from "../store/recipe.actions";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<FeatureState>) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params["id"];
        this.store.select("recipes")
          .take(1) // call "select" method only once when the state changes
          .subscribe((recipeState: RecipeState) => {
            this.recipe = recipeState.recipes[this.id];
          });
      });
  }

  onAddIngredientsToShoppingList(): void {
    this.store.dispatch(new AddIngredientsAction(this.recipe.ingredients));
  }

  onDeleteRecipe(): void {
    this.store.dispatch(new DeleteRecipeAction(this.id));
    this.router.navigate([".."], { "relativeTo" : this.route } );
  }
}
