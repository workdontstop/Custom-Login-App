import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { matchPc, matchTablet } from "../DetectDevice";
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
  setsuperCropLoadFade,
  length,
  filterImage,
  setfilterImage,
  setallowFilters,
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

  const canvasRef: any = useRef(null);

  const [previewFilehold, setpreviewFilehold] = useState<any>(null);

  const [previewCSSHeight, setpreviewCSSHeight] = useState<any>(null);

  const [cropCanvasWidth, setcropCanvasWidth] = useState<any>(null);

  const [cropCanvasHeight, setcropCanvasHeight] = useState<any>(null);

  const [imageWidthWithAspectRatio, setimageWidthWithAspectRatio] =
    useState<any>(null);

  const [imageWidthWithAspectRatioxx, setimageWidthWithAspectRatioxx] =
    useState<any>(null);

  useLayoutEffect(() => {
    const previewFileReadimage = new Image();
    previewFileReadimage.src = image;
    previewFileReadimage.onload = function () {
      setpreviewFilehold(previewFileReadimage);

      if (CropImageHolder) {
        setcropCanvasWidth(cropCanvasRef.current.width * 1.5);
        setcropCanvasHeight(cropCanvasRef.current.height * 1.5);
      } else {
        setcropCanvasWidth(previewFileReadimage.naturalWidth * 1.5);
        setcropCanvasHeight(previewFileReadimage.naturalHeight * 1.5);
      }

      let CropAspectRatio = cropwidth / cropheight;
      let newheight = getpreviewFixedWidth / CropAspectRatio;
      setpreviewCSSHeight(newheight);

      let AspectRatioPrevHeightandWidth =
        previewFileReadimage.naturalHeight / previewFileReadimage.naturalWidth;
      let newWidth = cropCanvasHeight / AspectRatioPrevHeightandWidth;
      setimageWidthWithAspectRatio(newWidth);

      let AspectRatioPrevHeightandWidthx = cropCanvasWidth / cropCanvasHeight;
      let newWidthx = getpreviewFixedWidth / AspectRatioPrevHeightandWidthx;
      setimageWidthWithAspectRatioxx(newWidthx);
    };
  }, [
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

  useLayoutEffect(() => {
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

          var dragDistanceX = cropCanvasWidth * zoomINBOXWide - cropCanvasWidth;
          var cropXprev = crop.x;

          var RatiofromOriginalandfixedHeight =
            (previewFilehold.naturalHeight / cropCanvasWidth) * zoomINBOXWide;
          var SourceWidthForCropXx =
            previewFilehold.naturalWidth / RatiofromOriginalandfixedHeight;

          cropXprev =
            (cropXprev * cropCanvasWidth * zoomINBOXWide) / SourceWidthForCropX;

          if (cropXprev < -dragDistanceX) {
            cropXprev = -dragDistanceX;
          } else if (cropXprev > 0) {
            cropXprev = 0;
          } else {
          }

          ////////////////////
          requestAnimationFrame(() => {
            ctx.drawImage(
              previewFilehold,
              WideImageCheck ? cropXprev : 0,
              0,
              cropCanvasWidth * zoomINBOXWide,
              boxWIDEheight
            );
          });
          ////////////////////
        } else {
          let AspectRatioPrevHeightandWidthxBox =
            previewFilehold.naturalWidth / previewFilehold.naturalHeight;
          let boxedHeight = cropCanvasWidth / AspectRatioPrevHeightandWidthxBox;

          var dragDistanceY = boxedHeight - cropCanvasHeight;

          var cropYprev = crop.y;

          cropYprev = (cropYprev * boxedHeight) / SourceWidthForCropY;

          if (cropYprev < -dragDistanceY) {
            cropYprev = -dragDistanceY;
          } else if (cropYprev > 0) {
            cropYprev = 0;
          } else {
          }

          ////////////////////
          requestAnimationFrame(() => {
            ctx.drawImage(
              previewFilehold,
              0,
              WideImageCheck ? 0 : cropYprev,
              cropCanvasWidth,
              boxedHeight
            );
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
            requestAnimationFrame(() => {
              ctx.drawImage(
                previewFilehold,
                0,
                centerpreview2,
                imageWidthWithAspectRatio * xtraZoom,
                cropCanvasHeight * xtraZoom
              );
            });
            ////////////////////
          } else {
            ////LONG IMAGE SOURCE NOT PROPERLY FITTED

            ////////////////////
            requestAnimationFrame(() => {
              ctx.drawImage(
                previewFilehold,
                0,
                0,
                imageWidthWithAspectRatio * xtraZoom,
                cropCanvasHeight * xtraZoom
              );
            });
            ////////////////////
          }
        } else {
          ////////LONG IMAGE SOURCE WIDE IMAGE SOURCE

          ////////////////////
          requestAnimationFrame(() => {
            ctx.drawImage(
              previewFilehold,
              centerpreview,
              0,
              imageWidthWithAspectRatio,
              cropCanvasHeight
            );
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
  ]);

  const [callLayoutoNCE, setcallLayoutoNCE] = useState<any>(true);

  useLayoutEffect(() => {
    if (
      canvasToimage &&
      callLayoutoNCE &&
      itemUploadRef.current[index] &&
      canvasRef.current
    ) {
      itemUploadRef.current[index].src = canvasRef.current.toDataURL();
      console.log(canvasRef.current.toDataURL());
      setcallLayoutoNCE(false);

      if (length - 1 === index) {
        setsuperCropLoadFade(false);
        setallowFilters(true);
      }

      ///////////////////////////////
      const newArraa = [...filterImage];
      newArraa[index] = canvasRef.current.toDataURL();
      setfilterImage(newArraa);
      ///////////////////////////////
    }
  }, [canvasToimage, itemUploadRef, canvasRef]);

  return (
    <>
      <Grid container>
        <Grid xs={12} item>
          <img
            ref={addUploadItemsRef}
            style={{
              width: "100%",
              height: "auto",
              position: "relative",
              margin: "auto",
              display: callLayoutoNCE ? "none" : "block",
            }}
          />
        </Grid>
      </Grid>
      <canvas
        className={darkmodeReducer ? "turlightpostdarkx" : "turlightpostlightx"}
        ref={canvasRef}
        style={{
          display: callLayoutoNCE ? "block" : "none",

          padding: "0px",
          marginTop: index === 0 || index === 1 || index === 2 ? "0px" : "-5px",
        }}
      />
    </>
  );
}

export const PreviewCanvasCropAll = React.memo(PreviewCanvasCropAllx);
