import React, { useRef, useState, useEffect, useCallback } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector } from "react-redux";
import "./profile.css";
import { Profile } from "./Profile";
import Axios from "axios";

function ProfileOutter() {
  const getSliderWidthRef = useRef<HTMLDivElement>(null);

  const [formtype] = useState<number>(1);
  const [showModalForm, setShowModalForm] = useState<boolean>(false);

  const [getSliderWidth, setgetSliderWidth] = useState(0);

  const [aboutTemplateGo] = useState<boolean>(true);
  const [commentTemplateGo] = useState<boolean>(false);

  const [postData, setPostData] = useState<Array<any>>([]);

  const postItemsRef = useRef<any>([]);

  var postbackheighthold = document.documentElement.clientHeight * 0.3;
  const [postbackheight] = useState<number>(postbackheighthold);

  ///
  ///
  ///CLOSE LOG MODAL
  const [OpenModalFormOnce, setOpenModalFormOnce] = useState<boolean>(false);
  const CloseModalForm = useCallback((DeviceBackButtonClicked: number) => {
    ///onpopstate fires when back and forward buttons used
    if (DeviceBackButtonClicked === 1) {
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

  const OpenModalForm = useCallback(
    (formtypedata: number) => {
      setShowModalForm(true);
      ///Replace current history state (since opening a modal Level 2 grid)...
      /// if this was a level 1 grid (profile-info page use Pushstate to create new history state)
      let modalName = "Biography";

      if (!OpenModalFormOnce) {
        window.history.pushState(null, "", modalName);
        setOpenModalFormOnce(true);
        CloseModalForm(1);
      }
    },
    [OpenModalFormOnce, CloseModalForm]
  );

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
  ///DOT ENV DATA
  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  const [itemheight, setitemheight] = useState<Array<string>>([]);
  const [itemheighthold, setitemheighthold] = useState<Array<string>>([]);
  const [itemcroptype, setitemcroptype] = useState<Array<number>>([]);
  const [itemFinalPostHeight, setitemFinalPostHeight] = useState<Array<number>>(
    []
  );
  const [itemCLICKED, setitemCLICKED] = useState<Array<boolean>>([]);

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
            obj.itemCLICKED = false;
          });

          setPostData(postdataRep);
        } else if (response.data.message === "error in fetching feeds") {
          alert("Connection malfunction");
        }
      })
      .catch(function (error) {});
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

      const initialitemCLICKED = postData.map((obj) => obj.itemCLICKED);
      setitemCLICKED(initialitemCLICKED);
    }
  }, [postData]);

  ///
  ///
  const onPostsItemload = useCallback(
    (e: any, index: number) => {
      if (postItemsRef.current[index]) {
        var imageHeight = postItemsRef.current[index].clientHeight;
        var imageWidth = postItemsRef.current[index].clientWidth;
        ///////////////////////////////
        const newArrx = [...itemheighthold];
        var newh = imageHeight / 1.042 - postbackheighthold;
        newArrx[index] = `${newh}`;
        setitemheighthold(newArrx);
        ///////////////////////////////
        const newArrayFinalPostHeight = [...itemFinalPostHeight];
        newArrayFinalPostHeight[index] = imageHeight;
        setitemFinalPostHeight(newArrayFinalPostHeight);

        //console.log(screenHeightReducer);
        ///console.log("jj");
        ///console.log(imageHeight);

        var choppedHeight = percentage(screenHeightReducer, 100);

        var choppedwidth = percentage(screenHeightReducer, 58);

        if (imageHeight < choppedwidth) {
          postItemsRef.current[index].style.objectFit = "cover";
          /////WIDE IMAGE SET
          const newArr = [...itemheight];
          newArr[index] = `${choppedwidth}px`;
          setitemheight(newArr);
          ///////////////////////////////
          const newArrx = [...itemheighthold];
          var newh = choppedwidth / 1.055 - postbackheighthold;
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
          postItemsRef.current[index].style.objectFit = "cover";
          /////LONG IMAGE SET
          const newArr = [...itemheight];
          newArr[index] = `${choppedHeight}px`;
          setitemheight(newArr);
          ///////////////////////////////
          const newArrx = [...itemheighthold];
          var newh = choppedHeight / 1.032 - postbackheighthold;
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
        } else if (imageWidth > imageHeight) {
          ///////////////////////////////
          const newArrx = [...itemheighthold];
          var newh = imageHeight / 1.066 - postbackheighthold;
          newArrx[index] = `${newh}`;
          setitemheighthold(newArrx);
          ///////////////////////////////
        } else {
        }
      }
    },
    [screenHeightReducer, itemheight, itemheighthold, itemFinalPostHeight]
  );

  const scrollToPost = (index: any) => {
    postItemsRef.current[index].scrollIntoView();
  };
  const postitemSHOWFULLHEIGHT = (index: any, type: number) => {
    if (itemcroptype[index] === 1 || itemcroptype[index] === 2) {
      if (type === 0) {
        const newitemHeight = [...itemheight];
        newitemHeight[index] = `auto`;
        setitemheight(newitemHeight);
        scrollToPost(index);
      } else {
        const newitemHeight = [...itemheight];
        newitemHeight[index] = `${itemFinalPostHeight[index]}px`;
        setitemheight(newitemHeight);
        scrollToPost(index);
      }
    }
  };

  const onPostsItemClicked = (index: number) => {
    if (itemCLICKED[index]) {
      const newclickArray = [...itemCLICKED];
      newclickArray[index] = false;
      setitemCLICKED(newclickArray);
      postitemSHOWFULLHEIGHT(index, 1);
    } else {
      const newclickArray = [...itemCLICKED];
      newclickArray[index] = true;
      setitemCLICKED(newclickArray);
      postitemSHOWFULLHEIGHT(index, 0);
    }
  };

  console.log(postData);
  /// {menu[i]}

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

  ///
  ///
  ///
  /// GET COLOR FROM REDUX STORE
  interface RootStateReducerColor {
    GlobalReducerColor: {
      color: string;
      colordark: string;
    };
  }
  const { color, colordark } = useSelector((state: RootStateReducerColor) => ({
    ...state.GlobalReducerColor,
  }));
  const colorReducer = color;
  const colorReducerdark = colordark;

  var g = "y mandatory";
  return (
    <>
      {loggedInReducer ? (
        <>
          {matchPc ? (
            <Paper
              className={
                darkmodeReducer ? "postscroll-dark" : "postscroll-light"
              }
              style={{
                backgroundImage: PaperStyleReducer,
                borderRadius: "0px",
                height: "100vh",
                overflowY: "scroll",
                overflowX: "hidden",
                scrollSnapType: g,
              }}
            >
              <Profile
                getSliderWidthRef={getSliderWidthRef}
                OpenModalForm={OpenModalForm}
                getSliderWidth={getSliderWidth}
                postData={postData}
                addPostItemsRef={addPostItemsRef}
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
              />
            </Paper>
          ) : (
            <Paper
              style={{
                backgroundImage: PaperStyleReducer,
                borderRadius: "0px",
                height: "auto",
              }}
            >
              <Profile
                getSliderWidthRef={getSliderWidthRef}
                OpenModalForm={OpenModalForm}
                getSliderWidth={getSliderWidth}
                postData={postData}
                addPostItemsRef={addPostItemsRef}
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
              />
            </Paper>
          )}
        </>
      ) : null}
    </>
  );
}

export default ProfileOutter;
