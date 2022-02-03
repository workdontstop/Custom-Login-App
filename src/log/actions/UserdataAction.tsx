import {
  REQUEST_USERDATA,
  REQUEST_USERDATA_ONLOAD,
  REQUEST_USER_INFO_UPDATE,
} from "../log_ActionTypes";

export function UserdataAction(ServerPayload: any) {
  return {
    type: REQUEST_USERDATA,
    payload: ServerPayload,
  };
}

export function UserdataActionOnLoad(ServerPayload: any) {
  return {
    type: REQUEST_USERDATA_ONLOAD,
    payload: ServerPayload,
  };
}

export function UserInfoUpdateAction(data: any) {
  return {
    type: REQUEST_USER_INFO_UPDATE,
    payload: data,
  };
}
