import React, { useRef, useEffect, useCallback } from "react";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { Grid, Switch, DialogContent } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { useSpring, animated } from "react-spring";

import { IOptionInnerModal } from "./log-Interfaces";
import { useSelector, useDispatch } from "react-redux";

import { DarkmodeToggleAction } from ".././GlobalActions";

import "./logCss.css";
import * as CSS from "csstype";

var toggleDarkMode: boolean = false;

function OptionInnerModalx({
  closemodal,
  showModal,
}: IOptionInnerModal): JSX.Element {
  var marginData: CSS.Properties;
  var fontData: CSS.Properties;
  const fontDataPc: CSS.Properties = { fontSize: "2.4vw" };
  const fontDataTablet: CSS.Properties = { fontSize: "3.7vh" };
  const fontDataMobile: CSS.Properties = { fontSize: "4.2vh" };
  const marginDataPc: CSS.Properties = { marginLeft: "-35px" };
  const marginDataMobile: CSS.Properties = { marginLeft: "-15.5px" };
  var paddingttop = "";

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  if (matchPc) {
    marginData = marginDataPc;
    fontData = fontDataPc;
    paddingttop = "2.1rem";
    ///
  } else if (matchTablet) {
    marginData = marginDataPc;
    fontData = fontDataTablet;
    paddingttop = "5.5rem";
    ///
  } else {
    marginData = marginDataMobile;
    fontData = fontDataMobile;
    paddingttop = "2.1rem";
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
  /// UPDATES  STATE.DARKMODE USING A DISPATCH TO THE REDUX STORE  SWITCH /TOGGLE  APP THEME
  const dispatch = useDispatch();
  const switchThemes = () => {
    if (darkmodeReducer) {
      toggleDarkMode = false;
    } else {
      toggleDarkMode = true;
    }
    dispatch(DarkmodeToggleAction());
    ////ACESSING LOCALSTORAGE
    localStorage.setItem("darkmode", toggleDarkMode.toString());
    closemodal(0);
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
            position: "fixed",
          }}
          ref={inputRef}
        >
          <animated.div style={animation}>
            <Grid
              container
              style={{ paddingTop: paddingttop }}
              className={
                darkmodeReducer
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
                  checked={darkmodeReducer}
                  className={
                    darkmodeReducer
                      ? "icon-color-dark dontallowhighlighting  "
                      : "icon-color-light  dontallowhighlighting  "
                  }
                  onChange={() => {
                    switchThemes();
                  }}
                />
              </Grid>

              <Grid
                item
                xs={3}
                className="dontallowhighlighting add-rounded-icon-right"
                sm={2}
                md={1}
                style={{ opacity: 0.15 }}
              >
                <ControlPointDuplicateIcon
                  className={
                    darkmodeReducer
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
