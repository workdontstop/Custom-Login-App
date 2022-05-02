import React, { useRef, useState, useEffect, useCallback } from "react";
import { Grid, Box } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { useSpring, animated } from "react-spring";

import CircleIcon from "@mui/icons-material/Circle";
import { OptionsSlider } from "./OptionsSlider";
import { useSelector, useDispatch } from "react-redux";
import { UpdateOptionsTop } from ".././GlobalActions";

function Menux({
  paperPostScrollRef,
  getSliderWidth,
  OpenUploadModal,
  showModalUpload,
  HidePostDataOnScroll,
}: any) {
  ///
  ///
  ///
  /// USE DISPATCH
  const dispatch = useDispatch();

  const [shownav, setShownav] = useState<boolean>(true);

  const [shownavTop, setShownavTop] = useState<boolean>(false);

  const [haltedTop, sethaltedTop] = useState<boolean>(false);

  const [startPostScroll, setstartPostScroll] = useState<number>(0);
  const [callstartonce, setcallstartonce] = useState<boolean>(false);
  const [callendonce, setcallendonce] = useState<boolean>(false);
  const [endPostScroll, setendPostScroll] = useState<number>(0);
  const menuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTimer2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTimer3 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTimer4 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTimer5 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuTimer6 = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  ///

  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationmenu = useSpring({
    config: {
      duration: 300,
    },
    opacity: shownav ? 1 : 0.5,
    transform: shownav ? `translateY(0%)` : `translateY(-125%)`,
  });

  const jayme = useCallback(() => {
    var datascroll: number = matchPc
      ? paperPostScrollRef.current.scrollTop
      : window.scrollY;

    if (callstartonce) {
    } else {
      if (menuTimer5.current) {
        clearTimeout(menuTimer5.current);
      }

      setstartPostScroll(datascroll);
      setcallstartonce(true);
    }

    if (menuTimer4.current) {
      clearTimeout(menuTimer4.current);
    }

    menuTimer4.current = setTimeout(function () {
      setendPostScroll(datascroll);

      if (endPostScroll > startPostScroll) {
        if (datascroll < 100) {
          setShownavTop(false);

          if (optinstopshowingReducer) {
            sethaltedTop(true);
            dispatch(UpdateOptionsTop(false));
          }
          setShownav(false);
        } else {
          if (shownavTop) {
          } else {
            setShownavTop(true);
            if (haltedTop) {
              if (datascroll < 100) {
              } else {
                sethaltedTop(false);
                dispatch(UpdateOptionsTop(true));
              }
            }
          }
          setShownav(true);
          if (menuTimer5.current) {
            clearTimeout(menuTimer5.current);
          }

          menuTimer5.current = setTimeout(function () {
            setShownav(false);
          }, 3600);
        }
      } else {
        if (datascroll < 100) {
          setShownavTop(false);

          if (optinstopshowingReducer) {
            sethaltedTop(true);
            dispatch(UpdateOptionsTop(false));
          }
          setShownav(false);
        } else {
          if (shownavTop) {
          } else {
            setShownavTop(true);
            if (haltedTop) {
              if (datascroll < 100) {
              } else {
                sethaltedTop(false);
                dispatch(UpdateOptionsTop(true));
              }
            }
          }
          setShownav(false);
        }
      }

      setcallstartonce(false);
    }, 1850);
  }, [
    window.scrollY,
    shownav,
    paperPostScrollRef,
    endPostScroll,
    callstartonce,
    startPostScroll,
    shownavTop,
    haltedTop,
    HidePostDataOnScroll,
  ]);

  useEffect(() => {
    matchPc
      ? paperPostScrollRef.current.addEventListener("scroll", jayme)
      : window.addEventListener("scroll", jayme);

    return () => {
      matchPc
        ? paperPostScrollRef.current.removeEventListener("scroll", jayme)
        : window.removeEventListener("scroll", jayme);
    };
  }, [jayme]);

  var superFont = "";

  if (matchPc) {
    superFont = "super-starz-text-Pcx";

    ///
  } else if (matchTablet) {
    superFont = "super-starz-text-Tabletx";

    ///
  } else {
    superFont = "super-starz-text-Mobilex";
  }

  return (
    <>
      {shownavTop ? (
        <>
          {optinstopshowingReducer ? (
            <>
              {" "}
              <Grid
                container
                style={{
                  top: "0vh",
                  position: "fixed",
                  width: "100%",
                  height: "0px",
                  zIndex: 11,
                }}
              >
                <Grid xs={12} item style={{ padding: "0px" }}>
                  <Grid
                    item
                    component={Box}
                    display={{ xs: "none", md: "block" }}
                    md={2}
                  ></Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      padding: "0px",
                      paddingRight: matchPc ? "0.8vw" : "0px",
                    }}
                  >
                    <OptionsSlider
                      typeUpload={0}
                      showModalUpload={showModalUpload}
                      OpenUploadModal={OpenUploadModal}
                      sethaltedTop={sethaltedTop}
                      typeTop={true}
                      getSliderWidth={getSliderWidth}
                    />
                  </Grid>
                </Grid>{" "}
              </Grid>
            </>
          ) : (
            <>
              <Grid
                container
                style={{
                  top: "0vh",
                  position: "fixed",
                  width: "100%",
                  height: "0px",
                  zIndex: 10,
                }}
              >
                {" "}
                <Grid
                  item
                  component={Box}
                  display={{ xs: "none", md: "block" }}
                  md={2}
                ></Grid>
                <Grid item xs={12} md={10}>
                  <animated.div style={animationmenu}>
                    <span
                      onClick={(e: any) => {
                        dispatch(UpdateOptionsTop(true));
                      }}
                      className={
                        darkmodeReducer
                          ? `menutopdark ${superFont} turdark zupermenudark`
                          : `menutoplight ${superFont} turlight zupermenulight`
                      }
                      style={{
                        marginLeft: matchPc
                          ? "10px"
                          : matchTablet
                          ? "30px"
                          : "5px",
                        paddingBottom: "9.5px",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        borderBottomLeftRadius: "15px",
                        borderBottomRightRadius: "15px",
                        verticalAlign: "middle",
                        cursor: "pointer",
                        fontWeight: "bolder",
                      }}
                    >
                      <span
                        style={{}}
                        className={
                          darkmodeReducer
                            ? "text-superstarz-dark   text-superstarz-dark-colorA  "
                            : "text-superstarz-light  text-superstarz-light-colorA  "
                        }
                      >
                        Super
                      </span>
                      <span
                        style={{
                          opacity: darkmodeReducer ? "0.83" : "0.8",
                        }}
                        className={
                          darkmodeReducer
                            ? "text-superstarz-dark     text-superstarz-dark-colorB  "
                            : "text-superstarz-light   text-superstarz-light-colorB   "
                        }
                      >
                        starZ
                      </span>
                    </span>
                  </animated.div>
                </Grid>{" "}
              </Grid>
            </>
          )}
        </>
      ) : null}
    </>
  );
}

export const Menu = React.memo(Menux);
