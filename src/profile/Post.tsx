import React, { useRef, useState, useEffect, useCallback } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Crop54Icon from "@mui/icons-material/Crop54";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentIcon from "@mui/icons-material/Comment";
import CircleIcon from "@mui/icons-material/Circle";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { ScrollerAction } from "../GlobalActions";
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
  ScrolltypeChange,
  ActiveAutoPlay,
  setActiveAutoPlay,
  AUTOSlideLongImages,
  postDivRef,
}: any) {
  const [autoSlideDuration] = useState(6000);

  const dispatch = useDispatch();

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

  const [itemInfoTopShow, setitemInfoTopShow] = useState<boolean>(false);

  const [hideItemForAWhile, sethideItemForAWhile] = useState<boolean>(false);

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (pey === 0) {
      var time1: number = 1 + 1 + 1 + 1 * 1500;
    } else {
      var time1: number = pey + pey + pey + pey * 1500;
    }

    if (pey === 0) {
      var time2: number = 1 + 1 + 1 + 1 * 2000;
    } else {
      var time2: number = pey + pey + pey + pey * 1600;
    }

    setTimeout(function () {
      sethideItemForAWhile(true);
      if (pey === length - 1) {
        if (matchMobile) {
        } else {
          dispatch(ScrollerAction("y mandatory"));
        }
      }
    }, time1);
    setTimeout(function () {
      setitemInfoTopShow(true);
    }, time2);
  }, []);

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
      ScrolltypeChange();
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
        showcaptionwaitTimer.current = setTimeout(function () {
          onPostsItemClicked(pey);
        }, 250);
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
  var cropTop: number = matchPc ? 1.5 : matchTablet ? 7 : 3;

  var posteyefont = matchPc ? "1.75vw" : matchTablet ? "3.4vh" : "3.3vh";
  var posteyeleft = matchPc ? "92.4%" : matchTablet ? "92.693%" : "90%";
  var eyeTop = matchPc ? "-9px" : matchTablet ? "-6px" : "-8px";

  var emotionClass = matchPc
    ? "turpostDark emotionspostPC"
    : matchTablet
    ? "turpostDark emotionspostTablet"
    : "turpostDark emotionspostMOBILE";
  var emolove = matchPc ? 90 : matchTablet ? 170 : 115;
  var emocool = matchPc ? 70 : matchTablet ? 145 : 101;
  var emocare = matchPc ? 50 : matchTablet ? 115 : 83;
  var emofunny = matchPc ? 30 : matchTablet ? 90 : 64;

  var profilewidth = matchPc ? "10.5%" : matchTablet ? "16.5%" : "15%";
  var postprofiletop = matchPc ? "9.5vh" : matchTablet ? "4.2vh" : "-2vh";

  var postusernametop = matchPc ? "7.6vh" : matchTablet ? "1.9vh" : "-3.1vh";
  var postusernamefont = matchPc ? "1.41vw" : matchTablet ? "3.1vh" : "2.4vh";
  var postusernameleft = matchPc ? "12%" : matchTablet ? "18%" : "17.2%";

  var postcirclefont = matchPc ? "0.4vw" : matchTablet ? "0.4vw" : "0.6vh";
  var dotspace = matchPc ? "0.8vw" : matchTablet ? "0.8vw" : "0.6vh";
  var dotspace2 = matchPc ? "0.4vw" : matchTablet ? "0.4vw" : "0.3vh";

  var posttopicfont = matchPc ? "1.1vw" : matchTablet ? "2.1vh" : "1.8vh";

  var postcaptiontop = matchPc ? "10vh" : matchTablet ? "4vh" : "-1.4vh";
  var postcaptionfont = matchPc ? "1.27vw" : matchTablet ? "2.39vh" : "2vh";
  var postcaptionline = matchPc ? "1.55" : matchTablet ? "1.55" : "1.3";
  var postcaptionleft = matchPc ? "12%" : matchTablet ? "18%" : "17.3%";
  var postcaptionheight = matchPc ? "7.3vh" : matchTablet ? "7.35vh" : "5.7vh";
  var postcaptionwidth = matchPc ? "79%" : matchTablet ? "71%" : "71%";

  var postcommenttop = matchPc ? "9vh" : matchTablet ? "2.55vh" : "-2.4vh";
  var postcommentfont = matchPc ? "1.8vw" : matchTablet ? "4vh" : "3.55vh";
  var postcommentwidth = matchPc ? "98.5%" : matchTablet ? "98.5%" : "95.5%";

  var postoptionstop = matchPc ? "0.15vh" : matchTablet ? "-5.8vh" : "-9.2vh";
  var postoptionsleft = matchPc ? "94.5%" : matchTablet ? "94.5%" : "91.6%";
  var postvertfont = matchPc ? "2.2vw" : matchTablet ? "3.9vh" : "3.6vh";

  var postdatetop = matchPc ? "1.9vh" : matchTablet ? "-4.4vh" : "-7.8vh";
  var postdatefont = matchPc ? "0.9vw" : matchTablet ? "1.6vh" : "1.25vh";
  var postdateleft = matchPc ? "98.5%" : matchTablet ? "98.5%" : "96.3%";

  var textback = "";
  if (darkmodeReducer) {
    textback = "caption-darkPost";
  } else {
    textback = "caption-lightPost";
  }

  return (
    <>
      <div
        ref={addpostDivRef}
        style={{
          scrollSnapAlign: matchMobile ? "none" : "start",
          padding: "0px",
          width: "100%",
          marginTop: pey === 0 || pey === 1 ? "0px" : "-0.6px",
          visibility: hideItemForAWhile ? "visible" : "hidden",
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
          ScrolltypeChange={ScrolltypeChange}
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
                opacity: itemInfoTopShow ? 1 : 0,
                zIndex: 2,
              }}
            >
              {/*///////////////////////////////////////////////////////////////////////////CROPED*/}
              <div
                style={{
                  top: `-${itemheighthold[pey] - cropTop}px`,

                  position: "relative",
                  transition: "all 350ms ease",
                  opacity: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  paddingLeft: postcroppadding,
                  zIndex: 1,
                  height: "0px",
                }}
              >
                {itemcroptype[pey] === 1 ? (
                  <Crop54Icon
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-light  dontallowhighlighting   zuperkingxx"
                        : "make-small-icons-clickable-dark  dontallowhighlighting  zuperkingxx"
                    }
                    style={{
                      fontSize: postcropfont,
                      opacity: itemInfoTopShow
                        ? itemheight[pey] === "auto"
                          ? 0
                          : 0.3
                        : 0,
                    }}
                  />
                ) : itemcroptype[pey] === 2 ? (
                  <CropPortraitIcon
                    className={
                      darkmodeReducer
                        ? "make-small-icons-clickable-light  dontallowhighlighting   zuperkingxx"
                        : "make-small-icons-clickable-dark  dontallowhighlighting  zuperkingxx"
                    }
                    style={{
                      fontSize: postcropfont,
                      opacity: itemInfoTopShow
                        ? itemheight[pey] === "auto"
                          ? 0
                          : 0.3
                        : 0,
                    }}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    style={{
                      fontSize: "2.2vw",
                      opacity: 0,
                    }}
                  />
                )}
              </div>
              {/*///////////////////////////////////////////////////////////////////////////CROPED*/}
              {/*///////////////////////////////////////////////////////////////////////////VIEWS*/}
              <div
                style={{
                  top: `-${itemheighthold[pey]}px`,
                  position: "relative",
                  transition: "all 350ms ease",
                  opacity: 1,
                  zIndex: 2,
                  marginTop: eyeTop,
                  height: "0px",
                }}
              >
                <RemoveRedEyeIcon
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-light  dontallowhighlighting   zuperkingxx"
                      : "make-small-icons-clickable-dark  dontallowhighlighting  zuperkingxx"
                  }
                  style={{
                    fontSize: posteyefont,
                    opacity: 0.4,
                    marginLeft: posteyeleft,
                    color: "#ffffff",
                  }}
                />
              </div>
              {/*///////////////////////////////////////////////////////////////////////////VIEWS*/}

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
              {/*///////////////////////////////////////////////////////////////////////////EMOTIONS*/}

              <img
                className={emotionClass}
                src={`./images/emotions/love.png`}
                alt="a superstarz post "
                style={{
                  top: `-${emolove}px`,
                  cursor: "pointer",
                  boxShadow: darkmodeReducer
                    ? "0 0 1px #555555"
                    : "0 0 4.5px #aaaaaa",

                  height: "auto",
                  padding: "0px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 8,
                }}
              />

              <img
                className={emotionClass}
                src={`./images/emotions/cool.png`}
                alt="a superstarz post "
                style={{
                  top: `-${emocool}px`,
                  cursor: "pointer",
                  boxShadow: darkmodeReducer
                    ? "0 0 1px #555555"
                    : "0 0 4.5px #aaaaaa",

                  height: "auto",
                  padding: "0px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 8,
                }}
              />

              <img
                className={emotionClass}
                src={`./images/emotions/oo.png`}
                alt="a superstarz post "
                style={{
                  top: `-${emocare}px`,
                  cursor: "pointer",
                  boxShadow: darkmodeReducer
                    ? "0 0 1px #555555"
                    : "0 0 4.5px #aaaaaa",

                  height: "auto",
                  padding: "0px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 8,
                }}
              />

              <img
                className={emotionClass}
                src={`./images/emotions/laugh.png`}
                alt="a superstarz post "
                style={{
                  top: `-${emofunny}px`,
                  cursor: "pointer",
                  boxShadow: darkmodeReducer
                    ? "0 0 1px #555555"
                    : "0 0 3.5px #aaaaaa",

                  height: "auto",
                  padding: "0px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 8,
                }}
              />

              {/*///////////////////////////////////////////////////////////////////////////EMOTIONS*/}

              {/*///////////////////////////////////////////////////////////////////////////BACKPAD CLICKABLE*/}
              <div
                onClick={clickslider}
                style={{
                  opacity: darkmodeReducer ? 0.89 : 0.94,
                  cursor: "alias",
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
                  paddingLeft: "1.8vw",
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
                  opacity: darkmodeReducer ? 0.89 : 0.94,
                  top: postusernametop,
                  position: "relative",
                  transition: "all 350ms ease",
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
                <span
                  style={{
                    fontWeight: "bolder",
                    fontSize: postusernamefont,
                    verticalAlign: "middle",
                  }}
                >
                  {" "}
                  {post.username}
                  <span
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    <span
                      style={{
                        opacity: 0,
                        fontSize: dotspace,
                      }}
                    >
                      .
                    </span>
                    <CircleIcon
                      style={{
                        fontSize: postcirclefont,
                        verticalAlign: "middle",
                      }}
                    />
                    <span
                      style={{
                        opacity: 0,
                        fontSize: dotspace2,
                      }}
                    >
                      .
                    </span>
                  </span>
                </span>

                <span
                  style={{
                    fontSize: posttopicfont,
                    verticalAlign: "middle",
                    fontFamily: "kaushan_scriptregular",
                    fontWeight: "normal",
                  }}
                >
                  {" "}
                  {post.topic ? post.topic : "SuperstarZ"}
                </span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////USERNAME AND TOPIC*/}
              {/*///////////////////////////////////////////////////////////////////////////CAPTION*/}
              <div
                className={
                  darkmodeReducer
                    ? "zuperxyinfoPostDark"
                    : "zuperxyinfoPostLight"
                }
                style={{
                  opacity: darkmodeReducer ? 0.89 : 0.78,
                  top: postcaptiontop,
                  position: "relative",
                  transition: "all 350ms ease",
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
                    fontWeight: "bold",
                    margin: "0",
                    justifyContent: "center",

                    color: darkmodeReducer ? "#eeeeee" : "#000000",
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
                  opacity: darkmodeReducer ? 0.6 : 0.64,
                }}
              >
                <span style={{ marginLeft: postoptionsleft, padding: "0px" }}>
                  <MoreHorizIcon
                    style={{
                      fontSize: postvertfont,
                      verticalAlign: "middle",
                    }}
                  />
                </span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////OPTIONS*/}
              {/*///////////////////////////////////////////////////////////////////////////DATE*/}
              <div
                className={
                  darkmodeReducer
                    ? "zuperxyinfoPostDark"
                    : "zuperxyinfoPostLight"
                }
                style={{
                  top: postdatetop,
                  position: "relative",
                  transition: "all 350ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  zIndex: 2,
                  height: "0px",
                  width: postdateleft,
                  paddingLeft: "2vw",
                  fontFamily: "Arial, Helvetica, sans-seri",
                  opacity: darkmodeReducer ? 0.6 : 0.64,
                }}
              >
                <span
                  style={{
                    marginLeft: "94%",
                    fontSize: postdatefont,
                    fontWeight: "bold",
                  }}
                >
                  Jul 6
                </span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////DATE*/}
              {/*///////////////////////////////////////////////////////////////////////////COMMENT*/}
              <div
                className={
                  darkmodeReducer
                    ? "zuperxyinfoPostDark"
                    : "zuperxyinfoPostLight"
                }
                style={{
                  top: postcommenttop,
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
                <span style={{ marginLeft: "94%", verticalAlign: "middle" }}>
                  <CommentIcon
                    style={{
                      verticalAlign: "middle",
                      fontSize: postcommentfont,
                    }}
                  />
                </span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////COMMENT*/}

              {pey === length - 1 ? (
                <Grid
                  item
                  xs={12}
                  style={{ padding: "0px", height: "200px" }}
                ></Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  style={{ padding: "0px", height: "0px" }}
                ></Grid>
              )}
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}

export const Post = React.memo(Postx);
