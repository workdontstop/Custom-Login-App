import React, { useRef, useEffect, useState, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { DialogContent, Paper, Grid } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { Scrollbars } from "react-custom-scrollbars";
import "./logCss.css";
import { ImodalLog, IGrid } from "./log-Interfaces";
import { ServerError } from "./ServerError";
import { FormHolder } from "./FormHolder";
import { RootStateOrAny, useSelector } from "react-redux";
import { SuperLoader } from "../SuperLoader";
import image1 from "./images/modalpic1.jpg";
import image2 from "./images/modalpic2.jpg";
import image3 from "./images/modalpic3.png";
import image4 from "./images/modalpic4.jpg";
import image5 from "./images/modalpic5.jpg";
import image6 from "./images/modalpic6.jpg";
import SuperstarzIconLight from "./../images/ssmall.png";
import SuperstarzIconDark from "./../images/sdsmall.png";

function ModalLogx({
  formtype,
  CloseModalForm,
  showModalForm,
}: ImodalLog): JSX.Element {
  ///
  ///
  ///
  /// SHOW/HIDES REPEAT PASSWORD UI STATE FOR SIGN UP
  const [checkSignupPasswordACTIVATE, setcheckSignupPasswordACTIVATE] =
    useState<boolean>(false);

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
  /// GET DARKMODE FROM REDUX STORE
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));
  const darkmodeReducer = darkmode;

  ///
  ///
  ///
  /// GET SCREENHEIGHT FROM REDUX STORE
  const { screenHeight } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));
  const screenHeightReducer = screenHeight;

  ///
  ///
  ///
  /// MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );

  var PaperStyleReducer = " ";

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DARKMODE
  if (darkmodeReducer) {
    PaperStyleReducer = PaperStyleDark;
  } else {
    PaperStyleReducer = PaperStyleLight;
  }

  ///
  ///
  ///
  /// SENDING LOGIN  DATA TO SERVER SIDE
  const [serverErrorData, setServerErrorData] = useState<string | null>(null);
  const [serverErrorDisplay, setServerErrorDisplay] = useState<number>(0);
  const [serverEmojiplain, setserverEmojiplain] = useState<boolean>(true);

  ///
  ///
  ///
  ///SUPERSTARZ ICON SELECT
  var SuperIcon = "";
  darkmodeReducer
    ? (SuperIcon = SuperstarzIconDark)
    : (SuperIcon = SuperstarzIconLight);

  ///
  ///
  ///
  ///MODAL ZOOMED STATE PC LOCALSTORAGE
  const [zoomedModal, setZoomedModal] = useState<boolean>(false);
  const [mobileZoom, setMobileZoom] = useState<boolean>(false);
  useEffect(() => {
    let localPcZoomData = JSON.parse(localStorage.getItem("PcZoom")!);
    if (localPcZoomData !== null) {
      setZoomedModal(localPcZoomData);
    }
  }, [zoomedModal]);

  ///
  ///
  ///
  ///HIDE LOGO Modal
  const [showlogo, setShowlogo] = useState<boolean>(true);
  const iconTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const iconTimerxx = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideLogo = () => {
    setShowlogo(false);
    if (iconTimer.current) {
      clearTimeout(iconTimer.current);
    }
    if (iconTimerxx.current) {
      clearTimeout(iconTimerxx.current);
    }
    iconTimer.current = setTimeout(function () {
      setShowlogo(true);
    }, 2000);
    iconTimerxx.current = setTimeout(function () {
      setShowlogo(false);
    }, 4000);
  };

  ///
  ///
  ///
  ///CREATE A SLIDE UP ANIMATION WITH  REACT SPRING
  const modalanimation = useSpring({
    config: {
      duration: 500,
    },
    opacity: showModalForm ? 1 : 0.9,
    transform: showModalForm ? `translateY(0%)` : `translateY(100%)`,
  });

  const modalanimationTwo = useSpring({
    config: {
      duration: 450,
    },
    opacity: showModalForm ? 1 : 0.9,
    transform: showModalForm ? `translateY(0%)` : `translateY(100%)`,
  });

  ///
  ///
  ///
  ///ANIMATE MOBILE IMAGE ON ZOOM STATE CHANGE
  const mobileLogmodalanimation: any = useSpring({
    config: {
      duration: 20,
    },
    transition: "height 1s",
    opacity: mobileZoom ? 1 : 0.98,
    height: mobileZoom ? "100%" : matchTablet ? "23vh" : "15vh",
  });

  //////////////   CONDITIONAL STATEMENT FOR DEVICE TYPES
  var formHolder = "";

  var MobileTabZoom = "";
  var MobileTab = "";

  if (matchTablet) {
    formHolder = "formholderTablet";

    MobileTabZoom = "log-logoTabletZoom";
    MobileTab = "log-logoTablet";
  } else {
    formHolder = "formholder";

    MobileTabZoom = "log-logoMobileZoom";
    MobileTab = "log-logoMobile";
  }
  //////////////   CONDITIONAL STATEMENT FOR DEVICE TYPES

  ///CLOSE MODAL FORM ON SMALL ICON PRESS
  const iconclicked = () => {
    alert("Home");
  };

  ///
  ///
  ///
  /// AUTO SCROLL WINDOWS AND CONTENT GRID
  const contentScrollRef = useRef<any>(null);
  const imagescrollRef = useRef<any>(null);

  const autoScrollWindowNImage: any = useCallback(
    (limiter: number) => {
      if (limiter === 1) {
        imagescrollRef.current.scrollTo(0, 0);
        if (formtype) {
          contentScrollRef.current.scrollTo(0, 45);
        } else {
          contentScrollRef.current.scrollTo(0, 20);
        }
      } else {
        setTimeout(function () {
          if (imagescrollRef.current && contentScrollRef.current) {
            imagescrollRef.current.scrollTo(0, 0);
            contentScrollRef.current.scrollTo(0, 30);
          }
        }, 970);
      }
    },
    [formtype]
  );
  ///
  ///
  ///
  /// SHOW A  ZOOMED/LOCKED MODAL VIEW PC
  const zoomlogmodal = () => {
    if (checkSignupPasswordACTIVATE) {
      setcheckSignupPasswordACTIVATE(false);
    } else {
      let toggleZoomedModal = !zoomedModal;
      setZoomedModal(!zoomedModal);
      hideLogo();
      //LOCALSTORAGE ZOOMED STATES  FOR PC
      localStorage.setItem("PcZoom", toggleZoomedModal.toString());
    }
  };

  ///
  ///
  ///
  /// SHOW A  ZOOMED/LOCKED  MODAL VIEW  MOBILE(CHANGE MOBILEZOOM WITH A CLICK)
  const clickMobileZoom = () => {
    if (checkSignupPasswordACTIVATE) {
      setcheckSignupPasswordACTIVATE(false);
    } else {
      if (mobileZoom) {
        setCallMobileZoomLimiter(false);
        setMobileZoom(false);
        hideLogo();
      } else {
        setCallMobileZoomLimiter(true);
        setMobileZoom(true);
        hideLogo();
      }
      //setMobileZoom(!mobileZoom);
      if (contentScrollRef.current && contentScrollRef) {
        autoScrollWindowNImage(0);
      }
    }
  };

  ///
  ///
  ///
  ///CHANGE MOBILEZOOM WITH A SCROLL(SCROLL CHANGE LAYOUT)
  const [callMobileZoomLimiter, setCallMobileZoomLimiter] =
    useState<boolean>(false);
  const slideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slide = useCallback(
    (e) => {
      if (contentScrollRef.current.scrollTop <= 0) {
        if (!callMobileZoomLimiter) {
          if (slideTimer.current) {
            clearTimeout(slideTimer.current);
          }
          //slidertimmer makes zoom  wait for some seconds before running
          slideTimer.current = setTimeout(function () {
            setMobileZoom(true);
            hideLogo();
            setCallMobileZoomLimiter(true);
          }, 720);
        }
      } else if (contentScrollRef.current.scrollTop >= 2) {
        if (slideTimer.current) {
          clearTimeout(slideTimer.current);
        }
        if (callMobileZoomLimiter) {
          autoScrollWindowNImage(0);
          setMobileZoom(false);
          hideLogo();
          setCallMobileZoomLimiter(false);
        }
      } else {
      }
    },
    [callMobileZoomLimiter, contentScrollRef, autoScrollWindowNImage]
  );

  ///
  ///
  ///
  ///ACTIVATE MOBILE VIEW TOP SCROLL(ZOOMABLE) ON INITIAL LOAD
  const mobileImageOnLoad = () => {
    hideLogo();
    if (contentScrollRef.current && contentScrollRef) {
      autoScrollWindowNImage(1);
    }
  };

  ///
  ///
  ///
  /// USEREF TARGETS A DIV(BACKGROUND) AND CLOSES MODAL ON CLICK
  const ModalBackgroundRef = useRef<HTMLInputElement>(null);
  const onBackgroundFocus = (e: any): void => {
    if (ModalBackgroundRef.current === e.target) {
      CloseModalForm(0);
    }
  };

  ///
  ///
  ///
  /// ESCAPE KEY CLOSE MODAL
  const escapePress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModalForm) {
        CloseModalForm(0);
      }
    },
    [showModalForm, CloseModalForm]
  );
  useEffect(() => {
    document.addEventListener("keydown", escapePress);
    return () => document.removeEventListener("keydown", escapePress);
  }, [escapePress]);

  ///
  ///
  ///
  /// RANDOMISE IMAGE
  const [showimage, setShowimage] = useState<string>(" ");
  useEffect(() => {
    let imagecontrol: number[] = [1, 2, 3, 4, 5, 6];
    var result = null;
    var randomimage =
      imagecontrol[Math.floor(Math.random() * imagecontrol.length)];
    const img = new Image(); ///new image instance
    if (randomimage === 1) {
      result = image1;
    } else if (randomimage === 2) {
      result = image2;
    } else if (randomimage === 3) {
      result = image3;
    } else if (randomimage === 4) {
      result = image4;
    } else if (randomimage === 5) {
      result = image5;
    } else {
      result = image6;
    }
    img.src = result; //src forces a download
    setShowimage(result);
  }, [showimage]);

  ///
  ///
  ///
  /// GET IMAGE WIDTH ,HEIGHT AND SET WIDE IMAGE PC ONLY
  const ModalSlidingImageRef = useRef<HTMLImageElement>(null);
  const [imageHeightoverflow, setImageHeightoverflow] =
    useState<boolean>(false);
  const [wideImage, setWideImage] = useState<boolean>(false);

  const onimageload = useCallback(
    (e: any) => {
      hideLogo();
      if (ModalSlidingImageRef && ModalSlidingImageRef.current) {
        const imageHeight = ModalSlidingImageRef.current.clientHeight;
        const imageWidth = ModalSlidingImageRef.current.clientWidth;

        if (
          imageHeight + (imageWidth / imageHeight) * 3 >
          screenHeightReducer
        ) {
          setImageHeightoverflow(true);
        }

        if (imageWidth > imageHeight + (imageWidth / imageHeight) * 100) {
          setWideImage(true);
        }
      }
    },
    [screenHeightReducer]
  );

  /// DYNAMIC MODAL LAYOUT VARIABLES
  ///
  ///
  ///
  const wideImageControlTrue: string = "75vw";
  const wideImageControlfalse: string = "70vw";
  const zoomImageControl: string = "100vw";
  const GridMiniAwide: IGrid = 8;
  const GridMiniBwide: IGrid = 4;
  const GridMiniAlong: IGrid = 7;
  const GridMiniBlong: IGrid = 5;
  const GridZoomAwide: IGrid = 8;
  const GridZoomBwide: IGrid = 4;
  const GridZoomAlong: IGrid = 6;
  const GridZoomBlong: IGrid = 6;

  let GridHolderA: IGrid = 7;
  let GridHolderB: IGrid = 5;

  let GridxA: IGrid = 7;
  let GridxB: IGrid = 5;

  let GridyA: IGrid = 7;
  let GridyB: IGrid = 5;

  let wideImageControl: string = "70vw";
  let imageReal: string = "75vw";

  let borderGrid: string = "11px";
  var WidthHolder: string = "82%";

  var opacitySlidingModalImage = "0";
  var zIndexModalImageSmall = 10;
  var zIndexModalImageZoom = 0;
  var opacityFixedModalImage = "1";

  var slidingImageWidth = "50%";

  if (zoomedModal) {
    if (imageHeightoverflow) {
      opacitySlidingModalImage = "1";
      zIndexModalImageSmall = 0;
      zIndexModalImageZoom = 10;
      opacityFixedModalImage = "0";
    }

    borderGrid = "0px";

    if (wideImage) {
      slidingImageWidth = "66%";
      WidthHolder = "76%";
      wideImageControl = wideImageControlTrue;
      GridxA = GridZoomAwide;
      GridxB = GridZoomBwide;
    } else {
      slidingImageWidth = "50%";
      WidthHolder = "88%";
      wideImageControl = wideImageControlfalse;
      GridxA = GridZoomAlong;
      GridxB = GridZoomBlong;
    }
    imageReal = zoomImageControl;
    GridHolderA = GridxA;
    GridHolderB = GridxB;
  } else {
    WidthHolder = "82%";
    borderGrid = "11px";

    if (wideImage) {
      wideImageControl = wideImageControlTrue;
      GridyA = GridMiniAwide;
      GridyB = GridMiniBwide;
    } else {
      wideImageControl = wideImageControlfalse;
      GridyA = GridMiniAlong;
      GridyB = GridMiniBlong;
    }
    imageReal = wideImageControl;
    GridHolderA = GridyA;
    GridHolderB = GridyB;
  }
  ///
  ///
  ///
  /// DYNAMIC MODAL LAYOUT VARIABLES

  ///
  ///
  ///FADE SLIDING IMAGE
  var fadeSlidingimage = "fadermodal-imageslider";
  if (opacitySlidingModalImage === "0") {
    fadeSlidingimage = "";
  } else {
    fadeSlidingimage = "fadermodal-imageslider-zoomload";
    setTimeout(function () {
      fadeSlidingimage = "fadermodal-imageslider";
    }, 1600);
  }

  return (
    <>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      {showModalForm ? (
        matchPc ? (
          /*PC  PC  PC  PC  PC  PC  PC  PC  PPC  PC  PC  PC  PC  PC  PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC C */ <DialogContent
            style={{
              paddingLeft: "0px",
              height: "100%",
              zIndex: 100,
            }}
          >
            <SuperLoader />

            <ServerError
              device="pc"
              serverEmojiplain={serverEmojiplain}
              setServerErrorData={setServerErrorData}
              serverErrorDisplay={serverErrorDisplay}
              serverErrorData={serverErrorData}
            />

            <DialogContent
              className={`${fadeSlidingimage} modalImageCustomSlider FormDialog-containerx dontallowhighlighting`}
              onClick={onBackgroundFocus}
              style={{
                overflow: "auto",
                cursor: "pointer",
                height: "101%",
                padding: "0px",
                width: slidingImageWidth,
                opacity: opacitySlidingModalImage,
                zIndex: zIndexModalImageZoom,
              }}
              ref={ModalBackgroundRef}
            >
              {" "}
              <Scrollbars>
                <animated.div style={modalanimationTwo}>
                  <img
                    ref={ModalSlidingImageRef}
                    onClick={zoomlogmodal}
                    onLoad={onimageload}
                    src={showimage}
                    className="modalImageStylex"
                    style={{
                      opacity: opacitySlidingModalImage,
                    }}
                    alt="Logzoom"
                  />
                </animated.div>
              </Scrollbars>
            </DialogContent>

            <DialogContent
              className={
                darkmodeReducer
                  ? "fadermodal FormDialog-container modal-containerDark dontallowhighlighting"
                  : "fadermodal FormDialog-container modal-containerLight dontallowhighlighting"
              }
              onClick={onBackgroundFocus}
              style={{ overflow: "hidden", cursor: "pointer" }}
              ref={ModalBackgroundRef}
            >
              <animated.div style={modalanimation}>
                <Paper
                  style={{
                    backgroundImage: PaperStyleReducer,
                    borderRadius: borderGrid,
                    cursor: "default",
                  }}
                >
                  <Grid
                    container
                    className="containerStyle"
                    style={{
                      width: imageReal,
                      borderRadius: borderGrid,
                    }}
                  >
                    <Grid
                      item
                      xs={GridHolderA}
                      style={{ zIndex: zIndexModalImageSmall }}
                    >
                      <img
                        onClick={iconclicked}
                        className={
                          zoomedModal
                            ? "hide-logo"
                            : "log-logo  make-small-icons-clickable-neutralB"
                        }
                        style={{ opacity: showlogo ? "" : "0" }}
                        src={SuperIcon}
                        alt="SuperstarZ logosmallmode"
                      />

                      <img
                        onClick={zoomlogmodal}
                        src={showimage}
                        className="modalImageStyle"
                        style={{
                          opacity: opacityFixedModalImage,
                          borderTopLeftRadius: borderGrid,
                          borderBottomLeftRadius: borderGrid,
                        }}
                        alt="Logsmall"
                      />
                    </Grid>

                    {formtype ? (
                      <Grid item xs={GridHolderB}>
                        <Grid xs={12} item className="formholder">
                          <Grid
                            item
                            xs={12}
                            className="center-content-vertically"
                            style={{ marginTop: "10px", padding: "0px" }}
                          >
                            <FormHolder
                              setServerErrorDisplay={setServerErrorDisplay}
                              setserverEmojiplain={setserverEmojiplain}
                              setServerErrorData={setServerErrorData}
                              loginForm={true}
                              zoomedModal={zoomedModal}
                              WidthHolder={WidthHolder}
                              checkSignupPasswordACTIVATE={
                                checkSignupPasswordACTIVATE
                              }
                              setcheckSignupPasswordACTIVATE={
                                setcheckSignupPasswordACTIVATE
                              }
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid xs={GridHolderB} item className="formholder">
                        <Grid
                          item
                          xs={12}
                          className="center-content-vertically"
                          style={{ marginTop: "3px", padding: "0px" }}
                        >
                          {" "}
                          <FormHolder
                            setServerErrorDisplay={setServerErrorDisplay}
                            setserverEmojiplain={setserverEmojiplain}
                            setServerErrorData={setServerErrorData}
                            loginForm={false}
                            zoomedModal={zoomedModal}
                            WidthHolder={WidthHolder}
                            checkSignupPasswordACTIVATE={
                              checkSignupPasswordACTIVATE
                            }
                            setcheckSignupPasswordACTIVATE={
                              setcheckSignupPasswordACTIVATE
                            }
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </animated.div>
            </DialogContent>
          </DialogContent> /*PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC */
        ) : (
          /*MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE*/

          <DialogContent
            className="Hide-mobile-Scrollbar  fadermodal FormDialog-container-mobile dontallowhighlighting"
            ref={imagescrollRef}
            style={{
              overflow: "auto",
              cursor: "pointer",
              padding: "0px",
              zIndex: 100,
              backgroundImage: PaperStyleReducer,
            }}
          >
            <SuperLoader />

            <ServerError
              device="mobile"
              serverEmojiplain={serverEmojiplain}
              setServerErrorData={setServerErrorData}
              serverErrorDisplay={serverErrorDisplay}
              serverErrorData={serverErrorData}
            />
            <animated.div style={modalanimation}>
              <Paper
                style={{
                  cursor: "default",
                  backgroundColor: "rgba(0,0,0,0.0)",
                }}
              >
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    className="yyy"
                    style={{
                      marginTop: "0.5px",
                      height: "auto",
                    }}
                  >
                    <animated.img
                      onClick={clickMobileZoom}
                      onLoad={mobileImageOnLoad}
                      src={showimage}
                      className="modalMobileImageStyle slow-Div-Change"
                      alt="SuperstarZ"
                      style={mobileLogmodalanimation}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    className={mobileZoom ? "zoomMobile" : "smallMobile"}
                  >
                    {" "}
                    <Paper
                      className="Hide-mobile-Scrollbar "
                      onScroll={slide}
                      ref={contentScrollRef}
                      style={{
                        overflow: "auto",
                        backgroundColor: "rgba(0,0,0,0.0)",
                        cursor: "default",
                        height: "95vh",
                        borderRadius: "0px",
                        marginTop: "-1.9px",
                      }}
                    >
                      {" "}
                      <img
                        onClick={iconclicked}
                        className={
                          mobileZoom
                            ? `${MobileTabZoom}  make-small-icons-clickable-neutralB`
                            : `${MobileTab}  make-small-icons-clickable-neutralB`
                        }
                        style={{ display: showlogo ? "block" : "none" }}
                        src={SuperIcon}
                        alt="Express Yourself"
                      />{" "}
                      <Grid item xs={12} style={{ height: "6vh" }}></Grid>{" "}
                      <Grid xs={12} item className={formHolder}>
                        {formtype ? (
                          <Grid
                            item
                            xs={12}
                            className=""
                            style={{ marginTop: "24px" }}
                          >
                            <FormHolder
                              setServerErrorDisplay={setServerErrorDisplay}
                              setserverEmojiplain={setserverEmojiplain}
                              setServerErrorData={setServerErrorData}
                              loginForm={true}
                              zoomedModal={zoomedModal}
                              WidthHolder={WidthHolder}
                              checkSignupPasswordACTIVATE={
                                checkSignupPasswordACTIVATE
                              }
                              setcheckSignupPasswordACTIVATE={
                                setcheckSignupPasswordACTIVATE
                              }
                            />
                          </Grid>
                        ) : (
                          <Grid
                            item
                            xs={12}
                            className=""
                            style={{ marginTop: "-10x" }}
                          >
                            {" "}
                            <FormHolder
                              setServerErrorDisplay={setServerErrorDisplay}
                              setserverEmojiplain={setserverEmojiplain}
                              setServerErrorData={setServerErrorData}
                              loginForm={false}
                              zoomedModal={zoomedModal}
                              WidthHolder={WidthHolder}
                              checkSignupPasswordACTIVATE={
                                checkSignupPasswordACTIVATE
                              }
                              setcheckSignupPasswordACTIVATE={
                                setcheckSignupPasswordACTIVATE
                              }
                            />
                          </Grid>
                        )}
                      </Grid>
                      <Grid item xs={12} style={{ height: "60vh" }}></Grid>{" "}
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </animated.div>
          </DialogContent>
        ) /*MOBILE  MOBILE  MOBILE  MOBILE MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE MOBILE  MOBILE  MOBILE*/
      ) : null}
    </>
  );
}

export const ModalLog = React.memo(ModalLogx);
