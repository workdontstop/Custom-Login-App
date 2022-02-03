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
import { useSelector, useDispatch } from "react-redux";
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
}: any): JSX.Element {
  const [filterImage, setfilterImage] = useState<Array<any>>([]);

  const [ActivatefilterImage, setActivatefilterImage] =
    useState<boolean>(false);

  return (
    <>
      {ActivatefilterImage ? (
        <FilterMode filterImage={filterImage} />
      ) : (
        <CropUploadMode
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
        />
      )}
    </>
  );
}

export const UploadMenu = React.memo(UploadMenux);
