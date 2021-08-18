import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { ItextfIeldLogin } from "./log-Interfaces";
import { isTablet } from "react-device-detect";
import { DialogContent, Button, Paper, Grid } from "@material-ui/core";

function TextFieldLoginx({
  updateLoginvalues,
  rawLoginValues,
  ShowLoginPasswordForaWhile,
  loginShowPassword,
  size,
  passwordType,
  withHolder,
  focus,
  setFocus,
  darkmode,
}: ItextfIeldLogin): JSX.Element {
  var width = " ";
  var sizex: "small" | "medium" | undefined = undefined;

  var zIndex = 0;
  var zindexU = 0;
  var zindexBackPlateU = 0;
  var displayBackPlateU = "none";
  var zindexBackPlateP = 0;
  var displayBackPlateP = "none";

  switch (size) {
    case "small":
      sizex = "small";
      width = "100%";
      var transform = "scale(0.95)";
      zIndex = 0;
      var font1 = "";
      var font2 = "";
      var paddingbutU = "69px";

      break;
    case "smallTablet":
      sizex = "small";
      width = "62%";
      var transform = "scale(1)";
      zIndex = 0;
      var font1 = "2.6vh";
      var font2 = "2vh";
      var paddingbutU = "100px";
      break;
    default:
      sizex = "medium";
      width = withHolder;
      var transform = "scale(1)";
      zIndex = 1;
      var font1 = "2.7vh";
      var font2 = "1.9vh";
      var paddingbutU = "70px";
  }

  if (size == "small" || size === "smallTablet") {
    if (passwordType) {
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

  return (
    <>
      {passwordType ? (
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
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            size={sizex}
            inputProps={{ style: { fontSize: font1 } }}
            InputLabelProps={{ style: { fontSize: font2 } }}
            style={{
              transform: transform,
              width: width,
              paddingBottom: "40px",
              zIndex: zIndex,
            }}
            label="Password"
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
        </>
      ) : (
        <>
          <DialogContent
            className={
              darkmode
                ? "mobileTextfield-backplate dontallowhighlighting  modal-containerDark"
                : "mobileTextfield-backplate dontallowhighlighting  modal-containerLight"
            }
            style={{ zIndex: zindexBackPlateU, display: displayBackPlateU }}
          ></DialogContent>
          <TextField
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            size={sizex}
            inputProps={{ style: { fontSize: font1 } }}
            InputLabelProps={{ style: { fontSize: font2 } }}
            style={{
              transform: transform,
              width: width,
              paddingBottom: paddingbutU,
              zIndex: zindexU,
            }}
            label="Username"
            margin="normal"
            type="text"
            onChange={updateLoginvalues}
            name="inputedUsername"
            value={rawLoginValues.inputedUsername}
            variant="standard"
          />
        </>
      )}
    </>
  );
}

export const TextFieldLogin = React.memo(TextFieldLoginx);
