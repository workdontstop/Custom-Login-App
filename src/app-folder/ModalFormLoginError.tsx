import { animated, useSpring } from "react-spring";
import { Grid } from "@material-ui/core";
import { ImodalFormLoginError } from "./appFolder-Interfaces";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default function ModalFormLoginError({
  device,
  type,
  ErrorDisplay,
  darkmode,
  WidthHolder,
}: ImodalFormLoginError) {
  ///
  ///
  ///
  ///USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationModalLogError = useSpring({
    config: {
      duration: 100,
    },
    width: "100%",
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
    opacity: ErrorDisplay,
    zIndex: 0,
    marginTop: ErrorDisplay ? `-74px` : `-125px`,
    transform: ErrorDisplay ? `translateY(100%)` : `translateY(0%)`,
  });
  var ErrorColor = "";
  var ErrorTextColor = "";
  var errorwidth = "";
  var textfont = "";
  var radi = "";
  var marginRight = "";
  var texttrans = "";
  var dotColor = "";

  if (device === "pc") {
    errorwidth = WidthHolder;
    textfont = "1vw";
    marginRight = "-16px";
    radi = "0px";
    texttrans = "scale(1)";
  } else if (device === "tablet") {
    errorwidth = WidthHolder;
    textfont = "1vw";
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

  if (darkmode) {
    dotColor = "#00ccff";
    ErrorColor =
      "linear-gradient(0deg,  rgba(17, 17, 17, 0.0075), rgba(17, 17, 17, 0.0125),rgba(17, 17, 17, 0.0125),rgba(17, 17, 17, 0.015),rgba(17, 17, 17, 0.03125),rgba(17, 17, 17, 0.075),rgba(17, 17, 17, 0.080),rgba(17, 17, 17, 0.085),rgba(17, 17, 17, 0.095),rgba(17, 17, 17, 0.105))";
    ErrorTextColor = "#dddddd";
  } else {
    dotColor = "red";
    ErrorColor =
      "linear-gradient(0deg,  rgba(221, 221, 221, 0.0125), rgba(221, 221, 221, 0.025),rgba(221, 221, 221, 0.05),rgba(221, 221, 221, 0.05),rgba(221, 221, 221, 0.125),rgba(221, 221, 221, 0.15),rgba(221, 221, 221, 0.175),rgba(221, 221, 221, 0.2),rgba(221, 221, 221, 0.22),rgba(221, 221, 221, 0.26))";

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
              display: "flex",
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
                  opacity: 0.5,
                  fontSize: textfont,
                  transform: texttrans,
                }}
                xs={10}
              >
                <span style={{ textAlign: "right", marginRight: marginRight }}>
                  <span style={{ verticalAlign: "middle" }}>
                    username required{" "}
                  </span>
                  <FiberManualRecordIcon
                    style={{
                      color: dotColor,
                      verticalAlign: "middle",
                      fontSize: "0.6rem",
                    }}
                  />
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
                  opacity: 0.5,
                  fontSize: textfont,
                  transform: texttrans,
                  zIndex: 1,
                }}
              >
                <span style={{ textAlign: "right", marginRight: marginRight }}>
                  <span style={{ verticalAlign: "middle" }}>
                    password required{" "}
                  </span>
                  <FiberManualRecordIcon
                    style={{
                      color: dotColor,
                      verticalAlign: "middle",
                      fontSize: "0.6rem",
                    }}
                  />
                </span>
              </Grid>
            </Grid>
          </Grid>
        </animated.div>
      )}
    </>
  );
}
