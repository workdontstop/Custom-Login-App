import React, { useState, useCallback, useRef, useEffect } from "react";

import { TextField, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { matchPc, matchTablet } from "../DetectDevice";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IPasswordCheck } from "./log-Interfaces";

function PasswordCheckx({
  widthHolder,
  checkSignupPasswordACTIVATE,
  signmeup,
  responseErrorConfirmPassword,
}: IPasswordCheck): JSX.Element {
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

  const [showSpinner, setshowSpinner] = useState<boolean>(false);
  const confirmPaswordTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [checkSignupPassword, setcheckSignupPassword] = useState<string>("");

  ///
  ///
  ///
  ///CLEAR REPEAT PASSWORD ON  UI SHOW(checkSignupPasswordACTIVAT)
  useEffect(() => {
    setcheckSignupPassword("");
  }, [checkSignupPasswordACTIVATE]);

  /////
  var sizex: "small" | "medium" | undefined = undefined;
  var font1 = " ";
  var font2 = " ";
  var transform = "";
  var widthcheckPassword = "";

  var displayy = "";

  ///////

  if (matchPc) {
    sizex = "medium";
    font1 = "2.7vh";
    font2 = "1.9vh";
    transform = "scale(1)";
    widthcheckPassword = widthHolder;

    displayy = "none";
  } else if (matchTablet) {
    sizex = "small";
    font1 = "2.6vh";
    font2 = "2vh";
    transform = "scale(1)";
    widthcheckPassword = "62%";

    displayy = "block";
  } else {
    sizex = "small";
    font1 = "";
    font2 = "";
    transform = "scale(0.94)";
    widthcheckPassword = "100%";

    displayy = "block";
  }

  ///
  ///
  ///
  /// UPDATE CONFIRM PASSWORD VALUE/ SHOW SPINNER REPEAT PASSWORD
  const updatecheckSignupPasswordvalues = useCallback(
    (e: any) => {
      const { value } = e.target;
      if (confirmPaswordTimer.current) {
        clearTimeout(confirmPaswordTimer.current);
      }
      setcheckSignupPassword(value);

      if (showSpinner) {
      } else {
        setshowSpinner(true);
      }

      confirmPaswordTimer.current = setTimeout(() => {
        setshowSpinner(false);
        signmeup(value);
      }, 2500);
    },

    [signmeup, showSpinner]
  );

  var spinColor = "";
  var topp = "";
  var toptext = "";
  var spinsize: number = 40;
  var left = "";
  darkmodeReducer ? (spinColor = "#333333") : (spinColor = "#aaaaaa");
  if (matchPc) {
    topp = "11em";
    toptext = "-17vh";
    spinsize = 30;
    left = "44.5%";
  } else if (matchTablet) {
    topp = "35em";
    toptext = "-22vh";
    spinsize = 45;
    left = "47%";
  } else {
    topp = "10em";
    toptext = "-31vh";
    spinsize = 35;
    left = "44%";
  }

  ///
  ///
  ///
  ///MATERIAL UI SPINNER STYLES (INSPIRED BY FACEBOOK SPINNERS)
  const useStylesmodalformsignup = makeStyles((theme) => ({
    root: {
      position: "relative",
      textAlign: "center",
      left: 0,
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 300 : 700],
    },
    top: {
      color: responseErrorConfirmPassword ? "red" : spinColor,
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
  }));

  const classes = useStylesmodalformsignup();

  return (
    <>
      {checkSignupPasswordACTIVATE ? (
        <>
          <DialogContent
            className={
              darkmodeReducer
                ? " dontallowhighlighting  mobileTextfield-backplateColorDark"
                : " dontallowhighlighting  mobileTextfield-backplateColorLight"
            }
            style={{
              zIndex: 12,
              display: displayy,
              bottom: "0em",
              height: "95.5vh",
              overflow: "hidden",
              width: "100%",
              position: "fixed",
              marginTop: "-3px",
            }}
          ></DialogContent>
          <Grid
            item
            xs={12}
            style={{
              position: "fixed",
              top: topp,
              left: left,
              zIndex: 14,
            }}
          >
            <div
              className={classes.root}
              style={{
                opacity: showSpinner ? "0.2" : "0",
              }}
            >
              <CircularProgress
                variant="determinate"
                className={classes.bottom}
                size={spinsize}
                thickness={4}
                value={100}
              />
              <CircularProgress
                variant="indeterminate"
                disableShrink
                className={classes.top}
                classes={{
                  circle: classes.circle,
                }}
                size={spinsize}
                thickness={4}
              />
            </div>{" "}
          </Grid>
          <TextField
            size={sizex}
            inputProps={{ style: { fontSize: font1 } }}
            InputLabelProps={{
              style: {
                fontSize: font2,
                color: responseErrorConfirmPassword ? "red" : "",
              },
            }}
            style={{
              transform: transform,
              width: widthcheckPassword,
              position: "relative",
              top: toptext,
              zIndex: 14,
            }}
            label={
              responseErrorConfirmPassword
                ? "Passwords Must Be Same"
                : "Repeat Password"
            }
            type="password"
            onChange={updatecheckSignupPasswordvalues}
            name="inputedUsername"
            value={checkSignupPassword}
            variant="standard"
          />
        </>
      ) : null}
    </>
  );
}

export const PasswordCheck = React.memo(PasswordCheckx);
