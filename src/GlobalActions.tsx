import {
  UPDATE_SCREEN_HEIGHT,
  UPDATE_DARKMODE,
  UPDATE_DARKMODETOGGLE,
  UPDATE_REMEMBERMETOGGLE,
  UPDATE_GLOBAL_COLOR,
  HIDE_GLOBAL_LOADER,
  ACTIVATE_GLOBAL_LOADER,
  UPDATE_ScrollType,
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

export function ScrollerAction(Payload: string) {
  return {
    type: UPDATE_ScrollType,
    payload: Payload,
  };
}
