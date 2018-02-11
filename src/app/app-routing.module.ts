import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";

const appRoutes: Routes = [
  // "pathMatch" ensures that redirection happens only if full path is empty
  { path: "", redirectTo: "/recipes", pathMatch: "full" }
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
