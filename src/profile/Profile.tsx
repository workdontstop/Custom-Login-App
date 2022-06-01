import React, { useState, useRef, useCallback, useEffect } from "react";
import { Menu } from "./Menu";
import { Billboard } from "./Billboard";
import { Post } from "./Post";
import { OptionsSlider } from "./OptionsSlider";

import { matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import {
  Paper,
  Grid,
  Typography,
  createTheme,
  MuiThemeProvider,
  Box,
} from "@material-ui/core";
import ImagePhotoSizeSelectSmall from "material-ui/svg-icons/image/photo-size-select-small";
import Masonry from "@mui/lab/Masonry";
import AddIcon from "@mui/icons-material/Add";
import { Upload } from "../upload/Upload";

function Profilex({
  OpenModalForm,
  getSliderWidthRef,
  getSliderWidth,
  postData,
  formtype,
  showModalForm,
  CloseModalForm,
  aboutTemplateGo,
  commentTemplateGo,
  postDatainner,
  showProfiileData,
  paperPostScrollRef,
  setx,
  x,
}: any) {
  const dispatch = useDispatch();

  const postDivRef = useRef<any>([]);

  const postItemsRef = useRef<any>([]);
  ///

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

  var heightplus = matchPc ? 0.38 : matchTablet ? 0.3 : 0.265;
  var postbackheighthold = document.documentElement.clientHeight * heightplus;

  const [postbackheight] = useState<number>(postbackheighthold);

  const scrollTypeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (postData.length > 0 && showProfiileData) {
      const initialItemheight = postData.map((obj: any) => obj.itemheight);
      setitemheight(initialItemheight);

      const initialItemrealheighthold = postData.map(
        (obj: any) => obj.itemrealheighthold
      );
      setitemheighthold(initialItemrealheighthold);

      const initialtemcroptype = postData.map((obj: any) => obj.itemcroptype);
      setitemcroptype(initialtemcroptype);

      const initialitemFinalPostHeight = postData.map(
        (obj: any) => obj.itemFinalPostHeight
      );
      setitemFinalPostHeight(initialitemFinalPostHeight);

      const initialitemOriginalPostHeight = postData.map(
        (obj: any) => obj.itemOriginalPostHeight
      );
      setitemOriginalPostHeight(initialitemOriginalPostHeight);

      const initialitemCLICKED = postData.map((obj: any) => obj.itemCLICKED);
      setitemCLICKED(initialitemCLICKED);

      const initialsetonLoadDataOnce = postData.map(
        (obj: any) => obj.onLoadDataOnce
      );
      setonLoadDataOnce(initialsetonLoadDataOnce);

      const initialsetActiveAutoPlay = postData.map(
        (obj: any) => obj.ActiveAutoPlay
      );
      setActiveAutoPlay(initialsetActiveAutoPlay);
    }
  }, [postData, showProfiileData]);

  const newArraa = [...itemheight];

  const newArrxy = [...onLoadDataOnce];
  const newArrayFinalPostHeight = [...itemFinalPostHeight];
  const newArrxq = [...itemcroptype];

  const newArrayitemOriginalPostHeight = [...itemOriginalPostHeight];

  const newArrx = [...itemheighthold];

  const newArr = [...itemheight];

  function percentage(num: number, per: number) {
    return (num / 100) * per;
  }

  const onPostsItemload = useCallback(
    (e: any, index: number, itemnum: number) => {
      if (onLoadDataOnce[index]) {
      } else {
        if (itemnum === 0) {
          if (postItemsRef.current[index]) {
            var imageHeight = postItemsRef.current[index].clientHeight;

            ///////////////////////////////

            newArraa[index] = `${imageHeight}px`;
            setitemheight(newArraa);
            ///////////////////////////////

            ///////////////////////////////

            var newh = imageHeight / 1.042 - postbackheighthold;
            newArrx[index] = `${newh}`;
            setitemheighthold(newArrx);
            ///////////////////////////////

            newArrayFinalPostHeight[index] = imageHeight;
            setitemFinalPostHeight(newArrayFinalPostHeight);

            ///////////////////////////////

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

              newArr[index] = `${choppedwidth}px`;
              setitemheight(newArr);
              ///////////////////////////////

              var newh = choppedwidth / 1.015 - postbackheighthold;
              newArrx[index] = `${newh}`;
              setitemheighthold(newArrx);
              ////////////////////////////
              ///////////////////////////////

              newArrxq[index] = 1;
              setitemcroptype(newArrxq);
              ////////////////////////////
              ///////////////////////////////

              newArrayFinalPostHeight[index] = choppedwidth;
              setitemFinalPostHeight(newArrayFinalPostHeight);
            } else if (imageHeight > choppedHeight) {
              /////LONG IMAGE SET

              newArr[index] = `${choppedHeight}px`;
              setitemheight(newArr);
              ///////////////////////////////

              var newh = choppedHeight / 1 - postbackheighthold;
              newArrx[index] = `${newh}`;
              setitemheighthold(newArrx);
              ////////////////////////////////
              ///////////////////////////////

              newArrxq[index] = 2;
              setitemcroptype(newArrxq);
              ///////////////////////////////

              newArrayFinalPostHeight[index] = choppedHeight;
              setitemFinalPostHeight(newArrayFinalPostHeight);
              ///////////////////////////////
            } else {
              var imageWidth = postItemsRef.current[index].clientWidth;
              if (imageWidth > imageHeight) {
                ///////////////////////////////

                var newh = imageHeight / 1.066 - postbackheighthold;
                newArrx[index] = `${newh}`;
                setitemheighthold(newArrx);
                ///////////////////////////////
                ///////////////////////////////

                newArrxq[index] = 3;
                setitemcroptype(newArrxq);
                ///////////////////////////////
              } else {
                ///////////////////////////////

                newArrxq[index] = 4;
                setitemcroptype(newArrxq);
                ///////////////////////////////
              }
            }
            ///////////////////////////////

            newArrxy[index] = true;
            setonLoadDataOnce(newArrxy);
            ///////////////////////////////

            if (postData.length - 1 === index) {
              setTimeout(function () {
                setx(true);
              }, 3000);
            }
          }
        }
      }
    },
    [
      screenHeightReducer,
      itemheight,
      itemheighthold,
      itemFinalPostHeight,
      showProfiileData,
    ]
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

  var widthProfilePic = matchPc ? "72%" : matchTablet ? "84%" : "44vw";
  var topProfilePic = matchPc ? "-20vh" : matchTablet ? "-12vh" : "-8vh";
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

  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

  ///
  ///
  ///
  /// CLOSE MODAL (STARTS AN ONPOPSTATE EVENT)
  const closeUploadModal = useCallback((backbutton: number) => {
    //pop states fires when back and forward buttons used
    if (backbutton === 1) {
      window.onpopstate = () => {
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = null;
        setShowModalUpload(false);
      };
    } else {
      window.history.pushState(null, "", ".");
      window.onpopstate = null;
      setShowModalUpload(false);
    }
  }, []);

  ///
  ///
  ///
  ///OPEN MODAL THEN CALL CLOSEMODAL FUNCTION WHICH WAITS FOR A POP EVENT(for closing modal)
  const OpenUploadModal = useCallback(() => {
    setShowModalUpload(!showModalUpload);
    //pushstate add enteries to your history
    window.history.pushState(null, "", "Options");
    closeUploadModal(1);
  }, [showModalUpload, closeUploadModal]);

  const [allowPosition, setallowPosition] = useState<boolean>(false);

  return (
    <>
      <Grid container className="dontallowhighlighting">
        <Grid
          item
          xs={12}
          style={{
            padding: "0px",
            height: "auto",
          }}
        >
          {postData.length > 0 ? (
            <Masonry
              columns={matchPc ? 2 : 1}
              spacing={0}
              style={{
                padding: "0px",
                marginTop: matchPc ? "-13.5vh" : matchTablet ? "-5vh" : "-4vh",
              }}
            >
              {postData.map((post: any, i: any) => (
                <div
                  key={i}
                  style={{
                    position: "relative",
                    scrollSnapAlign: x ? "start" : "",
                    padding: "0px",
                  }}
                >
                  <Post
                    onLoadDataOnce={onLoadDataOnce}
                    key={i}
                    pey={i}
                    addPostItemsRef={addPostItemsRef}
                    postDivRef={postDivRef}
                    onPostsItemload={onPostsItemload}
                    post={post}
                    itemheight={itemheight}
                    itemheighthold={itemheighthold}
                    postbackheight={postbackheight}
                    itemcroptype={itemcroptype}
                    length={postData.length}
                    itemFinalPostHeight={itemFinalPostHeight}
                    onPostsItemClicked={onPostsItemClicked}
                    itemCLICKED={itemCLICKED}
                    addpostDivRef={addpostDivRef}
                    postDatainner={postDatainner}
                    itemOriginalPostHeight={itemOriginalPostHeight}
                    ActiveAutoPlay={ActiveAutoPlay}
                    setActiveAutoPlay={setActiveAutoPlay}
                    AUTOSlideLongImages={AUTOSlideLongImages}
                  />
                </div>
              ))}
            </Masonry>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}

export const Profile = React.memo(Profilex);
