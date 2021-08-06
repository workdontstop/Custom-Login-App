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
import { ItextfIeldLogin } from "./appFolder-Interfaces";

function TextFieldLoginx({
  updateLoginvalues,
  rawLoginValues,
  ShowLoginPasswordForaWhile,
  loginShowPassword,
  size,
  passwordType,
  withHolder,
}: ItextfIeldLogin): JSX.Element {
  switch (size) {
    case "small":
      var width = "99%";
      var transform = "scale(0.93)";
      var zIndex = 0;
      var font1 = "";
      var font2 = "";
      break;
    default:
      var width = withHolder;
      var transform = "scale(1)";
      var zIndex = 1;
      var font1 = "2.7vh";
      var font2 = "1.9vh";
  }
  return (
    <>
      {passwordType ? (
        <TextField
          size={size}
          inputProps={{ style: { fontSize: font1 } }}
          InputLabelProps={{ style: { fontSize: font2 } }}
          style={{
            transform: transform,
            width: width,
            paddingBottom: "40px",
            zIndex: zIndex,
          }}
          label="password"
          onChange={updateLoginvalues}
          type={loginShowPassword ? "text" : "password"}
          name="inputedPassword"
          value={rawLoginValues.inputedPassword}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onMouseDown={ShowLoginPasswordForaWhile}
                  aria-label="toggle password visibility"
                >
                  {loginShowPassword ? (
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
            paddingBottom: "70px",
          }}
          label="username"
          margin="normal"
          type="text"
          onChange={updateLoginvalues}
          name="inputedUsername"
          value={rawLoginValues.inputedUsername}
          variant="standard"
        />
      )}
    </>
  );
}

export const TextFieldLogin = React.memo(TextFieldLoginx);
