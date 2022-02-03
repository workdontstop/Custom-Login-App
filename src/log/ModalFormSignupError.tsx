import React from "react";
import { animated, useSpring } from "react-spring";
import { Grid } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { ImodalFormSignupError } from "./log-Interfaces";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector } from "react-redux";

function ModalFormSignupErrorx({
  ErrorType,
  textField,
  errorFormChecking,
  type,
  ErrorDisplay,
  ErrorData,
  WidthHolder,
  device,
  focus,
  bop,
  checkSignupPasswordACTIVATE,
}: ImodalFormSignupError) {
  const cantPassBadEmail: boolean = false;
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

  var ErrorColor = "";
  var ErrorTextColor = "";
  var ErrorIconColor = "";
  var errorwidth = "";
  var iconfont = "";
  var textfont = "";
  var opacityxx = "";
  var emojiFont = "";
  var emojiLeft = "";
  var radi = "0px";
  var spinnersize: number = 17;
  var marginTop = "";
  var spinnermarg = "";
  var texttrans = "";
  var marginRight = "";

  var focusPasswordMarginWithDevice = "";

  if (device === "pc") {
    marginTop = "-64px";
    errorwidth = WidthHolder;
    iconfont = "1vw";
    textfont = "0.95vw";
    emojiFont = "1.5vw";
    emojiLeft = "0px";
    spinnersize = 13;
    spinnermarg = "-10px";
    texttrans = "scale(1)";
    marginRight = "-15px";
    focusPasswordMarginWithDevice = "-5vh";
  } else if (device === "Tablet") {
    marginTop = "-98px";
    iconfont = "1vw";
    errorwidth = "66%";
    textfont = "1.9vh";
    emojiFont = "2.9vw";
    emojiLeft = "13px";
    spinnersize = 18;
    spinnermarg = "5px";
    texttrans = "scale(0.8)";
    marginRight = "-35px";
    focusPasswordMarginWithDevice = "-2.7vh";
  } else {
    marginTop = "-98px";
    errorwidth = "100%";
    iconfont = "1vw";
    textfont = "";
    emojiFont = "3.6vh";
    emojiLeft = "13px";
    spinnersize = 14;
    spinnermarg = "5px";
    texttrans = "scale(0.8)";
    marginRight = "-35px";
    focusPasswordMarginWithDevice = "-5vh";
    if (textField === "email") {
      radi = "10px";
    }
  }

  if (darkmodeReducer) {
    ErrorColor =
      "linear-gradient(0deg,  rgba(17, 17, 17, 0.0025), rgba(17, 17, 17, 0.0041),rgba(17, 17, 17, 0.0041),rgba(17, 17, 17, 0.005),rgba(17, 17, 17, 0.0104),rgba(17, 17, 17, 0.025),rgba(17, 17, 17, 0.026),rgba(17, 17, 17, 0.028),rgba(17, 17, 17, 0.031),rgba(17, 17, 17, 0.035))";
    ErrorTextColor = "#dddddd";
    ErrorIconColor = "#aaaaaa";
  } else {
    ErrorColor =
      "linear-gradient(0deg,  rgba(221, 221, 221, 0.0041), rgba(221, 221, 221, 0.0083),rgba(221, 221, 221, 0.0166),rgba(221, 221, 221, 0.0166),rgba(221, 221, 221, 0.0416),rgba(221, 221, 221, 0.05),rgba(221, 221, 221, 0.058),rgba(221, 221, 221, 0.066),rgba(221, 221, 221, 0.0733),rgba(221, 221, 221, 0.08)";

    ErrorTextColor = "#222222";
    ErrorIconColor = "#333333";
  }
  ///
  var displayStatus1 = "display-on";
  var displayStatus2 = "display-off";
  var displayStatus3 = "display-off";

  if (textField === "username") {
    if (ErrorType === 4 || ErrorType === 1) {
    } else {
      displayStatus1 = "display-off";
      displayStatus2 = "display-on";
    }
  } else {
    displayStatus1 = "display-off";
    displayStatus2 = "display-off";
  }

  var showEmojiAvailable = "none";
  var showEmojiTaken = "none";

  if (ErrorType === 2) {
    showEmojiAvailable = "none";
    showEmojiTaken = "block";
  } else if (ErrorType === 3) {
    showEmojiAvailable = "block";
    showEmojiTaken = "none";
  }

  if (
    ErrorData === "username is taken" ||
    ErrorData === "username is available"
  ) {
    opacityxx = "0.8";
  } else {
    focus ? (opacityxx = "0.7") : (opacityxx = "0.35");
  }

  ///
  ///
  ///USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationModalError = useSpring({
    config: {
      duration: 100,
    },
    opacity: ErrorDisplay,
    position: "relative" as "relative",
    zIndex: focus ? 15 : 0,
    transform: ErrorData ? `translateY(0%)` : `translateY(100%)`,
  });

  ///
  ///
  ///
  ///USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationModalErrorPassword = useSpring({
    config: {
      duration: 10,
    },
    opacity: ErrorDisplay,
    position: "relative" as "relative",
    zIndex: focus ? 15 : 0,
    marginTop: focus ? focusPasswordMarginWithDevice : marginTop,

    transform: ErrorData ? `translateY(100%)` : `translateY(0%)`,
  });

  ///
  ///
  ///
  ///MATERIAL UI SPINNER STYLES (INSPIRED BY FACEBOOK SPINNERS)
  const useStylesmodalformsignup = makeStyles((theme) => ({
    root: {
      position: "relative",
      textAlign: "left",
      left: 10,
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 300 : 700],
    },
    top: {
      color: ErrorIconColor,
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
      {type ? (
        <animated.div style={animationModalError}>
          <Grid
            container
            style={{
              width: errorwidth,
              height: "34px",
              backgroundImage: ErrorColor,
              margin: "auto",
              borderRadius: "0px",
              borderTopLeftRadius: radi,
              borderTopRightRadius: radi,
              marginBottom: "6.5px",
              display: "flex",
              padding: "0px",
              opacity: checkSignupPasswordACTIVATE ? 0 : 1,
            }}
          >
            <Grid
              item
              className={errorFormChecking ? "display-off" : "display-on"}
              xs={12}
              style={{
                color: ErrorTextColor,
                alignItems: "center",
                paddingRight: "15px",
                justifyContent: "flex-end",
                textAlign: "right",
                fontWeight: "normal",
                fontFamily: "sans-serif",
              }}
            >
              <Grid
                item
                xs={2}
                className={
                  cantPassBadEmail
                    ? `${displayStatus1}`
                    : ` ${displayStatus3}  element-bopStop`
                }
              >
                <ErrorOutlineIcon
                  className={cantPassBadEmail ? "element-bop" : ""}
                  style={{
                    opacity: 1,
                    marginLeft: "8px",
                    marginRight: "12px",
                    color: ErrorIconColor,
                    fontSize: iconfont,
                  }}
                />
              </Grid>
              <Grid item xs={2} className={displayStatus2}>
                {" "}
                <span
                  style={{
                    display: showEmojiTaken,
                    fontSize: emojiFont,
                    textAlign: "right",
                    marginLeft: emojiLeft,

                    marginTop: "-3px",
                  }}
                >
                  &#128554;
                </span>
                <span
                  style={{
                    display: showEmojiAvailable,
                    fontSize: emojiFont,
                    textAlign: "right",
                    marginLeft: emojiLeft,

                    marginTop: "-3px",
                  }}
                >
                  &#128536;
                </span>
              </Grid>
              <Grid
                item
                style={{
                  opacity: opacityxx,
                  fontSize: textfont,
                  transform: texttrans,
                }}
                xs={10}
                className={bop ? "element-bop" : ""}
              >
                <span style={{ textAlign: "right", marginRight: marginRight }}>
                  <span style={{ verticalAlign: "middle" }}>{ErrorData} </span>
                </span>
              </Grid>
            </Grid>
            <Grid
              item
              className={errorFormChecking ? "display-on" : "display-off"}
              xs={12}
              style={{
                color: ErrorTextColor,
                fontSize: "0.83vw",
                alignItems: "center",
                paddingRight: "15px",
                justifyContent: "flex-start",
                textAlign: "left",
                marginLeft: spinnermarg,
                fontWeight: "normal",
                fontFamily: "sans-serif",
              }}
            >
              {" "}
              <div className={classes.root} style={{ opacity: "0.1" }}>
                <CircularProgress
                  variant="determinate"
                  className={classes.bottom}
                  size={spinnersize}
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
                  size={spinnersize}
                  thickness={4}
                />
              </div>{" "}
            </Grid>
          </Grid>
        </animated.div>
      ) : (
        <animated.div style={animationModalErrorPassword}>
          <Grid
            container
            style={{
              width: errorwidth,
              height: "34px",
              backgroundImage: ErrorColor,
              margin: "auto",
              borderRadius: "0px",
              display: "flex",
              opacity: checkSignupPasswordACTIVATE ? 0 : 1,
            }}
          >
            {" "}
            <Grid
              className={errorFormChecking ? "display-off" : "display-on"}
              item
              xs={12}
              style={{
                color: ErrorTextColor,

                alignItems: "center",
                paddingRight: "15px",
                justifyContent: "flex-end",
                textAlign: "right",
                fontWeight: "normal",
                fontFamily: "sans-serif",
              }}
            >
              <Grid
                item
                xs={1}
                className={cantPassBadEmail ? "" : "element-bopStop"}
              >
                <ErrorOutlineIcon
                  className={cantPassBadEmail ? "element-bop" : ""}
                  style={{
                    fontSize: "1vw",
                    marginLeft: "8px",
                    marginRight: "27px",
                    color: ErrorIconColor,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={11}
                style={{
                  opacity: focus ? 0.7 : 0.35,
                  fontSize: textfont,
                  transform: texttrans,
                }}
                className={bop ? "element-bopflip" : ""}
              >
                <span style={{ textAlign: "right", marginRight: marginRight }}>
                  <span style={{ verticalAlign: "middle" }}>{ErrorData} </span>
                </span>
              </Grid>
            </Grid>
            <Grid
              item
              className={errorFormChecking ? "display-on" : "display-off"}
              xs={12}
              style={{
                color: ErrorTextColor,
                fontSize: "0.83vw",
                alignItems: "center",
                paddingRight: "15px",
                justifyContent: "flex-start",
                textAlign: "left",
                marginLeft: spinnermarg,
                fontWeight: "normal",
                fontFamily: "sans-serif",
              }}
            >
              {" "}
              <div className={classes.root} style={{ opacity: "0.1" }}>
                <CircularProgress
                  variant="determinate"
                  className={classes.bottom}
                  size={spinnersize}
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
                  size={spinnersize}
                  thickness={4}
                />
              </div>{" "}
            </Grid>
          </Grid>
        </animated.div>
      )}
    </>
  );
}

export const ModalFormSignupError = React.memo(ModalFormSignupErrorx);
