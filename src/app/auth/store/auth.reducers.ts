import * as AuthActions from "./auth.actions";

export interface AuthState {
  isUserAuthenticated: boolean;
  authToken: string;
}

const initialState: AuthState = {
  isUserAuthenticated: false,
  authToken: null
};

// auth operations are asynchronous, but reducers CANNOT handle asynchronous operations!
// reducers take a state as an input and returns a new state. This has to happen synchronously!!!
export function authReducer(state = initialState, action: AuthActions.AuthAction) {
  switch (action.type) {
    case (AuthActions.SIGN_UP):
    case (AuthActions.SIGN_IN):
    case (AuthActions.SIGN_OUT):
    case (AuthActions.SET_TOKEN):
    default:
      return state;
  }
}
