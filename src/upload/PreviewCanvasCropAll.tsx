import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import Masonry from "@mui/lab/Masonry";
import CircleIcon from "@mui/icons-material/Circle";
import Cropper from "react-easy-crop";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PhotoIcon from "@mui/icons-material/Photo";
import GifIcon from "@mui/icons-material/Gif";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "@mui/material/Slider";
import { AnySoaRecord } from "dns";

function PreviewCanvasCropAllx({
  setwaitONLOAD,
  cropCanvasRef,
  image,
  getpreviewFixedWidth,
  index,
  CropImageHolder,
  cropheight,
  cropwidth,
  BoxCropActivated,
  hdcanvasvalue,
  SourceWidthForCropX,
  SourceWidthForCropY,
  WideImageCheck,
  crop,
  getCropHeight,
  canvasToimage,
  refWithimageData,
  addUploadItemsRef,
  itemUploadRef,
  itemUploadRefThumb,
  itemUploadRefSD,
  setsuperCropLoadFade,
  length,
  filterImage,
  setfilterImage,
  setallowFilters,
  allowCropAllCanvas,
  cutOffLoader,
  setcutOffLoader,
  addUploadItemsRefThumb,
  addUploadItemsRefSD,
  zoom,
  type,
  setwaitcropall,
  waitcropall,
}: any): JSX.Element {
  ///
  ///
  ///DARKMODE FROM REDUX
  interface RootStateGlobalReducer {
    GlobalReducer: {
      darkmode: boolean;
    };
  }
  const { darkmode } = useSelector((state: RootStateGlobalReducer) => ({
    ...state.GlobalReducer,
  }));

  const darkmodeReducer = darkmode;

  const [SDquality, setSDquality] = useState<number>(0);

  const canvasRef: any = useRef(null);

  const [previewFilehold, setpreviewFilehold] = useState<any>(null);

  const [previewCSSHeight, setpreviewCSSHeight] = useState<any>(null);

  const [cropCanvasWidth, setcropCanvasWidth] = useState<any>(null);

  const [cropCanvasHeight, setcropCanvasHeight] = useState<any>(null);

  const Timer1 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const Timer2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [imageWidthWithAspectRatio, setimageWidthWithAspectRatio] =
    useState<any>(null);

  const [imageWidthWithAspectRatioxx, setimageWidthWithAspectRatioxx] =
    useState<any>(null);

  const getSDquality: any = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (getSDquality.current) {
      if (matchTablet || matchMobile) {
        setSDquality(getSDquality.current.clientWidth);
      } else {
        setSDquality(getSDquality.current.clientHeight);
      }
    }
  }, []);

  useLayoutEffect(() => {
    const previewFileReadimage = new Image();
    previewFileReadimage.src = image;
    previewFileReadimage.onload = function () {
      if (cropCanvasRef.current) {
        setpreviewFilehold(previewFileReadimage);
        var cropH, cropW;
        if (CropImageHolder) {
          cropW = cropCanvasRef.current.width;
          cropH = cropCanvasRef.current.height;
        } else {
          cropW = previewFileReadimage.naturalWidth;
          cropH = previewFileReadimage.naturalHeight;
        }
        var quality;
        type == 1
          ? (quality = 800)
          : type == 2
          ? (quality = 700)
          : (quality = matchMobile ? 150 : 300);

        if (cropW > cropH) {
          var Ratio1500 = cropW / quality;
          var height1500 = cropH / Ratio1500;

          setcropCanvasWidth(quality);
          setcropCanvasHeight(height1500);
        } else {
          if (cropW * 2 > cropH) {
          } else {
            if (matchMobile) {
              quality = quality * 2;
            }
          }
          var Ratio1500 = cropH / quality;
          var width1500 = cropW / Ratio1500;

          setcropCanvasWidth(width1500);
          setcropCanvasHeight(quality);
        }

        let CropAspectRatio = cropwidth / cropheight;
        let newheight = getpreviewFixedWidth / CropAspectRatio;
        setpreviewCSSHeight(newheight);

        let AspectRatioPrevHeightandWidth =
          previewFileReadimage.naturalHeight /
          previewFileReadimage.naturalWidth;
        let newWidth = cropCanvasHeight / AspectRatioPrevHeightandWidth;
        setimageWidthWithAspectRatio(newWidth);

        let AspectRatioPrevHeightandWidthx = cropCanvasWidth / cropCanvasHeight;
        let newWidthx = getpreviewFixedWidth / AspectRatioPrevHeightandWidthx;
        setimageWidthWithAspectRatioxx(newWidthx);
      }
    };
  }, [
    SDquality,
    image,
    BoxCropActivated,
    previewCSSHeight,
    getpreviewFixedWidth,
    cropCanvasRef,
    CropImageHolder,
    cropwidth,
    cropheight,
    crop,
  ]);

  ///
  ///
  ///
  ///
  const wait = useCallback(() => {
    setwaitONLOAD(false);
    setsuperCropLoadFade(false);
    setallowFilters(true);
  }, []);

  ///
  ///
  ///
  ///  CROPED CANVAS CONVER TO IMAGE
  const convertCroppedCanvasToImage = useCallback(() => {
    setsuperCropLoadFade(true);
    if (type === 1) {
      itemUploadRef.current[index].src = canvasRef.current.toDataURL();
      ///////////////////////////////
      const newArraa = [...filterImage];
      newArraa[index] = canvasRef.current.toDataURL();
      setfilterImage(newArraa);
      ///////////////////////////////
      if (length - 1 === index) {
        wait();
      }
    } else if (type === 2) {
      itemUploadRefSD.current[index].src = canvasRef.current.toDataURL();

      if (length - 1 === index) {
        wait();
      }
    } else {
      itemUploadRefThumb.current[index].src = canvasRef.current.toDataURL();
      if (length - 1 === index) {
        wait();
      }
    }
  }, [
    canvasToimage,
    itemUploadRef,
    itemUploadRefThumb,
    itemUploadRefSD,
    canvasRef,
  ]);

  ///
  ///
  ///
  ///  DRAW CANVAS ON CROP COMPLETE CLICK
  const drawcrop = useCallback(() => {
    if (previewFilehold && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");

      canvasRef.current.height = cropCanvasHeight;
      canvasRef.current.width = cropCanvasWidth;

      if (BoxCropActivated) {
        var CropAspectRatio = cropCanvasWidth / cropCanvasHeight;
        var newheightq = getpreviewFixedWidth / CropAspectRatio;

        if (previewFilehold.naturalWidth > previewFilehold.naturalHeight) {
          var zoomINBOXWide =
            previewFilehold.naturalWidth / previewFilehold.naturalHeight;

          let AspectRatioPrevHeightandWidthxWideCRop =
            previewFilehold.naturalWidth / previewFilehold.naturalHeight;
          let boxWIDEheight =
            (cropCanvasWidth * zoomINBOXWide) /
            AspectRatioPrevHeightandWidthxWideCRop;

          var centerpreview =
            canvasRef.current.width / 2 - (cropCanvasWidth * zoomINBOXWide) / 2;

          var RatiofromOriginalandfixedHeight =
            (previewFilehold.naturalHeight / cropCanvasWidth) * zoomINBOXWide;
          var SourceWidthForCropXx =
            previewFilehold.naturalWidth / RatiofromOriginalandfixedHeight;

          var dragDistanceX =
            cropCanvasWidth * zoomINBOXWide * zoom - cropCanvasWidth;

          let AspectRatioPrevHeightandWidthxWideCRopx =
            previewFilehold.naturalWidth / previewFilehold.naturalHeight;
          let boxWIDEheightx =
            (cropCanvasWidth * zoomINBOXWide * zoom) /
            AspectRatioPrevHeightandWidthxWideCRopx;

          var dragDistanceY = boxWIDEheightx - cropCanvasHeight;

          var cropXprev = crop.x;
          cropXprev =
            (cropXprev * cropCanvasWidth * zoomINBOXWide) / SourceWidthForCropX;

          if (cropXprev < -dragDistanceX) {
            cropXprev = -dragDistanceX;
          } else if (cropXprev > 0) {
            cropXprev = 0;
          } else {
          }

          var cropYprev = crop.y;

          cropYprev =
            (cropYprev * cropCanvasWidth * zoomINBOXWide) / SourceWidthForCropX;

          if (cropYprev < -dragDistanceY) {
            cropYprev = -dragDistanceY;
          } else if (cropYprev > 0) {
            cropYprev = 0;
          } else {
          }
          ////////////////////

          requestAnimationFrame(async () => {
            ctx.drawImage(
              previewFilehold,
              WideImageCheck ? cropXprev : 0,
              WideImageCheck ? cropYprev : 0,
              cropCanvasWidth * zoomINBOXWide * zoom,
              boxWIDEheight * zoom
            );
            try {
              convertCroppedCanvasToImage();
            } catch {
              console.log("previewcanvascropall cropper  error");
            }
          });

          ////////////////////
        } else {
          let AspectRatioPrevHeightandWidthxBox =
            previewFilehold.naturalWidth / previewFilehold.naturalHeight;
          let boxedHeight = cropCanvasWidth / AspectRatioPrevHeightandWidthxBox;

          let AspectRatioPrevHeightandWidthxBoxx =
            previewFilehold.naturalWidth / previewFilehold.naturalHeight;
          let boxedHeightx =
            (cropCanvasWidth * zoom) / AspectRatioPrevHeightandWidthxBoxx;

          var dragDistanceX = cropCanvasWidth * zoom - cropCanvasWidth;
          var dragDistanceY = boxedHeightx - cropCanvasHeight;

          var cropYprev = crop.y;

          cropYprev = (cropYprev * boxedHeight) / SourceWidthForCropY;

          if (cropYprev < -dragDistanceY) {
            cropYprev = -dragDistanceY;
          } else if (cropYprev > 0) {
            cropYprev = 0;
          } else {
          }

          var cropXprev = crop.x;
          cropXprev = (cropXprev * boxedHeight) / SourceWidthForCropY;
          if (cropXprev < -dragDistanceX) {
            cropXprev = -dragDistanceX;
          } else if (cropXprev > 0) {
            cropXprev = 0;
          } else {
          }

          ////////////////////

          requestAnimationFrame(async () => {
            ctx.drawImage(
              previewFilehold,
              WideImageCheck ? 0 : cropXprev,
              WideImageCheck ? 0 : cropYprev,
              cropCanvasWidth * zoom,
              boxedHeight * zoom
            );
            try {
              convertCroppedCanvasToImage();
            } catch {
              console.log("previewcanvascropall cropper  error");
            }
          });

          ////////////////////
        }

        canvasRef.current.style.width = `${getpreviewFixedWidth}px`;
        canvasRef.current.style.height = `${newheightq}px`;
      } else {
        var xtraZoom = cropCanvasWidth / imageWidthWithAspectRatio;

        var centerpreview =
          canvasRef.current.width / 2 - imageWidthWithAspectRatio / 2;

        var centerpreview2 =
          canvasRef.current.height / 3 - (cropCanvasHeight * xtraZoom) / 3;

        if (imageWidthWithAspectRatio < cropCanvasWidth) {
          if (cropCanvasWidth > cropCanvasHeight) {
            ////WIDE IMAGE SOURCE NOT PROPERLY FITTED

            ////////////////////

            requestAnimationFrame(async () => {
              ctx.drawImage(
                previewFilehold,
                0,
                centerpreview2,
                imageWidthWithAspectRatio * xtraZoom,
                cropCanvasHeight * xtraZoom
              );
              try {
                convertCroppedCanvasToImage();
              } catch {
                console.log("previewcanvascropall cropper  error");
              }
            });

            ////////////////////
          } else {
            ////LONG IMAGE SOURCE NOT PROPERLY FITTED

            ////////////////////

            requestAnimationFrame(async () => {
              ctx.drawImage(
                previewFilehold,
                0,
                0,
                imageWidthWithAspectRatio * xtraZoom,
                cropCanvasHeight * xtraZoom
              );
              try {
                convertCroppedCanvasToImage();
              } catch {
                console.log("previewcanvascropall cropper  error");
              }
            });

            ////////////////////
          }
        } else {
          ////////LONG IMAGE SOURCE WIDE IMAGE SOURCE

          requestAnimationFrame(async () => {
            ctx.drawImage(
              previewFilehold,
              centerpreview,
              0,
              imageWidthWithAspectRatio,
              cropCanvasHeight
            );
            try {
              convertCroppedCanvasToImage();
            } catch {
              console.log("previewcanvascropall cropper  error");
            }
          });

          ////////////////////
        }
        canvasRef.current.style.width = `${getpreviewFixedWidth}px`;
        canvasRef.current.style.height = `${previewCSSHeight}px`;
      }
    }
  }, [
    previewFilehold,
    canvasRef,
    CropImageHolder,
    cropCanvasWidth,
    cropCanvasHeight,
    imageWidthWithAspectRatio,
    WideImageCheck,
    zoom,
  ]);

  const [callLayoutoNCE, setcallLayoutoNCE] = useState<any>(true);

  useLayoutEffect(() => {
    if (canvasToimage && callLayoutoNCE && canvasRef.current) {
      drawcrop();
      setcallLayoutoNCE(false);
    }
  }, [canvasToimage, callLayoutoNCE, canvasRef]);

  return (
    <>
      <Grid container>
        <Grid xs={8} item>
          <img
            ref={addUploadItemsRef}
            style={{
              width: length === 1 ? "auto" : "100%",
              height: length === 1 ? "50%" : "auto",
              position: "relative",
              margin: "auto",
              display: callLayoutoNCE ? "none" : "block",
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        style={{
          height: "100%",
          position: "fixed",
          top: "-800vh",
          margin: "auto",
        }}
      >
        <Grid
          item
          ref={getSDquality}
          xs={12}
          style={{ width: "100vw", padding: "0px", height: "100vh" }}
        ></Grid>

        <img
          ref={addUploadItemsRefThumb}
          style={{
            width: "100%",
            height: "auto",
            margin: "auto",
          }}
        />

        <img
          ref={addUploadItemsRefSD}
          style={{
            width: "100%",
            height: "auto",
            margin: "auto",
          }}
        />

        {allowCropAllCanvas ? (
          <canvas
            className={
              darkmodeReducer ? "turlightpostdarkx" : "turlightpostlightx"
            }
            ref={canvasRef}
            style={{
              padding: "0px",
              display: callLayoutoNCE ? "block" : "none",
              marginTop:
                index === 0 || index === 1 || index === 2 ? "0px" : "-5px",
            }}
          />
        ) : null}
      </Grid>
    </>
  );
}

export const PreviewCanvasCropAll = React.memo(PreviewCanvasCropAllx);
