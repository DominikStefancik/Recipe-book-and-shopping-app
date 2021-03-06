import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../auth/auth-guard.service";
import { RecipesComponent } from "./recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEmptyDetailComponent } from "./recipe-detail/recipe-empty-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";

const recipesRoutes: Routes = [
  { path: "", component: RecipesComponent, children: [
    { path: "", component: RecipeEmptyDetailComponent },
    { path: "new", component: RecipeEditComponent, canActivate: [AuthGuard] },
    { path: ":id", component: RecipeDetailComponent },
    { path: ":id/edit", component: RecipeEditComponent, canActivate: [AuthGuard] }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})
export class RecipesRoutingModule {}
