import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";

import { FeatureState, RecipeState } from "../store/recipe.reducers";

@Component({
  selector: "app-recipe-list",
  templateUrl: "./recipe-list.component.html",
  styleUrls: ["./recipe-list.component.css"]
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<RecipeState>;

  // we have registered in the RecipesModule the Feature, that's why the store
  // has to be of type FeatureState
  constructor(private store: Store<FeatureState>) {}

  ngOnInit() {
    this.recipeState = this.store.select("recipes");
  }
}
