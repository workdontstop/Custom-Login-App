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
  zoomedModal: boolean;
  WidthHolder: string;
  loginForm: boolean;
  setserverEmojiplain: (serverEmojiplain: boolean) => void;
  setServerErrorData: (serverErrorData: string | null) => void;
  setServerErrorDisplay: (serverErrorDisplay: number) => void;
  checkSignupPasswordACTIVATE: boolean;
  setcheckSignupPasswordACTIVATE: (
    checkSignupPasswordACTIVATE: boolean
  ) => void;
}

export interface ILogButtons {
  OpenModalForm: (formtypedata: number) => void;
}

export interface ImodalFormSignupError {
  ErrorType: number;
  textField: string;
  errorFormChecking: boolean;
  type: boolean;
  ErrorDisplay: number;
  ErrorData: string | null;
  WidthHolder: string;
  device: string;
  focus: boolean;
  bop: boolean;
  checkSignupPasswordACTIVATE: boolean;
}

export interface ImodalFormLoginError {
  device: string;
  WidthHolder: string;
  type: boolean;
  ErrorDisplay: number;
  focus: boolean;
}

export interface IOptionInnerModal {
  closemodal: (backbutton: number) => void;
  showModal: boolean;
}

export interface IServerError {
  device: string;
  setServerErrorData: (serverErrorData: string | null) => void;
  serverErrorDisplay: number;
  serverErrorData: string | null;
  serverEmojiplain: boolean;
}

export interface ICommentTemplate {
  formtype: number;
  CloseModalForm: (DeviceBackButtonClicked: number) => void;
  showModalForm: boolean;
  aboutTemp: boolean;
  commentTemp: boolean;
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
}

export interface ItextfIeldSignup {
  sourceType: string;
  updateSignvalues: (e: any) => void;
  rawSignupValues: any;
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
  checkSignupPasswordACTIVATE: boolean;
}

export interface IPasswordCheck {
  widthHolder: string;
  responseErrorConfirmPassword: boolean;
  checkSignupPasswordACTIVATE: boolean;

  signmeup: (checkSignupPasswordinputed: any) => void;
}
