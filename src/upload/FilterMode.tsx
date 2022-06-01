import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { Grid, GridSize } from "@material-ui/core";
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
import { PreviewCanvasCropAll } from "./PreviewCanvasCropAll";
import { ImageTobeFiltered } from "./ImageTobeFiltered";
import { FilterModeArrow } from "./FilterModeArrow";
import { Superstickers } from "./Superstickers";
import { OptionsSlider } from "../profile/OptionsSlider";
import { convertHexToRGB } from "material-ui/utils/colorManipulator";
import { Caption } from "./Caption";
import date from "date-and-time";

Axios.defaults.withCredentials = true;

function FilterModex({
  filterImage,
  selectedImage,
  itemUploadRef,
  itemUploadRefSD,
  setActivatefilterImage,
  ActivatefilterImage,
  getSliderWidthNew,
  closeUploadModal,
  itemUploadRefThumb,
}: any): JSX.Element {
  var newitemUploadRef = useRef<any>(null);

  // Formatting the date and time
  // by using date.format() method
  /// const datevalue = date.format(now, "YYYY_MM_DD_HH_mm_ss");

  const { REACT_APP_SUPERSTARZ_URL } = process.env;

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

  const originalfilterImageRef = useRef<HTMLDivElement>(null);

  const [ShowHideNegativeValue, setShowHideNegativeValue] = useState("-");

  const [translate, setTranslate] = useState(0);
  const [stalestate] = useState(1);

  const [ActiveSlide, setActiveSlide] = useState(0);

  const [slideGo, setslideGo] = useState<boolean>(true);

  const [transitionFast, settransitionFast] = useState<boolean>(false);

  const [loadedimage, setloadedimage] = useState<boolean>(false);

  const [hideArrow, sethideArrow] = useState<boolean>(false);

  const getCropHeightRef2: any = useRef<HTMLDivElement>(null);

  const getCropHeightRef: any = useRef<HTMLDivElement>(null);

  const getCropHeightRefmobile: any = useRef<HTMLDivElement>(null);

  const getScreenWidthRef: any = useRef<HTMLDivElement>(null);

  const getCropHeightRefFull: any = useRef<HTMLDivElement>(null);

  const getImageWidth = useRef<any>([]);

  const [wideimage, setwideimage] = useState(false);

  const [wideimagepushMobile, setwideimagepushMobile] = useState(false);

  const [filterHeight, setfilterHeight] = useState(0);

  const [show, setshow] = useState(false);

  const [showhidefilter, setshowhidefilter] = useState(false);

  const [showFilter, setshowFilter] = useState(false);

  const [LoadboxWidth, setLoadboxWidth] = useState<any>(0);

  const [filterWidthForSlider, setfilterWidthForSlider] = useState(0);

  const [filterLimit, setfilterLimit] = useState(0);

  const imageFiltersRef = useRef<any>([]);

  const [startSuperSticker, setstartSuperSticker] = useState(false);

  const [startSuperStickerblur, setstartSuperStickerblur] = useState(false);

  const [superstickerIndex, setsuperstickerIndex] = useState(0);

  const [loaderArray, setloaderArray] = useState<any>([]);

  const [duplicateItemupload, setduplicateItemupload] = useState<any>([]);

  const [superUploadedImageName, setsuperUploadedImageName] = useState<any>([]);

  const [FilterSliderHeight, setFilterSliderHeight] = useState(0);
  const [FilterSliderWidth, setFilterSliderWidth] = useState(0);
  const [FilterSliderHeight2, setFilterSliderHeight2] = useState(0);
  const [FilterSliderContainerWidth, setFilterSliderContainerWidth] =
    useState(0);

  const [screenWidth, setscreenWidth] = useState(0);

  const [lastIndex, setlastIndex] = useState(0);

  const [filterThumbWidthFull, setfilterThumbWidthFull] = useState(0);

  const [matchTabletMobile, setmatchTabletMobile] = useState<boolean>(false);

  const [activeSticker, setactiveSticker] = useState<number>(100);

  const [superStickerActivated, setsuperStickerActivated] =
    useState<boolean>(true);

  const [effectMode, seteffectMode] = useState<any>([]);

  const [trapfilters, settrapfilters] = useState<boolean[]>([]);

  const [regimageholdfilter, setregimageholdfilter] = useState<any>([]);

  const [finalImageData, setfinalImageData] = useState<any>([]);

  const [callfilter, setcallfilter] = useState<boolean>(false);

  const [FilterUnderStickerStopFiltering, setFilterUnderStickerStopFiltering] =
    useState<boolean>(false);

  const [hdfilter, sethdfilter] = useState<boolean>(false);

  const [superzeroeffect, setsuperzeroeffect] = useState<boolean[]>([]);
  const [superzeroeffectonce, setsuperzeroeffectonce] = useState<boolean[]>([]);

  const [startTopicCap, setstartTopicCap] = useState(false);

  const [supeFilterLoadFade, setsupeFilterLoadFade] = useState<boolean>(false);

  ///
  ///
  ///
  /// GET GLOBAL INNER NAVIGATION VARIABLE
  const { activatefilterImage } = useSelector((state: RootStateOrAny) => ({
    ...state.GlobalNavuploadReducer,
  }));
  const activatefilterImageReducer = activatefilterImage;

  ///

  useEffect(() => {
    const effectModexx = [...effectMode];

    for (let i = 0; i < selectedImage.length; i++) {
      effectModexx[i] = "normal";
      if (selectedImage.length - 1 === i) {
        seteffectMode(effectModexx);
      }
    }

    const trapfiltersxx = [...trapfilters];

    for (let i = 0; i < selectedImage.length; i++) {
      trapfiltersxx[i] = false;
      if (selectedImage.length - 1 === i) {
        settrapfilters(trapfiltersxx);
      }
    }

    const superzeroeffectx = [...superzeroeffect];

    for (let i = 0; i < selectedImage.length; i++) {
      superzeroeffectx[i] = false;
      if (selectedImage.length - 1 === i) {
        setsuperzeroeffect(superzeroeffectx);
      }
    }

    const superzeroeffectoncex = [...superzeroeffectonce];

    for (let i = 0; i < selectedImage.length; i++) {
      superzeroeffectoncex[i] = false;
      if (selectedImage.length - 1 === i) {
        setsuperzeroeffectonce(superzeroeffectoncex);
      }
    }

    const finalImageDatax = [...finalImageData];

    for (let i = 0; i < selectedImage.length; i++) {
      finalImageDatax[i] = null;
      if (selectedImage.length - 1 === i) {
        setfinalImageData(finalImageDatax);
      }
    }
  }, [activatefilterImageReducer]);

  useEffect(() => {
    const regimageholdfilterxx = [...regimageholdfilter];
    for (let i = 0; i < selectedImage.length; i++) {
      regimageholdfilterxx[i] = itemUploadRef.current[i].src;
      if (selectedImage.length - 1 === i) {
        setregimageholdfilter(regimageholdfilterxx);
      }
    }
  }, [activatefilterImageReducer]);

  const addpostImageRef = (imageRef: any) => {
    if (imageRef && !getImageWidth.current.includes(imageRef)) {
      getImageWidth.current.push(imageRef);
    }
    ////console.log(postItemsRef.current[1]);
  };

  ///
  ///
  /// ACTIVATES SLIDER ITEM TO BE VIEWED ON CLICK
  const clickOptions = (i: number) => {
    //setTranslate(getImageWidth.current[0].clientWidth * i);
    //setActiveSlide(i);
  };

  ///
  ///
  ///
  ///CREATE OPTIONS SLIDER ANIMATION WITH  REACT SPRING
  const modalanimation = useSpring({
    config: {
      mass: 1,
      tension: 170,
      friction: 26,
    },
    transform: `translateX(${ShowHideNegativeValue}${translate}px)`,
    height: "auto",
    display: "flex",
    width: `auto`,
    padding: "0px",
    margin: "auto",
  });

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (matchTablet || matchMobile) {
      setmatchTabletMobile(true);
    }
    if (matchTablet || matchMobile) {
      var wi = getCropHeightRefmobile.current.clientWidth;
    } else {
      var wi = getCropHeightRef.current.clientWidth;
    }
    if (getCropHeightRef.current && getCropHeightRef.current.clientWidth) {
      setFilterSliderHeight(getCropHeightRef.current.clientHeight);
      setFilterSliderHeight2(getCropHeightRef2.current.clientHeight);
      setFilterSliderWidth(wi);
      setscreenWidth(getScreenWidthRef.current.clientWidth);
    }
  }, [wideimage]);

  ///
  ///
  ///
  ///
  useEffect(() => {
    var hiddenContentWidth = FilterSliderContainerWidth - screenWidth;
    var h = Math.ceil(hiddenContentWidth / filterWidthForSlider);

    setlastIndex(h);

    setLoadboxWidth(screenWidth / h);

    const newArrxq = [...loaderArray];
    for (
      var i: number = 0;
      i < Math.ceil(hiddenContentWidth / filterWidthForSlider);
      i++
    ) {
      //////////////////////////////
      newArrxq[i] = i;
      if (i === Math.ceil(hiddenContentWidth / filterWidthForSlider) - 1) {
        setloaderArray(newArrxq);
      }

      ///////////////////////////////
      ////
    }
  }, [
    FilterSliderContainerWidth,
    screenWidth,
    filterWidthForSlider,
    wideimage,
  ]);

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (getImageWidth.current[0] && show) {
      setFilterSliderContainerWidth(
        selectedImage.length * getImageWidth.current[0].clientWidth
      );

      if (
        screenWidth >
        selectedImage.length * getImageWidth.current[0].clientWidth
      ) {
        sethideArrow(true);
      }
    }
  }, [selectedImage, screenWidth, getImageWidth, show, wideimage]);
  ///

  //

  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animationxx = useSpring({
    config: {
      duration: 250,
    },
    opacity: startTopicCap ? 1 : 0,
  });

  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: startSuperSticker ? 1 : 0,
  });

  ///
  ///
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    setTimeout(function () {
      if (itemUploadRef.current[0] && activatefilterImageReducer) {
        if (matchTabletMobile) {
          var ccj = itemUploadRef.current[0].width * 0.3;
          if (
            itemUploadRef.current[0].width + ccj >
            itemUploadRef.current[0].height
          ) {
            setwideimagepushMobile(true);
          }
          setwideimage(true);
          setshow(true);
          setTimeout(function () {
            var heightimage = getImageWidth.current[0].clientHeight;
            var heightpage = getCropHeightRef.current.clientHeight;
            if (heightimage - 2 > heightpage) {
              setwideimage(false);
            }
          }, 150);
        } else {
          if (
            itemUploadRef.current[0].width > itemUploadRef.current[0].height
          ) {
            setwideimage(true);
            setshow(true);
          } else {
            setshow(true);
          }
        }
      }
    }, 150);
  }, [activatefilterImageReducer]);

  ///
  ///
  ///
  ///
  useEffect(() => {
    if (getImageWidth.current[0] && show) {
      setfilterHeight(getImageWidth.current[0].clientHeight);
      var v = getImageWidth.current[0].clientWidth;
      setfilterWidthForSlider(v);
      var vv = Math.ceil(screenWidth / v);
      setfilterLimit(vv);
    }
  }, [show, getImageWidth, screenWidth, wideimage]);
  ///

  ///

  const clickSlideprev = () => {
    if (translate === 0) {
      var hiddenContentWidth = FilterSliderContainerWidth - screenWidth;
      setTranslate((translate: any) => hiddenContentWidth);
      setActiveSlide((ActiveSlide: any) =>
        Math.ceil(hiddenContentWidth / filterWidthForSlider)
      );
    } else {
      var tt = ActiveSlide - 1;
      setTranslate((translate: any) => filterWidthForSlider * tt);
      setActiveSlide((ActiveSlide: any) => ActiveSlide - 1);
    }
  };

  const clickSlidenext = () => {
    if (slideGo) {
      var tt = ActiveSlide + 1;
      var hiddenContentWidth = FilterSliderContainerWidth - screenWidth;

      if (filterWidthForSlider * tt > hiddenContentWidth) {
        setTranslate((translate: any) => hiddenContentWidth);
        setActiveSlide((ActiveSlide: any) => ActiveSlide + 1);
        setslideGo(false);
      } else {
        setTranslate((translate: any) => filterWidthForSlider * tt);
        setActiveSlide((ActiveSlide: any) => ActiveSlide + 1);
      }
    } else {
      setTranslate((translate: any) => 0);
      setActiveSlide((ActiveSlide: any) => 0);
      setslideGo(true);
    }
  };

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

  ///
  ///
  ///
  /// CLICK BILLBOARD OPEN ON DOUBLE CLICK
  const superstickerz = (index: number) => {
    setsuperstickerIndex(index);
    const trapfiltersxx = [...trapfilters];
    trapfiltersxx[index] = false;
    settrapfilters(trapfiltersxx);

    setFilterUnderStickerStopFiltering(false);

    sethdfilter(true);

    setTimeout(function () {
      if (duplicateItemupload[index]) {
        const effectModexx = [...effectMode];
        effectModexx[index] = "normalx";
        seteffectMode(effectModexx);
      }
    }, 1500);

    setstartSuperSticker(true);

    setstartSuperStickerblur(true);
  };

  ///
  ///
  ///
  /// CLICK BILLBOARD OPEN ON DOUBLE CLICK
  const ClickiMAGEtOBEfILTERED = (e: any, index: number) => {
    switch (e.detail) {
      case 1:
        break;
      case 2:
        superstickerz(index);
        break;
      case 3:
        superstickerz(index);
        break;
      case 4:
        superstickerz(index);
        break;
    }
  };

  return (
    <>
      {supeFilterLoadFade ? (
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

      <Grid
        container
        style={{
          padding: "0px",
          position: "relative",
          margin: "0 auto",
          overflow: "hidden",
          left: "0px",
          height: "auto",
          paddingBottom: "0px",
          filter: startSuperStickerblur ? "blur(45px)" : "blur(0px)",
        }}
      >
        <Grid
          item
          xs={12}
          md={2}
          style={{
            padding: "0px",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            padding: matchTabletMobile ? "4px" : "0px",
            marginTop: matchMobile
              ? wideimagepushMobile
                ? "-0.8vh"
                : "-2.8vh"
              : wideimage
              ? "2.5vh"
              : "-0.5vh",
            height: `${FilterSliderHeight2}px`,
          }}
        >
          <OptionsSlider
            setstartTopicCap={setstartTopicCap}
            finalImageData={finalImageData}
            setfinalImageData={setfinalImageData}
            superzeroeffect={superzeroeffect}
            superstickerIndex={superstickerIndex}
            sethdfilter={sethdfilter}
            hdfilter={hdfilter}
            trapfilters={trapfilters}
            settrapfilters={settrapfilters}
            FilterUnderStickerStopFiltering={FilterUnderStickerStopFiltering}
            regimageholdfilter={regimageholdfilter}
            setregimageholdfilter={setregimageholdfilter}
            setcallfilter={setcallfilter}
            callfilter={callfilter}
            seteffectMode={seteffectMode}
            effectMode={effectMode}
            setactiveSticker={setactiveSticker}
            activeSticker={activeSticker}
            startSuperSticker={startSuperSticker}
            duplicateItemupload={duplicateItemupload}
            selectedImage={selectedImage}
            length={selectedImage.length}
            getImageWidth={getImageWidth}
            imageFiltersRef={imageFiltersRef}
            typeUpload={2}
            typeTop={false}
            getSliderWidthA={getSliderWidthNew}
            itemUploadRef={itemUploadRef}
            itemUploadRefThumb={itemUploadRefThumb}
            itemUploadRefSD={itemUploadRefSD}
            setsupeFilterLoadFade={setsupeFilterLoadFade}
          />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            height: matchMobile
              ? wideimagepushMobile
                ? "7.5vh"
                : "0.5vh"
              : wideimage
              ? "3vh"
              : screenWidth > FilterSliderContainerWidth
              ? "1.8vh"
              : "1vh",
          }}
        ></Grid>
      </Grid>
      {selectedImage ? (
        <>
          {hideArrow ? null : (
            <FilterModeArrow
              filterHeight={filterHeight}
              clickSlidenext={clickSlidenext}
              clickSlideprev={clickSlideprev}
            />
          )}

          <Grid
            container
            style={{
              zIndex: 1,
              padding: "0px",
              position: "relative",
              margin: "0 auto",
              overflow: "hidden",
              left: "0px",
              height: "auto",
              paddingBottom: "0px",
              filter: startSuperStickerblur ? "blur(45px)" : "blur(0px)",
            }}
          >
            <Grid container>
              {loaderArray.map((index: any) => {
                return (
                  <Grid
                    item
                    key={index}
                    style={{
                      height: "5px",
                      width: `${LoadboxWidth}px`,
                    }}
                  >
                    <div
                      className={darkmodeReducer ? "turlight" : "turdark"}
                      style={{
                        margin: "auto",
                        height: "5px",
                        width: matchMobile ? "9vw" : "2.5vw",
                        backgroundColor:
                          colortypeReducer === 0
                            ? darkmodeReducer
                              ? colorReducerdark
                              : colorReducer
                            : colorReducer,
                        opacity: 0.6,
                        borderTopRightRadius: "5px",
                        borderTopLeftRadius: "5px",
                        visibility:
                          ActiveSlide - 1 === index ? "visible" : "hidden",
                      }}
                    ></div>
                  </Grid>
                );
              })}
            </Grid>

            <animated.div style={modalanimation}>
              {selectedImage.map((imagee: any, index: any) => {
                return (
                  <div key={index} style={{ padding: "0px" }}>
                    <img
                      ref={addpostImageRef}
                      onClick={(e: any) => {
                        ClickiMAGEtOBEfILTERED(e, index);
                      }}
                      src={
                        itemUploadRefThumb.current[index]
                          ? itemUploadRefThumb.current[index].src
                          : null
                      }
                      style={{
                        width: matchTabletMobile
                          ? wideimage
                            ? `${FilterSliderWidth}px`
                            : "auto"
                          : wideimage
                          ? `${FilterSliderWidth}px`
                          : "auto",
                        height: matchTabletMobile
                          ? wideimage
                            ? "auto"
                            : `${FilterSliderHeight}px`
                          : wideimage
                          ? "auto"
                          : `${FilterSliderHeight}px`,

                        position: "relative",
                        margin: "auto",
                        padding: "0px",
                        borderTopLeftRadius:
                          screenWidth > FilterSliderContainerWidth
                            ? index === 0
                              ? "0px"
                              : "0px"
                            : "0px",
                        borderTopRightRadius:
                          screenWidth > FilterSliderContainerWidth
                            ? index === selectedImage.length - 1
                              ? "0px"
                              : "0px"
                            : "0px",
                        borderBottomLeftRadius:
                          screenWidth > FilterSliderContainerWidth
                            ? index === 0 && wideimage
                              ? "0px"
                              : "0px"
                            : "0px",
                        borderBottomRightRadius:
                          screenWidth > FilterSliderContainerWidth
                            ? index === selectedImage.length - 1 && wideimage
                              ? "0px"
                              : "0px"
                            : "0px",
                      }}
                    />
                  </div>
                );
              })}{" "}
            </animated.div>
          </Grid>
        </>
      ) : null}

      {startSuperSticker ? (
        <>
          {" "}
          <animated.div
            style={{
              ...animation,
              zIndex: 5,
              position: "relative",
            }}
          >
            <Grid
              className={
                darkmodeReducer
                  ? "dontallowhighlighting"
                  : "dontallowhighlighting  "
              }
              container
              style={{
                width: "100%",
                height: "100%",
                position: "fixed",
                top: "0vh",
                zIndex: 11,
              }}
            >
              <Superstickers
                superzeroeffect={superzeroeffect}
                setsuperzeroeffect={setsuperzeroeffect}
                superzeroeffectonce={superzeroeffectonce}
                setsuperzeroeffectonce={setsuperzeroeffectonce}
                FilterUnderStickerStopFiltering={
                  FilterUnderStickerStopFiltering
                }
                setFilterUnderStickerStopFiltering={
                  setFilterUnderStickerStopFiltering
                }
                callfilter={callfilter}
                setcallfilter={setcallfilter}
                regimageholdfilter={regimageholdfilter}
                seteffectMode={seteffectMode}
                effectMode={effectMode}
                setactiveSticker={setactiveSticker}
                duplicateItemupload={duplicateItemupload}
                setduplicateItemupload={setduplicateItemupload}
                setsuperStickerActivated={setsuperStickerActivated}
                setstartSuperStickerblur={setstartSuperStickerblur}
                setstartSuperSticker={setstartSuperSticker}
                index={superstickerIndex}
                itemUploadRef={itemUploadRef}
                startSuperSticker={startSuperSticker}
              />
            </Grid>{" "}
          </animated.div>
        </>
      ) : null}

      {startTopicCap ? (
        <>
          {" "}
          <animated.div
            style={{
              ...animationxx,
              zIndex: 5,
              position: "relative",
            }}
          >
            <Grid
              className={
                darkmodeReducer
                  ? "dontallowhighlighting"
                  : "dontallowhighlighting  "
              }
              container
              style={{
                width: "100%",
                height: "100%",
                position: "fixed",
                top: "0vh",
                zIndex: 11,
              }}
            >
              <Caption
                closeUploadModal={closeUploadModal}
                finalImageData={finalImageData}
                selectedImage={selectedImage}
                setstartTopicCap={setstartTopicCap}
              />
            </Grid>{" "}
          </animated.div>
        </>
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
            ref={getScreenWidthRef}
            xs={12}
            style={{ padding: "0px", width: "100%" }}
          ></Grid>
          <Grid
            item
            ref={getCropHeightRef}
            xs={5}
            style={{ padding: "0px", height: matchMobile ? "72%" : "78%" }}
          ></Grid>

          <Grid
            item
            ref={getCropHeightRefmobile}
            xs={11}
            style={{ padding: "0px", height: "78%" }}
          ></Grid>

          <Grid
            item
            ref={getCropHeightRef2}
            xs={5}
            style={{ padding: "0px", height: matchMobile ? "23%" : "22%" }}
          ></Grid>
        </Grid>
      </Grid>
    </>
  );
}

export const FilterMode = React.memo(FilterModex);
