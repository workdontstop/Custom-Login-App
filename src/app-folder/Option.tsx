import React, { useState, useCallback } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { OptionInnerModal } from "./OptionInnerModal";
import { IOption } from "./appFolder-Interfaces";

import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import "./Option.css";

function Optionx({
  darkmode,
  setDarkmode,
  marginData,
  fontData,
  switchsize,
  superFont,
  optionsContainer,
}: IOption): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  ///
  ///
  ///
  /// CLOSE MODAL (STARTS AN ONPOPSTATE EVENT)
  const closemodal = useCallback(
    (backbutton: number) => {
      //pop states fires when back and forward buttons used
      if (backbutton === 1) {
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
    },
    [setShowModal]
  );

  ///
  ///
  ///
  ///OPEN MODAL THEN CALL CLOSEMODAL FUNCTION WHICH WAITS FOR A POP EVENT(for closing modal)
  const Openmodal = useCallback(() => {
    setShowModal(!showModal);
    //pushstate add enteries to your history
    window.history.pushState(null, "", "Options");
    closemodal(1);
  }, [setShowModal, showModal, closemodal]);

  console.log("zerformance issues");

  return (
    <Grid container>
      {showModal ? null : (
        <Grid item xs={12} className={optionsContainer}>
          <Grid item xs={6} style={{ textAlign: "left" }}>
            <span className={superFont}>
              <span
                className={
                  darkmode
                    ? "text-superstarz-dark   text-superstarz-dark-colorA  "
                    : "text-superstarz-light  text-superstarz-light-colorA  "
                }
              >
                Super
              </span>
              <span
                className={
                  darkmode
                    ? "text-superstarz-dark     text-superstarz-dark-colorB  "
                    : "text-superstarz-light   text-superstarz-light-colorB   "
                }
              >
                starZ
              </span>
            </span>
          </Grid>

          <Grid item xs={6} className="text-align-right">
            <MoreHorizIcon
              onClick={Openmodal}
              className={
                darkmode
                  ? "make-small-icons-clickable-dark dontallowhighlighting  "
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

export const Option = React.memo(Optionx);
