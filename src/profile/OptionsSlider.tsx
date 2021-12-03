import React, { useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";

function OptionsSliderx({ getSliderWidth }: any) {
  var getSliderWidthNew = matchPc
    ? getSliderWidth / 1.5
    : matchTablet
    ? getSliderWidth / 1.02
    : getSliderWidth / 0.77;

  var optionsClickType: number = matchPc ? 1 : 0;

  const optionsCollectImageRef = useRef<HTMLDivElement>(null);
  const optionsImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
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
  ///OPTIONS SLIDER VARIABLES DISCRIBING ITEMS
  var optionsNameData = [
    "filter feeds",
    "albums",
    "playlist",
    "showroom",
    "posts  today",
    "settings",
  ];

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
    margin: "auto",
  });

  ///
  ///
  ///
  /// ACTIVATES SLIDER ITEM TO BE VIEWED ON CLICK
  const clickOptions = (i: number, type: number) => {
    if (type === 1) {
      setTranslate(stalestate + i);
      setActiveSlide(i);
    } else {
      setTranslate(getSliderWidthNew * i + 1.5 * i);
      setActiveSlide(i);
    }
  };

  ///
  ///
  ///
  /// GET COLOR FROM REDUX STORE
  interface RootStateReducerColor {
    GlobalReducerColor: {
      color: string;
      colordark: string;
    };
  }
  const { color, colordark } = useSelector((state: RootStateReducerColor) => ({
    ...state.GlobalReducerColor,
  }));
  const colorReducer = color;
  const colorDarkReducer = colordark;

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
      TouchJoltOnLastPREV();
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

  return (
    <>
      {optionsShow ? (
        <>
          {" "}
          <Grid
            container
            onTouchStart={handleTouchStartOptions}
            onTouchMove={handleTouchMoveOptions}
            style={{
              scrollSnapAlign: "start",
              position: "relative",
              margin: "0 auto",
              overflow: "hidden",
              left: "0px",
              paddingBottom: "19px",
            }}
          >
            <animated.div ref={optionsCollectImageRef} style={modalanimation}>
              <Grid
                item
                style={{
                  margin: "auto",
                  textAlign: "center",
                  position: "relative",
                  bottom: "0.2em",
                  left: "-4px",
                }}
              >
                <CircleIcon
                  onClick={() => {
                    nextSlidePc();
                  }}
                  className="buttonshake"
                  style={{
                    fontSize: "1.2vw",
                    cursor: "pointer",
                    color: darkmodeReducer
                      ? "rgba(200, 200, 200, 0.1)"
                      : "rgba(005, 005, 005, 0.2)",
                    display: matchPc ? "block" : "none",
                  }}
                />
              </Grid>
              {optionsImages.map((im: any, i: any) => (
                <Grid key={i} item xs={12}>
                  <img
                    alt={` ${optionsNameData[i]}  option`}
                    onClick={() => {
                      clickOptions(i, optionsClickType);
                    }}
                    style={{
                      cursor: ActiveSlide === i ? "pointer" : "alias",
                      width: `${getSliderWidthNew}px`,
                      height: `${getSliderWidthNew}px`,
                      borderRadius: "50%",
                      padding: "0px",
                      objectFit: "cover",
                      marginLeft: "2px",
                      marginTop: "14px",
                      boxShadow: darkmodeReducer
                        ? ActiveSlide === i
                          ? `0 0 5px ${colorDarkReducer}`
                          : ""
                        : ActiveSlide === i
                        ? `0 0 3.5px ${colorReducer}`
                        : "",

                      marginBottom: "2.2px",
                    }}
                    src={`./images/options/${im}`}
                  />
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      position: "relative",
                      bottom: "0.2em",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        fontSize: matchPc ? "1.1vw" : "2vh",
                        fontWeight: "bolder",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        display: ActiveSlide === i ? "block" : "none",
                        color: darkmodeReducer ? "#dddddd" : "#0b111b",
                      }}
                    >
                      {" "}
                      {optionsNameData[i]}
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </animated.div>
          </Grid>
        </>
      ) : (
        <>
          <Grid container>
            <Grid
              item
              xs={9}
              style={{
                textAlign: "right",
                marginTop: matchPc ? "6.4vh" : matchTablet ? "8.8vh" : "8.3vh",
              }}
            >
              <span
                style={{
                  padding: "16px",
                  cursor: "pointer",
                }}
              >
                <CircleIcon
                  style={{
                    fontSize: matchPc
                      ? "1.2vw"
                      : matchTablet
                      ? "2.5vh"
                      : "2.3vh",
                    color: darkmodeReducer
                      ? "rgba(200, 200, 200, 0.1)"
                      : "rgba(005, 005, 005, 0.2)",
                  }}
                />
              </span>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export const OptionsSlider = React.memo(OptionsSliderx);
