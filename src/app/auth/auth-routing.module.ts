import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const authRoutes: Routes = [
  { path: "signup", component: SignUpComponent },
  { path: "signin", component: SignInComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
