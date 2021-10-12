import { SIGN_IN, LOGIN_ISLOGGED } from ".././log_ActionTypes";

///////////////////////////////ISLOGGED///////////////
const initialState = {
  loggedIn: false,
  ////For example const initialState = { person: null as Person };
};

type MyIsLoggedReducer = typeof initialState;

export const IsLoggedReducer = (
  state = initialState,
  action: any
): MyIsLoggedReducer => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};
///////////////////////////////ISLOGGED///////////////

///////////////////////////////ISLOGGED PROFILE///////////////
const initialStateProfile = {
  loggedInProfile: false,
  ////For example const initialState = { person: null as Person };
};

type MyIsLoggedProfileReducer = typeof initialStateProfile;

export const IsLoggedProfileReducer = (
  state = initialStateProfile,
  action: any
): MyIsLoggedProfileReducer => {
  switch (action.type) {
    case LOGIN_ISLOGGED:
      return { ...state, loggedInProfile: true };
    default:
      return state;
  }
};
///////////////////////////////ISLOGGED PROFILE///////////////
