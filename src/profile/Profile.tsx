import React, { useState, useRef, useCallback, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Billboard } from "./Billboard";
import { Post } from "./Post";
import { OptionsSlider } from "./OptionsSlider";
import { CommentTemplate } from "../CommentTemplate";
import { matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { Paper, Grid, Box } from "@material-ui/core";
import ImagePhotoSizeSelectSmall from "material-ui/svg-icons/image/photo-size-select-small";
import Masonry from "@mui/lab/Masonry";
import AddIcon from "@mui/icons-material/Add";
import { ScrollerAction } from "../GlobalActions";
function Profilex({
  OpenModalForm,
  getSliderWidthRef,
  getSliderWidth,
  postData,
  addPostItemsRef,
  onPostsItemload,
  itemheight,
  itemheighthold,
  postbackheight,
  formtype,
  showModalForm,
  CloseModalForm,
  aboutTemplateGo,
  commentTemplateGo,
  itemcroptype,
  itemFinalPostHeight,
  onPostsItemClicked,
  itemCLICKED,
  addpostDivRef,
  postDatainner,
  itemOriginalPostHeight,
  ScrolltypeChange,
  ActiveAutoPlay,
  setActiveAutoPlay,
  AUTOSlideLongImages,
  postDivRef,
}: any) {
  const dispatch = useDispatch();
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
  /// GET DARKMODE FROM REDUX STORE
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
    };
  }
  const { color, colordark } = useSelector((state: RootStateReducerColor) => ({
    ...state.GlobalReducerColor,
  }));
  const colorReducer = color;
  const colorReducerdark = colordark;

  var widthProfilePic = matchPc ? "72%" : matchTablet ? "85%" : "44vw";
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

  return (
    <>
      {" "}
      <Billboard OpenModalForm={OpenModalForm} />
      <Grid container className="dontallowhighlighting">
        <Grid item xs={12} style={{ padding: "0px", height: "0px" }}></Grid>
        <Grid
          item
          ref={getSliderWidthRef}
          xs={2}
          md={1}
          style={{ padding: "0px" }}
        ></Grid>
        <Grid item xs={12} style={{ padding: "0px", height: "0px" }}></Grid>
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
                backgroundColor: darkmodeReducer
                  ? colorReducerdark
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
          component={Box}
          display={{ xs: "none", md: "block" }}
          md={1}
        ></Grid>

        <Grid
          item
          xs={7}
          md={4}
          style={{
            position: "relative",
            height: "19.5vh",
            paddingLeft: matchPc ? "20px" : matchTablet ? "42px" : "24px",
            marginTop: matchTablet ? "10px" : "-4px",
            zIndex: 1,
          }}
        >
          <OptionsSlider getSliderWidth={getSliderWidth} />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            padding: "0px",
            height: "0px",
            marginTop: matchPc ? "-13.5vh" : matchTablet ? "-5vh" : "-4vh",
          }}
        >
          {postData ? (
            <Masonry columns={matchPc ? 2 : 1} spacing={0}>
              {postData.map((post: any, i: any) => (
                <div key={i} style={{ position: "relative" }}>
                  <Post
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
                    ScrolltypeChange={ScrolltypeChange}
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
      <CommentTemplate
        formtype={formtype}
        showModalForm={showModalForm}
        CloseModalForm={CloseModalForm}
        aboutTemp={aboutTemplateGo}
        commentTemp={commentTemplateGo}
      />
    </>
  );
}

export const Profile = React.memo(Profilex);
