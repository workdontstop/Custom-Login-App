import React from "react";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { ItextfIeldLogin } from "./log-Interfaces";
import { DialogContent } from "@material-ui/core";
import { useSelector } from "react-redux";

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
}: ItextfIeldLogin): JSX.Element {
  var width = " ";
  var sizex: "small" | "medium" | undefined = undefined;

  var zIndex = 0;
  var zindexU = 0;
  var zindexBackPlateU = 0;
  var displayBackPlateU = "none";
  var zindexBackPlateP = 0;
  var displayBackPlateP = "none";

  var transform = "";
  var font1 = "";
  var font2 = "";
  var paddingbutU = "";

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  switch (size) {
    case "small":
      sizex = "small";
      width = "100%";
      transform = "scale(0.94)";
      zIndex = 0;
      font1 = "";
      font2 = "";
      paddingbutU = "80px";

      break;
    case "smallTablet":
      sizex = "small";
      width = "62%";
      transform = "scale(1)";
      zIndex = 0;
      font1 = "2.6vh";
      font2 = "2vh";
      paddingbutU = "100px";
      break;
    default:
      sizex = "medium";
      width = withHolder;
      transform = "scale(1)";
      zIndex = 1;
      font1 = "2.7vh";
      font2 = "1.9vh";
      paddingbutU = "70px";
  }

  ///
  ///
  ///
  ///FOCUS TEXFIELD VARIABLES MOBILE/TAB
  if (size === "small" || size === "smallTablet") {
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
  ///TEXTFIELD BACK DROP ON FOCUS CLICK(MOBILE)
  const focusTextfield = (a: number) => {
    if (size === "small" || size === "smallTablet") {
      if (a === 1) {
        setFocus(true);
      } else {
        setFocus(false);
      }
    }
  };

  ///
  ///
  ///
  ///TEXTFIELD BACK DROP ON FOCUS VARIABLES
  var TextFieldOpacity = "1";
  if (darkmodeReducer) {
    if (focus) {
      TextFieldOpacity = "1";
    } else {
      TextFieldOpacity = "0.75";
    }
  } else {
    TextFieldOpacity = "1";
  }

  return (
    <>
      {passwordType ? (
        <>
          {" "}
          <DialogContent
            className={
              darkmodeReducer
                ? "mobileTextfield-backplate dontallowhighlighting mobileTextfield-backplateColorDark"
                : "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorLight"
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
              paddingBottom: "40px",
              zIndex: zIndex,
              opacity: TextFieldOpacity,
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
              darkmodeReducer
                ? "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorDark"
                : "mobileTextfield-backplate dontallowhighlighting  mobileTextfield-backplateColorLight"
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
              paddingBottom: paddingbutU,
              zIndex: zindexU,
              opacity: TextFieldOpacity,
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
