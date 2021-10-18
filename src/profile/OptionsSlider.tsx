import React, { useRef, useState } from "react";
import { Grid } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { useSpring, animated } from "react-spring";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

function OptionsSliderx({ getSliderWidth }: any) {
  var getSliderWidthNew = matchPc
    ? getSliderWidth / 1.53
    : matchTablet
    ? getSliderWidth / 1
    : getSliderWidth / 0.8;

  var optionsClickType: number = matchPc ? 1 : 0;

  const optionsCollectImageRef = useRef<HTMLDivElement>(null);
  const optionsImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
  const [translate, setTranslate] = useState(0);
  const [stalestate, setstalestate] = useState(1);

  const [ActiveSlide, setActiveSlide] = useState(0);
  const [ShowHideNegativeValue, setShowHideNegativeValue] = useState("-");

  const [touchPosition, setTouchPosition] = useState(null);
  const handleTouchMoveTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [transitionFast, settransitionFast] = useState<boolean>(false);

  const prevJoltTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextJoltTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  var optionsNameData = [
    "filter feeds",
    "albums",
    "playlist",
    "showroom",
    "posts  today",
    "settings",
  ];

  ///
  ///CREATE A SLIDE UP ANIMATION WITH  REACT SPRING
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
  /// PROVIDES DYNAMIC HEIGHT FOR SLIDER CONTENT FROM IMAGE
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
    };
  }
  const { color } = useSelector((state: RootStateReducerColor) => ({
    ...state.GlobalReducerColor,
  }));
  const colorReducer = color;

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

  const TouchJoltOnLastNEXT = () => {
    setShowHideNegativeValue("-");
    var i = ActiveSlide;
    var getSliderWidthNewx = getSliderWidthNew / 2;
    setTranslate(getSliderWidthNew * i + getSliderWidthNewx);
    nextJoltTimer.current = setTimeout(function () {
      setTranslate(getSliderWidthNew * 0 + 1.5 * 0);
      setActiveSlide((ActiveSlide) => 0);
    }, 200);
  };

  const TouchJoltOnLastPREV = () => {
    setShowHideNegativeValue("");
    var i = ActiveSlide;
    var ix = optionsImages.length - 1;
    var getSliderWidthNewx = getSliderWidthNew / 2;
    setTranslate(getSliderWidthNewx);
    prevJoltTimer.current = setTimeout(function () {
      setShowHideNegativeValue("-");
      setTranslate(getSliderWidthNew * ix + 1.5 * ix);
      setActiveSlide((ActiveSlide) => ix);
    }, 200);
  };

  ///
  ///
  ///
  /// NEXT SLIDE
  const nextSlide = () => {
    var i = ActiveSlide + 1;
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
      setTranslate(getSliderWidthNew * i + 1.5 * i);
      setActiveSlide((ActiveSlide) => ActiveSlide + 1);
    }
  };

  ///
  ///
  ///
  /// NEXT SLIDE
  const prevSlide = () => {
    ///set((state) => (state + 1) % slides.length)
    var i = ActiveSlide - 1;
    if (ActiveSlide === 0) {
      settransitionFast(true);
      TouchJoltOnLastPREV();
    } else {
      if (prevJoltTimer.current) {
        clearTimeout(prevJoltTimer.current);
      }
      setShowHideNegativeValue("-");
      settransitionFast(false);
      setTranslate(getSliderWidthNew * i + 1.5 * i);
      setActiveSlide((ActiveSlide) => ActiveSlide - 1);
    }
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

      if (diff > 1) {
        nextSlide();
      } else if (diff < -1) {
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
      <Grid
        container
        onTouchStart={handleTouchStartOptions}
        onTouchMove={handleTouchMoveOptions}
        style={{
          position: "relative",
          margin: "0 auto",
          overflow: "hidden",
          left: "0px",
          paddingBottom: "19px",
        }}
      >
        <animated.div ref={optionsCollectImageRef} style={modalanimation}>
          {optionsImages.map((im: any, i: any) => (
            <>
              <Grid item xs={12}>
                <img
                  onClick={() => {
                    clickOptions(i, optionsClickType);
                  }}
                  className="turprofileLight"
                  style={{
                    width: `${getSliderWidthNew}px`,
                    height: `${getSliderWidthNew}px`,
                    borderRadius: "50%",
                    padding: "0px",
                    objectFit: "cover",
                    marginLeft: "2px",
                    marginTop: "14px",
                    boxShadow: `0 0 3px ${colorReducer}`,
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
                      fontSize: matchPc ? "1vw" : "1.74vh",
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
            </>
          ))}
        </animated.div>
      </Grid>{" "}
    </>
  );
}

export const OptionsSlider = React.memo(OptionsSliderx);
