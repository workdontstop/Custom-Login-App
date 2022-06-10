import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import Masonry from "@mui/lab/Masonry";
import CircleIcon from "@mui/icons-material/Circle";
import { SuperCrop } from "./SuperCrop";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PhotoIcon from "@mui/icons-material/Photo";
import GifIcon from "@mui/icons-material/Gif";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Axios from "axios";
import CropIcon from "@mui/icons-material/Crop";
import CheckIcon from "@mui/icons-material/Check";
import { PreviewCanvasHolder } from "./PreviewCanvasHolder";

import { PreviewCanvas } from "./PreviewCanvas";
import Slider from "@material-ui/core/Slider";
import { UpdateNavFilterReducer } from "../GlobalActions";
import { UpdateNavCropReducer } from "../GlobalActions";
import { styled } from "@mui/system";
import { Grid, Box } from "@material-ui/core";

function CropUploadModex({
  CropSaved,
  ActiveSlide,
  handleTouchStartOptions,
  handleTouchMoveOptions,
  optionsCollectImageRef,
  modalanimation,
  getSliderWidthNew,
  optionsClickType,
  clickOptions,
  optionsImages,
  optionsNameData,
  cropTOPLEVELScrollRef,
  refWithimageData,
  filterImage,
  setfilterImage,
  setActivatefilterImage,
  selectedImage,
  setselectedImage,
  itemUploadRef,
  closeUploadModalx,
  cropscrollRef,
  setallowOverflow,
  allowOverflow,
  itemUploadRefSD,
  itemUploadRefThumb,
}: any): JSX.Element {
  const [matchTabletMobile, setmatchTabletMobile] = useState<boolean>(false);

  const dispatch = useDispatch();
  var extendxy = 1;
  extendxy = matchTabletMobile ? 2.5 : 2.4;

  ///
  ///

  const allowscrolltimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [zoom, setzoom] = useState<any>(1);

  const [zoomActivated, setzoomActivated] = useState<boolean>(false);

  const [superCropLoadFade, setsuperCropLoadFade] = useState<boolean>(false);

  const [ShowmaxPost, setShowmaxPost] = useState<boolean>(false);

  const [allowFilters, setallowFilters] = useState<boolean>(false);

  const [showCropper, setshowCropper] = useState<boolean>(false);

  const [allowCropAllCanvas, setallowCropAllCanvas] = useState<boolean>(true);

  const [pushcanvasdown, setpushcanvasdown] = useState<boolean>(false);

  const [centercropperMargin, setcentercropperMargin] = useState(0);

  const [waitONLOAD, setwaitONLOAD] = useState<boolean>(true);

  var k1 = CropSaved ? 3 : 2;

  var k2 = CropSaved ? 4 : 3;

  const [cutOffLoader, setcutOffLoader] = useState<number>(0);

  const [widelongboxmobileimage, setwidelongboxmobileimage] =
    useState<boolean>(false);

  const [widelongboxmobileimagex, setwidelongboxmobileimagex] =
    useState<boolean>(false);

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

  const { REACT_APP_SUPERSTARZ_URL } = process.env;

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

  const [cropimage, setcropimage] = useState<any>(null);
  const [showCrop, setshowCrop] = useState<boolean>(false);

  const [selectedImageUpload, setselectedImageUpload] = useState<any>(null);

  ///
  ///
  ///
  /// GET GLOBAL INNER NAVIGATION VARIABLE
  const { activatecropImage } = useSelector((state: RootStateOrAny) => ({
    ...state.GlobalNavuploadReducer,
  }));
  const activatecropImageReducer = activatecropImage;

  const updateColor = useCallback(
    (formData: any) => {
      Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/upload`, formData)
        .then((response) => {
          if (response.data.message === "ok") {
          }
        })
        .catch(function (error) {
          alert("about color error");
        });
    },
    [REACT_APP_SUPERSTARZ_URL]
  );

  ///
  ///
  ///
  ///CREATE REFS FROM POSTS AND ADD THEM TO ARRAY
  const addUploadItemsRef = (UploadRef: any) => {
    if (UploadRef && !itemUploadRef.current.includes(UploadRef)) {
      itemUploadRef.current.push(UploadRef);
    }
  };

  const addUploadItemsRefThumb = (UploadRef: any) => {
    if (UploadRef && !itemUploadRefThumb.current.includes(UploadRef)) {
      itemUploadRefThumb.current.push(UploadRef);
    } ////console.log(postItemsRef.current[1]);
  };

  const addUploadItemsRefSD = (UploadRef: any) => {
    if (UploadRef && !itemUploadRefSD.current.includes(UploadRef)) {
      itemUploadRefSD.current.push(UploadRef);
    }
  };

  const imageHandleChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const FileArray = Array.from(e.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );

      if (e.target.files.length > 8) {
        setShowmaxPost(true);
        setTimeout(function () {
          setShowmaxPost(false);
        }, 3000);
      } else {
        setselectedImage([]);
        setselectedImage((prevImages: any) => prevImages.concat(FileArray));
        setcropimage(FileArray[0]);
        window.history.pushState(null, "", "Crop");
        dispatch(UpdateNavCropReducer(true));
      }
    }
  };

  ///////////////////////////////////////////////////////SUPER CROP ///////////////////////////////////

  const cropCanvasRef: any = useRef(null);

  ////
  ////
  ////
  const [cropArea, setcropArea] = useState<any>(null);

  //
  const [crop, setcrop] = useState<any>({ x: 0, y: 0 });

  const [cropToo, setcropToo] = useState<any>({ x: 0, y: 0 });

  const [cropInitial, setcropInitial] = useState<any>({ x: 0, y: 0 });

  const [cropOffset, setcropOffset] = useState<any>({ x: 0, y: 0 });

  const [Drag, setDrag] = useState<boolean>(false);

  const [SourceWidthForCropX, setSourceWidthForCropX] = useState(0);

  const [SourceWidthForCropY, setSourceWidthForCropY] = useState(0);

  const [cropwidth, setcropwidth] = useState(0);

  const [cropheight, setcropheight] = useState(0);

  const [canvasToimage, setcanvasToimage] = useState<boolean>(false);

  const getpreviewFixedWidthRef = useRef<HTMLDivElement>(null);

  const getCropHeightRef: any = useRef<HTMLDivElement>(null);

  const getCropWidthMobileRef: any = useRef<HTMLDivElement>(null);

  const getCropWidthMobileReflong: any = useRef<HTMLDivElement>(null);

  const getCropWidthMobileRefHD: any = useRef<HTMLDivElement>(null);

  const getCropHeightRefsingle: any = useRef<HTMLDivElement>(null);

  const getFixedCropWidthRef: any = useRef<HTMLDivElement>(null);

  const [myCropWidth, setmyCropWidth] = useState(0);
  const [myCropHeight, setmyCropHeight] = useState(0);

  const [getCropHeight, setgetCropHeight] = useState(0);

  const [getCropWidthMobile, setgetCropWidthMobile] = useState(0);

  const [getCropWidthMobileHD, setgetCropWidthMobileHD] = useState(0);

  const [getCropHeightsingle, setgetCropHeightsingle] = useState(0);

  const [getCropHeightRealImageRatio, setgetCropHeightRealImageRatio] =
    useState(0);

  const [getFixedCropWidth, setgetFixedCropWidth] = useState(0);

  const [getpreviewFixedWidth, setgetpreviewFixedWidth] = useState(0);

  const [screenH, setscreenH] = useState(0);

  const [screenHx, setscreenHx] = useState(0);

  const [CropImageHolder, setCropImageHolder] = useState<any>(null);

  const [OriginalImageWidth, setOriginalImageWidth] = useState<number>(0);
  const [OriginalImageHeight, setOriginalImageHeight] = useState<number>(0);

  const [WideImageCheck, setWideImageCheck] = useState<boolean>(false);

  const hdcanvasvalue = 1;

  const [BoxCropActivated, setBoxCropActivated] = useState<boolean>(false);

  const [optionscropshow, setoptionscropshow] = useState<boolean>(true);

  const cropScrollRef: any = useRef(null);

  const [widecheckhold, setwidecheckhold] = useState<boolean>(true);

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

    if (selectedImage.length === 1) {
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
          setmyCropWidth(
            getCropHeightRefsingle.current.clientHeight * hdcanvasvalue
          );

          setmyCropHeight(
            getCropHeightRefsingle.current.clientHeight * hdcanvasvalue
          );
        }

        setgetCropHeightRealImageRatio(
          getCropHeightRefsingle.current.clientHeight
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
  }, [selectedImage]);
  ///

  ///
  ///
  ///
  /// HANDLE TOUCH START EVENT

  const mouseover = (type: number) => {
    if (matchTabletMobile && BoxCropActivated) {
      if (type === 1) {
        if (allowOverflow) {
        } else {
          setallowOverflow(true);
        }
      } else {
        if (allowOverflow) {
          setallowOverflow(false);
        } else {
        }
      }
    }
  };

  const handleTouchStart = (e: any, type: any) => {
    if (BoxCropActivated) {
      mouseover(0);

      setoptionscropshow(false);
      if (type === 0) {
        setcropInitial({
          ...cropInitial,
          x: e.clientX * extendxy - cropOffset.x,
          y: e.clientY * extendxy - cropOffset.y,
        });
      } else {
        setcropInitial({
          ...cropInitial,
          x: e.touches[0].clientX * extendxy - cropOffset.x,
          y: e.touches[0].clientY * extendxy - cropOffset.y,
        });
      }
      if (e.target) {
        setDrag(true);
      }
    } else {
      setBoxCropActivated(true);
    }
  };

  const handleTouchEnd = () => {
    if (allowscrolltimer.current) {
      clearTimeout(allowscrolltimer.current);
    }

    allowscrolltimer.current = setTimeout(function () {
      mouseover(1);
    }, 1200);

    setoptionscropshow(true);
    setcropInitial({
      ...cropInitial,
      x: crop.x,
      y: crop.y,
    });
    setDrag(false);
  };

  const handleTouchDrag = (e: any, type: any) => {
    if (Drag) {
      if (type === 0) {
        setcrop({
          ...crop,
          x: e.clientX * extendxy - cropInitial.x,
          y: e.clientY * extendxy - cropInitial.y,
        });
      } else {
        setcrop({
          ...crop,
          x: e.touches[0].clientX * extendxy - cropInitial.x,
          y: e.touches[0].clientY * extendxy - cropInitial.y,
        });
      }

      setcropOffset({
        ...cropOffset,
        x: crop.x,
        y: crop.y,
      });
    }
  };
  const draw = useCallback(
    (
      ctx: any,
      dimensions: any,
      type: number,
      axis: number,
      allowZoomedAxis: number
    ) => {
      var allowZoomedaxis;

      if (zoom === 1) {
        allowZoomedaxis = 0;
      } else {
        allowZoomedaxis = allowZoomedAxis;
      }
      if (type === 1) {
        ctx.drawImage(
          CropImageHolder,
          axis,
          allowZoomedaxis,
          dimensions * zoom,
          myCropHeight * zoom
        );
      } else if (type === 2) {
        ctx.drawImage(
          CropImageHolder,
          allowZoomedaxis,
          axis,
          myCropWidth * zoom,
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
      setshowCropper(true);
    },
    [
      OriginalImageWidth,
      OriginalImageHeight,
      CropImageHolder,
      myCropHeight,
      myCropWidth,
      zoom,
    ]
  );

  useLayoutEffect(() => {
    const Newcropimage: any = new Image();

    Newcropimage.src = cropimage;
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
  }, [activatecropImageReducer, cropimage]);

  useLayoutEffect(() => {
    if (CropImageHolder && cropCanvasRef.current) {
      const ctx = cropCanvasRef.current.getContext("2d");

      var RatiofromOriginalandfixedHeight = OriginalImageHeight / myCropHeight;
      var NewBoxRatioWidth_WIDEIMAGE =
        OriginalImageWidth / RatiofromOriginalandfixedHeight;

      if (SourceWidthForCropX === NewBoxRatioWidth_WIDEIMAGE) {
      } else {
        setSourceWidthForCropX(NewBoxRatioWidth_WIDEIMAGE);
      }

      var RatiofromOriginalandfixedHeightx = OriginalImageWidth / myCropWidth;
      var NewBoxRatioWidth_LONGIMAGE =
        OriginalImageHeight / RatiofromOriginalandfixedHeightx;

      if (SourceWidthForCropY === NewBoxRatioWidth_LONGIMAGE) {
      } else {
        setSourceWidthForCropY(NewBoxRatioWidth_LONGIMAGE);
      }

      var ratioh = (OriginalImageWidth * 3) / OriginalImageWidth;
      var ratiow = (OriginalImageHeight * 3) / OriginalImageHeight;

      if (BoxCropActivated) {
        cropCanvasRef.current.width = myCropWidth;
        cropCanvasRef.current.height = myCropHeight;
      } else {
        cropCanvasRef.current.width = OriginalImageWidth;
        cropCanvasRef.current.height = OriginalImageHeight;
      }

      var centerpreview =
        cropCanvasRef.current.width / 1.5 - NewBoxRatioWidth_LONGIMAGE / 1.5;

      var xtraZoom = myCropHeight / NewBoxRatioWidth_WIDEIMAGE;

      var centerCropCanvas =
        cropCanvasRef.current.width / 2 - NewBoxRatioWidth_WIDEIMAGE / 2;

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
            requestAnimationFrame(() => {
              draw(ctx, NewBoxRatioWidth_WIDEIMAGE, 1, 0, crop.x);
            });
          } else {
            var dragDistanceY = NewBoxRatioWidth_LONGIMAGEx2 - myCropHeight;
            var dragDistanceX = NewBoxRatioWidth_WIDEIMAGEx2 - myCropWidth;

            if (crop.y < -dragDistanceY) {
              setcrop({ ...crop, y: -dragDistanceY });
            } else if (crop.y > 0) {
              setcrop({ ...crop, y: 0 });
            } else {
            }
            if (crop.x < -dragDistanceX) {
              setcrop({ ...crop, x: -dragDistanceX });
            } else if (crop.x > 0) {
              setcrop({ ...crop, x: 0 });
            } else {
            }

            requestAnimationFrame(() => {
              draw(ctx, NewBoxRatioWidth_WIDEIMAGE, 1, crop.x, crop.y);
            });
          }
        } else {
          if (OriginalImageHeight === OriginalImageWidth) {
            requestAnimationFrame(() => {
              draw(ctx, NewBoxRatioWidth_LONGIMAGE, 2, 0, crop.x);
            });
          } else {
            var dragDistanceY = NewBoxRatioWidth_LONGIMAGEx - myCropHeight;
            var dragDistanceX = NewBoxRatioWidth_WIDEIMAGEx - myCropWidth;

            if (crop.y < -dragDistanceY) {
              setcrop({ ...crop, y: -dragDistanceY });
            } else if (crop.y > 0) {
              setcrop({ ...crop, y: 0 });
            } else {
            }
            if (crop.x < -dragDistanceX) {
              setcrop({ ...crop, x: -dragDistanceX });
            } else if (crop.x > 0) {
              setcrop({ ...crop, x: 0 });
            } else {
            }

            requestAnimationFrame(() => {
              draw(ctx, NewBoxRatioWidth_LONGIMAGE, 2, crop.y, crop.x);
            });
          }
        }

        cropCanvasRef.current.style.width = `${myCropWidth / hdcanvasvalue}px`;
        cropCanvasRef.current.style.height = `${
          myCropHeight / hdcanvasvalue
        }px`;
      } else {
        requestAnimationFrame(() => {
          draw(ctx, 0, 3, 0, crop.x);
        });

        if (matchTabletMobile && widelongboxmobileimage) {
          cropCanvasRef.current.style.width = `${getCropWidthMobile}px`;
          cropCanvasRef.current.style.height = `${newcropCSSHeight}px`;
        } else {
          cropCanvasRef.current.style.width = `${newcropCSSWidth}px`;
          cropCanvasRef.current.style.height = `${getCropHeightRealImageRatio}px`;
        }
      }
    }
  }, [
    CropImageHolder,
    BoxCropActivated,
    OriginalImageWidth,
    OriginalImageHeight,
    widelongboxmobileimage,
    crop,
    zoom,
  ]);
  const gg = () => {};

  const cropaspectchange = () => {
    setBoxCropActivated((BoxCropActivated) => !BoxCropActivated);
  };

  const complete = () => {
    setTimeout(function () {
      setcropToo({
        ...cropToo,
        x: crop.x,
        y: crop.y,
      });

      setsuperCropLoadFade(true);
      setTimeout(function () {
        dispatch(UpdateNavCropReducer(false));
        setcanvasToimage(true);
      }, 300);
    }, 100);
  };

  const blank = () => {};

  const [showModalUpload, setShowModalUpload] = useState<boolean>(false);

  ///
  ///
  ///
  ///OPEN MODAL THEN CALL CLOSEMODAL FUNCTION WHICH WAITS FOR A POP EVENT(for closing modal)
  const OpenFilter = useCallback(() => {
    window.history.pushState(null, "", "filter");
    dispatch(UpdateNavFilterReducer(true));

    //pushstate add enteries to your history
  }, []);

  ///
  ///
  ///
  /// CLOSE MODAL (STARTS AN ONPOPSTATE EVENT)
  const ClickMonster = useCallback(
    (ii: any) => {
      clickOptions(ii, optionsClickType, "");
      if (ActiveSlide === 3 && ii === 3) {
        if (allowFilters) {
          setallowCropAllCanvas(false);
          OpenFilter();
        }
      }
    },
    [allowFilters, ActiveSlide, optionsClickType]
  );

  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationcropx = useSpring({
    config: {
      duration: 250,
    },
    transform: showCropper ? `translateY(0%)` : `translateY(-50%)`,
    padding: "0px",
  });

  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationcrop = useSpring({
    config: {
      duration: 250,
    },

    transform: showCropper
      ? pushcanvasdown && BoxCropActivated
        ? `translateY(30%)`
        : `translateY(0%)`
      : `translateY(-100%)`,
    padding: "0px",
  });

  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animation = useSpring({
    config: {
      duration: 2000,
    },
    opacity: activatecropImageReducer ? 1 : 0,
    padding: "0px",
  });

  const [val, setval] = useState(0);

  const updatezoom = (e: any, data: any) => {
    setzoom(data);
    setcrop({
      ...crop,
      x: cropInitial.x,
      y: cropInitial.y,
    });
  };

  useEffect(() => {
    if (pushcanvasdown) {
    } else {
      if (
        cropCanvasRef.current &&
        matchTabletMobile &&
        selectedImage.length === 1
      ) {
        var h = cropCanvasRef.current.height;
        var w = cropCanvasRef.current.width;
        var ww = w * 1.5;
        if (ww > h) {
          setpushcanvasdown(true);
        }
      }
    }
  }, [BoxCropActivated]);

  return (
    <>
      {superCropLoadFade ? (
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

      <animated.div
        style={{
          ...animationcrop,
          position: activatecropImageReducer ? "relative" : "fixed",
          top: activatecropImageReducer ? "0px" : "-800vh",
          backgroundColor: darkmodeReducer
            ? "rgba(100,100,100,0.76)"
            : "rgba(50,50,50,0.2)",
          width: "100%",
          height: "70%",
        }}
      >
        <Grid
          container
          style={{
            padding: "0px",
          }}
        >
          {" "}
          {allowCropAllCanvas ? (
            <canvas
              onMouseOver={() => {
                mouseover(0);
              }}
              onMouseDown={(e: any) => {
                handleTouchStart(e, 0);
              }}
              onTouchStart={(e: any) => {
                handleTouchStart(e, 1);
              }}
              onMouseMove={(e: any) => {
                handleTouchDrag(e, 0);
              }}
              onTouchMove={(e: any) => {
                handleTouchDrag(e, 1);
              }}
              onMouseUp={handleTouchEnd}
              onTouchEnd={handleTouchEnd}
              className={
                darkmodeReducer
                  ? "turdarkCrop topcanvas"
                  : "turdarkCrop topcanvas"
              }
              ref={cropCanvasRef}
              style={{
                padding: "0px",

                margin: "auto",

                cursor: "pointer",
                filter: showCropper ? "blur(0px)" : "blur(8px)",
                zIndex: waitONLOAD ? 20 : 6,
              }}
            />
          ) : null}
          {BoxCropActivated ? (
            <>
              {" "}
              <Grid
                container
                style={{
                  padding: "0px",
                  top: matchTabletMobile ? "2vh" : "4vh",
                  margin: "auto",
                  width: `100%`,
                  height: "0px",
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={4}
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
                  md={4}
                  style={{
                    paddingLeft: "2vw",
                    padding: matchTabletMobile ? "50px" : "0px",
                    height: "0px",
                    margin: "auto",
                    zIndex: 7,
                    opacity: 0.8,
                    display: "grid",
                    alignItems: "center",
                  }}
                >
                  {optionscropshow ? (
                    <Slider
                      value={zoom}
                      onChange={updatezoom}
                      defaultValue={1}
                      max={3}
                      min={1}
                      step={0.000000001}
                    />
                  ) : null}
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                  item
                  style={{
                    padding: "0px",
                    height: "0px",
                    margin: "auto",
                    display: "grid",
                    alignItems: "center",
                  }}
                ></Grid>
              </Grid>
            </>
          ) : null}
          <Grid
            container
            style={{
              padding: "0px",
              bottom: matchTabletMobile
                ? widelongboxmobileimagex
                  ? matchTablet
                    ? "10.3vh"
                    : "9vh"
                  : pushcanvasdown && BoxCropActivated
                  ? "12.6vh"
                  : "18.6vh"
                : "13.6vh",
              margin: "auto",
              width: `100%`,
              height: "0px",
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              zIndex: 7,
              alignSelf: "center",
            }}
          >
            <Grid
              item
              xs={5}
              md={6}
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
                  onClick={complete}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-lightCrop turdark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-darkCrop  turdark dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    marginRight: "9%",
                    fontSize: matchTabletMobile ? "4.8vh" : "2.9vw",
                  }}
                />
              ) : null}
            </Grid>

            {matchTabletMobile ? (
              <>
                {" "}
                <Grid
                  item
                  xs={2}
                  component={Box}
                  display={{ xs: "block", md: "none" }}
                  style={{
                    padding: "3px",
                    height: "0px",
                    margin: "auto",
                    display: "grid",
                    alignItems: "center",
                  }}
                ></Grid>
              </>
            ) : null}
            <Grid
              item
              xs={5}
              md={6}
              style={{
                padding: "0px",
                height: "0px",
                margin: "auto",
                display: "grid",
                alignItems: "center",
              }}
            >
              {optionscropshow ? (
                <CropIcon
                  onClick={cropaspectchange}
                  className={
                    darkmodeReducer
                      ? "make-small-icons-clickable-lightCrop turdark dontallowhighlighting zuperkingIcon "
                      : "make-small-icons-clickable-darkCrop  turdark dontallowhighlighting zuperkingIcon  "
                  }
                  style={{
                    margin: "auto",
                    marginLeft: "9%",
                    fontSize: matchTabletMobile ? "4.8vh" : "2.9vw",
                  }}
                />
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </animated.div>

      {activatecropImageReducer ? null : (
        <>
          {" "}
          <input
            onChange={imageHandleChange}
            type="file"
            name="superImages"
            accept="image/*"
            multiple
            id="file"
            style={{ visibility: "hidden" }}
          />
          <Grid
            container
            onTouchStart={handleTouchStartOptions}
            onTouchMove={handleTouchMoveOptions}
            style={{
              zIndex: 1,
              padding: "0px",
              top: matchPc ? "-2vh" : "0vh",
              position: "relative",
              margin: "0 auto",
              overflow: "hidden",
              left: "0px",
              height: matchPc ? "24.4vh" : "20.5vh",
              paddingBottom: "1px",
            }}
          >
            <animated.div ref={optionsCollectImageRef} style={modalanimation}>
              {optionsImages.map((im: any, i: any) => (
                <Grid key={i} item xs={12}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: "auto",
                      textAlign: "center",
                      position: "relative",
                      padding: "0px",
                      paddingBottom: "0px",
                      top: "1vh",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      style={{
                        padding: "0px",
                        fontSize: matchPc ? "1.1vw" : "2vh",
                        fontWeight: "bolder",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        visibility: ActiveSlide === i ? "visible" : "hidden",
                        color: darkmodeReducer ? "#dddddd" : "#0b111b",
                      }}
                    >
                      {" "}
                      {optionsNameData[i]}
                    </Grid>
                  </Grid>

                  {ActiveSlide === 1 && i === 1 ? (
                    <label htmlFor="file">
                      <div
                        onClick={() => {
                          clickOptions(i, optionsClickType, "");
                        }}
                        style={{
                          cursor: ActiveSlide === i ? "pointer" : "alias",
                          width: `${getSliderWidthNew}px`,
                          height: `${getSliderWidthNew}px`,
                          backgroundColor: darkmodeReducer
                            ? "rgba(010,010,010, 0.68)"
                            : "rgba(211,211,211, 0.7)",
                          borderRadius: "50%",
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
                        <PhotoIcon
                          style={{
                            fontSize: matchPc ? "2vw" : "5vh",
                            color: darkmodeReducer ? "#eeeeee" : "#222222",
                          }}
                          className="zuperkinginfo"
                        />
                      </div>
                    </label>
                  ) : (
                    <>
                      {" "}
                      <span>
                        <div
                          onClick={() => {
                            ClickMonster(i);
                          }}
                          style={{
                            cursor: ActiveSlide === i ? "pointer" : "alias",
                            width: `${getSliderWidthNew}px`,
                            height: `${getSliderWidthNew}px`,
                            backgroundColor: darkmodeReducer
                              ? "rgba(010,010,010, 0.68)"
                              : "rgba(211,211,211, 0.7)",
                            borderRadius: "50%",
                            marginTop: "2.15vh",
                            textAlign: "center",
                            alignItems: "center",
                            display: "grid",
                            opacity: ActiveSlide === i && i !== 3 ? 0.3 : 1,
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
                          {i === 0 ? (
                            <MusicNoteIcon
                              style={{
                                fontSize: matchPc ? "2vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          ) : null}
                          {i === 1 ? (
                            <PhotoIcon
                              style={{
                                fontSize: matchPc ? "2vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          ) : null}

                          {i === 2 ? (
                            <GifIcon
                              style={{
                                fontSize: matchPc ? "2.5vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          ) : null}
                          {i === 3 ? (
                            <ChevronRightIcon
                              style={{
                                fontSize: matchPc ? "2.3vw" : "5vh",
                                color: darkmodeReducer ? "#eeeeee" : "#222222",
                              }}
                              className="zuperkinginfo"
                            />
                          ) : null}
                        </div>
                      </span>
                    </>
                  )}
                </Grid>
              ))}
            </animated.div>
          </Grid>{" "}
        </>
      )}

      <Grid container style={{ padding: "0px" }}>
        <Grid
          item
          xs={12}
          style={{
            padding: "0px",
          }}
        >
          <PreviewCanvasHolder
            selectedImage={selectedImage}
            myCropHeight={myCropHeight}
            cropToo={cropToo}
            zoom={zoom}
            setwaitONLOAD={setwaitONLOAD}
            allowCropAllCanvas={allowCropAllCanvas}
            WideImageCheck={WideImageCheck}
            SourceWidthForCropX={SourceWidthForCropX}
            SourceWidthForCropY={SourceWidthForCropY}
            hdcanvasvalue={hdcanvasvalue}
            BoxCropActivated={BoxCropActivated}
            cropheight={cropheight}
            cropwidth={cropwidth}
            CropImageHolder={CropImageHolder}
            cropCanvasRef={cropCanvasRef}
            crop={cropToo}
            getpreviewFixedWidth={getpreviewFixedWidth}
            canvasToimage={canvasToimage}
            refWithimageData={refWithimageData}
            addUploadItemsRef={addUploadItemsRef}
            itemUploadRef={itemUploadRef}
            itemUploadRefSD={itemUploadRefSD}
            itemUploadRefThumb={itemUploadRefThumb}
            setsuperCropLoadFade={setsuperCropLoadFade}
            length={selectedImage.length}
            filterImage={filterImage}
            setfilterImage={setfilterImage}
            setallowFilters={setallowFilters}
            cutOffLoader={cutOffLoader}
            setcutOffLoader={setcutOffLoader}
            addUploadItemsRefThumb={addUploadItemsRefThumb}
            addUploadItemsRefSD={addUploadItemsRefSD}
          />
        </Grid>
      </Grid>

      <Grid container style={{ padding: "0px" }}>
        <Grid
          item
          xs={12}
          style={{
            padding: "0px",
            marginTop: activatecropImage
              ? "0px"
              : matchMobile
              ? "2.5vh"
              : "1.5vh",
          }}
        >
          {activatecropImageReducer ? (
            <>
              <animated.div style={animationcropx}>
                <animated.div style={animation}>
                  {selectedImage.length > 0 ? (
                    <Masonry
                      columns={matchPc ? (selectedImage.length > 2 ? 3 : 2) : 2}
                      spacing={0}
                      style={{
                        overflowX: "hidden",
                        position: "relative",
                        zIndex: 2,
                        padding: "0px",
                      }}
                    >
                      {selectedImage.length !== 1
                        ? selectedImage.map((photo: any, index: any) => {
                            return (
                              <div key={index} style={{ padding: "0px" }}>
                                <PreviewCanvas
                                  image={photo}
                                  cropTOPLEVELScrollRef={cropTOPLEVELScrollRef}
                                  index={index}
                                  setcropimage={setcropimage}
                                  setcrop={setcrop}
                                  crop={crop}
                                  length={selectedImage.length}
                                  allowCropAllCanvas={allowCropAllCanvas}
                                  cutOffLoader={cutOffLoader}
                                  setwaitONLOAD={setwaitONLOAD}
                                  setsuperCropLoadFade={setsuperCropLoadFade}
                                  setcutOffLoader={setcutOffLoader}
                                />
                              </div>
                            );
                          })
                        : null}
                    </Masonry>
                  ) : null}
                </animated.div>{" "}
              </animated.div>
            </>
          ) : null}
        </Grid>
        <Grid
          className="bottomcanvas"
          item
          xs={12}
          style={{
            padding: "0px",
            height: "0px",
          }}
        ></Grid>
      </Grid>

      {ShowmaxPost ? (
        <Grid
          container
          style={{ height: "100%", position: "fixed", top: "0vh" }}
        >
          <Grid
            item
            xs={12}
            style={{
              padding: "0px",
              margin: "auto",
            }}
          >
            <span
              className={
                darkmodeReducer
                  ? "dialog-container tur"
                  : "dialog-container tur"
              }
              style={{
                height: "30px",
                width: "90px",
                borderRadius: "00px",
                backgroundColor: "#00ccff",
                margin: "auto",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  marginTop: "8px",
                }}
              >
                {" "}
                max 8
              </span>
            </span>
          </Grid>
        </Grid>
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

export const CropUploadMode = React.memo(CropUploadModex);
