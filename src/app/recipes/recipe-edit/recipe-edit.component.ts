import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Recipe } from "../../domain/recipe";
import { Ingredient } from "../../domain/ingredient";
import { Store } from "@ngrx/store";
import { FeatureState, RecipeState } from "../store/recipe.reducers";
import { UpdateRecipeAction, AddRecipeAction } from "../store/recipe.actions";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private store: Store<FeatureState>) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params["id"];
        this.editMode = params["id"] != null;
        this.initForm();
      });
  }

  private initForm(): void {
    let recipeName = "";
    let recipeImageUrl = "";
    let recipeDescription = "";
    let recipeIngredients = [];
    if (this.editMode) {
      this.store.select("recipes")
            .take(1)
            .subscribe((recipeState: RecipeState) => {
              const recipe = recipeState.recipes[this.id];
              recipeName = recipe.name;
              recipeImageUrl = recipe.imageUrl;
              recipeDescription = recipe.description;
              recipeIngredients = recipe.ingredients
                    .map(ingredient => this.createIngredientRow(ingredient.name, ingredient.amount));
            });
    }

    this.recipeForm = this.formBuilder.group({
      "name" : this.formBuilder.control(recipeName, Validators.required),
      "imageUrl" : this.formBuilder.control(recipeImageUrl, Validators.required),
      "description" : this.formBuilder.control(recipeDescription, Validators.required),
      "ingredients" : this.formBuilder.array(recipeIngredients)
    });
  }

  private createIngredientRow(name: string, amount: number): FormGroup {
    return this.formBuilder.group({
      "name" : this.formBuilder.control(name, Validators.required),
      "amount" : this.formBuilder.control(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onSave(): void {
    if (this.editMode) {
      // the "recipe.value" object contains all data which are necessary to create a new Recipe object
      // since the names of the fields are the same as names in the Recipe constructor we can pass directly
      // the "recipeForm.value" as a recipe object and don"t have to call the Recipe constructor explicitly
      this.store.dispatch(new UpdateRecipeAction({
        index: this.id,
        updatedRecipe: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(new AddRecipeAction(this.recipeForm.value));
    }

    this.navigateToParent();
  }

  onCancel(): void {
    this.navigateToParent();
  }

  getIngredients(): FormArray {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  onAddIngredient(): void {
    const ingredients = this.recipeForm.get("ingredients") as FormArray;
    ingredients.push(this.createIngredientRow(null, null));
  }

  onDeleteIngredient(index: number): void {
    const ingredients = this.recipeForm.get("ingredients") as FormArray;
    ingredients.removeAt(index);
  }

  private navigateToParent(): void {
    this.router.navigate([".."], { "relativeTo" : this.route });
  }
}
