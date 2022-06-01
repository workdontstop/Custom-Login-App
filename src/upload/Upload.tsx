import React, { useRef, useEffect, useCallback, useState } from "react";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { Grid, Switch, DialogContent } from "@material-ui/core";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { useSpring, animated } from "react-spring";
import { OptionsSlider } from "../profile/OptionsSlider";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import Masonry from "@mui/lab/Masonry";
import Axios from "axios";

function Uploadx({
  showModalUpload,
  closeUploadModal,
  OpenUploadModal,
  getSliderWidth,
  setShowModalUpload,
  setStopBodyScroll,
}: any): JSX.Element {
  //
  //
  //

  const [allowOverflow, setallowOverflow] = useState(true);

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
    padding: "0px",
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

  ///
  ///
  ///
  /// GET GLOBAL INNER NAVIGATION VARIABLE
  const { activatecropImage } = useSelector((state: RootStateOrAny) => ({
    ...state.GlobalNavuploadReducer,
  }));
  const activatecropImageReducer = activatecropImage;

  const blank = () => {};

  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  const cropTOPLEVELScrollRef: any = useRef(null);

  const refWithimageData = useRef<any>([]);

  ///
  ///
  ///
  ///CREATE REFS FROM POSTS AND ADD THEM TO ARRAY
  const addfinishedCropRef = (itemsRef: any) => {
    if (itemsRef && !refWithimageData.current.includes(itemsRef)) {
      refWithimageData.current.push(itemsRef);
    }
    ////console.log(postItemsRef.current[1]);
  };

  const cropscrollRef = useRef<any>(null);

  return (
    <>
      {showModalUpload ? (
        <DialogContent
          className={darkmodeReducer ? "dialog-container" : "dialog-container"}
          style={{
            padding: "0px",
            height: "100vh",
            position: "fixed",
            zIndex: 100,
            cursor: "default",
            overflow: "hidden",
          }}
        >
          <animated.div ref={cropscrollRef} style={animation}>
            <DialogContent
              ref={cropTOPLEVELScrollRef}
              className={
                matchMobile || matchTablet
                  ? activatecropImageReducer
                    ? darkmodeReducer
                      ? " dontallowhighlighting modal-containerDarkmob"
                      : " dontallowhighlighting  modal-containerLightmob "
                    : darkmodeReducer
                    ? " dontallowhighlighting modal-containerDark"
                    : " dontallowhighlighting  modal-containerLight "
                  : darkmodeReducer
                  ? " dontallowhighlighting modal-containerDark  postscroll-dark "
                  : " dontallowhighlighting  modal-containerLight  postscroll-light "
              }
              style={{
                padding: "0px",
                height: "100vh",
                overflow: allowOverflow ? "auto" : "hidden",
              }}
            >
              <OptionsSlider
                setShowModalUpload={setShowModalUpload}
                setStopBodyScroll={setStopBodyScroll}
                closeUploadModal={closeUploadModal}
                allowOverflow={allowOverflow}
                cropscrollRef={cropscrollRef}
                typeUpload={1}
                showModalUpload={showModalUpload}
                OpenUploadModal={OpenUploadModal}
                sethaltedTop={blank}
                typeTop={false}
                getSliderWidth={getSliderWidth}
                cropTOPLEVELScrollRef={cropTOPLEVELScrollRef}
                refWithimageData={refWithimageData}
                setallowOverflow={setallowOverflow}
              />
            </DialogContent>
          </animated.div>
        </DialogContent>
      ) : null}
    </>
  );
}

export const Upload = React.memo(Uploadx);
