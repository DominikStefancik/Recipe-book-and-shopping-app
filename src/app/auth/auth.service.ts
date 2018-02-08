import { Injectable } from "@angular/core";
import * as firebase from "firebase";

@Injectable()
export class AuthService {
  token: string;

  constructor() { }

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
      })
      .catch(error => console.log(error));
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
