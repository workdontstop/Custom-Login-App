import { isLog } from "./../log_actionTypes";

interface initialType {
  loggedIn: boolean;
}

const initialState: initialType = {
  loggedIn: false,
};

const IsLoggedReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case isLog:
      return { ...state, loggedIn: true };
    default:
      return state;
  }
};

export default IsLoggedReducer;
