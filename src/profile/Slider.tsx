import React, { useState, useRef, useCallback, useEffect } from "react";
import { Arrow } from "./Arrow";
import { Dots } from "./Dots";
import { SliderNumber } from "./SliderNumber";
import { Grid } from "@material-ui/core";
import { animated, useTransition } from "react-spring";
import { RootStateOrAny, useSelector } from "react-redux";
import { matchMobile, matchPc, matchTablet } from "../DetectDevice";

function Sliderx({
  slides,
  pey,
  addPostItemsRef,
  itemheight,
  onPostsItemClicked,
  onPostsItemload,
  post,
  itemFinalPostHeight,
  itemOriginalPostHeight,
  itemcroptype,
  itemCLICKED,
  ActiveAutoPlay,
  setActiveAutoPlay,
  AUTOSlideLongImages,
  clickslider,
  stopSlider,
  SliderAutoPlay,
  showSliderLoader,
  setshowSliderLoader,
  autoPlayTimer,
  sliderIndex,
  setSliderIndex,
  sliderIndexSlow,
  setSliderIndexSlow,
  length,
}: any): JSX.Element {
  const [sliderDuration] = useState(1500);

  /// const getWidth = () => window.innerWidth;
  ///var newGetWidth = getWidth() * slides.length;

  const waitChangeIndexTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleTouchMoveTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const callAutoPlayAgainTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const SlideimageRef = useRef<HTMLImageElement>(null);

  const SlideimageRefthumb = useRef<HTMLImageElement>(null);

  const [imageHeight, setImageHeight] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);

  ///
  ///
  ///
  /// GET DARKMODE FROM REDUX STORE
  interface RootStateActiveAutoPlayReducer {
    ActiveAutoPlayReducer: {
      ActiveId: number;
    };
  }
  const { ActiveId } = useSelector((state: RootStateActiveAutoPlayReducer) => ({
    ...state.ActiveAutoPlayReducer,
  }));

  const ActiveIdReducer = ActiveId;

  useEffect(() => {
    if (ActiveAutoPlay[pey]) {
      setTimeout(function () {
        stopSlider(0);
      }, 1500);
    }
  }, [ActiveAutoPlay[pey]]);

  var autoSlideDisplay = "none";
  var sliderLoader = "";

  if (showSliderLoader) {
    autoSlideDisplay = "none";
    sliderLoader = "";
  } else {
    autoSlideDisplay = "block";
    sliderLoader = "superloaderAutoSlider";
  }

  ///
  ///
  ///
  /// SPRING TRANSITION WITH INDEX
  const transitions = useTransition(sliderIndex, {
    key: sliderIndex,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: sliderDuration - 50 },
  });

  ///
  ///
  ///
  /// PROVIDES DYNAMIC HEIGHT FOR SLIDER CONTENT FROM IMAGE
  const sliderFirstImageOnLoad = (item: number) => {
    if (item === 0) {
      if (SlideimageRef.current && SlideimageRef.current.clientHeight) {
        setImageHeight(SlideimageRef.current.clientHeight);
      }
    }
  };

  ///
  ///
  ///
  /// PROVIDES DYNAMIC HEIGHT FOR SLIDER CONTENT FROM THUMBS IF IMAGE DOES NOT LOAD
  const sliderFirstImageOnLoadthumb = (item: number) => {
    if (item === 0 && imageHeight === 0) {
      if (
        SlideimageRefthumb.current &&
        SlideimageRefthumb.current.clientHeight
      ) {
        setImageHeight(SlideimageRefthumb.current.clientHeight);
      }
    }
  };

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
  /// HANDLE TOUCH START EVENT
  const handleTouchStart = (e: any) => {
    if (itemCLICKED[pey]) {
      ////onMouseDown onMouseMove
      ////touchDown = e.clientX
      const touchDown = e.touches[0].clientX;
      setTouchPosition(touchDown);
    }
  };

  ///
  ///
  ///
  /// HANDLE TOUCH MOVE EVENT
  const handleTouchMove = (e: any) => {
    if (itemCLICKED[pey]) {
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

        if (diff > 40) {
          nextSlide();
        } else if (diff < -40) {
          prevSlide();
        } else {
        }

        setTouchPosition(null);
        return false;
      }, 200);

      return false;
    }
  };

  ///
  ///
  ///
  /// WAITS FOR SOME SECS BEFORE CHANGING SLIDE IDENTIFIER(DOTS,ACTIVESLIDES)
  const waitChangeIndex = (data: number, state: any) => {
    if (waitChangeIndexTimer.current) {
      clearTimeout(waitChangeIndexTimer.current);
    }
    waitChangeIndexTimer.current = setTimeout(function () {
      setSliderIndexSlow((state: any) => data);
    }, 500);
  };

  ///
  ///
  ///
  /// NEXT SLIDE
  const nextSlide = () => {
    AUTOSlideLongImages(pey);

    if (ActiveAutoPlay[pey]) {
    } else {
      setshowSliderLoader(true);
      if (autoPlayTimer.current) {
        clearTimeout(autoPlayTimer.current);
      }
    }

    ///set((state) => (state + 1) % slides.length);
    if (sliderIndex === slides.length - 1) {
      setSliderIndex((sliderIndex: any) => 0);
      waitChangeIndex(0, sliderIndex);
    } else {
      setSliderIndex((sliderIndex: any) => sliderIndex + 1);
      waitChangeIndex(sliderIndex + 1, sliderIndex);
    }

    if (ActiveAutoPlay[pey]) {
    } else {
      if (callAutoPlayAgainTimer.current) {
        clearTimeout(callAutoPlayAgainTimer.current);
      }
      callAutoPlayAgainTimer.current = setTimeout(function () {
        SliderAutoPlay(1);
      }, sliderDuration);
    }
  };

  ///
  ///
  ///
  /// PREV SLIDE
  const prevSlide = () => {
    AUTOSlideLongImages(pey);
    if (ActiveAutoPlay[pey]) {
    } else {
      setshowSliderLoader(true);
      if (autoPlayTimer.current) {
        clearTimeout(autoPlayTimer.current);
      }
    }

    if (sliderIndex === 0) {
      setSliderIndex((sliderIndex: any) => slides.length - 1);
      waitChangeIndex(slides.length - 1, sliderIndex);
    } else {
      setSliderIndex((sliderIndex: any) => sliderIndex - 1);
      waitChangeIndex(sliderIndex - 1, sliderIndex);
    }
    if (ActiveAutoPlay[pey]) {
    } else {
      if (callAutoPlayAgainTimer.current) {
        clearTimeout(callAutoPlayAgainTimer.current);
      }
      callAutoPlayAgainTimer.current = setTimeout(function () {
        SliderAutoPlay(1);
      }, sliderDuration);
    }
  };

  ///
  ///
  ///
  /// CHANGE SLIDER CONTENT USING  DOTS
  const GotoDots = (clickedDot: number) => {
    setSliderIndex((sliderIndex: any) => clickedDot);
    waitChangeIndex(clickedDot, sliderIndex);
  };

  return (
    <>
      <Grid
        item
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        xs={12}
        style={{
          position: "relative",
          height: itemCLICKED[pey]
            ? `${itemOriginalPostHeight[pey]}px`
            : `${itemFinalPostHeight[pey]}px`,
          padding: "0px",
        }}
      >
        <Grid
          container
          className={
            darkmodeReducer
              ? `${sliderLoader} turdark`
              : `${sliderLoader} turlight`
          }
          style={{
            boxShadow: `0 0 3px ${post.color}`,
            backgroundColor: post.color,
            height: "3px",
            position: "absolute",
            display: autoSlideDisplay,
            zIndex: 100000,
            top: "0em",
          }}
        ></Grid>
        {slides.length > 0 ? (
          <SliderNumber
            activeSlide={sliderIndexSlow}
            total={slides.length}
            itemCLICKED={itemCLICKED}
            pey={pey}
          />
        ) : null}
        <Arrow
          itemCLICKED={itemCLICKED}
          pey={pey}
          total={slides.length}
          direction="left"
          clickSlideprev={prevSlide}
          clickSlidenext={nextSlide}
          itemOriginalPostHeight={itemOriginalPostHeight}
        />
        {transitions((style, i) => (
          <>
            <animated.img
              onLoad={(e: any) => {
                onPostsItemload(e, pey, i);
              }}
              onMouseDown={clickslider}
              key={i}
              ref={addPostItemsRef}
              className={
                darkmodeReducer ? "turlightpostdark" : "turlightpostlight"
              }
              src={`./images/posts/${slides[i]}`}
              alt="a superstarz post "
              style={{
                ...style,
                cursor: "copy",
                width: "100%",
                height: itemheight[pey],
                position: "absolute",
                padding: "0px",
                objectFit:
                  itemcroptype[pey] === 1 || itemcroptype[pey] === 2
                    ? "cover"
                    : "cover",
                objectPosition:
                  itemcroptype[pey] === 1 || itemcroptype[pey] === 2
                    ? "50% top"
                    : "50% 50",
                zIndex: 1,
                float: "left",
              }}
            />
          </>
        ))}{" "}
        <Dots
          total={slides.length}
          itemCLICKED={itemCLICKED}
          pey={pey}
          GotoDots={GotoDots}
          slides={slides}
          activeSlide={sliderIndexSlow}
        />
      </Grid>
    </>
  );
}

export const Slider = React.memo(Sliderx);
