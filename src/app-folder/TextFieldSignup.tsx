import React, { useRef, useEffect, useState, useCallback } from "react";
import ModalFormLoginError from "./ModalFormLoginError";
import {
  IconButton,
  InputAdornment,
  Grid,
  DialogContent,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { ItextfIeldSignup } from "./appFolder-Interfaces";

function TextFieldSignupx({
  updateSignvalues,
  rawSignupValues,
  signupShowPassword,
  ShowSignupPasswordForaWhile,
  size,
  passwordType,
  emailType,
  withHolder,
}: ItextfIeldSignup): JSX.Element {
  switch (size) {
    case "small":
      var width = "99%";
      var transform = "scale(0.93)";
      var paddingBottomE = "45px";
      var paddingBottomP = "65px";
      var paddingBottomU = "65px";
      var zIndex = 1;
      var font1 = "";
      var font2 = "";
      break;
    default:
      var width = withHolder;
      var transform = "scale(1)";
      var paddingBottomE = "34px";
      var paddingBottomP = "30px";
      var paddingBottomU = "50px";
      var zIndex = 1;
      var font1 = "2.7vh";
      var font2 = "1.9vh";
  }
  return (
    <>
      {emailType ? (
        <TextField
          size={size}
          inputProps={{ style: { fontSize: font1 } }}
          InputLabelProps={{ style: { fontSize: font2 } }}
          style={{
            transform: transform,
            width: width,
            paddingBottom: paddingBottomE,
          }}
          label="email"
          type="email"
          onChange={updateSignvalues}
          name="inputedEmail"
          value={rawSignupValues.inputedEmail}
          variant="standard"
        />
      ) : passwordType ? (
        <TextField
          size={size}
          inputProps={{ style: { fontSize: font1 } }}
          InputLabelProps={{ style: { fontSize: font2 } }}
          style={{
            transform: transform,
            width: width,
            paddingBottom: paddingBottomP,
            zIndex: zIndex,
          }}
          label="password"
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
      ) : (
        <TextField
          size={size}
          inputProps={{ style: { fontSize: font1 } }}
          InputLabelProps={{ style: { fontSize: font2 } }}
          style={{
            transform: transform,
            width: width,
            paddingBottom: paddingBottomU,
          }}
          label="username"
          type="text"
          onChange={updateSignvalues}
          name="inputedUsername"
          value={rawSignupValues.inputedUsername}
          variant="standard"
        />
      )}
    </>
  );
}

export const TextFieldSignup = React.memo(TextFieldSignupx);
