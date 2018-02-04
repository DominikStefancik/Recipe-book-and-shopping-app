import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { RecipesService } from "../recipes.service";
import { Recipe } from "../../domain/recipe";
import { Ingredient } from "../../domain/ingredient";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"]
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private recipesService: RecipesService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params["id"];
        this.editMode = params["id"] != null;

        if (this.editMode) {
          this.recipe = this.recipesService.getRecipe(this.id);
        }

        this.initForm();
      });
  }

  private initForm(): void {
    const recipeName = this.editMode ? this.recipe.name : "";
    const recipeImageUrl = this.editMode ? this.recipe.imageUrl : "";
    const recipeDescription = this.editMode ? this.recipe.description : "";
    const recipeIngredients =
            this.editMode ? this.recipe.ingredients
                                       .map(ingredient => this.createIngredientRow(ingredient.name, ingredient.amount))
                          : [];

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
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }

    this.navigateToParent();
  }

  onCancel(): void {
    this.navigateToParent();
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
