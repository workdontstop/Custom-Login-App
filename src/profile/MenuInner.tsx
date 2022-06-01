import React from "react";
import { matchPc, matchTablet } from "../DetectDevice";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import CircleIcon from "@mui/icons-material/Circle";
import SettingsIcon from "@mui/icons-material/Settings";

function MenuInnerx({
  optionsShow,
  optinstopshowingReducer,
  typeTop,
  closeoptionsslide,
  animationop,
  optionsCollectImageRef,
  handleTouchStartOptions,
  handleTouchMoveOptions,
  modalanimation,
  nextSlidePc,
  optionsImages,
  ActiveSlide,
  optionsNameData,
  clickOptions,
  optionsClickType,
  getSliderWidthNew,
}: any): JSX.Element {
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

  var circleIdentify = typeTop ? 0 : 4;
  var circleIdentify2 = typeTop ? 1 : 5;

  ///
  ///
  /// GET COLOR FROM REDUX STORE
  interface RootStateReducerColor {
    GlobalReducerColor: {
      color: string;
      colordark: string;
      colortype: number;
    };
  }
  const { color, colordark, colortype } = useSelector(
    (state: RootStateReducerColor) => ({
      ...state.GlobalReducerColor,
    })
  );
  const colorReducer = color;
  const colorReducerdark = colordark;
  const colortypeReducer = colortype;

  return (
    <>
      {optionsShow ? (
        <>
          {optinstopshowingReducer ? (
            typeTop ? null : (
              <>
                {" "}
                <Grid
                  container
                  style={{
                    width: matchPc ? "10%" : matchTablet ? "30%" : "10%",
                    margin: "auto",
                  }}
                >
                  <span>
                    <MoreHorizIcon
                      className={
                        darkmodeReducer
                          ? "make-small-icons-clickable-dark dontallowhighlighting  "
                          : "make-small-icons-clickable-light  dontallowhighlighting  "
                      }
                      onClick={closeoptionsslide}
                      style={{
                        fontSize: matchPc ? "2.55vw" : "4.7vh",
                        verticalAlign: "middle",
                        justifyContent: "center",
                        zIndex: 2,
                        marginTop: matchPc ? "9vh" : "6.5vh",
                        position: "absolute",
                      }}
                    />
                  </span>{" "}
                </Grid>
              </>
            )
          ) : null}

          <animated.div style={animationop}>
            <Grid
              container
              className={
                typeTop
                  ? darkmodeReducer
                    ? `optionsTop-background-dark `
                    : `optionsTop-background-light `
                  : ""
              }
              onTouchStart={handleTouchStartOptions}
              onTouchMove={handleTouchMoveOptions}
              style={{
                zIndex: 1,
                padding: "0px",
                top: matchPc ? (typeTop ? "-2vh" : "0vh") : "0vh",
                position: "relative",
                margin: "0 auto",
                overflow: "hidden",
                left: "0px",
                height: typeTop ? (matchPc ? "24.4vh" : "20.5vh") : "auto",
                paddingBottom: "1px",
              }}
            >
              <animated.div ref={optionsCollectImageRef} style={modalanimation}>
                <Grid
                  item
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    position: "relative",
                    bottom: typeTop ? "-2.6vh" : "0.2em",
                    left: typeTop ? "-3px" : matchPc ? "-2px" : "0px",
                  }}
                >
                  <CircleIcon
                    onClick={() => {
                      nextSlidePc();
                    }}
                    className="buttonshake"
                    style={{
                      fontSize: typeTop ? "1.7vw" : "1.3vw",
                      cursor: "pointer",
                      color: darkmodeReducer
                        ? typeTop
                          ? "rgba(200, 200, 200, 0.5)"
                          : "rgba(200, 200, 200, 0.1)"
                        : typeTop
                        ? "rgba(005, 005, 005, 0.4)"
                        : "rgba(005, 005, 005, 0.2)",
                      display: matchPc ? "block" : "none",
                    }}
                  />
                </Grid>
                {optionsImages.map((im: any, i: any) => (
                  <Grid key={i} item xs={12}>
                    {typeTop ? (
                      <Grid
                        item
                        xs={12}
                        style={{
                          margin: "auto",
                          textAlign: "center",
                          position: "relative",
                          top: "2.2vh",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          style={{
                            paddingBottom: "10px",
                            fontSize: matchPc
                              ? "1.1vw"
                              : matchTablet
                              ? "2.08vh"
                              : "2vh",
                            fontWeight: "bolder",
                            fontFamily: "Arial, Helvetica, sans-serif",
                            visibility:
                              ActiveSlide === i ? "visible" : "hidden",
                            filter: darkmodeReducer
                              ? "drop-shadow(1.2px 0.1px 1.92px rgba(255, 255, 255, 0.4))"
                              : "drop-shadow(1.2px 0.1px 1.92px rgba(41, 53, 70, 8.35))",
                            color: darkmodeReducer ? "#dddddd" : "#0b111b",
                          }}
                        >
                          {" "}
                          {optionsNameData[i]}
                        </Grid>
                      </Grid>
                    ) : null}
                    {i === circleIdentify || i === circleIdentify2 ? (
                      <>
                        {i === circleIdentify ? (
                          <>
                            {" "}
                            <div
                              onClick={() => {
                                clickOptions(i, optionsClickType, "upload");
                              }}
                              style={{
                                cursor: ActiveSlide === i ? "pointer" : "alias",
                                width: `${getSliderWidthNew}px`,
                                height: `${getSliderWidthNew}px`,
                                backgroundColor: darkmodeReducer
                                  ? "rgba(010,010,010, 0.68)"
                                  : "rgba(220,220,220, 0.7)",
                                borderRadius: "50%",
                                marginTop: "2.15vh",
                                textAlign: "center",
                                alignItems: "center",
                                display: "grid",
                                justifyContent: "center",
                                boxShadow: darkmodeReducer
                                  ? ActiveSlide === i
                                    ? colortypeReducer === 0
                                      ? `0 0 5.5px ${colorReducerdark}`
                                      : `0 0 5.5px ${colorReducer}`
                                    : typeTop
                                    ? "0 0 5.5px#aaaaaa"
                                    : ""
                                  : ActiveSlide === i
                                  ? `0 0 5.5px ${colorReducer}`
                                  : typeTop
                                  ? "0 0 5.45px#222222"
                                  : ``,
                              }}
                            >
                              {" "}
                              <SettingsIcon
                                style={{
                                  fontSize: matchPc ? "2vw" : "5vh",
                                  color: darkmodeReducer
                                    ? "#eeeeee"
                                    : "#222222",
                                }}
                                className="zuperkinginfo"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            {" "}
                            <div
                              onClick={() => {
                                clickOptions(i, optionsClickType, "upload");
                              }}
                              style={{
                                cursor: ActiveSlide === i ? "pointer" : "alias",
                                width: `${getSliderWidthNew}px`,
                                height: `${getSliderWidthNew}px`,
                                backgroundColor: darkmodeReducer
                                  ? "rgba(010,010,010, 0.68)"
                                  : "rgba(220,220,220, 0.7)",
                                borderRadius: "50%",
                                marginTop: "2.15vh",
                                textAlign: "center",
                                alignItems: "center",
                                display: "grid",
                                justifyContent: "center",
                                boxShadow: darkmodeReducer
                                  ? ActiveSlide === i
                                    ? colortypeReducer === 0
                                      ? `0 0 5.5px ${colorReducerdark}`
                                      : `0 0 5.5px ${colorReducer}`
                                    : typeTop
                                    ? "0 0 5.5px#aaaaaa"
                                    : ""
                                  : ActiveSlide === i
                                  ? `0 0 5.5px ${colorReducer}`
                                  : typeTop
                                  ? "0 0 5.45px#222222"
                                  : ``,
                              }}
                            >
                              {" "}
                              <CircleIcon
                                style={{
                                  fontSize: matchPc ? "1.65vw" : "4.5vh",
                                  color: darkmodeReducer
                                    ? ActiveSlide === i
                                      ? "red"
                                      : "#eeeeee"
                                    : ActiveSlide === i
                                    ? "red"
                                    : "#222222",
                                }}
                                className="zuperkinginfo"
                              />
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <img
                        alt={` ${optionsNameData[i]}  option`}
                        onClick={() => {
                          clickOptions(i, optionsClickType, " ");
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
                          opacity: ActiveSlide === i ? 0.3 : 1,
                          boxShadow: darkmodeReducer
                            ? ActiveSlide === i
                              ? colortypeReducer === 0
                                ? `0 0 6.8px ${colorReducerdark}`
                                : `0 0 6.8px ${colorReducer}`
                              : typeTop
                              ? "0 0 12.5px#aaaaaa"
                              : ""
                            : ActiveSlide === i
                            ? `0 0 5.7px ${colorReducer}`
                            : typeTop
                            ? `0 0 14.45px#222222`
                            : "",

                          marginBottom: "2.2px",
                        }}
                        src={`./images/options/${im}`}
                      />
                    )}

                    {typeTop ? null : (
                      <Grid
                        item
                        xs={12}
                        style={{
                          margin: "auto",
                          textAlign: "center",
                          position: "relative",
                          bottom:
                            i === circleIdentify || i === circleIdentify2
                              ? matchPc
                                ? "-0.5em"
                                : "-0.3em"
                              : "0.2em",
                        }}
                      >
                        <Grid
                          item
                          xs={12}
                          style={{
                            fontSize: matchPc
                              ? "1.1vw"
                              : matchTablet
                              ? "2vh"
                              : "1.8vh",
                            fontWeight: "bolder",
                            fontFamily: "Arial, Helvetica, sans-serif",
                            visibility:
                              ActiveSlide === i ? "visible" : "hidden",
                            opacity: typeTop
                              ? 0
                              : optinstopshowingReducer
                              ? 0
                              : 1,
                            color: darkmodeReducer ? "#dddddd" : "#0b111b",
                          }}
                        >
                          {" "}
                          {optionsNameData[i]}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                ))}
              </animated.div>
            </Grid>
          </animated.div>
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

export const MenuInner = React.memo(MenuInnerx);
