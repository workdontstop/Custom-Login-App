import React, { useState } from "react";

import { animated } from "react-spring";
import { matchPc, matchTablet } from "../DetectDevice";

import { SuperLoader } from "../SuperLoader";
import { ServerError } from "./ServerError";
import { FormHolder } from "./FormHolder";
import { Scrollbars } from "react-custom-scrollbars-2";

import SuperstarzIconLight from "./../images/ssmall.png";
import SuperstarzIconDark from "./../images/sdsmall.png";
import { RootStateOrAny, useSelector } from "react-redux";
import "./logCss.css";

import { DialogContent, Paper, Grid } from "@material-ui/core";

function ModalLogLayoutx({
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
  showlogo,
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
}: any): JSX.Element {
  ///
  ///
  ///
  /// SENDING LOGIN  DATA TO SERVER SIDE
  const [serverErrorData, setServerErrorData] = useState<string | null>(null);
  const [serverErrorDisplay, setServerErrorDisplay] = useState<number>(0);
  const [serverEmojiplain, setserverEmojiplain] = useState<boolean>(true);

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
  ///CLOSE MODAL FORM ON SMALL ICON PRESS
  const iconclicked = () => {
    alert("Home");
  };

  ///
  ///
  ///
  ///SUPERSTARZ ICON SELECT
  var SuperIcon = "";
  darkmodeReducer
    ? (SuperIcon = SuperstarzIconDark)
    : (SuperIcon = SuperstarzIconLight);

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
        ) /*MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE
      MOBILEMOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILEMOBILE MOBILE MOBILE
      MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE MOBILE*/
      }
    </>
  );
}

export const ModalLogLayout = React.memo(ModalLogLayoutx);
