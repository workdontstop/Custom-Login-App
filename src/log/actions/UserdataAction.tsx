import { REQUEST_USERDATA, REQUEST_USERDATA_ONLOAD } from "../log_ActionTypes";

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
