import React, { useState, useRef, useCallback, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Billboard } from "./Billboard";
import { Post } from "./Post";
import { OptionsSlider } from "./OptionsSlider";
import { CommentTemplate } from "../CommentTemplate";
import { matchPc, matchTablet } from "../DetectDevice";
import { RootStateOrAny, useSelector } from "react-redux";
import { Paper, Grid, Box } from "@material-ui/core";
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
}: any) {
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

  return (
    <>
      <Paper
        style={{
          backgroundImage: PaperStyleReducer,
          borderRadius: "0px",
          height: "100vh",
        }}
      >
        {" "}
        <Billboard OpenModalForm={OpenModalForm} />
        <Grid container className="dontallowhighlighting">
          <Grid
            item
            component={Box}
            display={{ xs: "none", md: "block" }}
            md={3}
          ></Grid>

          <Grid
            item
            ref={getSliderWidthRef}
            xs={2}
            md={1}
            style={{ padding: "0px" }}
          ></Grid>

          <Grid item xs={3} md={2} style={{ padding: "0px" }}></Grid>
          <Grid
            item
            xs={7}
            md={4}
            style={{
              height: "150px",
              paddingLeft: matchPc ? "20px" : matchTablet ? "42px" : "24px",
              marginTop: "-4px",
            }}
          >
            <OptionsSlider getSliderWidth={getSliderWidth} />
          </Grid>

          <Grid item xs={12} style={{ padding: "0px" }}></Grid>

          <div
            className="gallery"
            style={{
              marginTop: matchPc ? "0px" : matchTablet ? "6.5vh" : "-22px",
            }}
          >
            {postData.map((post: any, i: any) => (
              <>
                <Post
                  pey={i}
                  refy={addPostItemsRef}
                  onPostsItemload={onPostsItemload}
                  post={post}
                  itemheight={itemheight}
                  itemheighthold={itemheighthold}
                  postbackheight={postbackheight}
                />
              </>
            ))}
          </div>

          <Grid item xs={12} style={{ padding: "0px", height: "20px" }}></Grid>
        </Grid>
        <CommentTemplate
          formtype={formtype}
          showModalForm={showModalForm}
          CloseModalForm={CloseModalForm}
          aboutTemp={aboutTemplateGo}
          commentTemp={commentTemplateGo}
        />
      </Paper>
    </>
  );
}

export const Profile = React.memo(Profilex);
