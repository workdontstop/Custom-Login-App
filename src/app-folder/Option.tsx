import React, { useState, useRef } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Grid, Typography } from "@material-ui/core";
import * as CSS from "csstype";
import OptionInnerModal from "./OptionInnerModal";
import { IOption } from "./appFolder-Interfaces";
import "./Option.css";

export default function Option({
  darkmode,
  setDarkmode,
  marginData,
  fontData,
  switchsize,
  superFont,
  optionsContainer,
}: IOption): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  //
  //
  //
  // CLOSE MODAL (STARTS AN ONPOPSTATE EVENT)
  const closemodal = (backbutton: number) => {
    //pop states fires when back and forward buttons used
    if (backbutton == 1) {
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = null;
        setShowModal(false);
      };
    } else {
      window.history.pushState(null, "", ".");
      window.onpopstate = null;
      setShowModal(false);
    }
  };

  //
  //
  //
  //OPEN MODAL THEN CALL CLOSEMODAL FUNCTION WHICH WAITS FOR A POP EVENT(for closing modal)
  const Openmodal = () => {
    setShowModal(!showModal);
    //pushstate add enteries to your history
    window.history.pushState(null, "", "Options");
    closemodal(1);
  };

  //
  //
  //
  // use USEREF TO  TARGET A DIVS(background) AND CLOSES MODAL ON CLICK(OF DIV)
  const inputRef = useRef<HTMLInputElement>(null);
  const onBackgroundFocus = (e: any): void => {
    if (inputRef.current === e.target) {
      closemodal(0);
    }
  };

  return (
    <Grid container xs={12}>
      {showModal ? null : (
        <Grid item xs={12} className={optionsContainer}>
          <Grid item xs={6}>
            <Typography className={superFont}>
              <p
                className={
                  darkmode
                    ? "text-superstarz-dark   text-align-left"
                    : "text-superstarz-light   text-align-left"
                }
              >
                SuperstarZ
              </p>
            </Typography>
          </Grid>

          <Grid item xs={6} className=" text-align-right">
            <MoreVertIcon
              onClick={Openmodal}
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
      )}

      <OptionInnerModal
        showModal={showModal}
        closemodal={closemodal}
        setShowModal={setShowModal}
        switchsize={switchsize}
        darkmode={darkmode}
        setDarkmode={setDarkmode}
        marginData={marginData}
        fontData={fontData}
      />
    </Grid>
  );
}
