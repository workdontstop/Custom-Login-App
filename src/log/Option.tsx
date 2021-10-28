import React, { useState, useCallback } from "react";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { OptionInnerModal } from "./OptionInnerModal";

import { Grid } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { useSelector } from "react-redux";

import "./logCss.css";
import * as CSS from "csstype";

function Optionx(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  var superFont = "";
  var optionsContainer = "";
  var HorizIconfontData: CSS.Properties;

  const fontDataPc: CSS.Properties = { fontSize: "2.4vw" };
  const fontDataTablet: CSS.Properties = { fontSize: "3.7vh" };
  const fontDataMobile: CSS.Properties = { fontSize: "4.2vh" };

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DEVICE TYPE
  if (matchPc) {
    superFont = "super-starz-text-Pc";
    optionsContainer = "optionsContainer-Pc-Tab";
    HorizIconfontData = fontDataPc;
    ///
  } else if (matchTablet) {
    superFont = "super-starz-text-Tablet";
    optionsContainer = "optionsContainer-Pc-Tab";
    HorizIconfontData = fontDataTablet;
    ///
  } else {
    superFont = "super-starz-text-Mobile";
    optionsContainer = "optionsContainer-Mobile";
    HorizIconfontData = fontDataMobile;
  }

  ///
  ///
  ///
  /// CLOSE MODAL (STARTS AN ONPOPSTATE EVENT)
  const closemodal = useCallback((backbutton: number) => {
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
  }, []);

  ///
  ///
  ///
  ///OPEN MODAL THEN CALL CLOSEMODAL FUNCTION WHICH WAITS FOR A POP EVENT(for closing modal)
  const Openmodal = useCallback(() => {
    setShowModal(!showModal);
    //pushstate add enteries to your history
    window.history.pushState(null, "", "Options");
    closemodal(1);
  }, [showModal, closemodal]);

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

  return (
    <Grid container style={{}}>
      {showModal ? null : (
        <Grid item xs={12} className={optionsContainer} style={{}}>
          <Grid item xs={6} style={{ textAlign: "left" }}>
            <span className={superFont}>
              <span
                className={
                  darkmodeReducer
                    ? "text-superstarz-dark   text-superstarz-dark-colorA  "
                    : "text-superstarz-light  text-superstarz-light-colorA  "
                }
              >
                Super
              </span>
              <span
                style={{ opacity: darkmodeReducer ? "0.73" : "0.7" }}
                className={
                  darkmodeReducer
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
                darkmodeReducer
                  ? "make-small-icons-clickable-dark dontallowhighlighting  "
                  : "make-small-icons-clickable-light  dontallowhighlighting  "
              }
              fontSize="large"
              style={HorizIconfontData}
            />
          </Grid>
        </Grid>
      )}

      <OptionInnerModal showModal={showModal} closemodal={closemodal} />
    </Grid>
  );
}

export const Option = React.memo(Optionx);
