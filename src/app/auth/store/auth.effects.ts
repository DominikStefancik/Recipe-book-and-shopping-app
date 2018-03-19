import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";

import { DO_SIGN_UP } from "./auth.actions";

@Injectable()
export class AuthEffects {
  @Effect() // register property as an effect in ngrx world
  // whenever the action DO_SIGN_UP is dispatched an observable will be fired
  authSignup = this.actions.ofType(DO_SIGN_UP); // chooses only action of a given type

  // "actions" property is an observable and represents all actions of the whole app
  // ngrx will be able to retrieve automatically actions we registered in our store
  constructor(private actions: Actions) {}
}
