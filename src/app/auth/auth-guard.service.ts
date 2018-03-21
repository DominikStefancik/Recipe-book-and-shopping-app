import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { AppState } from "../store/app.reducers";
import { AuthState } from "./store/auth.reducers";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select("auth")
      .take(1)
      .map((authState: AuthState) => {
        const isLoggedin = authState.isUserAuthenticated;
        if (!isLoggedin) {
          this.router.navigate(["/signin"]);
        }

        return isLoggedin;
      });
  }


}
