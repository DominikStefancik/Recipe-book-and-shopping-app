import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Store } from "@ngrx/store";

import { AuthService } from "../../auth/auth.service";
import { AppState } from "../../store/app.reducers";
import { AuthState } from "../../auth/store/auth.reducers";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/take";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select("auth")
    .take(1)
    .switchMap((authState: AuthState) => {
      const requestCopy = request.clone({ params: request.params.set("auth", authState.authToken) });
      return next.handle(requestCopy);
      });
  }
}
