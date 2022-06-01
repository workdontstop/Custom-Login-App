import React, { useState, useEffect, useRef } from "react";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CircleIcon from "@mui/icons-material/Circle";
import SettingsIcon from "@mui/icons-material/Settings";

function ImageFilterinnerx({
  optionsShow,
  optinstopshowingReducer,
  typeTop,
  selectedImage,
  closeoptionsslide,
  animationop,
  optionsCollectImageRef,
  handleTouchStartOptions,
  handleTouchMoveOptions,
  modalanimation,
  nextSlidePc,
  optionsImages,
  ActiveSlide,
  optionsNameData,
  clickOptions,
  optionsClickType,
  getSliderWidthNew,
  itemUploadRef,
  imageFiltersRef,
  getImageWidth,
  length,
  itemUploadRefThumb,
  loadedimage,
  startSuperSticker,
  duplicateItemupload,
  activeSticker,
  setactiveSticker,
  seteffectMode,
  effectMode,
  setcallfilter,
  callfilter,
  regimageholdfilter,
  setregimageholdfilter,
  FilterUnderStickerStopFiltering,
  trapfilters,
  settrapfilters,
  sethdfilter,
  hdfilter,
  superstickerIndex,
  superzeroeffect,
  finalImageData,
  setfinalImageData,
  setstartTopicCap,
  itemUploadRefSD,
  setsupeFilterLoadFade,
}: any): JSX.Element {
  const finalImageDataxx = [...finalImageData];
  const effectModexx = [...effectMode];
  const regimageholdfilterxx = [...regimageholdfilter];
  const trapfiltersxx = [...trapfilters];

  const [blink, setblink] = useState(false);

  const getFilterWidthViewable = useRef<any>([]);
  const getFilterWidthfull = useRef<any>([]);

  const Timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  var addedwidth: number;
  addedwidth = matchTablet || matchMobile ? 10.6 : 25;

  const thumbsLength = 13;

  ///
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

  ///
  ///
  ///
  /// GET GLOBAL INNER NAVIGATION VARIABLE
  const { activatefilterImage } = useSelector((state: RootStateOrAny) => ({
    ...state.GlobalNavuploadReducer,
  }));
  const activatefilterImageReducer = activatefilterImage;

  var circleIdentify = typeTop ? 0 : 4;
  var circleIdentify2 = typeTop ? 1 : 5;

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

  const [showfiltersOnload, setshowfiltersOnload] = useState(false);

  const [allow, setallow] = useState(false);

  const [showfiltersOnloadblur, setshowfiltersOnloadblur] = useState(false);

  const [gotoCaption, setgotoCaption] = useState<boolean>(false);

  useEffect(() => {
    if (gotoCaption) {
    }
  }, [gotoCaption]);

  const addimageFiltersRef = (imageRef: any) => {
    if (imageRef && !imageFiltersRef.current.includes(imageRef)) {
      imageFiltersRef.current.push(imageRef);
    }
    ////console.log(postItemsRef.current[1]);
  };

  const canvasRef: any = useRef(null);

  const canvasRefdummy: any = useRef(null);

  function blend(
    background: any,
    foreground: any,
    width: any,
    height: any,
    transform: any
  ) {
    var bottom = background.getImageData(0, 0, width, height);
    var top = foreground.getImageData(0, 0, width, height);

    for (var i = 0, size = top.data.length; i < size; i += 4) {
      // red
      top.data[i + 0] = transform(bottom.data[i + 0], top.data[i + 0]);
      // green
      top.data[i + 1] = transform(bottom.data[i + 1], top.data[i + 1]);
      // blue
      top.data[i + 2] = transform(bottom.data[i + 2], top.data[i + 2]);
      // the fourth slot is alpha. We don't need that (so skip by 4)
    }

    return top;
  }

  function FilterGradient(width: any, height: any, type: string) {
    var ctx = canvasRefdummy.current.getContext("2d");
    canvasRefdummy.current.height = height;
    canvasRefdummy.current.width = width;

    if (type === "jentle") {
      var gradient = ctx.createLinearGradient(
        width / 73.6,
        height / 33.4,
        0,
        width / 2,
        height / 2,
        width * 0.6
      );
    } else if (type === "mint" || type === "floyd") {
      var gradient = ctx.createLinearGradient(
        width / 73.6,
        height / 33.4,
        0,
        width / 2,
        height / 2,
        width * 0.6
      );
    } else if (type === "tentacion") {
      var gradient = ctx.createLinearGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width * 0.6
      );
    } else if (type === "nebula") {
      var gradient = ctx.createLinearGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width * 0.6
      );
    } else if (type === "juice") {
      var gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width * 0.7
      );
    } else if (type === "moonshine") {
      var gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width * 0.7
      );
    } else if (type === "vintage") {
      var gradient = ctx.createRadialGradient(
        width / 2,
        height / 3,
        0,
        width / 2,
        height / 2,
        width * 0.66
      );
    } else if (type === "futurama" || type === "kemi") {
      var gradient = ctx.createLinearGradient(
        width / 73.6,
        height / 33.4,
        0,
        width / 2,
        height / 2,
        width * 0.6
      );
    } else {
    }

    if (type === "jentle") {
      gradient.addColorStop(0, "#2c1f1f");
      gradient.addColorStop(0.4, "#41243c");
      gradient.addColorStop(1, "#272122");
    } else if (type === "mint") {
      gradient.addColorStop(0.25, "#2c3431");
      gradient.addColorStop(0.5, "#26483e");
      gradient.addColorStop(0.75, "#232831");
      gradient.addColorStop(1, "#273131");
    } else if (type === "nebula") {
      gradient.addColorStop(0, "#3b1858");
      gradient.addColorStop(1, "#151569");
    } else if (type === "juice") {
      gradient.addColorStop(0, "#242424");
      gradient.addColorStop(1, "#313131");
    } else if (type === "moonshine") {
      gradient.addColorStop(0, "#0e0e14");
      gradient.addColorStop(1, "#17171f");
    } else if (type === "futurama") {
      gradient.addColorStop(0.25, "#5c384c");
      gradient.addColorStop(0.5, "#5c384c");
      gradient.addColorStop(0.75, "#3e452f");
      gradient.addColorStop(1, " #2e3c3f");
    } else if (type === "kemi") {
      gradient.addColorStop(0, "#244a82");
      gradient.addColorStop(1, "#4d3017");
    } else if (type === "tentacion") {
      gradient.addColorStop(0, "#293746");
      gradient.addColorStop(0.6, "#3a2922");
      gradient.addColorStop(1, "#3b355d");
    } else if (type === "vintage") {
      gradient.addColorStop(0, "#353a49");
      gradient.addColorStop(1, "#3d4253");
    } else if (type === "floyd") {
      gradient.addColorStop(0, "#3b3939");
      gradient.addColorStop(1, "#191d1b");
    } else {
    }

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, width, height);

    return ctx;
  }

  ///
  ///
  ///
  /// UPDATE CONFIRM PASSWORD VALUE/ SHOW SPINNER REPEAT PASSWORD
  function ApplyImageFilter(
    typex: string,
    index: number,
    index2: number,
    Ref: any,
    method: string,
    resolution: string
  ) {
    //////////////////INITIALIZE  CANVAS

    var type = typex;

    if (superzeroeffect[index]) {
      type = "normal";
    }

    if (
      type === effectMode[index] &&
      activeSticker === 100 &&
      method !== "imageHD" &&
      method !== "imageHDall"
    ) {
      if (index + 1 > selectedImage.length - 1) {
        setblink(false);
        seteffectMode(effectModexx);
        setregimageholdfilter(regimageholdfilterxx);
      } else {
        ApplyImageFilter(
          typex,
          index + 1,
          index2 + 1,
          getImageWidth,
          "image",
          "sd"
        );
      }
    } else {
      const previewFileReadimage = new Image();
      //// previewFileReadimage.src = itemUploadRef.current[index].src;
      if (duplicateItemupload[index]) {
        previewFileReadimage.src = duplicateItemupload[index];
      } else {
        if (
          method === "imageHDall" ||
          method === "imageHD" ||
          resolution === "hd"
        ) {
          previewFileReadimage.src = itemUploadRef.current[index].src;
        } else {
          previewFileReadimage.src = itemUploadRefSD.current[index].src;
        }
      }

      var widthx: number;
      var heightx: number;
      var width: number;
      var height: number;

      var dynamicDimensions = matchMobile
        ? window.innerHeight / 1.1
        : window.innerHeight * 1.2;
      var dynamicDimensionsx = matchMobile
        ? window.innerWidth * 1.5
        : window.innerWidth / 1.1;

      previewFileReadimage.onload = function () {
        const ctx = canvasRef.current.getContext("2d");
        if (
          previewFileReadimage.naturalWidth > previewFileReadimage.naturalHeight
        ) {
          if (method === "thumb") {
            widthx = matchMobile ? 155 : 250;
            width = matchMobile ? 155 : 250;
          } else {
            if (resolution === "hd") {
              widthx = previewFileReadimage.naturalWidth;
              width = previewFileReadimage.naturalWidth;
            } else {
              widthx = matchMobile
                ? dynamicDimensionsx * 0.7
                : dynamicDimensionsx * 0.8;
              width = matchMobile
                ? dynamicDimensionsx * 0.7
                : dynamicDimensionsx * 0.8;
            }
          }

          var scalex = widthx / previewFileReadimage.naturalWidth;
          heightx = previewFileReadimage.naturalHeight * scalex;
          var scale = width / previewFileReadimage.naturalWidth;
          height = previewFileReadimage.naturalHeight * scale;
        } else {
          if (method === "thumb") {
            heightx = matchMobile ? 150 : 250;
            height = matchMobile ? 150 : 250;
          } else {
            if (resolution === "hd") {
              heightx = previewFileReadimage.naturalHeight;
              height = previewFileReadimage.naturalHeight;
            } else {
              heightx = matchMobile
                ? dynamicDimensions * 0.6
                : dynamicDimensions * 0.9;
              height = matchMobile
                ? dynamicDimensions * 0.6
                : dynamicDimensions * 0.9;
            }
          }

          var scalex = heightx / previewFileReadimage.naturalHeight;
          widthx = previewFileReadimage.naturalWidth * scalex;

          var scale = height / previewFileReadimage.naturalHeight;
          width = previewFileReadimage.naturalWidth * scale;
        }

        canvasRef.current.height = height;
        canvasRef.current.width = width;
        //////////////////INITIALIZE  CANVAS

        requestAnimationFrame(async () => {
          //////////////////CSS EDIT IMAGE WITH CTX.FILTER
          if (type === "lift") {
            ctx.filter =
              "contrast(1.25) brightness(0.98) blur(0px) saturate(120%)";
          } else if (type === "floyd") {
            ctx.filter = "contrast(1.2) brightness(0.99) saturate(111%)";
          } else if (type === "jentle") {
            ctx.filter =
              "contrast(0.82) brightness(0.83) hue-rotate(20deg) saturate(110%) ";
          } else if (type === "mint") {
            ctx.filter = "contrast(1.28) brightness(0.99)  saturate(95%)  ";
          } else if (type === "nebula") {
            ctx.filter = "contrast(1.2) brightness(1.1)";
          } else if (type === "juice") {
            if (method === "thumb" && matchMobile) {
              ctx.filter =
                "contrast(1.16) brightness(0.99) saturate(180%) blur(0px)";
            } else {
              ctx.filter =
                "contrast(1.16) brightness(0.99) saturate(180%) blur(0.6px)";
            }
          } else if (type === "futurama") {
            ctx.filter = "contrast(1.3) brightness(0.95) saturate(140%) ";
          } else if (type === "kemi") {
            ctx.filter =
              "contrast(1.4) brightness(0.97) saturate(107%)  hue-rotate(1.4deg)";
          } else if (type === "tentacion") {
            ctx.filter = "contrast(1.32) brightness(0.96) saturate(137%)";
          } else if (type === "moonshine") {
            if (method === "thumb" && matchMobile) {
              ctx.filter =
                "contrast(1.3) brightness(0.99) saturate(50%) blur(0.8px)";
            } else {
              if (matchMobile) {
                ctx.filter =
                  "contrast(1.3) brightness(0.99) saturate(50%) blur(1.2px)";
              } else {
                ctx.filter =
                  "contrast(1.3) brightness(0.99) saturate(50%) blur(2.8px)";
              }
            }
          } else if (type === "vintage") {
            ctx.filter = " contrast(1.1)  brightness(0.88)  saturate(12%)";
          } else {
          }
          //////////////////CSS EDIT IMAGE WITH CTX.FILTER

          ctx.drawImage(
            previewFileReadimage,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );

          //////////////////////VIGNETTE
          var w = canvasRef.current.width;
          var h = canvasRef.current.height;
          if (type === "floyd") {
            var gradient = ctx.createRadialGradient(
              w / 6.7,
              h / 2,
              0,
              w / 2.8,
              h / 2,
              w * 0.65
            );

            gradient.addColorStop(0, "rgba(40, 181, 32, 0.118)");
            gradient.addColorStop(1, "rgba(0,0,0,0.3)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          } else if (type === "mint") {
            var gradient = ctx.createRadialGradient(
              w / 2,
              h / 2,
              0,
              w / 2,
              h / 2,
              w * 0.65
            );

            gradient.addColorStop(0, "rgba(255, 255, 255,0.05)");
            gradient.addColorStop(1, "rgba(0,0,0,0.23)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          } else if (type === "lift" || type === "juice") {
            var gradient = ctx.createRadialGradient(
              w / 2,
              h / 3,
              0,
              w / 2,
              h / 3,
              w * 0.66
            );

            gradient.addColorStop(0, "rgba(255, 255, 255,0.05)");
            gradient.addColorStop(1, "rgba(255, 255, 255,0.05)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          } else if (type === "moonshine") {
            var gradient = ctx.createLinearGradient(
              w / 2,
              h / 3,
              0,
              w / 2,
              h / 3,
              w * 0.4
            );

            gradient.addColorStop(0, " rgba(255, 255, 255,0.001)");
            gradient.addColorStop(1, "#403d6149");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            var gradient = ctx.createRadialGradient(
              w / 2,
              h / 2,
              0,
              w / 2,
              h / 2,
              w * 0.3
            );

            gradient.addColorStop(0, "rgba(0,0,0,0.02)");
            gradient.addColorStop(1, " rgba(255, 255, 255,0.001)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          } else if (type === "vintage") {
            var gradient = ctx.createRadialGradient(
              w / 2,
              h / 2,
              0,
              w / 2,
              h / 2,
              w * 0.6
            );

            gradient.addColorStop(0, "rgba(255, 255, 255,0.0004)");
            gradient.addColorStop(1, "rgba(255, 255, 255,0.0004)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          } else if (type === "nebula") {
            var gradient = ctx.createRadialGradient(
              w / 2,
              h / 2,
              0,
              w / 2,
              h / 2,
              w * 0.65
            );

            gradient.addColorStop(0, "rgba(255, 255, 255, 0.01)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0.08)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          } else if (type === "futurama") {
            var gradient = ctx.createRadialGradient(
              w / 2,
              h / 2,
              0,
              w / 2,
              h / 2,
              w * 0.68
            );

            gradient.addColorStop(0, "rgb(163, 218, 37,0.004)");
            gradient.addColorStop(1, "rgb(27, 194, 236,0.004)");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          } else if (type === "tentacion") {
            var gradient = ctx.createLinearGradient(
              w / 2,
              h / 71,
              0,
              w / 19,
              h / 2,
              w * 0.4
            );

            gradient.addColorStop(0, "rgba(255, 255, 255,0)");
            gradient.addColorStop(1, "#20422e5a");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          } else {
          }
          //////////////////////VIGNETTE

          //////////////////////GRADIENT BRIGHTNESS

          if (type === "lift" || type === "jentle" || type === "tentacion") {
            var gradient = ctx.createRadialGradient(
              w / 2,
              h / 2,
              0,
              w / 2,
              h / 2,
              w * 0.6
            );
            if (type === "lift") {
              gradient.addColorStop(0, "#dcecdf16");
              gradient.addColorStop(1, "#dceaec1a");
            } else if (type === "tentacion") {
              gradient.addColorStop(0, "#c9d6df11");
              gradient.addColorStop(1, "#bef0ce13");
            } else if (type === "jentle") {
              gradient.addColorStop(0, "rgba(255, 255, 255,0.008)");
              gradient.addColorStop(1, "rgba(255, 255, 255,0.008)");
            } else {
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
          }

          //////////////////////GRADIENT BRIGHTNESS

          ////////////////// /////// GLOBALCOMPOSITEOPERATION
          if (type === "lift") {
            ////////////composition

            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "rgba(100, 100, 100,0.07)";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "rgba(100, 100, 100,0.07)";
            ctx.fillRect(0, 0, width, height);
            ////////////composition
          } else if (type === "floyd") {
            ////////////composition
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#a58e89cc";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#a58e89cc";
            ctx.fillRect(0, 0, width, height);

            ////////////composition
          } else if (type === "jentle") {
            ////////////composition
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#d3b5b5";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "soft-light";
            ctx.fillStyle = "#d3b5b5";
            ctx.fillRect(0, 0, width, height);

            ////////////composition
          } else if (type === "mint") {
            ////////////composition
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#25302f18";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "soft-light";
            ctx.fillStyle = "#25302f18";
            ctx.fillRect(0, 0, width, height);

            ////////////composition
          } else if (type === "nebula") {
            ////////////composition
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#6e6b72cc";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "soft-light";
            ctx.fillStyle = "#6c6971cc";
            ctx.fillRect(0, 0, width, height);

            ////////////composition
          } else if (type === "moonshine") {
            ////////////composition
            ctx.globalCompositeOperation = "soft-light";
            ctx.fillStyle = "#77479f68";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#69359368";
            ctx.fillRect(0, 0, width, height);

            ////////////composition
          } else if (type === "juice") {
            ////////////composition
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#5b6c7014";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#5b6c7014";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#5b6c7014";
            ctx.fillRect(0, 0, width, height);
            ////////////composition
          } else if (type === "futurama") {
            ////////////composition
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#11181f1f";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "screen";
            ctx.fillStyle = "#11181f1f";
            ctx.fillRect(0, 0, width, height);

            ////////////composition
          } else if (type === "kemi") {
            ////////////composition
            ctx.globalCompositeOperation = "screen";
            ctx.fillStyle = "#69758113";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "overlay";
            ctx.fillStyle = "#69758113";
            ctx.fillRect(0, 0, width, height);

            ////////////composition
          } else if (type === "tentacion") {
            ////////////composition
            ctx.globalCompositeOperation = "soft-light";
            ctx.fillStyle = "#2c2b2937";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "soft-light";
            ctx.fillStyle = "#2c2b2937";
            ctx.fillRect(0, 0, width, height);

            ////////////composition
          } else if (type === "vintage") {
            ////////////composition

            ctx.globalCompositeOperation = "soft-light";
            ctx.fillStyle = "#40404b4e";
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = "soft-light";
            ctx.fillStyle = "#2c2c3a4e";
            ctx.fillRect(0, 0, width, height);
            ////////////composition
          } else {
          }
          ////////////////// /////// GLOBALCOMPOSITEOPERATION

          ////////////////////GRADIENT BLENDING
          if (
            type === "jentle" ||
            type === "mint" ||
            type === "nebula" ||
            type === "juice" ||
            type === "futurama" ||
            type === "kemi" ||
            type === "tentacion" ||
            type === "moonshine" ||
            type === "vintage" ||
            type === "floyd"
          ) {
            var gradient = FilterGradient(width, height, type);
            var screen = blend(
              ctx,
              gradient,
              width,
              height,
              function (bottomPixel: any, topPixel: any) {
                return 255 - ((255 - topPixel) * (255 - bottomPixel)) / 255;
              }
            );
            ctx.putImageData(screen, 0, 0);
          }

          ////////////////////GRADIENT BLENDING

          try {
            KeepCallingThumbnail4Filters(Ref, ctx, index2, method);

            if (
              method === "image" ||
              method === "imageHD" ||
              method === "imageHDall"
            ) {
              var data = canvasRef.current.toDataURL();

              Ref.current[index].src = data;

              if (method === "imageHDall") {
                const res = await fetch(data);
                const datax = await res.blob();
                finalImageDataxx[index] = datax;
              }

              regimageholdfilterxx[index] = data;
              effectModexx[index] = type;

              ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );

              if (method === "imageHD") {
                sethdfilter(false);
                setblink(false);
                seteffectMode(effectModexx);
                setregimageholdfilter(regimageholdfilterxx);
              } else {
                if (index + 1 > selectedImage.length - 1) {
                  setblink(false);
                  if (method === "imageHDall") {
                    setfinalImageData(finalImageDataxx);
                    setsupeFilterLoadFade(false);
                    setstartTopicCap(true);
                  }
                  seteffectMode(effectModexx);
                  setregimageholdfilter(regimageholdfilterxx);
                } else {
                  if (method === "imageHDall") {
                    ApplyImageFilter(
                      effectMode[index + 1],
                      index + 1,
                      index2 + 1,
                      getImageWidth,
                      "imageHDall",
                      "hd"
                    );
                  } else {
                    ApplyImageFilter(
                      typex,
                      index + 1,
                      index2 + 1,
                      getImageWidth,
                      "image",
                      "sd"
                    );
                  }
                }
              }
            }

            if (method === "supersticker") {
              if (FilterUnderStickerStopFiltering) {
                trapfiltersxx[index] = true;
                settrapfilters(trapfiltersxx);
              } else {
                trapfiltersxx[index] = false;
                settrapfilters(trapfiltersxx);
              }

              var data = canvasRef.current.toDataURL();
              Ref.current[index].src = data;

              if (effectMode[index] !== "normal") {
                if (duplicateItemupload[index]) {
                } else {
                  regimageholdfilterxx[index] = data;
                  setregimageholdfilter(regimageholdfilterxx);
                }
              }
              ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
              setactiveSticker(100);
            }
          } catch {
            console.log("filtermode  filter error");
          }
        });

        canvasRef.current.style.width = `${widthx}px`;
        canvasRef.current.style.height = `${heightx}px`;
      };
    }
  }

  const KeepCallingThumbnail4Filters = (
    Ref: any,
    ctx: any,
    index2: number,
    method: any
  ) => {
    //// const gg = await ctx.putImageData(screen, 0, 0);

    if (method === "thumb") {
      Ref.current[index2].src = canvasRef.current.toDataURL();
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      if (index2 === 1) {
        ApplyImageFilter(
          "juice",
          0,
          index2 + 1,
          imageFiltersRef,
          "thumb",
          "sd"
        );
      } else if (index2 === 2) {
        ApplyImageFilter("kemi", 0, index2 + 1, imageFiltersRef, "thumb", "sd");
      } else if (index2 === 3) {
        ApplyImageFilter(
          "futurama",
          0,
          index2 + 1,
          imageFiltersRef,
          "thumb",
          "sd"
        );
      } else if (index2 === 4) {
        ApplyImageFilter(
          "tentacion",
          0,
          index2 + 1,
          imageFiltersRef,
          "thumb",
          "sd"
        );
      } else if (index2 === 5) {
        ApplyImageFilter(
          "floyd",
          0,
          index2 + 1,
          imageFiltersRef,
          "thumb",
          "sd"
        );
      } else if (index2 === 6) {
        ApplyImageFilter(
          "nebula",
          0,
          index2 + 1,
          imageFiltersRef,
          "thumb",
          "sd"
        );
      } else if (index2 === 7) {
        ApplyImageFilter(
          "jentle",
          0,
          index2 + 1,
          imageFiltersRef,
          "thumb",
          "sd"
        );
      } else if (index2 === 8) {
        ApplyImageFilter("mint", 0, index2 + 1, imageFiltersRef, "thumb", "sd");
      } else if (index2 === 9) {
        ApplyImageFilter(
          "moonshine",
          0,
          index2 + 1,
          imageFiltersRef,
          "thumb",
          "sd"
        );
      } else if (index2 === 10) {
        ApplyImageFilter(
          "vintage",
          0,
          index2 + 1,
          imageFiltersRef,
          "thumb",
          "sd"
        );
        setshowfiltersOnloadblur(true);
      } else {
        ApplyImageFilter("normal", 0, 0, getImageWidth, "image", "sd");
      }
    }
  };

  useEffect(() => {
    if (hdfilter) {
      ApplyImageFilter(
        effectMode[superstickerIndex],
        superstickerIndex,
        0,
        getImageWidth,
        "imageHD",
        "hd"
      );
    }
  }, [hdfilter]);

  useEffect(() => {
    if (startSuperSticker) {
    } else {
      if (activeSticker != 100) {
        if (duplicateItemupload[activeSticker]) {
          ApplyImageFilter(
            "normal",
            activeSticker,
            0,
            getImageWidth,
            "supersticker",
            "sd"
          );
        } else {
          ApplyImageFilter(
            effectMode[activeSticker],
            activeSticker,
            0,
            getImageWidth,
            "supersticker",
            "sd"
          );
        }
      }
    }
  }, [startSuperSticker]);

  useEffect(() => {
    if (imageFiltersRef && activatefilterImageReducer) {
      setTimeout(function () {
        setallow(true);
        setshowfiltersOnloadblur(false);
        setshowfiltersOnload(true);
        ApplyImageFilter("lift", 0, 1, imageFiltersRef, "thumb", "sd");
      }, 350);
    }
  }, [activatefilterImageReducer]);

  const startImageFilter = (i: number) => {
    if (i === 12 && ActiveSlide === i) {
      setsupeFilterLoadFade(true);
      ApplyImageFilter(effectMode[0], 0, 0, getImageWidth, "imageHDall", "hd");
    } else {
      clickOptions(i, optionsClickType, "filter");
      if (Timer.current) {
        clearTimeout(Timer.current);
      }
      if (ActiveSlide === i) {
        setblink(true);
        ApplyImageFilter(
          optionsNameData[i],
          0,
          0,
          getImageWidth,
          "image",
          "sd"
        );
      } else {
        if (i === 12) {
        } else {
          Timer.current = setTimeout(function () {
            setblink(true);
            ApplyImageFilter(
              optionsNameData[i],
              0,
              0,
              getImageWidth,
              "image",
              "sd"
            );
          }, 2000);
        }
      }
    }
  };

  const clickOptionsOutter = (i: any, optionsClickType: any, source: any) => {
    if (Timer.current) {
      clearTimeout(Timer.current);
    }

    if (i === -1) {
      clickOptions(optionsImages.length, optionsClickType, "filter2");
    } else if (i > optionsImages.length - 1) {
      clickOptions(0, optionsClickType, "filter");
    } else {
      clickOptions(i, optionsClickType, "filter");
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          padding: "0px",
          position: "fixed",
          top: "-400%",
          zIndex: 0,
          visibility: "hidden",
        }}
      />
      <canvas
        ref={canvasRefdummy}
        style={{
          padding: "0px",
          display: "none",
          position: "fixed",
          top: "-400%",
          zIndex: 0,
          visibility: "hidden",
        }}
      />
      {optionsShow && allow ? (
        <>
          <animated.div ref={getFilterWidthViewable} style={animationop}>
            {matchPc ? (
              <>
                {" "}
                <Grid
                  container
                  style={{
                    zIndex: 10,
                    height: "0px",
                    width: "100%",
                    position: "fixed",
                    marginTop: `${(getSliderWidthNew + addedwidth) / 2}px`,
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    style={{
                      zIndex: 10,
                      height: "0px",
                      textAlign: "left",
                    }}
                  >
                    {" "}
                    <CircleIcon
                      onMouseDown={() => {
                        clickOptionsOutter(
                          ActiveSlide - 1,
                          optionsClickType,
                          "filter"
                        );
                      }}
                      className={
                        darkmodeReducer
                          ? "make-small-icons-clickable-dark  buttonshake dontallowhighlighting zuperkinginfo "
                          : "make-small-icons-clickable-light  buttonshake  dontallowhighlighting  zuperkinginfo  "
                      }
                      style={{
                        filter: showfiltersOnloadblur
                          ? "blur(0px)"
                          : "blur(4px)",
                        marginTop: "4vh",
                        fontSize: "1.6vw",
                        cursor: "pointer",
                        color: darkmodeReducer
                          ? "rgba(200, 200, 200, 0.7)"
                          : "rgba(005, 005, 005, 0.6)",
                      }}
                    />{" "}
                  </Grid>

                  <Grid
                    item
                    xs={8}
                    style={{
                      height: "0px",
                    }}
                  ></Grid>

                  <Grid
                    item
                    xs={2}
                    style={{
                      zIndex: 10,
                      height: "0px",
                      textAlign: "right",
                    }}
                  >
                    {" "}
                    <CircleIcon
                      className={
                        darkmodeReducer
                          ? "make-small-icons-clickable-dark  buttonshake dontallowhighlighting zuperkinginfo "
                          : "make-small-icons-clickable-light  buttonshake  dontallowhighlighting  zuperkinginfo  "
                      }
                      onMouseDown={() => {
                        clickOptionsOutter(
                          ActiveSlide + 1,
                          optionsClickType,
                          "filter"
                        );
                      }}
                      style={{
                        filter: showfiltersOnloadblur
                          ? "blur(0px)"
                          : "blur(4px)",
                        marginTop: "4vh",
                        fontSize: "1.6vw",
                        cursor: "pointer",
                        color: darkmodeReducer
                          ? "rgba(200, 200, 200, 0.7)"
                          : "rgba(005, 005, 005, 0.6)",
                      }}
                    />{" "}
                  </Grid>
                </Grid>
              </>
            ) : null}
            <Grid
              container
              className={
                typeTop
                  ? darkmodeReducer
                    ? `optionsTop-background-dark `
                    : `optionsTop-background-light `
                  : ""
              }
              onTouchStart={handleTouchStartOptions}
              onTouchMove={handleTouchMoveOptions}
              style={{
                zIndex: 1,
                padding: "0px",
                top: matchPc ? (typeTop ? "-2vh" : "0vh") : "0vh",
                position: "relative",
                paddingRight: "200px",
                margin: "0 auto",
                overflow: "hidden",
                left: "0px",
                height: matchPc ? "auto" : "25vh",
                paddingBottom: "1px",
              }}
            >
              <animated.div ref={optionsCollectImageRef} style={modalanimation}>
                {optionsImages.map((im: any, i: any) => (
                  <Grid key={i} item xs={12} style={{}}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        margin: "auto",
                        textAlign: "center",
                        position: "relative",
                        top: matchPc ? "1.55vh" : "0.54em",
                      }}
                    >
                      <Grid
                        className={blink ? "blinken" : ""}
                        item
                        xs={12}
                        style={{
                          margin: "auto",
                          marginLeft: "2vw",
                          paddingBottom: "0px",
                          fontFamily: "kaushan_scriptregular",
                          fontSize: matchPc
                            ? "1.5vw"
                            : matchTablet
                            ? "2.08vh"
                            : "2.4vh",
                          fontWeight: "bolder",
                          visibility: ActiveSlide === i ? "visible" : "hidden",
                          filter: darkmodeReducer
                            ? "drop-shadow(1.2px 0.1px 1.92px rgba(255, 255, 255, 0.4))"
                            : "drop-shadow(1.2px 0.1px 1.92px rgba(41, 53, 70, 8.35))",
                          color: darkmodeReducer ? "#dddddd" : "#000000",
                        }}
                      >
                        {" "}
                        {optionsNameData[i]}
                      </Grid>
                    </Grid>

                    {showfiltersOnload ? (
                      i === 12 ? (
                        <>
                          <div
                            onMouseDown={() => {
                              startImageFilter(i);
                            }}
                            style={{
                              cursor: ActiveSlide === i ? "pointer" : "alias",
                              width: `${getSliderWidthNew + addedwidth - 5}px`,
                              height: `${getSliderWidthNew + addedwidth - 5}px`,
                              backgroundColor: darkmodeReducer
                                ? "rgba(010,010,010, 0.68)"
                                : "rgba(211,211,211, 0.7)",
                              borderRadius: "50%",
                              marginLeft: "2vw",
                              marginTop: "2.15vh",
                              textAlign: "center",
                              alignItems: "center",
                              display: "grid",
                              justifyContent: "center",
                              boxShadow: darkmodeReducer
                                ? ActiveSlide === i
                                  ? colortypeReducer === 0
                                    ? `0 0 5.5px ${colorReducerdark}`
                                    : `0 0 5.5px ${colorReducer}`
                                  : "0 0 1.5px#aaaaaa"
                                : ActiveSlide === i
                                ? `0 0 5.5px ${colorReducer}`
                                : "0 0 1.45px#222222",
                            }}
                          >
                            <ChevronRightIcon
                              style={{
                                fontSize: matchPc ? "3.4vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <img
                            ref={addimageFiltersRef}
                            alt={` ${optionsNameData[i]}  option`}
                            onMouseDown={() => {
                              startImageFilter(i);
                            }}
                            style={{
                              backgroundColor: "red",
                              cursor: ActiveSlide === i ? "pointer" : "copy",
                              width: `${getSliderWidthNew + addedwidth}px`,
                              height: `${getSliderWidthNew + addedwidth}px`,
                              borderRadius: "50%",
                              padding: "0px",
                              objectFit: "cover",
                              marginLeft: "2vw",
                              marginTop: "13px",
                              filter: showfiltersOnloadblur
                                ? "blur(0px)"
                                : "blur(4px)",
                              boxShadow: darkmodeReducer
                                ? ActiveSlide === i
                                  ? colortypeReducer === 0
                                    ? `0 0 6.8px ${colorReducerdark}`
                                    : `0 0 6.8px ${colorReducer}`
                                  : typeTop
                                  ? "0 0 12.5px#aaaaaa"
                                  : ""
                                : ActiveSlide === i
                                ? `0 0 5.7px ${colorReducer}`
                                : typeTop
                                ? `0 0 14.45px#222222`
                                : "",
                            }}
                            src={
                              itemUploadRefThumb.current[0]
                                ? itemUploadRefThumb.current[0].src
                                : null
                            }
                          />
                        </>
                      )
                    ) : null}
                  </Grid>
                ))}
              </animated.div>
            </Grid>
          </animated.div>
        </>
      ) : null}
    </>
  );
}

export const ImageFilterinner = React.memo(ImageFilterinnerx);
