import { Action } from "@ngrx/store";

export const DO_SIGNUP = "DO_SIGNUP";
export const SIGN_UP = "SIGN_UP";
export const DO_SIGNIN = "DO_SIGNIN";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const SET_TOKEN = "SET_TOKEN";

// this class represents the actions of trying to sign up
// and before the signup is successful
export class DoSignupAction implements Action {
  readonly type = DO_SIGNUP;

  constructor(public payload: { username: string, password: string }) {}
}

// this class represents the actions of trying to sign in
// and before the signin is successful
export class DoSigninAction implements Action {
  readonly type = DO_SIGNIN;

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

export type AuthAction = SignInAction | SignUpAction | SignOutAction | SetTokenAction | DoSignupAction
  | DoSigninAction;
