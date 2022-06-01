import React, { useRef, useState, useCallback } from "react";

import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { useSpring, animated } from "react-spring";
import { Grid, Switch, DialogContent } from "@material-ui/core";
import CircleIcon from "@mui/icons-material/Circle";
import { useSelector, useDispatch } from "react-redux";
import { UpdateOptionsTop } from ".././GlobalActions";
import { UploadMenu } from "../upload/UploadMenu";
import { MenuInner } from "./MenuInner";
import { ImageFilterinner } from "./ImageFilterinner";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

function OptionsSliderx({
  getSliderWidth,
  getSliderWidthNewx,
  getSliderWidthA,
  typeTop,
  sethaltedTop,
  OpenUploadModal,
  showModalUpload,
  typeUpload,
  cropTOPLEVELScrollRef,
  refWithimageData,
  setallowOverflow,
  itemUploadRef,
  ApplyImageFilter,
  addimageFiltersRef,
  imageFiltersRef,
  getImageWidth,
  length,
  closeUploadModal,
  cropscrollRef,
  allowOverflow,
  selectedImage,
  itemUploadRefThumb,
  duplicateItemupload,
  activeSticker,
  startSuperSticker,
  setactiveSticker,
  seteffectMode,
  effectMode,
  setcallfilter,
  callfilter,
  regimageholdfilter,
  setregimageholdfilter,
  FilterUnderStickerStopFiltering,
  trapfilters,
  settrapfilters,
  sethdfilter,
  hdfilter,
  superstickerIndex,
  superzeroeffect,
  setfinalImageData,
  finalImageData,
  setstartTopicCap,
  setShowModalUpload,
  setStopBodyScroll,
  itemUploadRefSD,
  setsupeFilterLoadFade,
  setsuperSettings,
}: any) {
  ///
  ///
  ///

  ///
  ///
  ///
  /// USE DISPATCH
  const dispatch = useDispatch();

  var optionsClickType: number = matchPc ? 1 : 0;

  const optionsCollectImageRef = useRef<HTMLDivElement>(null);

  const [translate, setTranslate] = useState(0);
  const [stalestate] = useState(1);

  const [ActiveSlide, setActiveSlide] = useState(0);

  const [presentactive, setpresentactive] = useState(0);

  const [Gotoactive, setGotoactive] = useState(0);

  const [ShowHideNegativeValue, setShowHideNegativeValue] = useState("-");

  const [touchPosition, setTouchPosition] = useState(null);
  const handleTouchMoveTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [transitionFast, settransitionFast] = useState<boolean>(false);

  const prevJoltTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextJoltTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [optionsShow, setoptionsShow] = useState<boolean>(true);

  var getSliderWidthNew: number = getSliderWidth;

  var xq;
  xq = matchTablet || matchMobile ? 1 : 2;
  var marginadd = Math.ceil((window.innerWidth * xq) / 100);

  if (typeUpload === 2) {
    var addedwidth;
    addedwidth = matchTablet || matchMobile ? 10.6 : 25;
    getSliderWidthNew = getSliderWidthA + marginadd + addedwidth;
  } else {
    getSliderWidthNew = matchPc
      ? getSliderWidth / 1.5
      : matchTablet
      ? getSliderWidth / 1.02
      : getSliderWidth / 0.77;
  }

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

  var UploadOptionsNameData = ["audio", "images", "gifs", "Continue"];

  var UploadFilterNameData = [
    "normal",
    "lift",
    "juice",
    "kemi",
    "futurama",
    "tentacion",
    "floyd",
    "nebula",
    "jentle",
    "mint",
    "moonshine",
    "vintage",
    "continue",
  ];

  ///
  ///
  ///OPTIONS SLIDER VARIABLES DISCRIBING ITEMS
  const [CropSaved, setCropSaved] = useState(false);

  const optionsImages =
    typeUpload === 2
      ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"]
      : typeUpload === 1
      ? ["1", "2", "3", "4"]
      : typeUpload === 0
      ? typeTop
        ? ["5", "6", "1.jpg", "2.jpg", "3.jpg", "4.jpg"]
        : ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5", "6"]
      : ["1"];

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
    if (matchMobile && typeUpload === 1) {
      setTranslate(stalestate + i);
      setActiveSlide(i);
    } else {
      if (source === "filter2") {
        if (ActiveSlide === i) {
        } else {
          setTranslate(getSliderWidthNew * 7);
        }
        setActiveSlide(optionsImages.length - 1);
      } else if (source === "filter") {
        if (i === 1 || i === 0) {
          if (ActiveSlide === i) {
          } else {
            setTranslate(getSliderWidthNew * 0);
          }
          setActiveSlide(i);
        } else {
          var numberoffilterthumbs = optionsImages.length - 1;
          if (i === numberoffilterthumbs) {
            setActiveSlide(i);
          } else {
            if (i === optionsImages.length) {
              if (ActiveSlide === i) {
              } else {
                setTranslate((translate) => 7);
              }

              setActiveSlide(7);
            } else {
              if (i > ActiveSlide) {
                if (translate + getSliderWidthNew > getSliderWidthNew * 7) {
                  setActiveSlide(i);
                } else {
                  if (ActiveSlide === i) {
                  } else {
                    setTranslate((translate) => translate + getSliderWidthNew);
                  }

                  setActiveSlide(i);
                }
              } else {
                if (translate - getSliderWidthNew < 0) {
                  setActiveSlide(i);
                } else {
                  if (ActiveSlide === i) {
                  } else {
                    setTranslate((translate) => translate - getSliderWidthNew);
                  }

                  setActiveSlide(i);
                }
              }
            }
          }
        }
      } else {
        if (type === 1) {
          setTranslate(stalestate + i);
          setActiveSlide(i);
        } else {
          setTranslate(getSliderWidthNew * i + 1.5 * i);
          setActiveSlide(i);
        }

        var circleIdentify = typeTop ? 0 : 4;
        var circleIdentify2 = typeTop ? 1 : 5;

        if (ActiveSlide === i && source === "upload" && i === circleIdentify2) {
          OpenUploadModal();
        } else if (
          ActiveSlide === i &&
          source === "upload" &&
          i === circleIdentify
        ) {
          setsuperSettings(true);
        }
      }
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

    if (typeUpload === 1) {
      setTranslate(0 + getSliderWidthNewx);
    } else {
      setTranslate(getSliderWidthNew * i + getSliderWidthNewx);
    }
    nextJoltTimer.current = setTimeout(function () {
      if (typeUpload === 1) {
        setTranslate(0);
      } else {
        setTranslate(getSliderWidthNew * 0 + colorPaddingAllowance * 0);
      }
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
      if (typeUpload === 1) {
        setTranslate(0);
      } else {
        setTranslate(getSliderWidthNew * ix + colorPaddingAllowance * ix);
      }
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
      setActiveSlide((ActiveSlide) => ActiveSlide + 1);
      if (typeUpload === 1) {
        setTranslate(stalestate + i);
      } else {
        setTranslate(getSliderWidthNew * i + colorPaddingAllowance * i);
      }
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
      setActiveSlide((ActiveSlide) => ActiveSlide - 1);
      if (typeUpload === 1) {
        setTranslate(stalestate - i);
      } else {
        setTranslate(getSliderWidthNew * i + colorPaddingAllowance * i);
      }
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
      {typeUpload === 1 ? (
        <>
          <UploadMenu
            setShowModalUpload={setShowModalUpload}
            setStopBodyScroll={setStopBodyScroll}
            allowOverflow={allowOverflow}
            cropscrollRef={cropscrollRef}
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
            setallowOverflow={setallowOverflow}
            closeUploadModal={closeUploadModal}
          />{" "}
        </>
      ) : typeUpload === 0 ? (
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
      ) : (
        <ImageFilterinner
          setstartTopicCap={setstartTopicCap}
          finalImageData={finalImageData}
          setfinalImageData={setfinalImageData}
          superzeroeffect={superzeroeffect}
          superstickerIndex={superstickerIndex}
          sethdfilter={sethdfilter}
          hdfilter={hdfilter}
          settrapfilters={settrapfilters}
          trapfilters={trapfilters}
          FilterUnderStickerStopFiltering={FilterUnderStickerStopFiltering}
          regimageholdfilter={regimageholdfilter}
          setregimageholdfilter={setregimageholdfilter}
          setcallfilter={setcallfilter}
          callfilter={callfilter}
          seteffectMode={seteffectMode}
          effectMode={effectMode}
          setactiveSticker={setactiveSticker}
          activeSticker={activeSticker}
          startSuperSticker={startSuperSticker}
          duplicateItemupload={duplicateItemupload}
          itemUploadRefThumb={itemUploadRefThumb}
          selectedImage={selectedImage}
          length={length}
          ActiveSlide={ActiveSlide}
          getImageWidth={getImageWidth}
          imageFiltersRef={imageFiltersRef}
          getSliderWidthNew={getSliderWidthA}
          optionsShow={optionsShow}
          optinstopshowingReducer={optinstopshowingReducer}
          typeTop={typeTop}
          itemUploadRef={itemUploadRef}
          closeoptionsslide={closeoptionsslide}
          animationop={animationop}
          optionsCollectImageRef={optionsCollectImageRef}
          handleTouchStartOptions={handleTouchStartOptions}
          handleTouchMoveOptions={handleTouchMoveOptions}
          modalanimation={modalanimation}
          nextSlidePc={nextSlidePc}
          optionsImages={optionsImages}
          optionsNameData={UploadFilterNameData}
          clickOptions={clickOptions}
          optionsClickType={optionsClickType}
          itemUploadRefSD={itemUploadRefSD}
          setsupeFilterLoadFade={setsupeFilterLoadFade}
        />
      )}
    </>
  );
}

export const OptionsSlider = React.memo(OptionsSliderx);
