import React, { useRef, useState } from "react";

import { matchPc, matchTablet } from "../DetectDevice";
import { useSpring, animated } from "react-spring";

import CircleIcon from "@mui/icons-material/Circle";
import { useSelector, useDispatch } from "react-redux";
import { UpdateOptionsTop } from ".././GlobalActions";
import { UploadMenu } from "../upload/UploadMenu";
import { MenuInner } from "./MenuInner";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function OptionsSliderx({
  getSliderWidth,
  typeTop,
  sethaltedTop,
  OpenUploadModal,
  showModalUpload,
  typeUpload,
  cropTOPLEVELScrollRef,
  refWithimageData,
}: any) {
  ///
  ///
  ///

  ///
  ///
  ///
  /// USE DISPATCH
  const dispatch = useDispatch();

  var getSliderWidthNew = matchPc
    ? getSliderWidth / 1.5
    : matchTablet
    ? getSliderWidth / 1.02
    : getSliderWidth / 0.77;

  var optionsClickType: number = matchPc ? 1 : 0;

  const optionsCollectImageRef = useRef<HTMLDivElement>(null);

  const [translate, setTranslate] = useState(0);
  const [stalestate] = useState(1);

  const [ActiveSlide, setActiveSlide] = useState(0);
  const [ShowHideNegativeValue, setShowHideNegativeValue] = useState("-");

  const [touchPosition, setTouchPosition] = useState(null);
  const handleTouchMoveTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [transitionFast, settransitionFast] = useState<boolean>(false);

  const prevJoltTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextJoltTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [optionsShow, setoptionsShow] = useState<boolean>(true);

  ///
  ///
  ///
  ///DARKMODE FROM REDUX
  interface RootoptinstopshowingReducer {
    OptionsTopShowReducer: {
      optinstopshowing: boolean;
    };
  }
  const { optinstopshowing } = useSelector(
    (state: RootoptinstopshowingReducer) => ({
      ...state.OptionsTopShowReducer,
    })
  );
  const optinstopshowingReducer = optinstopshowing;

  ///
  ///
  ///
  ///OPTIONS SLIDER VARIABLES DISCRIBING ITEMS
  var optionsNameData = typeTop
    ? ["settings", "upload", "filter feeds", "albums", "playlist", "showroom"]
    : ["filter feeds", "albums", "playlist", "showroom", "settings", "upload"];

  ///
  ///
  ///OPTIONS SLIDER VARIABLES DISCRIBING ITEMS
  const [CropSaved, setCropSaved] = useState(false);

  var UploadOptionsNameData = ["audio", "images", "gifs", "Continue"];

  const optionsImages = typeUpload
    ? ["1", "2", "3", "4"]
    : typeTop
    ? ["5", "6", "1.jpg", "2.jpg", "3.jpg", "4.jpg"]
    : ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5", "6"];
  ///

  ///
  ///
  ///
  ///CREATE OPTIONS SLIDER ANIMATION WITH  REACT SPRING

  const animationop = useSpring({
    config: {
      duration: typeTop ? 100 : 300,
    },
    opacity: typeTop
      ? optinstopshowingReducer
        ? 1
        : 0
      : optinstopshowingReducer
      ? 0
      : 1,
    transform: typeTop
      ? optinstopshowingReducer
        ? `translateY(0%)`
        : "translateY(-100%)"
      : optinstopshowingReducer
      ? `translateY(-100%)`
      : "translateY(0%)",
  });

  ///
  ///
  ///
  ///CREATE OPTIONS SLIDER ANIMATION WITH  REACT SPRING
  const modalanimation = useSpring({
    config: {
      mass: 1,
      tension: 120,
      friction: 14,
    },
    transform: `translateX(${ShowHideNegativeValue}${translate}px)`,
    transition: transitionFast ? "0s" : "0.15s",
    height: "auto",
    display: "flex",
    width: `auto`,
    padding: "0px",
    margin: "auto",
    paddingLeft: typeTop
      ? matchPc
        ? "0px"
        : matchTablet
        ? "22px"
        : "9px"
      : "0px",
  });

  ///
  ///
  ///
  /// ACTIVATES SLIDER ITEM TO BE VIEWED ON CLICK
  const clickOptions = (i: number, type: number, source: string) => {
    if (type === 1) {
      setTranslate(stalestate + i);
      setActiveSlide(i);
    } else {
      setTranslate(getSliderWidthNew * i + 1.5 * i);
      setActiveSlide(i);
    }

    if (ActiveSlide === i && source === "upload") {
      OpenUploadModal();
    }
  };

  ///
  ///
  ///
  ///PUSH OPTIONS SLIDE A LITTLE BIT ON LAST SLIDE ITEM
  const TouchJoltOnLastNEXT = () => {
    setShowHideNegativeValue("-");
    var i = ActiveSlide;
    var colorPaddingAllowance = 1.67 + i / 10;
    var getSliderWidthNewx = getSliderWidthNew / 2;
    setTranslate(getSliderWidthNew * i + getSliderWidthNewx);
    nextJoltTimer.current = setTimeout(function () {
      setTranslate(getSliderWidthNew * 0 + colorPaddingAllowance * 0);
      setActiveSlide((ActiveSlide) => 0);
    }, 200);
  };

  ///
  ///
  ///
  ///PUSH OPTIONS SLIDE A LITTLE BIT ON FIRST SLIDE ITEM
  const TouchJoltOnLastPREV = () => {
    setShowHideNegativeValue("");
    var i = ActiveSlide;
    var colorPaddingAllowance = 1.67 + i / 10;
    var ix = optionsImages.length - 1;
    var getSliderWidthNewx = getSliderWidthNew / 2;
    setTranslate(getSliderWidthNewx);
    prevJoltTimer.current = setTimeout(function () {
      setShowHideNegativeValue("-");
      setTranslate(getSliderWidthNew * ix + colorPaddingAllowance * ix);
      setActiveSlide((ActiveSlide) => ix);
    }, 200);
  };

  ///
  ///
  ///
  /// NEXT SLIDE  FOR PC
  const nextSlidePc = () => {
    if (typeTop) {
      closeoptionsslide();
    } else {
      var i = ActiveSlide + 1;
      setShowHideNegativeValue("-");
      ///set((state) => (state + 1) % slides.length)
      if (ActiveSlide === optionsImages.length - 1) {
        settransitionFast(true);
        setTranslate(0);
        setActiveSlide(0);
      } else {
        settransitionFast(false);
        setTranslate(stalestate + i);
        setActiveSlide(i);
      }
    }
  };

  ///
  ///
  ///
  /// NEXT SLIDE
  const nextSlide = () => {
    var i = ActiveSlide + 1;
    var colorPaddingAllowance = 1.67 + i / 10;
    ///set((state) => (state + 1) % slides.length)
    if (ActiveSlide === optionsImages.length - 1) {
      settransitionFast(true);
      TouchJoltOnLastNEXT();
    } else {
      if (nextJoltTimer.current) {
        clearTimeout(nextJoltTimer.current);
      }
      setShowHideNegativeValue("-");
      settransitionFast(false);
      setTranslate(getSliderWidthNew * i + colorPaddingAllowance * i);
      setActiveSlide((ActiveSlide) => ActiveSlide + 1);
    }
  };

  ///
  ///
  ///
  /// PREV SLIDE
  const prevSlide = () => {
    ///set((state) => (state + 1) % slides.length)
    var i = ActiveSlide - 1;
    var colorPaddingAllowance = 1.67 + i / 10;
    if (ActiveSlide === 0) {
      settransitionFast(true);
      if (typeTop) {
        closeoptionsslide();
      } else {
        TouchJoltOnLastPREV();
      }
    } else {
      if (prevJoltTimer.current) {
        clearTimeout(prevJoltTimer.current);
      }
      setShowHideNegativeValue("-");
      settransitionFast(false);
      setTranslate(getSliderWidthNew * i + colorPaddingAllowance * i);
      setActiveSlide((ActiveSlide) => ActiveSlide - 1);
    }
  };

  ///
  ///
  ///
  /// HANDLE TOUCH START EVENT
  const handleTouchStartOptions = (e: any) => {
    ////onMouseDown onMouseMove
    ////touchDown = e.clientX
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  ///
  ///
  ///
  /// HANDLE TOUCH MOVE EVENT
  const handleTouchMoveOptions = (e: any) => {
    if (handleTouchMoveTimer.current) {
      clearTimeout(handleTouchMoveTimer.current);
    }
    handleTouchMoveTimer.current = setTimeout(function () {
      const touchDown = touchPosition;

      if (touchDown === null) {
        return;
      }
      ////currentTouch = e.clientX
      const currentTouch = e.touches[0].clientX;
      const diff = touchDown - currentTouch;

      if (diff > 18) {
        nextSlide();
      } else if (diff < -18) {
        prevSlide();
      } else {
      }

      setTouchPosition(null);
      return false;
    }, 50);

    return false;
  };

  const closeoptionsslide = () => {
    sethaltedTop(false);
    dispatch(UpdateOptionsTop(false));
  };

  return (
    <>
      {typeUpload ? (
        <UploadMenu
          optionsShow={optionsShow}
          optinstopshowingReducer={optinstopshowingReducer}
          typeTop={false}
          closeoptionsslide={closeoptionsslide}
          animationop={animationop}
          optionsCollectImageRef={optionsCollectImageRef}
          handleTouchStartOptions={handleTouchStartOptions}
          handleTouchMoveOptions={handleTouchMoveOptions}
          modalanimation={modalanimation}
          nextSlidePc={nextSlidePc}
          optionsImages={optionsImages}
          ActiveSlide={ActiveSlide}
          optionsNameData={UploadOptionsNameData}
          clickOptions={clickOptions}
          optionsClickType={optionsClickType}
          getSliderWidthNew={getSliderWidthNew}
          cropTOPLEVELScrollRef={cropTOPLEVELScrollRef}
          refWithimageData={refWithimageData}
          CropSaved={CropSaved}
          setCropSaved={setCropSaved}
        />
      ) : (
        <MenuInner
          optionsShow={optionsShow}
          optinstopshowingReducer={optinstopshowingReducer}
          typeTop={typeTop}
          closeoptionsslide={closeoptionsslide}
          animationop={animationop}
          optionsCollectImageRef={optionsCollectImageRef}
          handleTouchStartOptions={handleTouchStartOptions}
          handleTouchMoveOptions={handleTouchMoveOptions}
          modalanimation={modalanimation}
          nextSlidePc={nextSlidePc}
          optionsImages={optionsImages}
          ActiveSlide={ActiveSlide}
          optionsNameData={optionsNameData}
          clickOptions={clickOptions}
          optionsClickType={optionsClickType}
          getSliderWidthNew={getSliderWidthNew}
        />
      )}
    </>
  );
}

export const OptionsSlider = React.memo(OptionsSliderx);
