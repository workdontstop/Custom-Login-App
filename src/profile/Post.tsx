import React, { useRef, useState, useEffect, useCallback } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSpring, animated, useTransition } from "react-spring";
import Crop54Icon from "@mui/icons-material/Crop54";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import ViewArrayIcon from "@mui/icons-material/ViewArray";
import CropIcon from "@mui/icons-material/Crop";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import AspectRatioTwoToneIcon from "@mui/icons-material/AspectRatioTwoTone";
import StarIcon from "@mui/icons-material/Star";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import AlbumIcon from "@mui/icons-material/Album";
import BentoIcon from "@mui/icons-material/Bento";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import CircleIcon from "@mui/icons-material/Circle";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { matchMobile, matchPc, matchTablet } from "../DetectDevice";
import { Slider } from "./Slider";

function Postx({
  pey,
  addPostItemsRef,
  onPostsItemload,
  post,
  length,
  itemheight,
  itemheighthold,
  postbackheight,
  itemcroptype,
  itemFinalPostHeight,
  onPostsItemClicked,
  itemCLICKED,
  addpostDivRef,
  postDatainner,
  itemOriginalPostHeight,
  ActiveAutoPlay,
  setActiveAutoPlay,
  AUTOSlideLongImages,
  postDivRef,
  onLoadDataOnce,
}: any) {
  const [autoSlideDuration] = useState(6000);

  const dispatch = useDispatch();

  const [opacityController, setopacityController] = useState<boolean>(false);

  const [LImiter, setLImiter] = useState<boolean>(false);

  var emoOpacity = 0.25;

  useEffect(() => {
    if (onLoadDataOnce[pey]) {
      if (LImiter) {
      } else {
        setTimeout(() => {
          setopacityController(true);
        }, pey * 250);
        setLImiter(true);
      }
    }
  }, [onLoadDataOnce, LImiter]);

  ///
  ///
  ///
  /// SPRING TRANSITION WITH INDEX
  const animationmenu = useSpring({
    config: {
      duration: 250,
    },
    opacity: opacityController ? 1 : 0,
    transform: opacityController ? `translateY(0%)` : `translateY(150%)`,
  });

  ///
  ///
  ///
  /// INTERFACE/TYPES FOR SCREENHEIGHT AND DARKMODE
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
      screenHeight: number;
    };
  }

  ///
  ///
  ///
  /// GET SCREENHEIGHT FROM REDUX STORE
  const { screenHeight, darkmode } = useSelector(
    (state: RootStateGlobalReducer) => ({
      ...state.GlobalReducer,
    })
  );
  const screenHeightReducer = screenHeight;
  const darkmodeReducer = darkmode;

  var textback = "";
  if (darkmodeReducer) {
    textback = "caption-darkPost";
  } else {
    textback = "caption-lightPost";
  }

  const showcaptionwaitTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [showSliderLoader, setshowSliderLoader] = useState(true);

  const autoPlayTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderIndexSlow, setSliderIndexSlow] = useState(0);

  const waitChangeIndexTimer2 = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const flashBlackAndWhite = () => {
    postDivRef.current[pey].style.filter = "grayscale(100%)";

    setTimeout(function () {
      postDivRef.current[pey].style.filter = "none";
    }, 500);
  };

  const stopSlider = (type: any) => {
    if (type === 1) {
      flashBlackAndWhite();
    }

    ///////////////////////////////
    const newArrxq = [...ActiveAutoPlay];
    newArrxq[pey] = true;
    setActiveAutoPlay(newArrxq);
    ////////////////////////////
    setshowSliderLoader(true);
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
  };

  ///
  ///
  ///
  /// SHOW  LOGIN PASSWORD FOR A WHILE
  const startSlider = useCallback(() => {
    flashBlackAndWhite();
    //////the callback is passed the element, the index, and the array itself.
    ActiveAutoPlay.forEach(function (part: any, index: any, theArray: any) {
      if (pey === index) {
        theArray[index] = false;
      } else {
        theArray[index] = true;
      }
      if (index === ActiveAutoPlay.length) {
        setActiveAutoPlay(theArray);
      }
    });

    ///////////////////////////////
    const newArrxq = [...ActiveAutoPlay];
    newArrxq[pey] = false;
    setActiveAutoPlay(newArrxq);
    ////////////////////////////
    setshowSliderLoader(false);
    autoPlayTimer.current = setInterval(function () {
      AUTOSlideLongImages(pey);
      setshowSliderLoader(true);

      setSliderIndex((state) => (state + 1) % postDatainner[pey].length);
      if (waitChangeIndexTimer2.current) {
        clearTimeout(waitChangeIndexTimer2.current);
      }
      waitChangeIndexTimer2.current = setTimeout(function () {
        setSliderIndexSlow((state) => (state + 1) % postDatainner[pey].length);
        setshowSliderLoader(false);
      }, 500);
    }, autoSlideDuration);
  }, [ActiveAutoPlay[pey], ActiveAutoPlay]);

  const SliderAutoPlay = (type: number) => {
    if (type === 1) {
      startSlider();
    } else {
      if (ActiveAutoPlay[pey]) {
        startSlider();
      } else {
        stopSlider(1);
      }
    }
  };

  ///
  ///
  ///
  /// CHANGE SLIDER CONTENT USING  DOTS
  const checkifClicked = () => {
    if (itemCLICKED[pey]) {
      if (ActiveAutoPlay[pey]) {
        onPostsItemClicked(pey);
      } else {
        SliderAutoPlay(0);
      }
    } else {
      onPostsItemClicked(pey);
    }
  };

  ///
  ///
  ///
  /// CHANGE SLIDER CONTENT USING  DOTS
  const checkifClickedDouble = () => {
    if (itemCLICKED[pey]) {
      if (showcaptionwaitTimer.current) {
        clearTimeout(showcaptionwaitTimer.current);
      }

      SliderAutoPlay(0);
    } else {
    }
  };

  ///
  ///
  ///
  /// CLICK BILLBOARD OPEN ON DOUBLE CLICK
  const clickslider = (e: any) => {
    switch (e.detail) {
      case 1:
        checkifClicked();
        break;
      case 2:
        checkifClickedDouble();
        break;
      case 3:
        checkifClickedDouble();
        break;
      case 4:
        checkifClickedDouble();
        break;
    }
  };

  var postcropfont = matchPc ? "2.1vw" : matchTablet ? "4vh" : "3.6vh";
  var postcroppadding = matchPc ? "17px" : matchTablet ? "20px" : "4px";
  var cropTop: number = matchPc ? 1.5 : matchTablet ? 7 : -2;

  var posteyefont = matchPc ? "1.75vw" : matchTablet ? "3.4vh" : "3.3vh";
  var posteyeleft = matchPc ? "92.4%" : matchTablet ? "92.693%" : "90%";
  var eyeTop = matchPc ? "-9px" : matchTablet ? "-6px" : "-12px";

  var emotionClass = matchPc
    ? "turpostDark emotionspostPC"
    : matchTablet
    ? "turpostDark emotionspostTablet"
    : "turpostDark emotionspostMOBILE";

  var emo = matchPc
    ? 12
    : matchTablet
    ? 20
    : itemcroptype[pey] === 1
    ? 15.5
    : 17;

  var emolove = matchPc
    ? itemcroptype[pey] === 1
      ? 90
      : 120
    : matchTablet
    ? 170
    : itemcroptype[pey] === 1
    ? 130
    : 135;

  var emocool = matchPc
    ? itemcroptype[pey] === 1
      ? 90
      : 120
    : matchTablet
    ? 145
    : itemcroptype[pey] === 1
    ? 110
    : 115;

  var emocare = matchPc
    ? itemcroptype[pey] === 1
      ? 90
      : 120
    : matchTablet
    ? 115
    : itemcroptype[pey] === 1
    ? 90
    : 95;

  var emofunny = matchPc
    ? itemcroptype[pey] === 1
      ? 90
      : 120
    : matchTablet
    ? 90
    : itemcroptype[pey] === 1
    ? 70
    : 73;

  var profilewidth = matchPc ? "9.5%" : matchTablet ? "12.5%" : "15%";
  var postprofiletop = matchPc ? "-0.9vh" : matchTablet ? "-9.3vh" : "-8.7vh";

  var postusernametop = matchPc
    ? "-4.5vh"
    : matchTablet
    ? "-11.9vh"
    : "-11.5vh";

  var postusernamefont = matchPc ? "1.2vw" : matchTablet ? "2.32vh" : "1.9vh";
  var postusernameleft = matchPc ? "11.1%" : matchTablet ? "15.5%" : "17.5%";

  var postcirclefont = matchPc ? "0.7vw" : matchTablet ? "1.2vw" : "1.1vh";
  var dotspace = matchPc ? "1.7vw" : matchTablet ? "1.9vh" : "1.9vh";
  var dotspace2 = matchPc ? "0.9vw" : matchTablet ? "1.9vh" : "1.9vh";

  var posttopicfont = matchPc ? "1.05vw" : matchTablet ? "1.8vh" : "1.6vh";

  var postcaptiontop = matchPc ? "-1.85vh" : matchTablet ? "-9.2vh" : "-9.6vh";
  var postcaptionfont = matchPc ? "1.2vw" : matchTablet ? "2.35vh" : "1.82vh";
  var postcaptionline = matchPc ? "2.1" : matchTablet ? "1.9" : "1.95";
  var postcaptionleft = matchPc ? "11.1%" : matchTablet ? "15.5%" : "17.5%";
  var postcaptionheight = matchPc ? "10.1vh" : matchTablet ? "8.3vh" : "8.8vh";
  var postcaptionwidth = matchPc ? "79.5%" : matchTablet ? "76%" : "84%";

  var postcommenttop = matchPc
    ? itemcroptype[pey] === 1 || itemcroptype[pey] === 2
      ? itemheighthold[pey] - 30
      : itemheighthold[pey] - 6
    : matchTablet
    ? itemcroptype[pey] === 1 || itemcroptype[pey] === 2
      ? itemheighthold[pey] - 40
      : itemheighthold[pey] - 10
    : itemcroptype[pey] === 1 || itemcroptype[pey] === 2
    ? itemcroptype[pey] === 1
      ? itemheighthold[pey] - 24
      : itemheighthold[pey] - 40
    : itemheighthold[pey] - 13;
  var postcommentfont = matchPc ? "1.8vw" : matchTablet ? "4vh" : "3.15vh";
  var postcommentwidth = matchPc ? "99.7%" : matchTablet ? "97.5%" : "95.5%";

  var postoptionstop = matchPc ? "-9vh" : matchTablet ? "-15.4vh" : "-20.2vh";
  var postoptionsleft = matchPc ? "95.5%" : matchTablet ? "94.7%" : "93.2%";
  var postvertfont = matchPc ? "2.2vw" : matchTablet ? "3.6vh" : "3.6vh";

  var postdatetop = matchPc ? "2.15vh" : matchTablet ? "-7.7vh" : "-7.8vh";
  var postdatefont = matchPc ? "0.9vw" : matchTablet ? "1.25vh" : "1.25vh";
  var postdateleft = matchPc ? "98%" : matchTablet ? "98.5%" : "96.3%";

  var emocolor = "";

  return (
    <>
      <animated.div style={animationmenu}>
        <div
          ref={addpostDivRef}
          style={{
            padding: "0px",
            width: "100%",
            marginTop: pey === 0 || pey === 1 ? "-0.5px" : "-1.1px",
            zIndex: length - 1 - pey,
          }}
        >
          {/*///////////////////////////////////////////////////////////////////////////POST DATA*/}

          <Slider
            ActiveAutoPlay={ActiveAutoPlay}
            setActiveAutoPlay={setActiveAutoPlay}
            pey={pey}
            addPostItemsRef={addPostItemsRef}
            itemheight={itemheight}
            onPostsItemClicked={onPostsItemClicked}
            onPostsItemload={onPostsItemload}
            post={post}
            slides={postDatainner[pey]}
            itemcroptype={itemcroptype}
            itemFinalPostHeight={itemFinalPostHeight}
            itemCLICKED={itemCLICKED}
            itemOriginalPostHeight={itemOriginalPostHeight}
            AUTOSlideLongImages={AUTOSlideLongImages}
            clickslider={clickslider}
            stopSlider={stopSlider}
            SliderAutoPlay={SliderAutoPlay}
            showSliderLoader={showSliderLoader}
            setshowSliderLoader={setshowSliderLoader}
            autoPlayTimer={autoPlayTimer}
            sliderIndex={sliderIndex}
            setSliderIndex={setSliderIndex}
            sliderIndexSlow={sliderIndexSlow}
            setSliderIndexSlow={setSliderIndexSlow}
            length={length}
          />
          {/*///////////////////////////////////////////////////////////////////////////POST DATA*/}
          {itemCLICKED[pey] ? null : (
            <>
              <div
                className={
                  darkmodeReducer
                    ? "post-background-dark"
                    : "post-background-light"
                }
                style={{
                  height: `${postbackheight}px`,
                  marginTop: `-${postbackheight - 1}px`,
                  position: "relative",
                  transition: "all 350ms ease",
                  zIndex: 2,
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                }}
              >
                {/*///////////////////////////////////////////////////////////////////////////COMMENT*/}
                <div
                  className={
                    darkmodeReducer
                      ? "zuperxyinfoPostDark"
                      : "zuperxyinfoPostLight"
                  }
                  style={{
                    top: `-${postcommenttop}px`,
                    position: "relative",
                    transition: "all 350ms ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    zIndex: 2,
                    height: "0px",
                    width: postcommentwidth,
                    paddingLeft: "2vw",
                    fontWeight: "bolder",
                    opacity: darkmodeReducer ? 0.5 : 0.65,
                  }}
                >
                  {" "}
                  <span
                    style={{
                      marginLeft: matchPc ? "-1%" : matchTablet ? "2%" : "0.6%",
                      verticalAlign: "middle",
                    }}
                  ></span>
                </div>
                {/*///////////////////////////////////////////////////////////////////////////COMMENT*/}

                <Grid
                  item
                  xs={12}
                  style={{
                    position: "absolute",
                    top: `-20vh`,
                    width: matchPc ? "13%" : matchTablet ? "14%" : "22%",
                    height: matchPc ? "160px" : matchTablet ? "150px" : "200px",
                    marginLeft: matchPc ? "87%" : matchTablet ? "86%" : "78%",
                    zIndex: 7,
                  }}
                ></Grid>
                {/*///////////////////////////////////////////////////// opacity: 0.6,//////////////////////EMOTIONS*/}

                <Grid
                  item
                  xs={12}
                  style={{
                    top: `-${emo}vh`,
                    width: matchPc ? "4vw" : matchTablet ? "5vw" : "5vw",
                    height: matchPc ? "6.5vh" : matchTablet ? "7vh" : "6vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 8,
                    left: matchPc ? "91.5%" : matchTablet ? "93%" : "92.3%",
                    backgroundColor: emocolor,
                    opacity: emoOpacity,
                  }}
                >
                  <span
                    className={darkmodeReducer ? "turdarkemo" : "turlightemo"}
                    style={{
                      padding: "2px",
                      width: matchPc ? "1.4vw" : matchTablet ? "4vw" : "10vw",
                      height: matchPc ? "1.4vw" : matchTablet ? "3vh" : "2.8vh",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  >
                    <img
                      className={emotionClass}
                      src={`./images/emotions/love.png`}
                      alt="a superstarz post "
                      style={{
                        cursor: "pointer",
                        boxShadow: darkmodeReducer
                          ? "0 0 1px #555555"
                          : "0 0 0.1px #222222",
                        width: "100%",
                        height: "auto",
                        padding: "0px",
                        objectFit: "contain",
                        borderRadius: "50%",
                      }}
                    />
                  </span>{" "}
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    top: `-${emo}vh`,
                    width: matchPc ? "4vw" : matchTablet ? "5vw" : "5vw",
                    height: matchPc ? "6.5vh" : matchTablet ? "7vh" : "6vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 8,
                    left: matchPc ? "91.5%" : matchTablet ? "93%" : "92.3%",
                    backgroundColor: emocolor,
                    opacity: emoOpacity,
                  }}
                >
                  <span
                    className={darkmodeReducer ? "turdarkemo" : "turlightemo"}
                    style={{
                      padding: "2px",
                      width: matchPc ? "1.4vw" : matchTablet ? "4vw" : "10vw",
                      height: matchPc ? "1.4vw" : matchTablet ? "3vh" : "2.8vh",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  >
                    <img
                      className={emotionClass}
                      src={`./images/emotions/cool.png`}
                      alt="a superstarz post "
                      style={{
                        cursor: "pointer",
                        boxShadow: darkmodeReducer
                          ? "0 0 1px #555555"
                          : "0 0 0.1px #222222",
                        width: "100%",
                        height: "auto",
                        padding: "0px",
                        objectFit: "contain",
                        borderRadius: "50%",
                      }}
                    />
                  </span>
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    top: `-${emo}vh`,
                    width: matchPc ? "4vw" : matchTablet ? "5vw" : "5vw",
                    height: matchPc ? "6.5vh" : matchTablet ? "7vh" : "6vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 8,
                    left: matchPc ? "91.5%" : matchTablet ? "93%" : "92.3%",
                    backgroundColor: emocolor,
                    opacity: emoOpacity,
                  }}
                >
                  <span
                    className={darkmodeReducer ? "turdarkemo" : "turlightemo"}
                    style={{
                      padding: "2px",
                      width: matchPc ? "1.4vw" : matchTablet ? "4vw" : "10vw",
                      height: matchPc ? "1.4vw" : matchTablet ? "3vh" : "2.8vh",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  >
                    <img
                      className={emotionClass}
                      src={`./images/emotions/oo.png`}
                      alt="a superstarz post "
                      style={{
                        cursor: "pointer",
                        boxShadow: darkmodeReducer
                          ? "0 0 1px #555555"
                          : "0 0 0.1px #222222",
                        width: "100%",
                        height: "auto",
                        padding: "0px",
                        objectFit: "contain",
                        borderRadius: "50%",
                      }}
                    />
                  </span>
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    top: `-${emo}vh`,
                    width: matchPc ? "4vw" : matchTablet ? "5vw" : "5vw",
                    height: matchPc ? "6.5vh" : matchTablet ? "7vh" : "6vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 8,
                    left: matchPc ? "91.5%" : matchTablet ? "93%" : "92.3%",
                    backgroundColor: emocolor,
                    opacity: emoOpacity,
                  }}
                >
                  <span
                    className={darkmodeReducer ? "turdarkemo" : "turlightemo"}
                    style={{
                      padding: "2px",
                      width: matchPc ? "1.4vw" : matchTablet ? "4vw" : "10vw",
                      height: matchPc ? "1.4vw" : matchTablet ? "3vh" : "2.8vh",
                      borderRadius: "50%",
                      margin: "auto",
                    }}
                  >
                    <img
                      className={emotionClass}
                      src={`./images/emotions/laugh.png`}
                      alt="a superstarz post "
                      style={{
                        cursor: "pointer",
                        boxShadow: darkmodeReducer
                          ? "0 0 1px #555555"
                          : "0 0 0.1px #222222",
                        width: "100%",
                        height: "auto",
                        padding: "0px",
                        objectFit: "contain",
                        borderRadius: "50%",
                      }}
                    />
                  </span>
                </Grid>

                {/*///////////////////////////////////////////////////////////////////////////EMOTIONS*/}

                {/*///////////////////////////////////////////////////////////////////////////BACKPAD CLICKABLE*/}
                <div
                  onClick={clickslider}
                  style={{
                    opacity: darkmodeReducer ? 0.89 : 0.94,
                    cursor: "copy",
                    top: `-1vh`,
                    position: "absolute",
                    zIndex: 6,
                    paddingLeft: "2vw",
                    fontFamily: "Arial, Helvetica, sans-seri",
                    height: "80px",
                    width: "100%",
                  }}
                ></div>
                {/*///////////////////////////////////////////////////////////////////////////BACKPAD CLICKABLE*/}
                {/*///////////////////////////////////////////////////////////////////////////PROFILE-PIC*/}
                <div
                  className="zuperxyinfo"
                  style={{
                    opacity: 1,
                    top: postprofiletop,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    zIndex: 1,
                    paddingLeft: matchPc
                      ? "1.4vw"
                      : matchTablet
                      ? "2.3vw"
                      : "2.1vw",
                    height: "0px",
                    fontFamily: "Arial, Helvetica, sans-seri",
                  }}
                >
                  <img
                    className={darkmodeReducer ? "turpostDark" : "turpostLight"}
                    src={`./images/profile/${post.profile_image}`}
                    alt="a superstarz post "
                    style={{
                      cursor: "pointer",
                      boxShadow: darkmodeReducer
                        ? "0 0 1px #555555"
                        : "0 0 3.5px #aaaaaa",
                      width: profilewidth,
                      height: "auto",
                      padding: "0px",
                      objectFit: "contain",
                      borderRadius: "50%",
                      position: "relative",
                      zIndex: 1,
                    }}
                  />
                </div>
                {/*///////////////////////////////////////////////////////////////////////////PROFILE-PIC*/}
                {/*///////////////////////////////////////////////////////////////////////////USERNAME AND TOPIC*/}
                <div
                  className={
                    darkmodeReducer
                      ? "zuperxyinfoPostDark"
                      : "zuperxyinfoPostLight"
                  }
                  style={{
                    top: postusernametop,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    zIndex: 1,
                    paddingLeft: "2vw",
                    fontFamily: "Arial, Helvetica, sans-seri",
                    marginLeft: postusernameleft,
                    height: "0px",
                  }}
                >
                  <span>
                    <span
                      className={
                        darkmodeReducer ? "zuperkinglight" : "zuperkinglight"
                      }
                      style={{
                        color: darkmodeReducer ? "#dddddd" : "#ffffff",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: postusernamefont,
                        }}
                      >
                        {post.username}
                      </span>

                      <span
                        style={{
                          opacity: 0,
                          fontSize: dotspace,
                        }}
                      >
                        .
                      </span>
                      {itemcroptype[pey] === 1 ? (
                        <AlbumIcon
                          className="zuperkingIconPostLight"
                          style={{
                            fontSize: postcirclefont,
                            color: "pink",
                          }}
                        />
                      ) : itemcroptype[pey] === 2 ? (
                        <AlbumIcon
                          className="zuperkingIconPostLight"
                          style={{
                            fontSize: postcirclefont,
                            color: "blue",
                          }}
                        />
                      ) : (
                        <CircleIcon
                          className="zuperkingIconPostLight"
                          style={{
                            fontSize: postcirclefont,
                            color: "yellow",
                          }}
                        />
                      )}

                      <span
                        style={{
                          opacity: 0,
                          fontSize: dotspace2,
                        }}
                      >
                        .
                      </span>

                      <span
                        style={{
                          fontSize: posttopicfont,
                          fontFamily: "kaushan_scriptregular",
                          fontWeight: "bold",
                        }}
                      >
                        {" "}
                        {post.topic ? post.topic : "SuperstarZ"}
                      </span>
                    </span>
                  </span>
                </div>
                {/*///////////////////////////////////////////////////////////////////////////USERNAME AND TOPIC*/}
                {/*///////////////////////////////////////////////////////////////////////////CAPTION*/}
                <div
                  style={{
                    top: postcaptiontop,
                    position: "relative",
                    marginLeft: postcaptionleft,
                    zIndex: 1,
                    paddingLeft: "1.95vw",
                    fontFamily: "Arial, Helvetica, sans-seri",
                    height: postcaptionheight,
                    width: postcaptionwidth,
                    lineHeight: postcaptionline,
                    overflow: "hidden",
                  }}
                >
                  <span
                    className={textback}
                    style={{
                      verticalAlign: "middle",
                      fontSize: postcaptionfont,
                      fontWeight: "normal",
                      margin: "0",
                      opacity: darkmodeReducer ? 0.5 : 0.55,
                      padding: "7px",
                      justifyContent: "center",
                      color: darkmodeReducer ? "#dddddd" : "#222222",
                    }}
                  >
                    {post.caption}{" "}
                  </span>
                </div>
                {/*///////////////////////////////////////////////////////////////////////////CAPTION*/}
                {/*///////////////////////////////////////////////////////////////////////////OPTIONS*/}
                <div
                  className={
                    darkmodeReducer
                      ? "zuperxyinfoPostDark"
                      : "zuperxyinfoPostLight"
                  }
                  style={{
                    top: postoptionstop,
                    position: "relative",
                    transition: "all 350ms ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "left",
                    zIndex: 2,
                    height: "0px",
                    width: "98%",
                    paddingLeft: "2vw",
                    opacity: darkmodeReducer ? 1 : 0.8,
                  }}
                >
                  <span style={{ marginLeft: postoptionsleft, padding: "0px" }}>
                    <CommentIcon
                      className={
                        darkmodeReducer
                          ? "zuperkingIconPostDark"
                          : "zuperkingIconPostLight"
                      }
                      style={{
                        verticalAlign: "middle",
                        fontSize: postcommentfont,
                        opacity: 0.35,
                        color: darkmodeReducer ? "#222222" : "#ffffff",
                      }}
                    />
                  </span>
                </div>
                {/*///////////////////////////////////////////////////////////////////////////OPTIONS*/}

                <Grid
                  item
                  xs={12}
                  style={{ padding: "0px", height: "0px" }}
                ></Grid>
              </div>{" "}
            </>
          )}
        </div>
      </animated.div>
    </>
  );
}

export const Post = React.memo(Postx);
