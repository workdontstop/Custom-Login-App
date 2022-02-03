import React, { useRef, useEffect, useCallback, useState } from "react";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { Grid, Switch, DialogContent } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { useSpring, animated } from "react-spring";
import { OptionsSlider } from "../profile/OptionsSlider";
import { useSelector, useDispatch } from "react-redux";
import Masonry from "@mui/lab/Masonry";
import Axios from "axios";

function Uploadx({
  showModalUpload,
  closeUploadModal,
  OpenUploadModal,
  getSliderWidth,
}: any): JSX.Element {
  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animation = useSpring({
    config: {
      duration: 600,
    },
    opacity: showModalUpload ? 1 : 0,
    transform: showModalUpload ? `translateY(0%)` : `translateY(-100%)`,
  });

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

  const blank = () => {};

  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  return (
    <>
      {showModalUpload ? (
        <DialogContent
          className={
            darkmodeReducer ? "dialog-container  " : "dialog-container  "
          }
          style={{
            padding: "0px",
            height: "100vh",
            position: "fixed",
            zIndex: 100,
          }}
        >
          <animated.div style={animation}>
            <DialogContent
              className={
                darkmodeReducer
                  ? " dontallowhighlighting modal-containerDark "
                  : " dontallowhighlighting  modal-containerLight "
              }
              style={{
                padding: "0px",
                height: "100vh",
              }}
            >
              <OptionsSlider
                typeUpload="false"
                showModalUpload={showModalUpload}
                OpenUploadModal={OpenUploadModal}
                sethaltedTop={blank}
                typeTop={false}
                getSliderWidth={getSliderWidth}
              />
            </DialogContent>
          </animated.div>
        </DialogContent>
      ) : null}
    </>
  );
}

export const Upload = React.memo(Uploadx);
