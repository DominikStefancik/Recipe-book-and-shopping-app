import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Params } from "@angular/router";
import { Store } from "@ngrx/store";

import { Recipe } from "../../domain/recipe";
import { RecipesService } from "../recipes.service";
import { Ingredient } from "../../domain/ingredient";
import { AddIngredientsAction } from "../../shopping-list/store/shopping-list.actions";
import { AppState } from "../../store/app.state";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipesService: RecipesService,
              private store: Store<AppState>) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params["id"];
        this.recipe = this.recipesService.getRecipe(this.id);
      });
  }

  onAddIngredientsToShoppingList(): void {
    this.store.dispatch(new AddIngredientsAction(this.recipe.ingredients));
  }

  onDeleteRecipe(): void {
    this.recipesService.deleteRecipe(this.id);
    this.router.navigate([".."], { "relativeTo" : this.route } );
  }
}
