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

export interface ILogButtons {
  loginstyle: CSS.Properties;
  signupstyle: CSS.Properties;
  match: boolean;
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
}

export interface ImodalFormLoginError {
  device: string;
  darkmode: boolean;
  WidthHolder: string;
  type: boolean;
  ErrorDisplay: number;
}

export interface IOption {
  darkmode: boolean;
  setDarkmode: (darkmodex: boolean) => void;
  marginData: CSS.Properties;
  fontData: CSS.Properties;
  superFont: string;
  switchsize: "medium" | "small" | undefined;
  optionsContainer: string;
}

export interface IOptionInnerModal {
  closemodal: (backbutton: number) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  darkmode: boolean;
  setDarkmode: (darkmodex: boolean) => void;
  marginData: CSS.Properties;
  fontData: CSS.Properties;
  switchsize: "medium" | "small" | undefined;
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
  zoomedModal: boolean;
  setZoomedModal: (zoomedModal: boolean) => void;
  mobileZoom: boolean;
  setMobileZoom: (mobileZoom: boolean) => void;
}

export interface ItextfIeldLogin {
  updateLoginvalues: (e: any) => void;
  rawLoginValues: {
    inputedUsername: string;
    inputedPassword: string;
  };
  ShowLoginPasswordForaWhile: any;
  loginShowPassword: boolean;
  size: "small" | "medium" | undefined;
  passwordType: boolean;
  withHolder: string;
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
  size: "small" | "medium" | undefined;
  passwordType: boolean;
  emailType: boolean;
  withHolder: string;
}
