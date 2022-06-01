import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { matchPc, matchTablet } from "../DetectDevice";
import { Grid } from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
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
import { PreviewCanvas } from "./PreviewCanvas";
import { CropUploadMode } from "./CropUploadMode";
import { FilterMode } from "./FilterMode";
import { UpdateNavCropReducer } from "../GlobalActions";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";

function UploadMenux({
  optionsShow,
  optinstopshowingReducer,
  typeTop,
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
  cropTOPLEVELScrollRef,
  refWithimageData,
  CropSaved,
  setCropSaved,
  setallowOverflow,
  allowOverflow,
  closeUploadModal,
  cropscrollRef,
  setShowModalUpload,
  setStopBodyScroll,
}: any): JSX.Element {
  const [filterImage, setfilterImage] = useState<Array<any>>([]);

  const itemUploadRefSD = useRef<any>([]);
  const itemUploadRefThumb = useRef<any>([]);

  const dispatch = useDispatch();

  const itemUploadRef = useRef<any>([]);

  const [ActivatefilterImage, setActivatefilterImage] =
    useState<boolean>(false);

  ///
  ///
  ///
  /// GET GLOBAL INNER NAVIGATION VARIABLE
  const { activatefilterImage, activatecropImage } = useSelector(
    (state: RootStateOrAny) => ({
      ...state.GlobalNavuploadReducer,
    })
  );

  const activatefilterImageReducer = activatefilterImage;
  const activatecropImageReducer = activatecropImage;

  const [selectedImage, setselectedImage] = useState<Array<any>>([]);

  //
  //
  //
  //USE SLIDE DOWN ANIMATION FROM REACT SPRING
  const animation = useSpring({
    config: {
      duration: 600,
    },
    opacity: activatefilterImageReducer ? 1 : 0,
  });

  useEffect(() => {
    dispatch(UpdateNavCropReducer(false));
  }, []);

  useEffect(() => {
    if (activatefilterImageReducer) {
      setallowOverflow(false);
    } else {
      setallowOverflow(true);
    }
  }, [activatefilterImageReducer]);
  ///

  return (
    <>
      <animated.div
        style={{
          ...animation,
          position: activatefilterImageReducer ? "relative" : "fixed",
          top: activatefilterImageReducer ? "" : "-2000vh",
          zIndex: activatefilterImageReducer ? 10 : 1,
          padding: "0px",
        }}
      >
        <FilterMode
          closeUploadModal={closeUploadModal}
          itemUploadRefThumb={itemUploadRefThumb}
          itemUploadRefSD={itemUploadRefSD}
          itemUploadRef={itemUploadRef}
          filterImage={filterImage}
          selectedImage={selectedImage}
          ActivatefilterImage={ActivatefilterImage}
          setActivatefilterImage={setActivatefilterImage}
          getSliderWidthNew={getSliderWidthNew}
        />
      </animated.div>

      <div
        style={{
          position: activatefilterImageReducer ? "fixed" : "relative",
          top: activatefilterImageReducer ? "-2000vh" : "",
          zIndex: activatefilterImageReducer ? 1 : 10,
          padding: "0px",
        }}
      >
        <CropUploadMode
          itemUploadRefThumb={itemUploadRefThumb}
          itemUploadRefSD={itemUploadRefSD}
          allowOverflow={allowOverflow}
          setallowOverflow={setallowOverflow}
          cropscrollRef={cropscrollRef}
          closeUploadModalx={closeUploadModal}
          itemUploadRef={itemUploadRef}
          CropSaved={CropSaved}
          ActiveSlide={ActiveSlide}
          handleTouchStartOptions={handleTouchStartOptions}
          handleTouchMoveOptions={handleTouchMoveOptions}
          optionsCollectImageRef={optionsCollectImageRef}
          modalanimation={modalanimation}
          getSliderWidthNew={getSliderWidthNew}
          optionsClickType={optionsClickType}
          clickOptions={clickOptions}
          optionsImages={optionsImages}
          optionsNameData={optionsNameData}
          cropTOPLEVELScrollRef={cropTOPLEVELScrollRef}
          refWithimageData={refWithimageData}
          filterImage={filterImage}
          setfilterImage={setfilterImage}
          setActivatefilterImage={setActivatefilterImage}
          selectedImage={selectedImage}
          setselectedImage={setselectedImage}
        />
      </div>
    </>
  );
}

export const UploadMenu = React.memo(UploadMenux);
