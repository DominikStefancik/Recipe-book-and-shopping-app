import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { fromPromise } from "rxjs/observable/fromPromise";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import * as firebase from "firebase";

import { DO_SIGN_UP, DoSignUpAction, SignUpAction, SIGN_UP, SET_TOKEN } from "./auth.actions";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.reducers";

// NgRx Effects are similar to reducers, they react when a certain action is dispatched,
// BUT they DON'T change the state of the app
@Injectable()
export class AuthEffects {
  @Effect() // register property as an effect in ngrx world
  // whenever the action DO_SIGN_UP is dispatched an observable will be fired
  authSignup = this.actions.ofType(DO_SIGN_UP) // chooses only action of a given type
      .map((action: DoSignUpAction) => {
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
        return [
          { type: SIGN_UP }, // type of effect which will be dispatched

          // properties have to be "type" and "payload" so the observable can be handled by
          // NgRx effects
          { type: SET_TOKEN, payload: token }
        ];
      });
      // at the end of the Effect's chain you typically dispatch a new effect
      // if you don't want to dispatch any effect, you must specify it in @Effect({dispatch: false})

  // "actions" property is an observable and represents all actions of the whole app
  // ngrx will be able to retrieve automatically actions we registered in our store
  constructor(private actions: Actions,
              private store: Store<AppState>) {}
}
