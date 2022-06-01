import React, { useState, useEffect } from "react";

import { animated } from "react-spring";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";

import { Scrollbars } from "react-custom-scrollbars-2";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

import { AboutColor } from "./AboutColor";

import { AboutFormHolder } from "./AboutFormHolder";
import { ServerError } from "../log/ServerError";

import { RootStateOrAny, useSelector } from "react-redux";
import "./../log/logCss.css";

import { DialogContent, Paper, Grid } from "@material-ui/core";

function ModalAboutLayoutx({
  slidingImageWidth,
  opacitySlidingModalImage,
  zIndexModalImageZoom,
  ModalBackgroundRef,
  onBackgroundFocus,
  modalanimation,
  modalanimationTwo,
  ModalSlidingImageRef,
  zoomlogmodal,
  onimageload,
  borderGrid,
  imageReal,
  GridHolderA,
  zIndexModalImageSmall,
  zoomedModal,
  opacityFixedModalImage,
  formtype,
  GridHolderB,
  WidthHolder,
  checkSignupPasswordACTIVATE,
  setcheckSignupPasswordACTIVATE,
  imagescrollRef,
  clickMobileZoom,
  mobileImageOnLoad,
  mobileLogmodalanimation,
  mobileZoom,
  slide,
  contentScrollRef,
  showimage,
  setMobileZoom,
  setZoomedModal,
}: any): JSX.Element {
  const [showlogo, setshowlogo] = useState<boolean>(true);

  ///
  ///
  ///
  /// SENDING LOGIN  DATA TO SERVER SIDE
  const [serverErrorData, setServerErrorData] = useState<string | null>(null);
  const [serverErrorDisplay, setServerErrorDisplay] = useState<number>(4);
  const [serverEmojiplain, setserverEmojiplain] = useState<boolean>(true);

  ///
  ///
  ///FORCE ABOUT PAGE INITIAL ZOOME STATE BASED ON DEVICE TYPE
  useEffect(() => {
    setMobileZoom(true);
    setZoomedModal(false);
  }, []);

  ///
  ///
  ///CALL THIS ON MOBILE ZOOM CHANGE
  useEffect(() => {
    if (mobileZoom) {
      setshowlogo(false);
    } else {
      setshowlogo(false);
      setTimeout(function () {
        setshowlogo(true);
      }, 1000);
    }
  }, [mobileZoom]);

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
  /// MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );

  var PaperStyleReducer = " ";
  var textback = "";

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DARKMODE
  if (darkmodeReducer) {
    PaperStyleReducer = PaperStyleDark;
    textback = "captionAbout-dark";
  } else {
    PaperStyleReducer = PaperStyleLight;
    textback = "captionAbout-light";
  }

  //////////////   CONDITIONAL STATEMENT FOR DEVICE TYPES
  var formHolder = "";

  var EditIconTop = "";
  var EditIconRight = "";
  var EditIconLeft = "";
  var aboutInfoFont = "";

  if (matchTablet) {
    formHolder = "formholderTablet";

    EditIconTop = "4vh";
    EditIconLeft = "4vw";
    EditIconRight = "";
    aboutInfoFont = "3.5vh";
  } else {
    formHolder = "formholder";

    if (matchMobile) {
      EditIconTop = "8vh";
      EditIconRight = "4vw";
      EditIconLeft = "4vh";
      aboutInfoFont = "2.6vh";
    }
  }
  //////////////   CONDITIONAL STATEMENT FOR DEVICE TYPES

  ///
  ///
  ///
  /// GET LOGGED USER DATA FROM REDUX STORE
  interface RootStateReducerImage {
    UserdataReducer: {
      biography: string;
    };
  }
  const { biography } = useSelector((state: RootStateReducerImage) => ({
    ...state.UserdataReducer,
  }));

  const biographyReducer = biography;

  return (
    <>
      {
        matchPc /*PC PC PC PC PC PC PC PC PPC PC PC PC PC PC PC PC PC PC PC PC
      PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC C */ ? (
          <DialogContent
            style={{
              paddingLeft: "0px",
              height: "100%",
              zIndex: 100,
            }}
          >
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
                    src={`./images/profile/${showimage}`}
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
              style={{ overflow: "hidden", cursor: "pointer", height: "101%" }}
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
                      {" "}
                      <Grid
                        item
                        xs={4}
                        style={{
                          zIndex: zIndexModalImageSmall,
                          position: "fixed",
                          top: "47%",
                          left: "1.3vw",
                          fontSize: "1.8vw",
                          backgroundColor: "",
                          width: "100%",
                          height: "200px",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          fontWeight: "bold",
                          lineHeight: 1.58,
                          overflow: "hidden",
                          padding: "5px",
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            color: darkmodeReducer ? "#dddddd" : "#0b111b",
                          }}
                          className={textback}
                        >
                          {biographyReducer}
                        </span>
                      </Grid>
                      <EditTwoToneIcon
                        className={
                          darkmodeReducer
                            ? "make-small-icons-clickable-dark dontallowhighlighting zuperkingIcon "
                            : "make-small-icons-clickable-light  dontallowhighlighting zuperkingIcon  "
                        }
                        style={{
                          color: "#ffffff",
                          fontSize: "2.9vw",
                          position: "fixed",
                          top: zoomedModal ? "4vh" : "4vh",
                          right: zoomedModal ? "1.5vw" : "",
                          left: zoomedModal ? "" : "1.8vw",
                        }}
                      />{" "}
                      <img
                        onClick={zoomlogmodal}
                        src={`./images/profile/${showimage}`}
                        className="modalImageStyle"
                        style={{
                          opacity: opacityFixedModalImage,
                          borderTopLeftRadius: borderGrid,
                          borderBottomLeftRadius: borderGrid,
                        }}
                        alt="Logsmall"
                      />
                    </Grid>

                    <Grid item xs={GridHolderB}>
                      <AboutColor zoomed={zoomedModal} />
                      <Grid xs={12} item className="formholder">
                        <Grid
                          item
                          xs={12}
                          className="center-content-vertically"
                          style={{
                            marginTop: "10px",
                            padding: "0px",
                            paddingTop: "10vh",
                          }}
                        >
                          <AboutFormHolder
                            zoomedModal={zoomedModal}
                            WidthHolder={WidthHolder}
                            loginForm={false}
                            setServerErrorData={setServerErrorData}
                            setServerErrorDisplay={setServerErrorDisplay}
                            setserverEmojiplain={setserverEmojiplain}
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
                  </Grid>
                </Paper>
              </animated.div>
            </DialogContent>
          </DialogContent>
        ) : (
          /*PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC
      PC PC PC PC PC PC PC PC PC PC PC PC */ /*MOBILE MOBILE MOBILE MOBILE
      MOBILE MOBILEMOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILEMOBILE MOBILE
      MOBILE MOBILE MOBILE MOBILE MOBILEMOBILE MOBILE MOBILE MOBILE MOBILE
      MOBILE MOBILE MOBILE*/
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
                      src={`./images/profile/${showimage}`}
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
                      <Grid
                        item
                        xs={7}
                        sm={6}
                        style={{
                          zIndex: zIndexModalImageSmall,
                          position: "fixed",
                          top: "20%",
                          left: "3.3vw",
                          fontSize: aboutInfoFont,
                          backgroundColor: "",
                          width: "100%",
                          height: "200px",
                          fontFamily: "Arial, Helvetica, sans-serif",
                          fontWeight: "bold",
                          lineHeight: matchTablet ? 1.6 : 1.65,
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            color: darkmodeReducer ? "#dddddd" : "#0b111b",
                          }}
                          className={textback}
                        >
                          Hi there , i love life and want to make it better. Try
                          to stay positive when you feel down. Smile
                        </span>
                      </Grid>
                      <EditTwoToneIcon
                        className={
                          darkmodeReducer
                            ? "make-small-icons-clickable-dark dontallowhighlighting zuperkinginfo "
                            : "make-small-icons-clickable-light  dontallowhighlightingzuperkinginfo  "
                        }
                        style={{
                          color: "#ffffff",
                          fontSize: matchTablet ? "5.8vh" : "  4.8vh",
                          position: "fixed",
                          display: mobileZoom ? "none" : "block",
                          opacity: showlogo ? "" : "0",
                          top: mobileZoom ? "0vh" : EditIconTop,
                          right: mobileZoom ? "0vw" : EditIconRight,
                          left: mobileZoom ? "0vw" : EditIconLeft,
                        }}
                      />{" "}
                      <Grid item xs={12} style={{ height: "6vh" }}></Grid>{" "}
                      <Grid xs={12} item className={formHolder}>
                        <Grid item xs={12}>
                          <AboutColor zoomed={mobileZoom} />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} style={{ height: "60vh" }}></Grid>{" "}
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </animated.div>
          </DialogContent>
        ) /*MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE
      MOBILEMOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILEMOBILE MOBILE MOBILE
      MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE*/
      }
    </>
  );
}

export const ModalAboutLayout = React.memo(ModalAboutLayoutx);
