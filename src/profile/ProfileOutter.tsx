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
import AddIcon from "@mui/icons-material/Add";
import { OptionsSlider } from "./OptionsSlider";
import { UpdateNavFilterReducer } from "../GlobalActions";
import { UpdateNavCropReducer } from "../GlobalActions";

import {
  Paper,
  Grid,
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

  const [getSliderWidth, setgetSliderWidth] = useState(0);

  const [aboutTemplateGo] = useState<boolean>(true);
  const [commentTemplateGo] = useState<boolean>(false);

  const [itemheight, setitemheight] = useState<Array<string>>([]);
  const [itemheighthold, setitemheighthold] = useState<Array<string>>([]);
  const [itemcroptype, setitemcroptype] = useState<Array<number>>([]);
  const [itemFinalPostHeight, setitemFinalPostHeight] = useState<Array<number>>(
    []
  );
  const [itemOriginalPostHeight, setitemOriginalPostHeight] = useState<
    Array<number>
  >([]);

  const [itemCLICKED, setitemCLICKED] = useState<Array<boolean>>([]);
  const [onLoadDataOnce, setonLoadDataOnce] = useState<Array<boolean>>([]);
  const [ActiveAutoPlay, setActiveAutoPlay] = useState<Array<boolean>>([]);

  const postDivRef = useRef<any>([]);

  const postItemsRef = useRef<any>([]);

  var heightplus = matchPc ? 0.38 : matchTablet ? 0.3 : 0.265;
  var postbackheighthold = document.documentElement.clientHeight * heightplus;

  const [postbackheight] = useState<number>(postbackheighthold);

  const scrollTypeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [navigateUpload, setnavigateUpload] = useState<any>(0);

  const [stopBodyScroll, setStopBodyScroll] = useState<boolean>(false);

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
  }, []);

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

  const uploadClose = (DeviceBackButtonClicked: number) => {
    if (DeviceBackButtonClicked === 1) {
      ///onpopstate fires when back and forward buttons used
      window.onpopstate = () => {
        if (activatefilterImageReducer) {
          dispatch(UpdateNavFilterReducer(false));
        } else if (activatecropImageReducer) {
          dispatch(UpdateNavCropReducer(false));
        } else {
          setStopBodyScroll(false);
          setShowModalUpload(false);
        }
      };
    } else {
      if (activatefilterImageReducer) {
        dispatch(UpdateNavFilterReducer(false));
      } else {
        setStopBodyScroll(false);
        setShowModalUpload(false);
      }
      ///Replace modal history state with previous history state
      window.history.back();
    }
  };

  ///
  ///
  ///
  /// CLOSE MODAL (STARTS AN ONPOPSTATE EVENT)
  const closeboy = useCallback(
    (DeviceBackButtonClicked: number, navigateUploadx: number) => {
      //pop states fires when back and forward buttons used
      if (showModalUpload) {
        uploadClose(DeviceBackButtonClicked);
      }
    },
    [window.onpopstate, uploadClose]
  );

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WID TH FROM MATERIAL UI GRID
  useEffect(() => {
    closeboy(1, 0);
    ///
    if (getSliderWidthRef.current && getSliderWidthRef.current.clientWidth) {
      setgetSliderWidth(getSliderWidthRef.current.clientWidth);
    }
  }, [closeboy]);
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
  ///CREATE REFS FROM POSTS AND ADD THEM TO ARRAY
  const addPostItemsRef = (itemsRef: any) => {
    if (itemsRef && !postItemsRef.current.includes(itemsRef)) {
      postItemsRef.current.push(itemsRef);
    }
    ////console.log(postItemsRef.current[1]);
  };

  ///
  ///
  ///
  ///CREATE div REFS FROM POSTS AND ADD THEM TO ARRAY
  const addpostDivRef = (divRef: any) => {
    if (divRef && !postDivRef.current.includes(divRef)) {
      postDivRef.current.push(divRef);
    }
    ////console.log(postItemsRef.current[1]);
  };

  ///
  ///
  ///
  ///DOT ENV DATA

  ///
  ///
  ///MODAL ZOOMED STATE
  useEffect(() => {
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
              /////
              ///////////////////////////////
            }
          });

          setPostData(postdataRep);
        } else if (response.data.message === "error in fetching feeds") {
          alert("Connection malfunction profile outter");
        }
      })
      .catch(function (error) {
        alert("Connection malfunction profile outter 2");
      });
  }, [REACT_APP_SUPERSTARZ_URL]);

  useEffect(() => {
    if (postData.length > 0) {
      const initialItemheight = postData.map((obj) => obj.itemheight);
      setitemheight(initialItemheight);

      const initialItemrealheighthold = postData.map(
        (obj) => obj.itemrealheighthold
      );
      setitemheighthold(initialItemrealheighthold);

      const initialtemcroptype = postData.map((obj) => obj.itemcroptype);
      setitemcroptype(initialtemcroptype);

      const initialitemFinalPostHeight = postData.map(
        (obj) => obj.itemFinalPostHeight
      );
      setitemFinalPostHeight(initialitemFinalPostHeight);

      const initialitemOriginalPostHeight = postData.map(
        (obj) => obj.itemOriginalPostHeight
      );
      setitemOriginalPostHeight(initialitemOriginalPostHeight);

      const initialitemCLICKED = postData.map((obj) => obj.itemCLICKED);
      setitemCLICKED(initialitemCLICKED);

      const initialsetonLoadDataOnce = postData.map(
        (obj) => obj.onLoadDataOnce
      );
      setonLoadDataOnce(initialsetonLoadDataOnce);

      const initialsetActiveAutoPlay = postData.map(
        (obj) => obj.ActiveAutoPlay
      );
      setActiveAutoPlay(initialsetActiveAutoPlay);
    }
  }, [postData]);

  ///
  ///
  const onPostsItemload = useCallback(
    (e: any, index: number, itemnum: number) => {
      if (onLoadDataOnce[index]) {
      } else {
        if (itemnum === 0) {
          if (postItemsRef.current[index]) {
            var imageHeight = postItemsRef.current[index].clientHeight;

            ///////////////////////////////
            const newArraa = [...itemheight];
            newArraa[index] = `${imageHeight}px`;
            setitemheight(newArraa);
            ///////////////////////////////

            ///////////////////////////////
            const newArrx = [...itemheighthold];
            var newh = imageHeight / 1.042 - postbackheighthold;
            newArrx[index] = `${newh}`;
            setitemheighthold(newArrx);
            ///////////////////////////////
            const newArrayFinalPostHeight = [...itemFinalPostHeight];
            newArrayFinalPostHeight[index] = imageHeight;
            setitemFinalPostHeight(newArrayFinalPostHeight);

            ///////////////////////////////
            const newArrayitemOriginalPostHeight = [...itemOriginalPostHeight];
            newArrayitemOriginalPostHeight[index] = imageHeight;
            setitemOriginalPostHeight(newArrayitemOriginalPostHeight);
            ///////////////////////////////

            var choppedHeight = percentage(screenHeightReducer, 100);

            var choppedwidth = percentage(
              screenHeightReducer,
              matchPc ? 55 : matchTablet ? 52 : 40
            );

            if (imageHeight < choppedwidth) {
              /////WIDE IMAGE SET
              const newArr = [...itemheight];
              newArr[index] = `${choppedwidth}px`;
              setitemheight(newArr);
              ///////////////////////////////
              const newArrx = [...itemheighthold];
              var newh = choppedwidth / 1.015 - postbackheighthold;
              newArrx[index] = `${newh}`;
              setitemheighthold(newArrx);
              ////////////////////////////
              ///////////////////////////////
              const newArrxq = [...itemcroptype];
              newArrxq[index] = 1;
              setitemcroptype(newArrxq);
              ////////////////////////////
              ///////////////////////////////
              const newArrayFinalPostHeight = [...itemFinalPostHeight];
              newArrayFinalPostHeight[index] = choppedwidth;
              setitemFinalPostHeight(newArrayFinalPostHeight);
            } else if (imageHeight > choppedHeight) {
              /////LONG IMAGE SET
              const newArr = [...itemheight];
              newArr[index] = `${choppedHeight}px`;
              setitemheight(newArr);
              ///////////////////////////////
              const newArrx = [...itemheighthold];
              var newh = choppedHeight / 1 - postbackheighthold;
              newArrx[index] = `${newh}`;
              setitemheighthold(newArrx);
              ////////////////////////////////
              ///////////////////////////////
              const newArrxq = [...itemcroptype];
              newArrxq[index] = 2;
              setitemcroptype(newArrxq);
              ///////////////////////////////
              const newArrayFinalPostHeight = [...itemFinalPostHeight];
              newArrayFinalPostHeight[index] = choppedHeight;
              setitemFinalPostHeight(newArrayFinalPostHeight);
              ///////////////////////////////
            } else {
              var imageWidth = postItemsRef.current[index].clientWidth;
              if (imageWidth > imageHeight) {
                ///////////////////////////////
                const newArrx = [...itemheighthold];
                var newh = imageHeight / 1.066 - postbackheighthold;
                newArrx[index] = `${newh}`;
                setitemheighthold(newArrx);
                ///////////////////////////////
                ///////////////////////////////
                const newArrxq = [...itemcroptype];
                newArrxq[index] = 3;
                setitemcroptype(newArrxq);
                ///////////////////////////////
              } else {
                ///////////////////////////////
                const newArrxq = [...itemcroptype];
                newArrxq[index] = 4;
                setitemcroptype(newArrxq);
                ///////////////////////////////
              }
            }
            ///////////////////////////////
            const newArrxy = [...onLoadDataOnce];
            newArrxy[index] = true;
            setonLoadDataOnce(newArrxy);
            ///////////////////////////////
          }
        }
      }
    },
    [screenHeightReducer, itemheight, itemheighthold, itemFinalPostHeight]
  );

  const scrollToPost = (index: any) => {
    postDivRef.current[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const postitemSHOWFULLHEIGHT = (index: any, type: number) => {
    if (itemcroptype[index] === 1 || itemcroptype[index] === 2) {
      if (type === 0) {
        const newitemHeight = [...itemheight];
        newitemHeight[index] = `auto`;
        setitemheight(newitemHeight);
      } else {
        const newitemHeight = [...itemheight];
        newitemHeight[index] = `${itemFinalPostHeight[index]}px`;
        setitemheight(newitemHeight);
      }
    }
  };

  const scrollLongPicTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollLongPicTimerx = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const AUTOSlideLongImages = (index: number) => {
    if (itemcroptype[index] === 2) {
      scrollLongPicTimerx.current = setTimeout(() => {
        if (paperPostScrollRef.current) {
          paperPostScrollRef.current.scrollTo({
            top:
              paperPostScrollRef.current.scrollTop +
              itemOriginalPostHeight[index] / 3,
            behavior: "smooth",
          });
        }
      }, 500);
      scrollLongPicTimer.current = setTimeout(() => {
        postDivRef.current[index].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 1300);
    }
  };

  ///
  ///
  ///
  /// SLIDER DISPATCH

  const onPostsItemClicked = (index: number) => {
    if (itemCLICKED[index]) {
      const newclickArray = [...itemCLICKED];
      newclickArray[index] = false;
      setitemCLICKED(newclickArray);
      postitemSHOWFULLHEIGHT(index, 1);
      scrollToPost(index);
    } else {
      AUTOSlideLongImages(index);
      if (scrollTypeTimer.current) {
        clearTimeout(scrollTypeTimer.current);
      }

      const newclickArray = [...itemCLICKED];
      newclickArray[index] = true;
      setitemCLICKED(newclickArray);
      postitemSHOWFULLHEIGHT(index, 0);
      scrollToPost(index);
    }
  };

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

  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

  ///
  ///
  ///
  ///OPEN MODAL THEN CALL CLOSEMODAL FUNCTION WHICH WAITS FOR A POP EVENT(for closing modal)
  const OpenUploadModal = useCallback(() => {
    setStopBodyScroll(true);
    setShowModalUpload(!showModalUpload);
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
                : ""
            }
            style={{
              backgroundImage: PaperStyleReducer,
              borderRadius: "0px",
              minHeight: matchPc
                ? ""
                : (stopBodyScroll && matchMobile) ||
                  (stopBodyScroll && matchTablet)
                ? " "
                : "100vh",
              height: matchPc
                ? "100vh"
                : (stopBodyScroll && matchMobile) ||
                  (stopBodyScroll && matchTablet)
                ? "100vh"
                : "",
              overflowY:
                (stopBodyScroll && matchMobile) ||
                (stopBodyScroll && matchTablet)
                  ? "hidden"
                  : "auto",
              overflowX: "hidden",
              paddingBottom: matchPc ? "20px" : "9px",
            }}
          >
            <MuiThemeProvider theme={themeGeneralSettings}>
              <Grid container className="dontallowhighlighting">
                <Menu
                  showModalUpload={showModalUpload}
                  OpenUploadModal={OpenUploadModal}
                  getSliderWidth={getSliderWidth}
                  paperPostScrollRef={paperPostScrollRef}
                />
                <Billboard OpenModalForm={OpenModalForm} />

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
                      onClick={OpenModalForm}
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
                      }}
                      src={`./images/profilethumb/${imageReducer}`}
                      alt="Superstarz Billboard "
                    />{" "}
                    <img
                      onClick={OpenModalForm}
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
                    typeUpload={0}
                    showModalUpload={showModalUpload}
                    OpenUploadModal={OpenUploadModal}
                    sethaltedTop={blank}
                    typeTop={false}
                    getSliderWidth={getSliderWidth}
                  />
                </Grid>
              </Grid>

              <Profile
                getSliderWidthRef={getSliderWidthRef}
                OpenModalForm={OpenModalForm}
                getSliderWidth={getSliderWidth}
                postData={postData}
                addPostItemsRef={addPostItemsRef}
                postDivRef={postDivRef}
                onPostsItemload={onPostsItemload}
                itemheight={itemheight}
                itemheighthold={itemheighthold}
                postbackheight={postbackheight}
                formtype={formtype}
                showModalForm={showModalForm}
                CloseModalForm={CloseModalForm}
                aboutTemplateGo={aboutTemplateGo}
                commentTemplateGo={commentTemplateGo}
                itemcroptype={itemcroptype}
                itemFinalPostHeight={itemFinalPostHeight}
                onPostsItemClicked={onPostsItemClicked}
                itemCLICKED={itemCLICKED}
                addpostDivRef={addpostDivRef}
                postDatainner={postDatainner}
                itemOriginalPostHeight={itemOriginalPostHeight}
                ActiveAutoPlay={ActiveAutoPlay}
                setActiveAutoPlay={setActiveAutoPlay}
                AUTOSlideLongImages={AUTOSlideLongImages}
                paperPostScrollRef={paperPostScrollRef}
                onLoadDataOnce={onLoadDataOnce}
              />

              <CommentTemplate
                formtype={formtype}
                showModalForm={showModalForm}
                CloseModalForm={CloseModalForm}
                aboutTemp={aboutTemplateGo}
                commentTemp={commentTemplateGo}
              />

              <Upload
                showModalUpload={showModalUpload}
                OpenUploadModal={OpenUploadModal}
                getSliderWidth={getSliderWidth}
              />
            </MuiThemeProvider>
          </Paper>
        </>
      ) : null}
    </>
  );
}

export default ProfileOutter;
