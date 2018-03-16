import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";
import { Store } from "@ngrx/store";

import { AppState } from "../store/app.reducers";
import { SignInAction, SignUpAction, SetTokenAction, SignOutAction } from "./store/auth.actions";

@Injectable()
export class AuthService {
  constructor(private router: Router,
              private store: Store<AppState>) { }

  signupUser(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.store.dispatch(new SignUpAction());
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => {
            this.store.dispatch(new SetTokenAction(token));
          });
      })
      .catch(error => console.log(error));
    }

  signinUser(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch(new SignInAction());
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => {
            this.store.dispatch(new SetTokenAction(token));
          });
        this.router.navigate(["/"]);
      })
      .catch(error => console.log(error));
  }

  signoutUser() {
    firebase.auth().signOut()
      .then(() => {
        this.store.dispatch(new SignOutAction());
      });
  }
}
