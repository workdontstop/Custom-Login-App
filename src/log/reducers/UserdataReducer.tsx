import {
  REQUEST_USERDATA,
  REQUEST_USERDATA_ONLOAD,
  REQUEST_USER_INFO_UPDATE,
  REQUEST_PROFILE_UPDATE,
  REQUEST_BILLBOARD_UPDATE,
} from "../actions/log_ActionTypes";

///
///
///
//////GLOBAL DARKMODE HEIGHT  DATA
const initialState = {
  id: 0,
  username: "",
  image: "",
  firstName: "",
  surName: "",
  color: "",
  quote: "",
  reg: 0,
  billboard1: "",
  billboard2: "",
  biography: " ",
  ////For example const initialState = { person: null as Person };
};
type MyUserdataReducer = typeof initialState;

//////GLOBAL USERDATA REDUCER
export const UserdataReducer = (
  state = initialState,
  action: any
): MyUserdataReducer => {
  switch (action.type) {
    case REQUEST_PROFILE_UPDATE:
      return {
        ...state,
        image: action.payload.image,
      };
    case REQUEST_BILLBOARD_UPDATE:
      return {
        ...state,
        billboard1: action.payload.billboard1,
      };
    case REQUEST_USER_INFO_UPDATE:
      return {
        ...state,
        username: action.payload.username,
        quote: action.payload.quote,
        biography: action.payload.describe,
      };
    case REQUEST_USERDATA:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        image: action.payload.userimage,
        firstName: action.payload.userfirstname,
        surName: action.payload.usersurname,
        color: action.payload.usercolor,
        quote: action.payload.userquote,
        reg: action.payload.userreg,
        billboard1: action.payload.userbillboard1,
        billboard2: action.payload.userbillboard2,
        biography: action.payload.biography,
      };
    case REQUEST_USERDATA_ONLOAD:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        image: action.payload.userimage,
        firstName: action.payload.userfirstname,
        surName: action.payload.usersurname,
        color: action.payload.usercolor,
        quote: action.payload.userquote,
        reg: action.payload.userreg,
        billboard1: action.payload.userbillboard1,
        billboard2: action.payload.userbillboard2,
        biography: action.payload.biography,
      };
    default:
      return state;
  }
};
