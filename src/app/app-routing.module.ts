import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEmptyDetailComponent } from "./recipes/recipe-detail/recipe-empty-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  // "pathMatch" ensures that redirection happens only if full path is empty
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  { path: "recipes", component: RecipesComponent, children: [
    { path: "", component: RecipeEmptyDetailComponent },
    { path: "new", component: RecipeEditComponent },
    { path: ":id", component: RecipeDetailComponent },
    { path: ":id/edit", component: RecipeEditComponent }
  ] },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "signup", component: SignUpComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
