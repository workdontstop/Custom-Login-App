import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import { Grid } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { ImodalLogFormError } from "./appFolder-Interfaces";

export default function ModalLogFormError({
  type,
  cantPassBadEmail,
  ErrorDisplay,
  ErrorData,
}: ImodalLogFormError) {
  ///
  ///
  ///
  ///USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationModalError = useSpring({
    config: {
      duration: 100,
    },
    opacity: ErrorDisplay,
    transform: ErrorData ? `translateY(0%)` : `translateY(100%)`,
  });

  ///
  ///
  ///
  ///USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationModalErrorPassword = useSpring({
    config: {
      duration: 100,
    },
    opacity: ErrorDisplay,
    marginTop: ErrorData ? `-62px` : `-30px`,
    transform: ErrorData ? `translateY(100%)` : `translateY(0%)`,
  });

  return (
    <>
      {type ? (
        <animated.div style={animationModalError}>
          <Grid
            xs={12}
            style={{
              width: "82%",
              height: "34px",
              color: "#ffffff",
              backgroundColor: "#222222",
              margin: "auto",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              marginBottom: "-1.5px",
              display: "flex",
            }}
          >
            <Grid
              xs={12}
              style={{
                color: "#eeeeee",
                fontSize: "0.83vw",
                display: "flex",
                alignItems: "center",
                paddingRight: "15px",
                justifyContent: "flex-end",
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              <Grid xs={2}>
                <ErrorOutlineIcon
                  className={cantPassBadEmail ? "element-bop" : ""}
                  style={{
                    opacity: ErrorDisplay,
                    marginLeft: "8px",
                    marginRight: "12px",
                    color: "orange ",
                  }}
                />
              </Grid>
              <Grid xs={10}>{ErrorData}</Grid>
            </Grid>
          </Grid>
        </animated.div>
      ) : (
        <animated.div style={animationModalErrorPassword}>
          <Grid
            xs={12}
            style={{
              width: "82%",
              height: "34px",
              color: "#ffffff",
              backgroundColor: "#222222",
              margin: "auto",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",

              display: "flex",
            }}
          >
            <Grid
              xs={12}
              style={{
                color: "#eeeeee",
                fontSize: "0.83vw",
                display: "flex",
                alignItems: "center",
                paddingRight: "15px",
                justifyContent: "flex-end",
                textAlign: "left",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              }}
            >
              <Grid xs={2}>
                <ErrorOutlineIcon
                  className={cantPassBadEmail ? "element-bop" : ""}
                  style={{
                    opacity: ErrorDisplay,
                    marginLeft: "8px",
                    marginRight: "12px",
                    color: "orange ",
                  }}
                />
              </Grid>
              <Grid xs={10}>{ErrorData}</Grid>
            </Grid>
          </Grid>
        </animated.div>
      )}
    </>
  );
}
