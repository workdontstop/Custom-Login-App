import { SIGN_IN, LOGIN_ISLOGGED } from ".././log_ActionTypes";

export function IsLoggedAction() {
  return {
    type: SIGN_IN,
  };
}

export function IsLoggedProfileAction() {
  return {
    type: LOGIN_ISLOGGED,
  };
}
