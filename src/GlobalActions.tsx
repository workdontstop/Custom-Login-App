import {
  UPDATE_SCREEN_HEIGHT,
  UPDATE_DARKMODE,
  UPDATE_DARKMODETOGGLE,
  UPDATE_REMEMBERMETOGGLE,
  UPDATE_GLOBAL_COLOR,
  HIDE_GLOBAL_LOADER,
  ACTIVATE_GLOBAL_LOADER,
  CHANGE_OPTIONS_TOP,
  CHANGE_NAV_FILTER,
  CHANGE_NAV_CROP,
} from "./global_ActionTypes";

export function DarkmodeAction(newDarkModeData: boolean) {
  return {
    type: UPDATE_DARKMODE,
    payload: newDarkModeData,
  };
}

export function DarkmodeToggleAction() {
  return {
    type: UPDATE_DARKMODETOGGLE,
  };
}

export function screenHeightAction(sreenHeightData: number) {
  return {
    type: UPDATE_SCREEN_HEIGHT,
    payload: sreenHeightData,
  };
}

export function rememberMeAction(Payload: boolean) {
  return {
    type: UPDATE_REMEMBERMETOGGLE,
    payload: Payload,
  };
}

export function UpdateColorAction(colorPayload: any) {
  return {
    type: UPDATE_GLOBAL_COLOR,
    payload: colorPayload,
  };
}

export function ActivateLoaderAction() {
  return {
    type: ACTIVATE_GLOBAL_LOADER,
  };
}

export function HideLoaderAction() {
  return {
    type: HIDE_GLOBAL_LOADER,
  };
}

export function UpdateOptionsTop(Payload: boolean) {
  return {
    type: CHANGE_OPTIONS_TOP,
    payload: Payload,
  };
}

export function UpdateNavFilterReducer(Payload: boolean) {
  return {
    type: CHANGE_NAV_FILTER,
    payload: Payload,
  };
}

export function UpdateNavCropReducer(Payload: boolean) {
  return {
    type: CHANGE_NAV_CROP,
    payload: Payload,
  };
}
