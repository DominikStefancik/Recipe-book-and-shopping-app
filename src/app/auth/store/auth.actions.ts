import { Action } from "@ngrx/store";

export const DO_SIGN_UP = "DO_SIGN_UP";
export const SIGN_UP = "SIGN_UP";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SET_TOKEN = "SET_TOKEN";

export class DoSignUpAction implements Action {
  readonly type = DO_SIGN_UP;

  constructor(public payload: { username: string, password: string }) {}
}

export class SignUpAction implements Action {
  readonly type = SIGN_UP;
}

export class SignInAction implements Action {
  readonly type = SIGN_IN;
}

export class SignOutAction implements Action {
  readonly type = SIGN_OUT;
}

export class SetTokenAction implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) {}
}

export type AuthAction = SignInAction | SignUpAction | SignOutAction | SetTokenAction | DoSignUpAction;
