import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";

import { AppState } from "../../store/app.reducers";
import { DoSignupAction } from "../store/auth.actions";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  @ViewChild("f") signupForm: NgForm;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignup(): void {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    this.store.dispatch(new DoSignupAction({ username: email, password: password }));
  }

}
