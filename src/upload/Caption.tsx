import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { matchPc, matchTablet, matchMobile } from "../DetectDevice";
import { TextField } from "@material-ui/core";
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
import { OptionsSlider } from "../profile/OptionsSlider";
import { convertHexToRGB } from "material-ui/utils/colorManipulator";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import UndoIcon from "@mui/icons-material/Undo";
import LayersIcon from "@mui/icons-material/Layers";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import LightModeIcon from "@mui/icons-material/LightMode";
import TextFormatIcon from "@mui/icons-material/TextFormat";
import HighlightIcon from "@mui/icons-material/Highlight";
import Slider from "@material-ui/core/Slider";
import { HexColorPicker } from "react-colorful";
import ColorizeIcon from "@mui/icons-material/Colorize";
import EditIcon from "@mui/icons-material/Edit";
import PhotoSizeSelectLargeIcon from "@mui/icons-material/PhotoSizeSelectLarge";
import CropRotateIcon from "@mui/icons-material/CropRotate";
import CloseIcon from "@mui/icons-material/Close";
import RestoreIcon from "@mui/icons-material/Restore";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import date from "date-and-time";
import { UpdateNavFilterReducer } from "../GlobalActions";
import { UpdateNavCropReducer } from "../GlobalActions";

function Captionx({
  closeUploadModal,
  setstartTopicCap,
  selectedImage,
  finalImageData,
}: any): JSX.Element {
  const [matchTabletMobile, setmatchTabletMobile] = useState<boolean>(false);

  const [supeFilterLoadFadex, setsupeFilterLoadFadex] =
    useState<boolean>(false);

  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  const Value = {
    caption: "",
    topic: "",
  };

  const [captionvalues, setcaptionvalues] = useState(Value);

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

  var pcfont = 2.9;

  var mobilefont = 4.8;

  //
  ///
  ///GET OPTIONS SLIDER IMAGE WIDTH FROM MATERIAL UI GRID
  useEffect(() => {
    if (matchMobile || matchTablet) {
      setmatchTabletMobile(true);
    }
  }, []);

  ///
  ///
  /// SANITISE LOG IN FORM INPUT CLIENT SIDE
  const updatecaptiontop = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setcaptionvalues({ ...captionvalues, [name]: value });
    },
    [captionvalues]
  );

  var transform = "";
  var font1 = "";
  var font2 = "";
  var paddingbutU = "";

  var width = " ";
  var sizex: "small" | "medium" | undefined = undefined;
  ///
  ///
  ///
  if (matchPc) {
    sizex = "medium";
    width = "20%";
    transform = "scale(1)";
    font1 = "2.7vh";
    font2 = "2.1vh";
    paddingbutU = "70px";
  } else if (matchTablet) {
    sizex = "small";
    width = "62%";
    transform = "scale(1)";
    font1 = "2.6vh";
    font2 = "2vh";
    paddingbutU = "100px";
  } else {
    sizex = "small";
    width = "100%";
    transform = "scale(0.94)";
    font1 = "";
    font2 = "";
    paddingbutU = "80px";
  }

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

  const dispatch = useDispatch();

  const UploadSuperData = useCallback(
    (a: any) => {
      setsupeFilterLoadFadex(true);
      // Creating object of current date and time
      // by using Date()
      const now = new Date();

      // Formatting the date and time
      // by using date.format() method
      const datevalue = date.format(now, "YYYY_MM_DD_HH_mm_ss");
      let formData = new FormData();
      const datev = new Date();

      formData.append("id", `${idReducer}`);
      formData.append("topic", captionvalues.topic);
      formData.append("caption", captionvalues.caption);

      for (let i = 0; i < selectedImage.length; i++) {
        formData.append("final", a[i], `blob${i}${datevalue}`);
      }

      Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          if (response.data.message === "images uploaded") {
            setsupeFilterLoadFadex(false);
            closeUploadModal(2);
          }
        })
        .catch(function (error) {
          alert("caption error");
        });
    },
    [finalImageData, captionvalues, closeUploadModal, idReducer]
  );

  return (
    <>
      {supeFilterLoadFadex ? (
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
        className={
          darkmodeReducer ? "modal-containerDark" : "modal-containerLight"
        }
        style={{
          padding: "0px",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Grid
          item
          xs={12}
          style={{
            padding: "0px",
          }}
        ></Grid>
        <TextField
          size={sizex}
          inputProps={{ style: { fontSize: font1 } }}
          InputLabelProps={{ style: { fontSize: font2 } }}
          onChange={updatecaptiontop}
          value={captionvalues.topic}
          style={{
            transform: transform,
            width: width,
            paddingBottom: "0px",
            position: "fixed",
            top: "25vh",
            left: "20vw",
            zIndex: 26,
          }}
          label="Topic"
          type="text"
          name="topic"
          variant="standard"
        />{" "}
        <TextField
          size={sizex}
          inputProps={{ style: { fontSize: font1 } }}
          InputLabelProps={{ style: { fontSize: font2 } }}
          onChange={updatecaptiontop}
          value={captionvalues.caption}
          style={{
            transform: transform,
            width: "60%",
            paddingBottom: "0px",
            position: "fixed",
            top: "45vh",
            left: "20vw",
            zIndex: 26,
          }}
          label="Share Your Thoughts"
          type="text"
          name="caption"
          variant="standard"
        />{" "}
        <Grid
          item
          xs={4}
          style={{
            margin: "auto",
            textAlign: "center",
            height: "0px",
          }}
        >
          <CheckIcon
            onClick={() => {
              ////postdata();
              UploadSuperData(finalImageData);
            }}
            className={
              darkmodeReducer
                ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
            }
            style={{
              color: "#ffffff",
              fontSize: matchTabletMobile ? `${mobilefont}vh` : `${pcfont}vw`,
              marginRight: "5vw",
            }}
          />
          <CloseIcon
            onClick={() => {
              setstartTopicCap(false);
            }}
            className={
              darkmodeReducer
                ? "make-small-icons-clickable-lightCrop dontallowhighlighting zuperkingIcon "
                : "make-small-icons-clickable-darkCrop dontallowhighlighting zuperkingIcon  "
            }
            style={{
              margin: "auto",
              color: "#ffffff",
              fontSize: matchTabletMobile ? `${mobilefont}vh` : `${pcfont}vw`,
              marginLeft: "5vw",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export const Caption = React.memo(Captionx);
