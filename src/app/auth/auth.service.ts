import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as firebase from "firebase";

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string): void {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.getIdToken()
              .then((token: string) => {
                this.token = token;
              });
        this.router.navigate(["/"]);
      })
      .catch(error => console.log(error));
  }

  signoutUser() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken(): string {
    firebase.auth().currentUser.getIdToken()
              .then((token: string) => {
                this.token = token;
              });
    return this.token;
  }

  isUserAuthenticated(): boolean {
    return this.token != null;
  }
}
