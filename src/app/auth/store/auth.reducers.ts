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
      return {
        ...state,
        isUserAuthenticated: true
      };
    case (AuthActions.SIGN_OUT):
      return {
        ...state,
        isUserAuthenticated: false,
        authToken: null
      };
      case (AuthActions.SET_TOKEN):
        return {
          ...state,
          authToken: action.payload
        };
    default:
      return state;
  }
}
