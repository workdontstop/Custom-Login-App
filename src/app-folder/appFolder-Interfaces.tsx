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

export interface ILogin {
  loginclass: string;
  signupclass: string;
  match: boolean;
  OpenModalForm: (formtypedata: number) => void;
}

export interface ImodalLogFormError {
  type: boolean;
  cantPassBadEmail: boolean;
  ErrorDisplay: number;
  ErrorData: string | null;
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

export interface ImodalLog {
  signupclass: string;
  loginclass: string;
  formtype: number;
  CloseModalForm: (DeviceBackButtonClicked: number) => void;
  showModalForm: boolean;
  setShowModalForm: (showModalForm: boolean) => void;
  PaperStyle: string;
}
