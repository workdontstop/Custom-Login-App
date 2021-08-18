import React, { useRef, useEffect, useCallback } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Grid, Switch, DialogContent } from "@material-ui/core";
import { isBrowser, isTablet } from "react-device-detect";
import { useSpring, animated } from "react-spring";
import { IOptionInnerModal } from "./log-Interfaces";
import "./logCss.css";
import * as CSS from "csstype";

var toggleDarkMode: boolean = false;

function OptionInnerModalx({
  closemodal,
  showModal,
  darkmode,
  setDarkmode,
}: IOptionInnerModal): JSX.Element {
  var matchPc = isBrowser;
  var matchTablet = isTablet;

  var marginData: CSS.Properties;
  var fontData: CSS.Properties;
  const fontDataPc: CSS.Properties = { fontSize: "2.4vw" };
  const fontDataTablet: CSS.Properties = { fontSize: "3.4vh" };
  const fontDataMobile: CSS.Properties = { fontSize: "3.8vh" };
  const marginDataPc: CSS.Properties = { marginLeft: "-35px" };
  const marginDataMobile: CSS.Properties = { marginLeft: "-15.5px" };

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  if (matchPc) {
    marginData = marginDataPc;
    fontData = fontDataPc;
    ///
  } else if (matchTablet) {
    marginData = marginDataPc;
    fontData = fontDataTablet;
    ///
  } else {
    marginData = marginDataMobile;
    fontData = fontDataMobile;
  }

  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0.0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  //
  //
  //
  //ESCAPE KEY CLOSE MODAL
  const escapePress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        closemodal(0);
      }
    },
    [showModal, closemodal]
  );

  useEffect(() => {
    document.addEventListener("keydown", escapePress);
    return () => document.removeEventListener("keydown", escapePress);
  }, [escapePress]);

  //
  //
  //
  //USEREF TARGETS A DIV(BACKGROUND) AND CLOSES MODAL ON CLICK
  const inputRef = useRef<HTMLInputElement>(null);
  const onBackgroundFocus = (e: any): void => {
    if (inputRef.current === e.target) {
      closemodal(0);
    }
  };

  return (
    <>
      {showModal ? (
        <DialogContent
          className="dialog-container dontallowhighlighting "
          onClick={onBackgroundFocus}
          style={{
            padding: "0px",

            height: "100vh",
          }}
          ref={inputRef}
        >
          <animated.div style={animation}>
            <Grid
              container
              className={
                darkmode
                  ? "Background-header-dark theme-more-container"
                  : "Background-header-light theme-more-container"
              }
            >
              <Grid item sm={8} md={10} xs={7}></Grid>
              <Grid
                item
                xs={2}
                sm={2}
                md={1}
                className="zuperking"
                style={marginData}
              >
                <Switch
                  size="medium"
                  checked={darkmode}
                  className={
                    darkmode
                      ? "icon-color-dark dontallowhighlighting  "
                      : "icon-color-light  dontallowhighlighting  "
                  }
                  onChange={() => {
                    toggleDarkMode = !darkmode;
                    setDarkmode(!darkmode);
                    localStorage.setItem("darkmode", toggleDarkMode.toString());
                    closemodal(0);
                  }}
                />
              </Grid>

              <Grid
                item
                xs={3}
                className="dontallowhighlighting add-rounded-icon-right"
                sm={2}
                md={1}
              >
                <AddRoundedIcon
                  className={
                    darkmode
                      ? "make-small-icons-clickable-dark  dontallowhighlighting  "
                      : "make-small-icons-clickable-light  dontallowhighlighting  "
                  }
                  fontSize="large"
                  style={fontData}
                />
              </Grid>
            </Grid>
          </animated.div>
        </DialogContent>
      ) : null}
    </>
  );
}

export const OptionInnerModal = React.memo(OptionInnerModalx);
