import React from "react";

import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { ItextfIeldSignup } from "./log-Interfaces";
import { DialogContent } from "@material-ui/core";
import { useSelector } from "react-redux";

function TextFieldSignupx({
  updateSignvalues,
  rawSignupValues,
  signupShowPassword,
  ShowSignupPasswordForaWhile,
  size,
  passwordType,
  emailType,
  withHolder,
  focus,
  setFocus,
  showFocusTextFieldByHidePadding,
  setShowFocusTextFieldByHidePadding,
  checkSignupPasswordACTIVATE,
  sourceType,
}: ItextfIeldSignup): JSX.Element {
  var width = " ";
  var sizex: "small" | "medium" | undefined = undefined;
  var zIndex = 0;
  var zindexBackPlateP = 0;
  var displayBackPlateP = "none";
  var zindexU = 0;
  var zindexBackPlateU = 0;
  var displayBackPlateU = "none";
  var zindexE = 0;
  var zindexBackPlateE = 0;
  var displayBackPlateE = "none";

  var transform = "";
  var paddingBottomE = "";
  var paddingBottomP = "";
  var paddingBottomU = "";
  var font1 = "";
  var font2 = "";

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  switch (size) {
    case "small":
      sizex = "small";
      width = "100%";
      transform = "scale(0.94)";
      paddingBottomE = "48px";
      paddingBottomP = "65px";
      paddingBottomU = "75px";
      zIndex = 1;
      font1 = "";
      font2 = "";
      break;
    case "smallTablet":
      sizex = "small";
      width = "62%";
      transform = "scale(1)";
      paddingBottomE = "82px";
      paddingBottomP = "65px";
      paddingBottomU = "78px";
      zIndex = 1;
      font1 = "2.6vh";
      font2 = "2vh";
      break;
    default:
      width = withHolder;
      transform = "scale(1)";
      paddingBottomE = "40px";
      paddingBottomP = "27px";
      paddingBottomU = "55px";
      zIndex = 1;
      font1 = "1.35vw";
      font2 = "1vw";
  }

  ///
  ///
  ///
  ///FOCUS TEXFIELD VARIABLES MOBILE/TAB
  if (size === "small" || size === "smallTablet") {
    if (emailType) {
      if (focus) {
        zindexE = 15;
        zindexBackPlateE = 12;
        displayBackPlateE = "block";
      } else {
        zindexE = 0;
        zindexBackPlateE = 0;
        displayBackPlateE = "none";
      }
    } else if (passwordType) {
      if (focus) {
        zIndex = 15;
        zindexBackPlateP = 12;
        displayBackPlateP = "block";
      } else {
        zIndex = 1;
        zindexBackPlateP = 0;
        displayBackPlateP = "none";
      }
    } else {
      if (focus) {
        zindexU = 15;
        zindexBackPlateU = 12;
        displayBackPlateU = "block";
      } else {
        zindexU = 0;
        zindexBackPlateU = 0;
        displayBackPlateU = "none";
      }
    }
  }

  ///
  ///
  ///
  /// GET DARKMODE FROM REDUX STORE
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
    };
  }
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));

  const darkmodeReducer = darkmode;

  ///
  ///
  ///
  ///TEXTFIELD BACK DROP ON FOCUS CLICK (MOBILE)
  const focusTextfield = (a: number) => {
    if (size === "small" || size === "smallTablet") {
      if (a === 1) {
        setFocus(true);
        setShowFocusTextFieldByHidePadding(true);
      } else {
        setFocus(false);
        setShowFocusTextFieldByHidePadding(false);
      }
    }
  };

  ///
  ///
  ///
  ///TEXTFIELD BACK DROP ON FOCUS VARIABLES
  var TextFieldOpacity = "1";

  if (checkSignupPasswordACTIVATE) {
    TextFieldOpacity = "0";
  } else {
    if (darkmodeReducer) {
      if (focus) {
        TextFieldOpacity = "1";
      } else {
        TextFieldOpacity = "0.8";
      }
    } else {
      TextFieldOpacity = "1";
    }
  }

  ///
  ///
  ///
  /// GET LOGGED USER DATA FROM REDUX STORE
  interface RootStateReducerImage {
    UserdataReducer: {
      id: number;
      username: string;
      quote: string;
      biography: string;
    };
  }
  const { id, username, quote, biography } = useSelector(
    (state: RootStateReducerImage) => ({
      ...state.UserdataReducer,
    })
  );
  const idReducer = id;
  const usernameReducer = username;
  const quoteReducer = quote;
  const biographyReducer = biography;

  var usernameReducerx = "";
  if (usernameReducer === " " || usernameReducer === null) {
    usernameReducerx = "username";
  } else {
    usernameReducerx = usernameReducer;
  }

  var quoteReducerx = "";
  if (quoteReducer === " " || quoteReducer === null) {
    quoteReducerx = "quote";
  } else {
    quoteReducerx = quoteReducer;
  }

  var biographyReducerx = "";
  if (biographyReducer === " " || biographyReducer === null) {
    biographyReducerx = "describe yourself";
  } else {
    biographyReducerx = biographyReducer;
  }
  return (
    <>
      {sourceType === "LOG" ? (
        <>
          {emailType ? (
            <>
              {" "}
              <DialogContent
                className={
                  darkmodeReducer
                    ? "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorDark"
                    : "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorLight "
                }
                style={{
                  zIndex: zindexBackPlateE,
                  display: displayBackPlateE,
                }}
              ></DialogContent>
              <TextField
                onFocus={() => focusTextfield(1)}
                onBlur={() => focusTextfield(0)}
                size={sizex}
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  transform: transform,
                  width: width,
                  paddingBottom: showFocusTextFieldByHidePadding
                    ? "0px"
                    : paddingBottomE,
                  zIndex: zindexE,
                  opacity: TextFieldOpacity,
                }}
                label="Email"
                type="email"
                onChange={updateSignvalues}
                name="inputedEmail"
                value={rawSignupValues.inputedEmail}
                variant="standard"
              />
            </>
          ) : passwordType ? (
            <>
              {" "}
              <DialogContent
                className={
                  darkmodeReducer
                    ? "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorDark"
                    : "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorLight"
                }
                style={{
                  zIndex: zindexBackPlateP,
                  display: displayBackPlateP,
                }}
              ></DialogContent>
              <TextField
                onFocus={() => focusTextfield(1)}
                onBlur={() => focusTextfield(0)}
                size={sizex}
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  transform: transform,
                  width: width,
                  paddingBottom: showFocusTextFieldByHidePadding
                    ? "0px"
                    : paddingBottomP,
                  zIndex: zIndex,
                  opacity: TextFieldOpacity,
                }}
                label="Password"
                type={signupShowPassword ? "text" : "password"}
                onChange={updateSignvalues}
                name="inputedPassword"
                value={rawSignupValues.inputedPassword}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onMouseDown={ShowSignupPasswordForaWhile}
                        aria-label="toggle password visibility"
                      >
                        {signupShowPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          ) : (
            <>
              {" "}
              <DialogContent
                className={
                  darkmodeReducer
                    ? "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorDark"
                    : "mobileTextfield-backplate dontallowhighlighting   mobileTextfield-backplateColorLight"
                }
                style={{
                  zIndex: zindexBackPlateU,
                  display: displayBackPlateU,
                }}
              ></DialogContent>
              <TextField
                onFocus={() => focusTextfield(1)}
                onBlur={() => focusTextfield(0)}
                size={sizex}
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  transform: transform,
                  width: width,
                  paddingBottom: showFocusTextFieldByHidePadding
                    ? "0px"
                    : paddingBottomU,
                  zIndex: zindexU,
                  opacity: TextFieldOpacity,
                }}
                label="Username"
                type="text"
                onChange={updateSignvalues}
                name="inputedUsername"
                value={rawSignupValues.inputedUsername}
                variant="standard"
              />
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          {emailType ? (
            <>
              {" "}
              <DialogContent
                className={
                  darkmodeReducer
                    ? "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorDark"
                    : "mobileTextfield-backplate dontallowhighlighting   mobileTextfield-backplateColorLight"
                }
                style={{
                  zIndex: zindexBackPlateU,
                  display: displayBackPlateU,
                }}
              ></DialogContent>
              <TextField
                onFocus={() => focusTextfield(1)}
                onBlur={() => focusTextfield(0)}
                size={sizex}
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  transform: transform,
                  width: width,
                  paddingBottom: showFocusTextFieldByHidePadding
                    ? "0px"
                    : "0px",
                  zIndex: zindexU,
                  opacity: TextFieldOpacity,
                }}
                label={quoteReducerx}
                type="text"
                onChange={updateSignvalues}
                name="inputedQuote"
                value={rawSignupValues.inputedQuote}
                variant="standard"
              />
              <TextField
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  opacity: 0,
                }}
              />
            </>
          ) : passwordType ? (
            <>
              {" "}
              <DialogContent
                className={
                  darkmodeReducer
                    ? "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorDark"
                    : "mobileTextfield-backplate dontallowhighlighting   mobileTextfield-backplateColorLight"
                }
                style={{
                  zIndex: zindexBackPlateU,
                  display: displayBackPlateU,
                }}
              ></DialogContent>
              <TextField
                onFocus={() => focusTextfield(1)}
                onBlur={() => focusTextfield(0)}
                size={sizex}
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  transform: transform,
                  width: width,
                  paddingBottom: showFocusTextFieldByHidePadding
                    ? "0px"
                    : "0px",
                  zIndex: zindexU,
                  opacity: TextFieldOpacity,
                }}
                label={biographyReducerx}
                type="text"
                onChange={updateSignvalues}
                name="inputedDescription"
                value={rawSignupValues.inputedDescription}
                variant="standard"
              />
              <TextField
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  opacity: 0,
                }}
              />
            </>
          ) : (
            <>
              {" "}
              <DialogContent
                className={
                  darkmodeReducer
                    ? "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorDark"
                    : "mobileTextfield-backplate dontallowhighlighting   mobileTextfield-backplateColorLight"
                }
                style={{
                  zIndex: zindexBackPlateU,
                  display: displayBackPlateU,
                }}
              ></DialogContent>
              <TextField
                onFocus={() => focusTextfield(1)}
                onBlur={() => focusTextfield(0)}
                size={sizex}
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  transform: transform,
                  width: width,
                  paddingBottom: showFocusTextFieldByHidePadding
                    ? "0px"
                    : "0px",
                  zIndex: zindexU,
                  opacity: TextFieldOpacity,
                }}
                label={usernameReducerx}
                type="text"
                onChange={updateSignvalues}
                name="inputedUsername"
                value={rawSignupValues.inputedUsername}
                variant="standard"
              />
              <TextField
                inputProps={{ style: { fontSize: font1 } }}
                InputLabelProps={{ style: { fontSize: font2 } }}
                style={{
                  opacity: 0,
                }}
              />
            </>
          )}{" "}
        </>
      )}
    </>
  );
}

export const TextFieldSignup = React.memo(TextFieldSignupx);
