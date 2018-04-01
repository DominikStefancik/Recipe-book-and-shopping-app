import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Effect, Actions } from "@ngrx/effects";
import { fromPromise } from "rxjs/observable/fromPromise";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import * as firebase from "firebase";

import { DO_SIGNUP, DoSignupAction, SignUpAction, SIGN_UP, SET_TOKEN,
  DO_SIGNIN, DoSigninAction, SIGN_IN, SIGN_OUT } from "./auth.actions";

// NgRx Effects are similar to reducers, they react when a certain action is dispatched,
// BUT they DON'T change the state of the app
@Injectable()
export class AuthEffects {
  @Effect() // register property as an effect in ngrx world
  // whenever the action DO_SIGN_UP is dispatched an observable will be fired
  authSignup = this.actions.ofType(DO_SIGNUP) // chooses only action of a given type
      .map((action: DoSignupAction) => {
        return action.payload; // get the payload from the action
      })
      .switchMap((payload: {username: string, password: string}) => {
        return fromPromise(firebase.auth() // use that payload to fire a Firebase function
            .createUserWithEmailAndPassword(payload.username, payload.password));
      })
      .switchMap(() => { // get the token from currently created user
        return fromPromise(firebase.auth().currentUser.getIdToken());
      })
      .mergeMap((token: string) => { // I want to dispatch more actions, that's why "mergeMap"
        this.router.navigate(["/"]);
        return [
          { type: SIGN_UP }, // type of effect which will be dispatched

          // properties have to be "type" and "payload" so the observable can be handled by
          // NgRx effects
          { type: SET_TOKEN, payload: token }
        ];
      });
      // at the end of the Effect's chain you typically dispatch a new effect
      // if you don't want to dispatch any effect, you must specify it in @Effect({dispatch: false})

  @Effect()
  authSignin = this.actions.ofType(DO_SIGNIN)
      .map((action: DoSigninAction) => {
        return action.payload;
      })
      .switchMap((payload: { username: string, password: string}) => {
        return fromPromise(firebase.auth()
            .signInWithEmailAndPassword(payload.username, payload.password));
      })
      .switchMap(() => {
        return fromPromise(firebase.auth().currentUser.getIdToken());
      })
      .mergeMap((token: string) => {
        this.router.navigate(["/"]);
        return [
          { type: SIGN_IN },
          { type: SET_TOKEN, payload: token}
        ];
      });

  @Effect({ dispatch: false })
  authSignout = this.actions.ofType(SIGN_OUT)
      .do(() => {
        this.router.navigate(["/"]);
      });

  // "actions" property is an observable and represents all actions of the whole app
  // ngrx will be able to retrieve automatically actions we registered in our store
  constructor(private actions: Actions,
              private router: Router) {}
}
