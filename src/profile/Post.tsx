import React, { useRef, useState, useEffect, useCallback } from "react";
import { Paper, Grid, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Crop54Icon from "@mui/icons-material/Crop54";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import CommentIcon from "@mui/icons-material/Comment";
import CircleIcon from "@mui/icons-material/Circle";

function Postx({
  pey,
  refy,
  onPostsItemload,
  post,
  length,
  itemheight,
  itemheighthold,
  postbackheight,
  itemcroptype,
  itemFinalPostHeight,
  onPostsItemClicked,
  itemCLICKED,
}: any) {
  var paddingTopemo = "7vh";
  var fontSizeemo = "2.7%";

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
    setTimeout(function () {
      setitemInfoTopShow(true);
    }, 1500);
  }, [itemheighthold, itemheight]);

  var textback = "";
  if (darkmodeReducer) {
    textback = "caption-darkPost";
  } else {
    textback = "caption-lightPost";
  }

  return (
    <>
      <div
        style={{
          scrollSnapAlign: "start",
          padding: "0px",
          width: "100%",
        }}
      >
        {/*///////////////////////////////////////////////////////////////////////////POST DATA*/}
        <img
          onLoad={(e: any) => {
            onPostsItemload(e, pey);
          }}
          onClick={() => {
            onPostsItemClicked(pey);
          }}
          ref={refy}
          className={darkmodeReducer ? "turlightpostdark" : "turlightpostlight"}
          src={`./images/posts/${post.item1}`}
          alt="a superstarz post "
          style={{
            cursor: "alias",
            width: "100%",
            height: itemheight[pey],
            position: "relative",
            padding: "0px",
            objectFit: "contain",
            display: "block",
            objectPosition: itemheight[pey] === "auto" ? "50% 50" : "50% top",
          }}
        />
        {/*///////////////////////////////////////////////////////////////////////////POST DATA*/}
        {itemCLICKED[pey] ? null : (
          <>
            <div
              className={
                darkmodeReducer
                  ? "post-background-dark"
                  : "post-background-light"
              }
              style={{
                height: `${postbackheight}px`,
                marginTop: `-${postbackheight - 1}px`,
                position: "relative",
                transition: "all 350ms ease",
                opacity: itemInfoTopShow ? 1 : 0,
              }}
            >
              {/*///////////////////////////////////////////////////////////////////////////CROPED*/}
              <div
                style={{
                  top: `-${itemheighthold[pey] - 6.5}px`,
                  position: "relative",
                  transition: "all 350ms ease",
                  opacity: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  paddingLeft: "20px",
                  zIndex: 1,
                  height: "0px",
                }}
              >
                {itemcroptype[pey] === 1 ? (
                  <Crop54Icon
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
                          : 0.3
                        : 0,
                    }}
                  />
                ) : itemcroptype[pey] === 2 ? (
                  <CropPortraitIcon
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
                          : 0.3
                        : 0,
                    }}
                  />
                ) : (
                  <RemoveRedEyeIcon
                    style={{
                      fontSize: "2.2vw",
                      opacity: 0,
                    }}
                  />
                )}
              </div>
              {/*///////////////////////////////////////////////////////////////////////////CROPED*/}
              {/*///////////////////////////////////////////////////////////////////////////VIEWS*/}
              <div
                style={{
                  top: `-${itemheighthold[pey]}px`,
                  position: "relative",
                  transition: "all 350ms ease",
                  opacity: 1,

                  zIndex: 2,
                  marginTop: "0px",
                  height: "0px",
                }}
              >
                <RemoveRedEyeIcon
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-light  dontallowhighlighting   zuperking"
                      : "make-small-icons-clickable-dark  dontallowhighlighting  zuperking"
                  }
                  style={{
                    fontSize: "1.75vw",
                    opacity: 0.4,
                    marginLeft: "92.4%",
                  }}
                />
              </div>
              {/*///////////////////////////////////////////////////////////////////////////VIEWS*/}

              {/*///////////////////////////////////////////////////////////////////////////EMOTIONS*/}

              <img
                className={darkmodeReducer ? "turpostDark" : "turpostLight"}
                src={`./images/emotions/love.png`}
                alt="a superstarz post "
                style={{
                  top: `-${itemheighthold[pey] - 40}px`,
                  marginLeft: "92.8%",
                  cursor: "pointer",
                  boxShadow: darkmodeReducer
                    ? "0 0 1px #555555"
                    : "0 0 4.5px #aaaaaa",
                  width: fontSizeemo,
                  height: "auto",
                  padding: "0px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 1,
                  opacity: 0.75,
                }}
              />

              <img
                className={darkmodeReducer ? "turpostDark" : "turpostLight"}
                src={`./images/emotions/cool.png`}
                alt="a superstarz post "
                style={{
                  top: `-${itemheighthold[pey] - 60}px`,
                  marginLeft: "92.8%",
                  cursor: "pointer",
                  boxShadow: darkmodeReducer
                    ? "0 0 1px #555555"
                    : "0 0 4.5px #aaaaaa",
                  width: fontSizeemo,
                  height: "auto",
                  padding: "0px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 1,
                  opacity: 0.75,
                }}
              />

              <img
                className={darkmodeReducer ? "turpostDark" : "turpostLight"}
                src={`./images/emotions/oo.png`}
                alt="a superstarz post "
                style={{
                  top: `-${itemheighthold[pey] - 80}px`,
                  marginLeft: "92.8%",
                  cursor: "pointer",
                  boxShadow: darkmodeReducer
                    ? "0 0 1px #555555"
                    : "0 0 4.5px #aaaaaa",
                  width: fontSizeemo,
                  height: "auto",
                  padding: "0px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 1,
                  opacity: 0.7,
                }}
              />

              <img
                className={darkmodeReducer ? "turpostDark" : "turpostLight"}
                src={`./images/emotions/laugh.png`}
                alt="a superstarz post "
                style={{
                  top: `-${itemheighthold[pey] - 100}px`,
                  marginLeft: "92.8%",
                  cursor: "pointer",
                  boxShadow: darkmodeReducer
                    ? "0 0 1px #555555"
                    : "0 0 3.5px #aaaaaa",
                  width: fontSizeemo,

                  height: "auto",
                  padding: "0px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  position: "relative",
                  zIndex: 1,
                  opacity: 0.7,
                }}
              />

              {/*///////////////////////////////////////////////////////////////////////////EMOTIONS*/}
              <div
                className="zuperxyinfo"
                style={{
                  opacity: 1,
                  top: `5.6vh`,
                  position: "relative",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  zIndex: 1,
                  paddingLeft: "1.8vw",
                  height: "0px",
                  fontFamily: "Arial, Helvetica, sans-seri",
                }}
              >
                <img
                  className={darkmodeReducer ? "turpostDark" : "turpostLight"}
                  src={`./images/profile/${post.profile_image}`}
                  alt="a superstarz post "
                  style={{
                    cursor: "pointer",
                    boxShadow: darkmodeReducer
                      ? "0 0 1px #555555"
                      : "0 0 3.5px #aaaaaa",
                    width: "10.5%",
                    height: "auto",
                    padding: "0px",
                    objectFit: "contain",
                    borderRadius: "50%",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </div>
              {/*///////////////////////////////////////////////////////////////////////////PROFILE-PIC*/}
              {/*///////////////////////////////////////////////////////////////////////////USERNAME AND TOPIC*/}
              <div
                className={
                  darkmodeReducer
                    ? "zuperxyinfoPostDark"
                    : "zuperxyinfoPostLight"
                }
                style={{
                  opacity: darkmodeReducer ? 0.86 : 0.9,
                  top: `4vh`,
                  position: "relative",
                  transition: "all 350ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  zIndex: 1,
                  paddingLeft: "2vw",
                  fontFamily: "Arial, Helvetica, sans-seri",
                  marginLeft: "12%",
                  height: "0px",
                }}
              >
                <span
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.41vw",
                    verticalAlign: "middle",
                  }}
                >
                  {" "}
                  {post.username}
                  <span
                    style={{
                      verticalAlign: "middle",
                    }}
                  >
                    <span
                      style={{
                        opacity: 0,
                        fontSize: "0.8vw",
                      }}
                    >
                      .
                    </span>
                    <CircleIcon
                      style={{
                        fontSize: "0.4vw",
                        verticalAlign: "middle",
                      }}
                    />
                    <span
                      style={{
                        opacity: 0,
                        fontSize: "0.4vw",
                      }}
                    >
                      .
                    </span>
                  </span>
                </span>

                <span
                  style={{
                    fontSize: "1.1vw",
                    verticalAlign: "middle",
                    fontFamily: "kaushan_scriptregular",
                    fontWeight: "normal",
                  }}
                >
                  {" "}
                  {post.topic ? post.topic : "SuperstarZ"}
                </span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////USERNAME AND TOPIC*/}
              {/*///////////////////////////////////////////////////////////////////////////CAPTION*/}
              <div
                className={
                  darkmodeReducer
                    ? "zuperxyinfoPostDark"
                    : "zuperxyinfoPostLight"
                }
                style={{
                  opacity: 1,
                  top: `6vh`,
                  position: "relative",
                  transition: "all 350ms ease",
                  marginLeft: "12%",
                  zIndex: 1,
                  paddingLeft: "1.95vw",
                  fontFamily: "Arial, Helvetica, sans-seri",
                  height: "7.7vh",
                  width: "80%",
                  lineHeight: 1.68,
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    verticalAlign: "middle",
                    fontSize: "1.15vw",
                    fontWeight: "bold",
                    margin: "0",
                    justifyContent: "center",
                    opacity: darkmodeReducer ? 0.82 : 0.75,
                    color: darkmodeReducer ? "#dddddd" : "#0b1728",
                  }}
                  className={textback}
                >
                  {post.caption}{" "}
                </span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////CAPTION*/}
              {/*///////////////////////////////////////////////////////////////////////////OPTIONS*/}
              <div
                className={
                  darkmodeReducer
                    ? "zuperxyinfoPostDark"
                    : "zuperxyinfoPostLight"
                }
                style={{
                  top: `-3.2vh`,
                  position: "relative",
                  transition: "all 350ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  zIndex: 2,
                  height: "0px",
                  width: "98%",
                  paddingLeft: "2vw",
                  opacity: 0.75,
                }}
              >
                <span style={{ marginLeft: "94%" }}>
                  <MoreHorizIcon style={{ fontSize: "2.3vw" }} />
                </span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////OPTIONS*/}
              {/*///////////////////////////////////////////////////////////////////////////DATE*/}
              <div
                className={
                  darkmodeReducer
                    ? "zuperxyinfoPostDark"
                    : "zuperxyinfoPostLight"
                }
                style={{
                  top: `-1.3vh`,
                  position: "relative",
                  transition: "all 350ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  zIndex: 2,
                  height: "0px",
                  width: "98.5%",
                  paddingLeft: "2vw",
                  fontWeight: "bolder",
                  fontSize: "0.82vw",
                  fontFamily: "Arial, Helvetica, sans-seri",
                  opacity: 0.75,
                }}
              >
                <span style={{ marginLeft: "94%" }}>Jul 6</span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////DATE*/}
              {/*///////////////////////////////////////////////////////////////////////////COMMENT*/}
              <div
                className={
                  darkmodeReducer
                    ? "zuperxyinfoPostDark"
                    : "zuperxyinfoPostLight"
                }
                style={{
                  top: `5.5vh`,
                  position: "relative",
                  transition: "all 350ms ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                  zIndex: 2,
                  height: "0px",
                  width: "98.5%",
                  paddingLeft: "2vw",
                  fontWeight: "bolder",
                  opacity: 0.75,
                }}
              >
                {" "}
                <span style={{ marginLeft: "94%", verticalAlign: "middle" }}>
                  <CommentIcon
                    style={{
                      verticalAlign: "middle",
                      fontSize: "1.8vw",
                      opacity: 1,
                    }}
                  />
                </span>
              </div>
              {/*///////////////////////////////////////////////////////////////////////////COMMENT*/}
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}

export const Post = React.memo(Postx);
