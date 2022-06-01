import React, {
  useRef,
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { Grid, Switch, DialogContent } from "@material-ui/core";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { useSpring, animated } from "react-spring";
import { OptionsSlider } from "../profile/OptionsSlider";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import Masonry from "@mui/lab/Masonry";
import Axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import date from "date-and-time";
import { UserInfoUpdatePROFILE } from "../log/actions/UserdataAction";
import { UserInfoUpdateBILLBOARD } from "../log/actions/UserdataAction";

function UploadProfilePicx({
  showModalUploadProfile,
  cropimageProfile,
  profileimageSource,
  typex,
  uploadClose,
}: any): JSX.Element {
  const cropCanvasRefx: any = useRef(null);

  var quality: number = 1;

  if (typex === "Profile") {
    quality = 1.1;
  } else {
    quality = 1.5;
  }

  const dispatch = useDispatch();

  const [CropImageHolder, setCropImageHolder] = useState<any>(null);

  const hdcanvasvalue = 1;

  const getpreviewFixedWidthRef = useRef<HTMLDivElement>(null);

  const getCropHeightRef: any = useRef<HTMLDivElement>(null);

  const getCropWidthMobileRef: any = useRef<HTMLDivElement>(null);

  const getCropWidthMobileReflong: any = useRef<HTMLDivElement>(null);

  const getCropWidthMobileRefHD: any = useRef<HTMLDivElement>(null);

  const getCropHeightRefsingle: any = useRef<HTMLDivElement>(null);

  const getFixedCropWidthRef: any = useRef<HTMLDivElement>(null);

  const [myCropWidth, setmyCropWidth] = useState(0);

  const [myCropHeight, setmyCropHeight] = useState(0);

  const [matchTabletMobile, setmatchTabletMobile] = useState<boolean>(false);

  const [getpreviewFixedWidth, setgetpreviewFixedWidth] = useState(0);

  const [screenH, setscreenH] = useState(0);

  const [waitONLOAD, setwaitONLOAD] = useState<boolean>(true);

  const [getCropHeightRealImageRatio, setgetCropHeightRealImageRatio] =
    useState(0);

  const [getCropWidthMobile, setgetCropWidthMobile] = useState(0);

  const [getCropWidthMobileHD, setgetCropWidthMobileHD] = useState(0);

  const [widelongboxmobileimage, setwidelongboxmobileimage] =
    useState<boolean>(false);

  const [widelongboxmobileimagex, setwidelongboxmobileimagex] =
    useState<boolean>(false);

  const [OriginalImageWidth, setOriginalImageWidth] = useState<number>(0);
  const [OriginalImageHeight, setOriginalImageHeight] = useState<number>(0);

  const [cropwidth, setcropwidth] = useState(0);

  const [cropheight, setcropheight] = useState(0);

  const [WideImageCheck, setWideImageCheck] = useState<boolean>(false);

  const [SourceWidthForCropX, setSourceWidthForCropX] = useState(0);

  const [SourceWidthForCropY, setSourceWidthForCropY] = useState(0);

  const [BoxCropActivated, setBoxCropActivated] = useState<boolean>(true);

  const [zoom, setzoom] = useState<any>(1);

  const [crop, setcrop] = useState<any>({ x: 0, y: 0 });
  const [optionscropshow, setoptionscropshow] = useState<boolean>(true);

  const [superLoadFadex, setsuperLoadFadex] = useState<boolean>(false);

  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animation = useSpring({
    config: {
      duration: 600,
    },
    opacity: showModalUploadProfile ? 1 : 0,
    transform: showModalUploadProfile ? `translateY(0%)` : `translateY(-100%)`,
    padding: "0px",
  });

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

  const { REACT_APP_SUPERSTARZ_URL } = process.env;
  const cropscrollRef = useRef<any>(null);
  const cropTOPLEVELScrollRef: any = useRef(null);

  ///
  ///
  ///
  ///GET DIMENSIONS AND  SCREEN HEIGHT
  useLayoutEffect(() => {
    if (matchTablet || matchMobile) {
      setmatchTabletMobile(true);
    }
    if (
      getpreviewFixedWidthRef.current &&
      getpreviewFixedWidthRef.current.clientWidth
    ) {
      setgetpreviewFixedWidth(getpreviewFixedWidthRef.current.clientWidth);
    }

    if (
      getCropHeightRefsingle.current &&
      getCropHeightRefsingle.current.clientHeight
    ) {
      setscreenH(getCropHeightRefsingle.current.clientHeight);
    }

    if (profileimageSource.length === 1) {
      setwaitONLOAD(false);
      if (
        (getCropHeightRefsingle.current &&
          getCropHeightRefsingle.current.clientHeight) ||
        getCropHeightRef.current
      ) {
        if (matchTabletMobile) {
          setmyCropHeight(
            getCropWidthMobileRef.current.clientWidth * hdcanvasvalue
          );
          setmyCropWidth(
            getCropWidthMobileRef.current.clientWidth * hdcanvasvalue
          );
        } else {
          if (typex === "Profile") {
            setmyCropWidth(
              getCropHeightRefsingle.current.clientHeight * hdcanvasvalue
            );

            setmyCropHeight(
              getCropHeightRefsingle.current.clientHeight * hdcanvasvalue
            );
          } else {
            if (WideImageCheck) {
              setmyCropWidth(
                getCropHeightRefsingle.current.clientHeight * hdcanvasvalue +
                  getCropHeightRefsingle.current.clientHeight * 0
              );

              setmyCropHeight(
                getCropHeightRefsingle.current.clientHeight * hdcanvasvalue -
                  getCropHeightRefsingle.current.clientHeight * 0.22
              );
            } else {
              setmyCropWidth(
                getCropHeightRefsingle.current.clientHeight * hdcanvasvalue +
                  getCropHeightRefsingle.current.clientHeight * 0.2
              );

              setmyCropHeight(
                getCropHeightRefsingle.current.clientHeight * hdcanvasvalue -
                  getCropHeightRefsingle.current.clientHeight * 0.32
              );
            }
          }
        }

        setgetCropHeightRealImageRatio(
          getCropHeightRefsingle.current.clientHeight * hdcanvasvalue
        );
      }
    } else {
      if (getCropHeightRef.current && getCropHeightRef.current.clientHeight) {
        if (matchTabletMobile) {
          setmyCropHeight(
            getCropWidthMobileRef.current.clientWidth * hdcanvasvalue
          );
          setmyCropWidth(
            getCropWidthMobileRef.current.clientWidth * hdcanvasvalue
          );
        } else {
          setmyCropHeight(
            getCropHeightRef.current.clientHeight * hdcanvasvalue
          );
          setmyCropWidth(getCropHeightRef.current.clientHeight * hdcanvasvalue);
        }

        setgetCropHeightRealImageRatio(getCropHeightRef.current.clientHeight);
      }
    }

    if (
      getCropWidthMobileRef.current &&
      getCropWidthMobileRef.current.clientWidth
    ) {
      setgetCropWidthMobile(getCropWidthMobileRef.current.clientWidth);
    }

    if (
      getCropWidthMobileRefHD.current &&
      getCropWidthMobileRefHD.current.clientWidth
    ) {
      setgetCropWidthMobileHD(getCropWidthMobileRefHD.current.clientWidth);
    }
  }, [profileimageSource, typex, WideImageCheck]);

  const draw = useCallback(
    (
      ctx: any,
      dimensions: any,
      type: number,
      axis: number,
      allowZoomedAxis: number
    ) => {
      var allowZoomedaxis, aa;

      if (typex === "Profile") {
        aa = -(dimensions * zoom) / 4;
      } else {
        aa = axis;
      }

      if (zoom === 1) {
        allowZoomedaxis = 0;
      } else {
        allowZoomedaxis = allowZoomedAxis;
      }
      if (type === 1) {
        ctx.drawImage(
          CropImageHolder,
          aa,
          allowZoomedaxis,
          dimensions * zoom,
          myCropHeight * quality * zoom
        );
      } else if (type === 2) {
        ctx.drawImage(
          CropImageHolder,
          allowZoomedaxis,
          axis,
          myCropWidth * quality * zoom,
          dimensions * zoom
        );
      } else {
        ctx.drawImage(
          CropImageHolder,
          0,
          0,
          OriginalImageWidth,
          OriginalImageHeight
        );
      }
    },
    [
      OriginalImageWidth,
      OriginalImageHeight,
      CropImageHolder,
      myCropHeight,
      myCropWidth,
      zoom,
      typex,
    ]
  );

  useLayoutEffect(() => {
    const Newcropimage: any = new Image();

    Newcropimage.src = cropimageProfile;
    Newcropimage.onload = function () {
      if (CropImageHolder === Newcropimage) {
      } else {
        setCropImageHolder(Newcropimage);
      }

      var data1: number = 0;
      var data2: number = 0;

      var RatioNewcropimageNaturalHeight =
        Newcropimage.naturalHeight / myCropHeight;
      var NewcropimageWidth =
        Newcropimage.naturalWidth / RatioNewcropimageNaturalHeight;

      var RatioNewcropimageNaturalWidth =
        Newcropimage.naturalWidth / getCropWidthMobileHD;
      var NewcropimageHeight =
        Newcropimage.naturalHeight / RatioNewcropimageNaturalWidth;

      var RatioNewcropimageNaturalWidthxx =
        Newcropimage.naturalWidth / getCropWidthMobile;
      var NewcropimageHeightxx =
        Newcropimage.naturalHeight / RatioNewcropimageNaturalWidthxx;

      ////// CANVAS  CROPPER DIMENSIONS  PC MOBILE(canvaswidth)

      if (matchTabletMobile && NewcropimageHeightxx < screenH) {
        setwidelongboxmobileimage(true);
        setwidelongboxmobileimagex(true);

        if (OriginalImageHeight === NewcropimageHeight) {
        } else {
          setOriginalImageHeight(NewcropimageHeight);
          data2 = NewcropimageHeight;
        }
        //
        if (OriginalImageWidth === getCropWidthMobileHD) {
        } else {
          setOriginalImageWidth(getCropWidthMobileHD);
          data1 = getCropWidthMobileHD;
        }
      } else {
        setwidelongboxmobileimage(false);
        setwidelongboxmobileimagex(false);
        if (OriginalImageWidth === NewcropimageWidth) {
        } else {
          setOriginalImageWidth(NewcropimageWidth);
          data1 = NewcropimageWidth;
        }
        ///
        if (OriginalImageHeight === myCropHeight) {
        } else {
          setOriginalImageHeight(myCropHeight);
          data2 = myCropHeight;
        }
      }
      ////// CANVAS  CROPPER DIMENSIONS  PC MOBILE(canvaswidth)

      if (Newcropimage.naturalWidth > Newcropimage.naturalHeight) {
        setWideImageCheck(true);
      } else {
        setWideImageCheck(false);
      }

      if (cropwidth === data1) {
      } else {
        setcropwidth(data1);
      }

      if (cropheight === data2) {
      } else {
        setcropheight(data2);
      }
    };
  }, [cropimageProfile, showModalUploadProfile]);

  ///
  ///
  ///
  /// INTERFACE/TYPES FOR SCREENHEIGHT AND DARKMODE
  interface RootUserdataReducer {
    UserdataReducer: {
      id: number;
    };
  }

  ///
  ///
  ///
  /// GET SCREENHEIGHT FROM REDUX STORE
  const { id } = useSelector((state: RootUserdataReducer) => ({
    ...state.UserdataReducer,
  }));

  const idReducer = id;

  const postbillboardData = useCallback(
    (a: any) => {
      setsuperLoadFadex(true);
      // Creating object of current date and time
      // by using Date()
      const now = new Date();

      // Formatting the date and time
      // by using date.format() method
      const datevalue = date.format(now, "YYYY_MM_DD_HH_mm_ss");
      let formData = new FormData();
      const datev = new Date();

      formData.append("id", `${idReducer}`);

      formData.append("finalxxy", a, `blob${id}${datevalue}`);

      Axios.post(
        `http://${REACT_APP_SUPERSTARZ_URL}/billboard_upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((response) => {
          if (response.data.message === "billboard image uploaded") {
            setsuperLoadFadex(false);
            var ffz = `blob${id}${datevalue}`;
            const data = {
              billboard1: `superbillboard${ffz}.png`,
            };
            dispatch(UserInfoUpdateBILLBOARD(data));
            uploadClose(3);
          }
        })
        .catch(function (error) {
          alert("caption erroerrr");
        });
    },
    [idReducer]
  );

  const postProfiledata = useCallback(
    (a: any) => {
      setsuperLoadFadex(true);
      // Creating object of current date and time
      // by using Date()
      const now = new Date();

      // Formatting the date and time
      // by using date.format() method
      const datevalue = date.format(now, "YYYY_MM_DD_HH_mm_ss");
      let formData = new FormData();
      const datev = new Date();

      formData.append("id", `${idReducer}`);

      formData.append("finalxx", a, `blob${id}${datevalue}`);

      Axios.post(
        `http://${REACT_APP_SUPERSTARZ_URL}/profile_upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((response) => {
          if (response.data.message === "profile image uploaded") {
            setsuperLoadFadex(false);
            var ffz = `blob${id}${datevalue}`;
            const data = {
              image: `superProfile${ffz}.png`,
            };
            dispatch(UserInfoUpdatePROFILE(data));
            uploadClose(3);
          }
        })
        .catch(function (error) {
          alert("caption erroerrr");
        });
    },
    [idReducer]
  );

  const drawcropper = (upl: number) => {
    if (CropImageHolder && cropCanvasRefx.current) {
      const ctx = cropCanvasRefx.current.getContext("2d");
      var nn = myCropHeight * quality;
      var RatiofromOriginalandfixedHeight = OriginalImageHeight / nn;
      var NewBoxRatioWidth_WIDEIMAGE =
        OriginalImageWidth / RatiofromOriginalandfixedHeight;

      if (SourceWidthForCropX === NewBoxRatioWidth_WIDEIMAGE) {
      } else {
        setSourceWidthForCropX(NewBoxRatioWidth_WIDEIMAGE);
      }
      var bb = myCropWidth * quality;
      var RatiofromOriginalandfixedHeightx = OriginalImageWidth / bb;
      var NewBoxRatioWidth_LONGIMAGE =
        OriginalImageHeight / RatiofromOriginalandfixedHeightx;

      if (SourceWidthForCropY === NewBoxRatioWidth_LONGIMAGE) {
      } else {
        setSourceWidthForCropY(NewBoxRatioWidth_LONGIMAGE);
      }

      var ratioh = (OriginalImageWidth * 3) / OriginalImageWidth;
      var ratiow = (OriginalImageHeight * 3) / OriginalImageHeight;

      if (BoxCropActivated) {
        cropCanvasRefx.current.width = myCropWidth * quality;
        cropCanvasRefx.current.height = myCropHeight * quality;
      } else {
        cropCanvasRefx.current.width = OriginalImageWidth;
        cropCanvasRefx.current.height = OriginalImageHeight;
      }

      var centerpreview =
        cropCanvasRefx.current.width / 1.5 - NewBoxRatioWidth_LONGIMAGE / 1.5;

      var xtraZoom = myCropHeight / NewBoxRatioWidth_WIDEIMAGE;

      var centerCropCanvas =
        cropCanvasRefx.current.width / 2 - NewBoxRatioWidth_WIDEIMAGE / 2;

      //////////////////////////CSS CALCULATION MOBILE PC
      var RatiofromOriginalandfixedHeight =
        OriginalImageHeight / getCropHeightRealImageRatio;
      var newcropCSSWidth =
        OriginalImageWidth / RatiofromOriginalandfixedHeight;
      ///
      var RatiofromOriginalandfixedWidth =
        OriginalImageWidth / getCropWidthMobile;
      var newcropCSSHeight =
        OriginalImageHeight / RatiofromOriginalandfixedWidth;
      //////////////////////////CSS CALCULATION MOBILE PC

      if (BoxCropActivated) {
        var xx = myCropWidth * zoom;
        var RatiofromOriginalandfixedHeightx = OriginalImageWidth / xx;
        var NewBoxRatioWidth_LONGIMAGEx =
          OriginalImageHeight / RatiofromOriginalandfixedHeightx;

        var xxx = NewBoxRatioWidth_LONGIMAGE * zoom;
        var RatiofromOriginalandfixedWidthx = OriginalImageHeight / xxx;
        var NewBoxRatioWidth_WIDEIMAGEx =
          OriginalImageWidth / RatiofromOriginalandfixedWidthx;

        var xx2 = NewBoxRatioWidth_WIDEIMAGE * zoom;
        var RatiofromOriginalandfixedHeightx2 = OriginalImageWidth / xx2;
        var NewBoxRatioWidth_LONGIMAGEx2 =
          OriginalImageHeight / RatiofromOriginalandfixedHeightx2;

        var xxx2 = myCropHeight * zoom;
        var RatiofromOriginalandfixedWidthx2 = OriginalImageHeight / xxx2;
        var NewBoxRatioWidth_WIDEIMAGEx2 =
          OriginalImageWidth / RatiofromOriginalandfixedWidthx2;

        if (OriginalImageWidth > OriginalImageHeight) {
          if (OriginalImageHeight === OriginalImageWidth) {
            requestAnimationFrame(async () => {
              draw(ctx, NewBoxRatioWidth_WIDEIMAGE, 1, 0, crop.x);
              try {
                if (upl === 1) {
                  var data = cropCanvasRefx.current.toDataURL();
                  const res = await fetch(data);
                  const datax = await res.blob();

                  if (typex === "Profile") {
                    postProfiledata(datax);
                  } else {
                    postbillboardData(datax);
                  }
                }
              } catch {
                console.log("upload profile pic");
              }
            });
          } else {
            requestAnimationFrame(async () => {
              draw(ctx, NewBoxRatioWidth_WIDEIMAGE, 1, crop.x, crop.y);
              try {
                if (upl === 1) {
                  var data = cropCanvasRefx.current.toDataURL();
                  const res = await fetch(data);
                  const datax = await res.blob();
                  if (typex === "Profile") {
                    postProfiledata(datax);
                  } else {
                    postbillboardData(datax);
                  }
                }
              } catch {
                console.log("upload profile pic");
              }
            });
          }
        } else {
          if (OriginalImageHeight === OriginalImageWidth) {
            requestAnimationFrame(async () => {
              draw(ctx, NewBoxRatioWidth_LONGIMAGE, 2, 0, crop.x);

              try {
                if (upl === 1) {
                  var data = cropCanvasRefx.current.toDataURL();
                  const res = await fetch(data);
                  const datax = await res.blob();
                  if (typex === "Profile") {
                    postProfiledata(datax);
                  } else {
                    postbillboardData(datax);
                  }
                }
              } catch {
                console.log("upload profile pic");
              }
            });
          } else {
            requestAnimationFrame(async () => {
              draw(ctx, NewBoxRatioWidth_LONGIMAGE, 2, crop.y, crop.x);

              try {
                if (upl === 1) {
                  var data = cropCanvasRefx.current.toDataURL();
                  const res = await fetch(data);
                  const datax = await res.blob();
                  if (typex === "Profile") {
                    postProfiledata(datax);
                  } else {
                    postbillboardData(datax);
                  }
                }
              } catch {
                console.log("upload profile pic");
              }
            });
          }
        }

        cropCanvasRefx.current.style.width = `${myCropWidth / hdcanvasvalue}px`;
        cropCanvasRefx.current.style.height = `${
          myCropHeight / hdcanvasvalue
        }px`;
      } else {
        requestAnimationFrame(async () => {
          draw(ctx, 0, 3, 0, crop.x);

          try {
            if (upl === 1) {
              var data = cropCanvasRefx.current.toDataURL();
              const res = await fetch(data);
              const datax = await res.blob();
              if (typex === "Profile") {
                postProfiledata(datax);
              } else {
                postbillboardData(datax);
              }
            }
          } catch {
            console.log("upload profile pic");
          }
        });

        if (matchTabletMobile && widelongboxmobileimage) {
          cropCanvasRefx.current.style.width = `${getCropWidthMobile}px`;
          cropCanvasRefx.current.style.height = `${newcropCSSHeight}px`;
        } else {
          cropCanvasRefx.current.style.width = `${newcropCSSWidth}px`;
          cropCanvasRefx.current.style.height = `${getCropHeightRealImageRatio}px`;
        }
      }
    }
  };

  useLayoutEffect(() => {
    drawcropper(0);
  }, [
    CropImageHolder,
    BoxCropActivated,
    OriginalImageWidth,
    OriginalImageHeight,
    widelongboxmobileimage,
    myCropHeight,
    crop,
    zoom,
  ]);

  const done = () => {
    drawcropper(1);
  };

  return (
    <>
      {superLoadFadex ? (
        <>
          <Grid
            container
            style={{
              backgroundColor: darkmodeReducer
                ? "rgba(50,50,50,0.5)"
                : "rgba(250,250,250,0.5)",
              position: "fixed",
              top: "0px",
              width: "100%",
              height: "100%",
              zIndex: 10,
            }}
          ></Grid>{" "}
        </>
      ) : null}
      {showModalUploadProfile ? (
        <DialogContent
          className={darkmodeReducer ? "dialog-container" : "dialog-container"}
          style={{
            padding: "0px",
            height: "100vh",
            position: "fixed",
            zIndex: 100,
            cursor: "default",
            overflow: "hidden",
          }}
        >
          <animated.div ref={cropscrollRef} style={animation}>
            <DialogContent
              ref={cropTOPLEVELScrollRef}
              className={
                matchMobile || matchTablet
                  ? darkmodeReducer
                    ? " dontallowhighlighting modal-containerDarkmob"
                    : " dontallowhighlighting  modal-containerLightmob "
                  : darkmodeReducer
                  ? " dontallowhighlighting modal-containerDark  postscroll-dark "
                  : " dontallowhighlighting  modal-containerLight  postscroll-light "
              }
              style={{
                padding: "0px",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <Grid
                container
                style={{
                  padding: "0px",
                  bottom:
                    typex === "Profile"
                      ? "13.6vh"
                      : WideImageCheck
                      ? "33vh"
                      : "43vh",
                  margin: "auto",
                  width: `100%`,
                  height: "0px",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  zIndex: 5,
                  alignSelf: "center",
                }}
              >
                <Grid
                  item
                  xs={4}
                  style={{
                    padding: "0px",
                    height: "0px",
                    margin: "auto",
                    display: "grid",
                    alignItems: "center",
                  }}
                ></Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    padding: "0px",
                    height: "0px",
                    margin: "auto",
                    display: "grid",
                    alignItems: "center",
                  }}
                >
                  {optionscropshow ? (
                    <CheckIcon
                      onClick={done}
                      className={
                        darkmodeReducer
                          ? "make-small-icons-clickable-lightCrop turdark dontallowhighlighting zuperkingIcon "
                          : "make-small-icons-clickable-darkCrop  turdark dontallowhighlighting zuperkingIcon  "
                      }
                      style={{
                        margin: "auto",

                        fontSize: matchTabletMobile ? "4.8vh" : "2.9vw",
                      }}
                    />
                  ) : null}
                </Grid>

                <Grid
                  item
                  xs={4}
                  style={{
                    padding: "0px",
                    height: "0px",
                    margin: "auto",
                    display: "grid",
                    alignItems: "center",
                  }}
                ></Grid>
              </Grid>
              <Grid container style={{ width: "100%" }}>
                <canvas
                  ref={cropCanvasRefx}
                  style={{
                    padding: "0px",
                    margin: "auto",

                    zIndex: 2,
                  }}
                />
              </Grid>
            </DialogContent>
          </animated.div>
        </DialogContent>
      ) : null}

      <Grid
        container
        style={{ height: "100%", position: "fixed", top: "-800vh" }}
      >
        <Grid
          item
          xs={12}
          style={{
            padding: "0px",
          }}
        >
          <Grid
            item
            ref={getpreviewFixedWidthRef}
            xs={5}
            style={{
              padding: "0px",
            }}
          ></Grid>

          <Grid
            item
            ref={getFixedCropWidthRef}
            xs={4}
            style={{
              padding: "0px",
            }}
          ></Grid>

          <Grid
            item
            ref={getCropHeightRef}
            xs={12}
            style={{ height: "92%" }}
          ></Grid>

          <Grid
            item
            ref={getCropWidthMobileRef}
            xs={12}
            style={{ padding: "0px", width: "100%" }}
          ></Grid>

          <Grid
            item
            ref={getCropWidthMobileReflong}
            xs={12}
            style={{ padding: "0px", width: "150%" }}
          ></Grid>

          <Grid
            item
            ref={getCropWidthMobileRefHD}
            style={{ padding: "0px", width: "150%" }}
          ></Grid>

          <Grid
            item
            ref={getCropHeightRefsingle}
            xs={12}
            style={{ height: "100%" }}
          ></Grid>
        </Grid>
      </Grid>
    </>
  );
}

export const UploadProfilePic = React.memo(UploadProfilePicx);
