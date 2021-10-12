import React from "react";
import { animated, useSpring } from "react-spring";
import { Grid } from "@material-ui/core";
import { ImodalFormLoginError } from "./log-Interfaces";
import { useSelector } from "react-redux";

function ModalFormLoginErrorx({
  device,
  type,
  ErrorDisplay,
  WidthHolder,
  focus,
}: ImodalFormLoginError) {
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
  ///USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationModalLogError = useSpring({
    config: {
      duration: 100,
    },
    width: "100%",
    position: "relative" as "relative",
    zIndex: focus ? 15 : 0,
    opacity: ErrorDisplay,
    transform: ErrorDisplay ? `translateY(0%)` : `translateY(100%)`,
  });

  ///
  ///
  ///
  ///USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationModalErrorPasswordLog = useSpring({
    config: {
      duration: 100,
    },
    position: "relative" as "relative",
    zIndex: focus ? 15 : 0,
    opacity: ErrorDisplay,
    marginTop: "-74px",
    transform: ErrorDisplay ? `translateY(100%)` : `translateY(0%)`,
  });

  var ErrorColor = "";
  var ErrorTextColor = "";
  var errorwidth = "";
  var textfont = "";
  var radi = "";
  var marginRight = "";
  var texttrans = "";

  if (device === "pc") {
    errorwidth = WidthHolder;
    textfont = "1vw";
    marginRight = "-16px";
    radi = "0px";
    texttrans = "scale(1)";
  } else if (device === "Tablet") {
    errorwidth = "69%";
    textfont = "1.9vh";
    radi = "10px";
    marginRight = "-35px";
    texttrans = "scale(0.8)";
  } else {
    errorwidth = "100%";
    textfont = "";
    radi = "10px";
    marginRight = "-35px";
    texttrans = "scale(0.8)";
  }

  if (darkmodeReducer) {
    ErrorColor =
      "linear-gradient(0deg,  rgba(17, 17, 17, 0.0025), rgba(17, 17, 17, 0.0041),rgba(17, 17, 17, 0.0041),rgba(17, 17, 17, 0.005),rgba(17, 17, 17, 0.0104),rgba(17, 17, 17, 0.025),rgba(17, 17, 17, 0.026),rgba(17, 17, 17, 0.028),rgba(17, 17, 17, 0.031),rgba(17, 17, 17, 0.035))";
    ErrorTextColor = "#dddddd";
  } else {
    ErrorColor =
      "linear-gradient(0deg,  rgba(221, 221, 221, 0.0041), rgba(221, 221, 221, 0.0083),rgba(221, 221, 221, 0.0166),rgba(221, 221, 221, 0.0166),rgba(221, 221, 221, 0.0416),rgba(221, 221, 221, 0.05),rgba(221, 221, 221, 0.058),rgba(221, 221, 221, 0.066),rgba(221, 221, 221, 0.0733),rgba(221, 221, 221, 0.08)";
    ErrorTextColor = "#222222";
  }

  return (
    <>
      {type ? (
        <animated.div style={animationModalLogError}>
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
              marginBottom: "-1.5px",
            }}
          >
            <Grid
              item
              xs={12}
              style={{
                color: ErrorTextColor,

                display: "flex",
                alignItems: "center",
                paddingRight: "15px",
                justifyContent: "flex-end",
                textAlign: "right",
                fontWeight: "normal",
                fontFamily: "sans-serif",
              }}
            >
              <Grid item xs={2}></Grid>
              <Grid
                item
                style={{
                  opacity: focus ? 0.7 : 0.35,
                  fontSize: textfont,
                  transform: texttrans,
                }}
                xs={10}
              >
                <span style={{ textAlign: "right", marginRight: marginRight }}>
                  <span style={{ verticalAlign: "middle" }}>
                    username required{" "}
                  </span>
                </span>
              </Grid>
            </Grid>
          </Grid>
        </animated.div>
      ) : (
        <animated.div style={animationModalErrorPasswordLog}>
          <Grid
            container
            style={{
              width: errorwidth,
              height: "34px",
              backgroundImage: ErrorColor,
              margin: "auto",
              borderRadius: "0px",
              display: "flex",
            }}
          >
            {" "}
            <Grid
              item
              xs={12}
              style={{
                color: ErrorTextColor,

                display: "flex",
                alignItems: "center",
                paddingRight: "15px",
                justifyContent: "flex-end",
                textAlign: "right",
                fontWeight: "normal",
                fontFamily: "sans-serif",
              }}
            >
              <Grid item xs={2}></Grid>
              <Grid
                item
                xs={10}
                style={{
                  opacity: focus ? 0.7 : 0.35,
                  fontSize: textfont,
                  transform: texttrans,
                  zIndex: 1,
                }}
              >
                <span style={{ textAlign: "right", marginRight: marginRight }}>
                  <span style={{ verticalAlign: "middle" }}>
                    password required{" "}
                  </span>
                </span>
              </Grid>
            </Grid>
          </Grid>
        </animated.div>
      )}
    </>
  );
}

export const ModalFormLoginError = React.memo(ModalFormLoginErrorx);
