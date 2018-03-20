import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.reducers";
import { DoSigninAction } from "../store/auth.actions";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit {
  @ViewChild("f") signinForm: NgForm;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignin(): void {
    const email = this.signinForm.value.email;
    const password = this.signinForm.value.password;

    this.store.dispatch(new DoSigninAction({ username: email, password: password }));
  }
}
