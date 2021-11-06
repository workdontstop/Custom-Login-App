import React, { useRef, useState, useEffect, useCallback } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
function Postx({
  pey,
  refy,
  onPostsItemload,
  post,
  itemheight,
  itemheighthold,
  postbackheight,
}: any) {
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

  const [itemInfoTopShow, setitemInfoTopShow] = useState<boolean>(false);

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    setitemInfoTopShow(false);
    setTimeout(function () {
      setitemInfoTopShow(true);
    }, 500);
  }, [itemheighthold, itemheight]);

  return (
    <>
      <div key={pey} className="pics">
        <img
          onLoad={(e: any) => {
            onPostsItemload(e, pey);
          }}
          ref={refy}
          className={darkmodeReducer ? "turlightpostdark" : "turlightpostlight"}
          src={`./images/posts/${post.item1}`}
          alt="a superstarz post "
          style={{
            marginTop: pey === 0 ? "0px" : `-${postbackheight}px`,
            width: "100%",
            height: itemheight[pey],
            position: "relative",

            display: "block",
            padding: "0px",
            objectFit: "contain",
          }}
        />
        <div
          className={
            darkmodeReducer ? "post-background-dark" : "post-background-light"
          }
          style={{
            height: `${postbackheight}px`,
            bottom: `${postbackheight}px`,
            position: "relative",
            transition: "all 350ms ease",
            opacity: itemInfoTopShow ? 1 : 0,
          }}
        >
          <div
            style={{
              top: `-${itemheighthold[pey]}px`,
              position: "relative",
              transition: "all 350ms ease",
              opacity: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              paddingLeft: "20px",
            }}
          >
            <RemoveRedEyeIcon
              className={
                darkmodeReducer
                  ? "make-small-icons-clickable-light  dontallowhighlighting   zuperking"
                  : "make-small-icons-clickable-dark  dontallowhighlighting  zuperking"
              }
              style={{
                fontSize: "2.2vw",
                opacity: itemInfoTopShow
                  ? itemheight[pey] === "auto"
                    ? 0
                    : 0.7
                  : 0,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export const Post = React.memo(Postx);
