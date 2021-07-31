import React, { useRef, useEffect, useCallback } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { Grid, Switch, DialogContent } from "@material-ui/core";
import { useSpring, animated } from "react-spring";
import { IOptionInnerModal } from "./appFolder-Interfaces";
import "./OptionInnerModal.css";

var toggleDarkMode: boolean = false;

function OptionInnerModalx({
  closemodal,
  showModal,
  setShowModal,
  darkmode,
  setDarkmode,
  marginData,
  fontData,
  switchsize,
}: IOptionInnerModal): JSX.Element {
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
                  size={switchsize}
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
