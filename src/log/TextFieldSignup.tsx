import React, { useState, useEffect } from "react";

import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { ItextfIeldSignup } from "./log-Interfaces";
import { DialogContent, Button, Paper, Grid } from "@material-ui/core";
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
  darkmode,
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

  switch (size) {
    case "small":
      sizex = "small";
      width = "100%";
      var transform = "scale(0.95)";
      var paddingBottomE = "48px";
      var paddingBottomP = "65px";
      var paddingBottomU = "67px";
      zIndex = 1;
      var font1 = "";
      var font2 = "";
      break;
    case "smallTablet":
      sizex = "small";
      width = "62%";
      var transform = "scale(1)";
      var paddingBottomE = "70px";
      var paddingBottomP = "65px";
      var paddingBottomU = "70px";
      zIndex = 1;
      var font1 = "2.6vh";
      var font2 = "2vh";
      break;
    default:
      var width = withHolder;
      var transform = "scale(1)";
      var paddingBottomE = "34px";
      var paddingBottomP = "30px";
      var paddingBottomU = "50px";
      zIndex = 1;
      var font1 = "2.7vh";
      var font2 = "1.9vh";
  }

  if (size == "small" || size === "smallTablet") {
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

  const focusTextfield = (a: number) => {
    if (size == "small" || size === "smallTablet") {
      if (a === 1) {
        setFocus(true);
        setShowFocusTextFieldByHidePadding(true);
      } else {
        setFocus(false);
        setShowFocusTextFieldByHidePadding(false);
      }
    }
  };
  return (
    <>
      {emailType ? (
        <>
          {" "}
          <DialogContent
            className={
              darkmode
                ? "mobileTextfield-backplate dontallowhighlighting  modal-containerDark"
                : "mobileTextfield-backplate dontallowhighlighting  modal-containerLight"
            }
            style={{ zIndex: zindexBackPlateE, display: displayBackPlateE }}
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
              darkmode
                ? "mobileTextfield-backplate dontallowhighlighting  modal-containerDark"
                : "mobileTextfield-backplate dontallowhighlighting  modal-containerLight"
            }
            style={{ zIndex: zindexBackPlateP, display: displayBackPlateP }}
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
              darkmode
                ? "mobileTextfield-backplate dontallowhighlighting  modal-containerDark"
                : "mobileTextfield-backplate dontallowhighlighting  modal-containerLight"
            }
            style={{ zIndex: zindexBackPlateU, display: displayBackPlateU }}
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
  );
}

export const TextFieldSignup = React.memo(TextFieldSignupx);
