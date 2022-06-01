import React, { useRef, useState, useEffect, useCallback } from "react";
import { matchMobile, matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { Menu } from "./Menu";
import { Billboard } from "./Billboard";
import "./profile.css";
import { Profile } from "./Profile";
import Axios from "axios";
import { CommentTemplate } from "../CommentTemplate";
import { Upload } from "../upload/Upload";
import { UploadProfilePic } from "../upload/UploadProfilePic";
import AddIcon from "@mui/icons-material/Add";
import { OptionsSlider } from "./OptionsSlider";
import { UpdateNavFilterReducer } from "../GlobalActions";
import { UpdateNavCropReducer } from "../GlobalActions";
import LogoutIcon from "@mui/icons-material/Logout";
import { DarkmodeToggleAction } from ".././GlobalActions";

import {
  Paper,
  Grid,
  Switch,
  Typography,
  createTheme,
  MuiThemeProvider,
  Box,
} from "@material-ui/core";

function ProfileOutter() {
  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  const dispatch = useDispatch();

  const [postData, setPostData] = useState<Array<any>>([]);
  const [postDatainner, setpostDatainner] = useState<Array<any>>([[]]);

  const getSliderWidthRef = useRef<HTMLDivElement>(null);

  const [formtype] = useState<number>(1);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  const [x, setx] = useState<boolean>(false);

  useEffect(() => {}, []);

  const [getSliderWidth, setgetSliderWidth] = useState(0);

  const [aboutTemplateGo] = useState<boolean>(true);
  const [commentTemplateGo] = useState<boolean>(false);

  const [navigateUpload, setnavigateUpload] = useState<any>(0);

  const [stopBodyScroll, setStopBodyScroll] = useState<boolean>(false);

  const [showModalUploadProfile, setShowModalUploadProfile] =
    useState<boolean>(false);

  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

  const [showProfiileData, setshowProfiileData] = useState<boolean>(false);

  const [ShowmaxPost, setShowmaxPost] = useState<boolean>(false);

  const [superSettings, setsuperSettings] = useState<boolean>(false);

  ///
  ///
  ///
  ///TYPES FOR ISLOGGEDIN
  interface RootStateScrollType {
    ScrollTypeReducer: {
      scroller: string;
    };
  }

  /////////////////////////////
  ///
  ///
  ///LOGGED IN DATA FROM REDUX
  const { scroller } = useSelector((state: RootStateScrollType) => ({
    ...state.ScrollTypeReducer,
  }));
  const scrollerReducer = scroller;

  ///
  ///
  ///CLOSE LOG MODAL
  const [OpenModalFormOnce, setOpenModalFormOnce] = useState<boolean>(false);
  const CloseModalForm = useCallback((DeviceBackButtonClicked: number) => {
    if (DeviceBackButtonClicked === 1) {
      ///onpopstate fires when back and forward buttons used
      window.onpopstate = () => {
        setShowModalForm(false);
        setOpenModalFormOnce(false);
      };
    } else {
      setShowModalForm(false);
      setOpenModalFormOnce(false);
      ///Replace modal history state with previous history state
      window.history.back();
    }
  }, []);

  const OpenModalForm = useCallback(() => {
    setShowModalForm(true);

    ///Replace current history state (since opening a modal Level 2 grid)...
    /// if this was a level 1 grid (profile-info page use Pushstate to create new history state)
    let modalName = "Biography";

    if (!OpenModalFormOnce) {
      window.history.pushState(null, "", modalName);
      setOpenModalFormOnce(true);
      CloseModalForm(1);
    }
  }, [OpenModalFormOnce, CloseModalForm]);

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (getSliderWidthRef.current && getSliderWidthRef.current.clientWidth) {
      setgetSliderWidth(getSliderWidthRef.current.clientWidth);
    }
  }, [showProfiileData]);

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID

  ///
  ///
  ///
  /// GET GLOBAL INNER NAVIGATION VARIABLE
  const { activatefilterImage, activatecropImage } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.GlobalNavuploadReducer,
    })
  );
  const activatefilterImageReducer = activatefilterImage;
  const activatecropImageReducer = activatecropImage;

  window.onpopstate = () => {
    if (activatefilterImageReducer) {
      dispatch(UpdateNavFilterReducer(false));
    } else if (activatecropImageReducer) {
      dispatch(UpdateNavCropReducer(false));
    } else if (showModalUploadProfile) {
      setStopBodyScroll(false);
      setShowModalUploadProfile(false);
    } else {
      setStopBodyScroll(false);
      setShowModalUpload(false);
    }
  };

  const uploadClose = (DeviceBackButtonClicked: number) => {
    if (DeviceBackButtonClicked === 2) {
      dispatch(UpdateNavFilterReducer(false));
      dispatch(UpdateNavCropReducer(false));
      ///Replace modal history state with previous history state
      window.history.back();
      setshowProfiileData(false);
      callfeeds();
    } else if (DeviceBackButtonClicked === 3) {
      window.history.back();
    } else {
    }
  };

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

  ///
  ///
  ///
  ///MUI PAPER STYLES FROM REDUX
  const { PaperStyleLight, PaperStyleDark } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.PaperReducerLightnDark,
    })
  );
  var PaperStyleReducer = "";

  if (darkmodeReducer) {
    PaperStyleReducer = PaperStyleDark;
  } else {
    PaperStyleReducer = PaperStyleLight;
  }

  function percentage(num: number, per: number) {
    return (num / 100) * per;
  }

  ////////////////////////////////////////////////////////////////////

  ///
  ///
  ///
  ///DOT ENV DATA

  const callfeeds = () => {
    Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/feeds_chronological`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.message === "feeds fetched") {
          var postdataRep = response.data.payload;

          postdataRep.forEach((obj: any) => {
            obj.itemheight = "auto";
            obj.itemrealheighthold = "0";
            obj.itemcroptype = "0";
            obj.itemFinalPostHeight = "0";
            obj.itemOriginalPostHeight = "0";
            obj.itemCLICKED = false;
            obj.onLoadDataOnce = false;
            obj.ActiveAutoPlay = true;
          });

          const newArrxt: any = [[...postDatainner]];
          postdataRep.map((obj: any, index: any) => {
            const newArrxtq: any = [];
            for (let i = 0; i < postdataRep[index].post_count; i++) {
              ///////////////////////////////

              if (i === 0) {
                newArrxtq[i] = `${postdataRep[index].item1}`;
              } else if (i === 1) {
                newArrxtq[i] = `${postdataRep[index].item2}`;
              } else if (i === 2) {
                newArrxtq[i] = `${postdataRep[index].item3}`;
              } else if (i === 3) {
                newArrxtq[i] = `${postdataRep[index].item4}`;
              } else if (i === 4) {
                newArrxtq[i] = `${postdataRep[index].item5}`;
              } else if (i === 5) {
                newArrxtq[i] = `${postdataRep[index].item6}`;
              } else if (i === 6) {
                newArrxtq[i] = `${postdataRep[index].item7}`;
              } else if (i === 7) {
                newArrxtq[i] = `${postdataRep[index].item8}`;
              } else if (i === 8) {
                newArrxtq[i] = `${postdataRep[index].item9}`;
              } else if (i === 9) {
                newArrxtq[i] = `${postdataRep[index].item10}`;
              } else if (i === 10) {
                newArrxtq[i] = `${postdataRep[index].item11}`;
              } else if (i === 11) {
                newArrxtq[i] = `${postdataRep[index].item12}`;
              } else if (i === 12) {
                newArrxtq[i] = `${postdataRep[index].item13}`;
              } else if (i === 13) {
                newArrxtq[i] = `${postdataRep[index].item14}`;
              } else if (i === 14) {
                newArrxtq[i] = `${postdataRep[index].item15}`;
              } else if (i === 15) {
                newArrxtq[i] = `${postdataRep[index].item16}`;
              } else {
              }

              if (i + 1 === postdataRep[index].post_count) {
                newArrxt[index] = newArrxtq;
                setpostDatainner(newArrxt);
              }
              document.body.focus();
              /////
              ///////////////////////////////
            }
          });
          setPostData(postdataRep);
          setshowProfiileData(true);
        } else if (response.data.message === "error in fetching feeds") {
          alert("Connection malfunction profile outter");
        }
      })
      .catch(function (error) {
        console.log("Connection malfunction profile outter 2");
      });
  };

  ///
  ///
  ///MODAL ZOOMED STATE
  useEffect(() => {
    callfeeds();
  }, [REACT_APP_SUPERSTARZ_URL]);

  const breakPoints = {
    default: 2,
    960: 2,
    600: 1,
  };

  ///
  ///
  ///TYPES FOR ISLOGGEDIN
  interface RootStateIsLogged {
    IsLoggedReducer: {
      loggedIn: boolean;
    };
  }

  ///
  ///LOGGED IN DATA FROM REDUX
  const { loggedIn } = useSelector((state: RootStateIsLogged) => ({
    ...state.IsLoggedReducer,
  }));
  const loggedInReducer = loggedIn;

  const paperPostScrollRef = useRef<any>(null);

  ///
  ///
  ///
  ///OPEN MODAL THEN CALL CLOSEMODAL FUNCTION WHICH WAITS FOR A POP EVENT(for closing modal)
  const OpenUploadModalProfile = useCallback(() => {
    setStopBodyScroll(true);
    setShowModalUploadProfile(true);
    //pushstate add enteries to your history
    // uploadClose(1);
    window.history.pushState(null, "", "Profile_Pic");
  }, [showModalUploadProfile]);

  ///
  ///
  ///
  ///OPEN MODAL THEN CALL CLOSEMODAL FUNCTION WHICH WAITS FOR A POP EVENT(for closing modal)
  const OpenUploadModal = useCallback(() => {
    setStopBodyScroll(true);
    setShowModalUpload(true);
    //pushstate add enteries to your history
    window.history.pushState(null, "", "Upload");
  }, [showModalUpload]);

  var widthProfilePic = matchPc ? "70%" : matchTablet ? "85%" : "42vw";
  var topProfilePic = matchPc ? "-20vh" : matchTablet ? "-13vh" : "-9vh";
  var leftProfilePic = matchPc ? "1vw" : matchTablet ? "3.5vw" : "2.7vw";

  var optionsClass = "";
  var fontOptions = "";

  if (matchPc) {
    optionsClass = "profile-optionsImagePc";
    fontOptions = "2.7vw";
  } else if (matchTablet) {
    optionsClass = "profile-optionsImageTablet";
    fontOptions = "5rem";
  } else {
    optionsClass = "profile-optionsImageMobile";
    fontOptions = "1.9rem";
  }

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

  ///
  ///
  ///
  /// GET LOGGED USER DATA FROM REDUX STORE
  interface RootStateReducerImage {
    UserdataReducer: {
      image: string;
    };
  }
  const { image } = useSelector((state: RootStateReducerImage) => ({
    ...state.UserdataReducer,
  }));
  const imageReducer = image;

  const blank = () => {};

  interface IappVariables {
    shade: string;
    shade2: string;
    shade2num: string;
    shade2nump: string;
    secondarymaincolor: string;
    maincolor: string;
    shade2nump22: string;
    littleTextColor: string;
  }

  var appVariables: IappVariables = {
    shade: "",
    shade2: "",
    shade2num: "",
    shade2nump: "",
    secondarymaincolor: "",
    maincolor: "",
    shade2nump22: "",
    littleTextColor: "",
  };

  var appVariablesDARK: IappVariables = {
    shade: "#cccccc",
    shade2: "#ffffff",
    shade2num: "1.1",
    shade2nump: "1.8",
    secondarymaincolor: "#dddddd",
    maincolor: "#dddddd",
    shade2nump22: "5.5",
    littleTextColor: "#dddddd",
  };

  var appVariablesLIGHT: IappVariables = {
    shade: "#0b111b",
    shade2: "#0b111b",
    shade2num: "1.5",
    shade2nump: "1.5",
    secondarymaincolor: "#0b111b",
    maincolor: "#0b111b",
    shade2nump22: "8",
    littleTextColor: "#0b111b",
  };

  ///
  ///
  ///
  ///CONDITIONAL STATEMENT FOR DARKMODE
  if (darkmodeReducer) {
    appVariables = appVariablesDARK;
  } else {
    appVariables = appVariablesLIGHT;
  }
  var colorx =
    colortypeReducer === 0
      ? darkmodeReducer
        ? colorReducerdark
        : colorReducer
      : colorReducer;
  ///
  ///
  ///
  ///MATERIAL UI  THEME CUSTOMIZATAION
  let themeGeneralSettings = createTheme({
    palette: {
      primary: {
        main: `${appVariables.secondarymaincolor}`,
      },
      secondary: {
        main: `${appVariables.secondarymaincolor}`,
      },
      type: darkmodeReducer ? "dark" : "light",
    },
    overrides: {
      MuiSlider: {
        thumb: {
          height: "4vh",
          width: "4vh",
          marginTop: "-1.8vh",
          boxShadow: darkmodeReducer ? "0 0 5.5px#dddddd" : " 0 0 3.1px#444444",
          color: colorx,
        },
        track: {
          color: colorx,
          height: "4px",
        },
        rail: {
          boxShadow: darkmodeReducer ? "0 0 5.5px#dddddd" : " 0 0 3.1px#444444",
          color: darkmodeReducer ? "black" : "white",
          height: "4px",
        },
      },
    },
  });

  const [profileimageSource, setprofileimageSource] = useState<any>([]);
  const [cropimageProfile, setcropimageProfile] = useState<any>(null);

  const [typex, settypex] = useState<any>(null);

  const click = (event: any) => {
    event.target.value = null;
  };

  const billboardx = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const FileArray = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );

      if (e.target.files.length > 1) {
        setShowmaxPost(true);
        setTimeout(function () {
          setShowmaxPost(false);
        }, 3000);
      } else {
        settypex("billboard");
        setprofileimageSource([]);
        setprofileimageSource((prevImages: any) =>
          prevImages.concat(FileArray)
        );
        setcropimageProfile(FileArray[0]);
        OpenUploadModalProfile();
      }

      //const formData = new FormData();
      ///for (let i = 0; i < e.target.files.length; i++) {
      //formData.append("superImages", e.target.files[i]);}
      ////

      ///dispatch(UpdateNavCropReducer(true));
    }
  };

  const profilex = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const FileArray = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );

      if (e.target.files.length > 1) {
        setShowmaxPost(true);
        setTimeout(function () {
          setShowmaxPost(false);
        }, 3000);
      } else {
        settypex("Profile");
        setprofileimageSource([]);
        setprofileimageSource((prevImages: any) =>
          prevImages.concat(FileArray)
        );
        setcropimageProfile(FileArray[0]);
        OpenUploadModalProfile();
      }

      //const formData = new FormData();
      ///for (let i = 0; i < e.target.files.length; i++) {
      //formData.append("superImages", e.target.files[i]);}
      ////

      ///dispatch(UpdateNavCropReducer(true));
    }
  };

  var toggleDarkMode: boolean = false;

  const switchThemes = () => {
    if (darkmodeReducer) {
      toggleDarkMode = false;
    } else {
      toggleDarkMode = true;
    }
    dispatch(DarkmodeToggleAction());
    ////ACESSING LOCALSTORAGE
    localStorage.setItem("darkmode", toggleDarkMode.toString());
  };

  const rememberUser = () => {
    Axios.post(
      `http://${REACT_APP_SUPERSTARZ_URL}/keepmeloggedin`,
      {
        values: "logout",
      },
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        if (response.data.message === "cookie") {
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log("Connection failure ");
      });
  };

  return (
    <>
      {loggedInReducer ? (
        <>
          <Paper
            ref={paperPostScrollRef}
            className={
              matchPc
                ? darkmodeReducer
                  ? "postscroll-dark"
                  : "postscroll-light"
                : darkmodeReducer
                ? "postscroll-darkm"
                : "postscroll-lightm"
            }
            style={{
              scrollSnapType: x ? "y mandatory" : "",

              backgroundImage: PaperStyleReducer,
              borderRadius: "0px",
              height: "100vh",
              width: "100%",
              overflowY:
                (stopBodyScroll && matchMobile) ||
                (stopBodyScroll && matchTablet)
                  ? "hidden"
                  : "auto",
              overflowX: "hidden",
              paddingBottom: "15vh",
            }}
          >
            <MuiThemeProvider theme={themeGeneralSettings}>
              <Grid
                container
                className="dontallowhighlighting"
                style={{ scrollSnapAlign: "start" }}
              >
                <Menu
                  showModalUpload={showModalUpload}
                  OpenUploadModal={OpenUploadModal}
                  getSliderWidth={getSliderWidth}
                  paperPostScrollRef={paperPostScrollRef}
                />
                <Billboard
                  OpenModalForm={OpenModalForm}
                  click={click}
                  billboardx={billboardx}
                />

                <Grid
                  item
                  xs={12}
                  style={{ padding: "0px", height: "0px" }}
                ></Grid>
                <Grid
                  item
                  ref={getSliderWidthRef}
                  xs={2}
                  md={1}
                  style={{ padding: "0px" }}
                ></Grid>
                <Grid
                  item
                  xs={12}
                  style={{ padding: "0px", height: "0px" }}
                ></Grid>
                <Grid
                  item
                  component={Box}
                  display={{ xs: "none", md: "block" }}
                  md={2}
                ></Grid>

                <Grid item xs={5} md={3} style={{ padding: "0px" }}>
                  {" "}
                  <Grid
                    item
                    xs={12}
                    style={{
                      position: "relative",
                      width: widthProfilePic,
                      height: "auto",
                      marginLeft: leftProfilePic,
                      top: topProfilePic,
                      zIndex: 3,
                    }}
                  >
                    <Grid
                      className={`  ${optionsClass}   `}
                      style={{
                        zIndex: 2,
                        backgroundColor:
                          colortypeReducer === 0
                            ? darkmodeReducer
                              ? colorReducerdark
                              : colorReducer
                            : colorReducer,

                        opacity: 0.7,
                      }}
                    >
                      <AddIcon
                        style={{
                          fontSize: fontOptions,
                          color: "#ffffff",
                        }}
                        className="zuperkinginfo"
                      />
                    </Grid>
                    <img
                      className={
                        darkmodeReducer
                          ? `turprofileDark image-zoom-on-click`
                          : ` turprofileLight image-zoom-on-click`
                      }
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        zIndex: 0,
                        textAlign: "left",
                        objectFit: "contain",
                        width: "100%",
                        borderRadius: "50%",
                        margin: "auto",
                        filter: "blur(1.3px)",
                        display: "none",
                      }}
                      src={`./images/profilethumb/${imageReducer}`}
                      alt="Superstarz Billboard "
                    />{" "}
                    <label htmlFor="profilexx">
                      <img
                        onClick={() => {
                          ////OpenModalForm();
                        }}
                        className={
                          darkmodeReducer
                            ? `turprofileDark image-gray-on-click`
                            : ` turprofileLight image-gray-on-click`
                        }
                        style={{
                          cursor: "pointer",
                          position: "relative",
                          zIndex: 1,
                          objectFit: "contain",
                          width: "100%",
                          borderRadius: "50%",
                          margin: "auto",
                        }}
                        src={`./images/profile/${imageReducer}`}
                        alt="Superstarz Billboard "
                      />
                    </label>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={7}
                  md={5}
                  style={{
                    position: "relative",
                    height: "19.5vh",
                    paddingLeft: matchPc
                      ? "25px"
                      : matchTablet
                      ? "42px"
                      : "24px",
                    marginTop: matchTablet ? "10px" : "-4px",
                    zIndex: 1,
                  }}
                >
                  <OptionsSlider
                    setsuperSettings={setsuperSettings}
                    typeUpload={0}
                    showModalUpload={showModalUpload}
                    OpenUploadModal={OpenUploadModal}
                    sethaltedTop={blank}
                    typeTop={false}
                    getSliderWidth={getSliderWidth}
                  />
                </Grid>
              </Grid>

              {ShowmaxPost ? (
                <Grid
                  container
                  style={{
                    height: "100%",
                    position: "fixed",
                    top: "0vh",
                    zIndex: 99,
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    style={{
                      padding: "0px",
                      margin: "auto",
                    }}
                  >
                    <span
                      className={
                        darkmodeReducer
                          ? "dialog-container tur"
                          : "dialog-container tur"
                      }
                      style={{
                        height: "30px",
                        width: "90px",
                        borderRadius: "00px",
                        backgroundColor: "#00ccff",
                        margin: "auto",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          marginTop: "8px",
                        }}
                      >
                        {" "}
                        max 1
                      </span>
                    </span>
                  </Grid>
                </Grid>
              ) : null}
              {showProfiileData ? (
                <Profile
                  x={x}
                  setx={setx}
                  showProfiileData={showProfiileData}
                  getSliderWidthRef={getSliderWidthRef}
                  OpenModalForm={OpenModalForm}
                  getSliderWidth={getSliderWidth}
                  postData={postData}
                  formtype={formtype}
                  showModalForm={showModalForm}
                  CloseModalForm={CloseModalForm}
                  aboutTemplateGo={aboutTemplateGo}
                  commentTemplateGo={commentTemplateGo}
                  postDatainner={postDatainner}
                  paperPostScrollRef={paperPostScrollRef}
                />
              ) : null}

              {superSettings ? (
                <>
                  <Grid
                    container
                    style={{
                      position: "fixed",
                      top: "0px",
                      width: "100%",
                      height: "100%",
                      zIndex: 10,
                    }}
                  >
                    <Grid
                      container
                      onClick={() => {
                        setsuperSettings(false);
                      }}
                      style={{
                        backgroundColor: darkmodeReducer
                          ? "rgba(50,50,50,0.05)"
                          : "rgba(250,250,250,0.05)",
                        position: "fixed",
                        top: "0px",
                        width: "100%",
                        height: "100%",
                        zIndex: 8,
                      }}
                    ></Grid>{" "}
                    <Grid
                      xs={6}
                      style={{
                        padding: "0px",
                        backgroundColor: darkmodeReducer
                          ? "rgba(50,50,50,0.85)"
                          : "rgba(250,250,250,0.75)",
                        height: "26vh",
                        marginTop: "22vh",
                        textAlign: "center",
                        justifyContent: "center",
                        display: "grid",
                        alignItems: "center",
                        position: "relative",
                        zIndex: 10,
                      }}
                    >
                      <Switch
                        size="medium"
                        checked={darkmodeReducer}
                        className={
                          darkmodeReducer
                            ? "make-small-icons-clickable-lightCroptheme  "
                            : "make-small-icons-clickable-darkCroptheme    "
                        }
                        style={{
                          fontSize:
                            matchTablet || matchMobile ? "2.8vh" : "2.9vw",
                        }}
                        onChange={() => {
                          switchThemes();
                        }}
                      />
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

                          color: darkmodeReducer ? "#dddddd" : "#0b111b",
                        }}
                      >
                        theme
                      </Grid>
                    </Grid>
                    <Grid
                      xs={6}
                      style={{
                        padding: "0px",
                        backgroundColor: darkmodeReducer
                          ? "rgba(50,50,50,0.85)"
                          : "rgba(250,250,250,0.75)",
                        height: "26vh",
                        marginTop: "22vh",
                        textAlign: "center",
                        justifyContent: "center",
                        display: "grid",
                        alignItems: "center",
                        position: "relative",
                        zIndex: 10,
                      }}
                    >
                      <LogoutIcon
                        onClick={rememberUser}
                        className={
                          darkmodeReducer
                            ? "make-small-icons-clickable-lightCrop turdark dontallowhighlighting zuperkingIcon "
                            : "make-small-icons-clickable-darkCrop  turdark dontallowhighlighting zuperkingIcon  "
                        }
                        style={{
                          margin: "auto",

                          fontSize:
                            matchTablet || matchMobile ? "4.8vh" : "2.9vw",
                        }}
                      />
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

                          color: darkmodeReducer ? "#dddddd" : "#0b111b",
                        }}
                      >
                        log out
                      </Grid>
                    </Grid>
                  </Grid>{" "}
                </>
              ) : null}

              <CommentTemplate
                formtype={formtype}
                showModalForm={showModalForm}
                CloseModalForm={CloseModalForm}
                aboutTemp={aboutTemplateGo}
                commentTemp={commentTemplateGo}
              />

              <UploadProfilePic
                uploadClose={uploadClose}
                profileimageSource={profileimageSource}
                cropimageProfile={cropimageProfile}
                showModalUploadProfile={showModalUploadProfile}
                typex={typex}
              />

              <Upload
                setShowModalUpload={setShowModalUpload}
                setStopBodyScroll={setStopBodyScroll}
                closeUploadModal={uploadClose}
                showModalUpload={showModalUpload}
                OpenUploadModal={OpenUploadModal}
                getSliderWidth={getSliderWidth}
              />

              <input
                onClick={click}
                onChange={profilex}
                type="file"
                name="superImages"
                accept="image/*"
                multiple
                id="profilexx"
                style={{ visibility: "hidden" }}
              />
            </MuiThemeProvider>
          </Paper>
        </>
      ) : null}
    </>
  );
}

export default ProfileOutter;
