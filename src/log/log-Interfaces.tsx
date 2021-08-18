import * as CSS from "csstype";

export type IGrid =
  | "auto"
  | true
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export interface IFormHolder {
  darkmode: boolean;
  zoomedModal: boolean;
  WidthHolder: string;
  loginstyle: CSS.Properties;
  signupstyle: CSS.Properties;
  loginForm: boolean;
  serverEmojiplain: boolean;
  setserverEmojiplain: (serverEmojiplain: boolean) => void;
  serverErrorData: string | null;
  setServerErrorData: (serverErrorData: string | null) => void;
  serverErrorDisplay: number;
  setServerErrorDisplay: (serverErrorDisplay: number) => void;
}

export interface ILogButtons {
  loginstyle: CSS.Properties;
  signupstyle: CSS.Properties;
  OpenModalForm: (formtypedata: number) => void;
}

export interface ImodalFormSignupError {
  ErrorType: number;
  textField: string;
  errorFormChecking: boolean;
  type: boolean;
  cantPassBadEmail: boolean;
  ErrorDisplay: number;
  ErrorData: string | null;
  darkmode: boolean;
  WidthHolder: string;
  device: string;
  focus: boolean;
}

export interface ImodalFormLoginError {
  device: string;
  darkmode: boolean;
  WidthHolder: string;
  type: boolean;
  ErrorDisplay: number;
  focus: boolean;
}

export interface IOption {
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
}

export interface IOptionInnerModal {
  closemodal: (backbutton: number) => void;
  showModal: boolean;
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
}

export interface IServerError {
  device: string;
  setServerErrorData: (serverErrorData: string | null) => void;
  serverErrorDisplay: number;
  serverErrorData: string | null;
  darkmode: boolean;
  serverEmojiplain: boolean;
}

export interface ImodalLog {
  formtype: number;
  screenHeight: number;
  signupstyle: CSS.Properties;
  loginstyle: CSS.Properties;
  CloseModalForm: (DeviceBackButtonClicked: number) => void;
  showModalForm: boolean;
  PaperStyle: string;
  darkmode: boolean;
}

export interface Ispinnerinterface {
  inputedUsername: boolean;
  inputedPassword: boolean;
  inputedEmail: boolean;
}

export interface ItextfIeldLogin {
  updateLoginvalues: (e: any) => void;
  rawLoginValues: {
    inputedUsername: string;
    inputedPassword: string;
  };
  ShowLoginPasswordForaWhile: any;
  loginShowPassword: boolean;
  size: any;
  passwordType: boolean;
  withHolder: string;
  focus: boolean;
  setFocus: (focus: boolean) => void;
  darkmode: boolean;
}

export interface ItextfIeldSignup {
  updateSignvalues: (e: any) => void;
  rawSignupValues: {
    inputedUsername: string;
    inputedPassword: string;
    inputedEmail: string;
  };
  ShowSignupPasswordForaWhile: any;
  signupShowPassword: boolean;
  size: any;
  passwordType: boolean;
  emailType: boolean;
  withHolder: string;
  focus: boolean;
  setFocus: (focus: boolean) => void;
  showFocusTextFieldByHidePadding: boolean;
  setShowFocusTextFieldByHidePadding: (
    showFocusTextFieldByHidePadding: boolean
  ) => void;
  darkmode: boolean;
}
