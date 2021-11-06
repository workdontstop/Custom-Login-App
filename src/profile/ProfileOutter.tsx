import React, { useRef, useState, useEffect, useCallback } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import { matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector } from "react-redux";
import "./profile.css";

import { Scrollbars } from "react-custom-scrollbars-2";
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
          });

          ///////////////RE-ORDER ARRAY THEN SETPOST DATA
          const cols = 2;
          const out = [];
          let col = 0;
          while (col < cols) {
            for (let i = 0; i < postdataRep.length; i += cols) {
              let _val = postdataRep[i + col];
              if (_val !== undefined) out.push(_val);
            }
            col++;
          }
          setPostData(out);
          //////////////RE-ORDER ARRAY THEN SETPOST DATA
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
    }
  }, [postData]);

  ///
  ///

  const handleClick = (e: any) => {
    const i = e.currentTarget.dataset.id;
    const newArr = [...itemheight];
    newArr[i] = "0%";
    setitemheight(newArr);
  };

  const onPostsItemload = useCallback(
    (e: any, index: number) => {
      if (postItemsRef.current[index]) {
        var imageHeight = postItemsRef.current[index].clientHeight;
        const newArrx = [...itemheighthold];
        var newh = imageHeight / 1.02 - postbackheighthold;
        newArrx[index] = `${newh}`;
        setitemheighthold(newArrx);

        //console.log(screenHeightReducer);
        ///console.log("jj");
        ///console.log(imageHeight);

        var choppedHeight = percentage(screenHeightReducer, 100);

        var choppedwidth = percentage(screenHeightReducer, 55);

        if (imageHeight < choppedwidth) {
          postItemsRef.current[index].style.objectFit = "cover";
          /////WIDE IMAGE SET
          const newArr = [...itemheight];
          newArr[index] = `${choppedwidth}px`;
          setitemheight(newArr);
          ///////////////////////////////
          const newArrx = [...itemheighthold];
          var newh = choppedwidth / 1.04 - postbackheighthold;
          newArrx[index] = `${newh}`;
          setitemheighthold(newArrx);
          ////////////////////////////
        } else if (imageHeight > choppedHeight) {
          postItemsRef.current[index].style.objectFit = "cover";
          /////LONG IMAGE SET
          const newArr = [...itemheight];
          newArr[index] = `${choppedHeight}px`;
          setitemheight(newArr);
          ///////////////////////////////
          const newArrx = [...itemheighthold];
          var newh = choppedHeight / 1.02 - postbackheighthold;
          newArrx[index] = `${newh}`;
          setitemheighthold(newArrx);
          ////////////////////////////////
        } else {
        }
      }
    },
    [screenHeightReducer, itemheight, itemheighthold]
  );

  console.log(itemheighthold);
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

  return (
    <>
      {loggedInReducer ? (
        <>
          {matchPc ? (
            <Scrollbars
              autoHide={true}
              autoHideDuration={1000}
              autoHideTimeout={6000}
              autoHeight={true}
              autoHeightMin="100vh"
              style={{
                height: "100vh",
              }}
              renderTrackHorizontal={(props) => (
                <div {...props} className="track-horizontal" />
              )}
              renderThumbHorizontal={(props) => (
                <div {...props} className="thumb-horizontal" />
              )}
              renderTrackVertical={(props) => (
                <div {...props} className="track-vertical" />
              )}
              renderThumbVertical={(style, props) => (
                <div
                  {...props}
                  style={{
                    ...style,
                    width: "60px",
                    backgroundImage: darkmodeReducer
                      ? `linear-gradient(45.34deg, ${colorReducer} 5.66%, ${colorReducerdark} 64.35%)`
                      : ` linear-gradient(45.34deg, ${colorReducerdark} 15.66%, ${colorReducer} 84.35%)`,
                    filter: darkmodeReducer
                      ? "drop-shadow(1.9px 0.1px 1.9px rgba(005, 005, 005, 9.25))"
                      : " drop-shadow(1.9px 0.1px 1.9px rgba(255, 255, 255, 1.01))",
                    opacity: darkmodeReducer ? 0.5 : 0.6,
                  }}
                  className={
                    darkmodeReducer
                      ? "thumb-verticalDARK"
                      : "thumb-verticalLIGHT"
                  }
                />
              )}
              renderView={(props) => <div {...props} className="view" />}
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
              />
            </Scrollbars>
          ) : (
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
            />
          )}
        </>
      ) : null}
    </>
  );
}

export default ProfileOutter;
