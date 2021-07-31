import React, { useRef, useEffect, useState, useCallback } from "react";

import { useSpring, animated } from "react-spring";

import {
  IconButton,
  DialogContent,
  Button,
  useTheme,
  Paper,
  useMediaQuery,
  Grid,
  Typography,
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";

import { ImodalLog, IGrid } from "./appFolder-Interfaces";
import "./ModalLog.css";
import Axios from "axios";

import { useHistory } from "react-router-dom";

import image1 from "./images/modalpic1.jpg";
import image2 from "./images/modalpic2.jpg";
import image3 from "./images/modalpic3.png";
import image4 from "./images/modalpic4.jpg";
import image5 from "./images/modalpic5.jpg";
import image6 from "./images/modalpic6.jpg";
import { TextFieldLogin } from "./TextFieldLogin";
import { TextFieldSignup } from "./TextFieldSignup";
import SuperstarzIconLight from "./../images/ssmall.png";
import SuperstarzIconDark from "./../images/sdsmall.png";
import ServerError from "./ServerError";
import ModalFormSignupError from "./ModalFormSignupError";
import ModalFormLoginError from "./ModalFormLoginError";

import { Scrollbars } from "react-custom-scrollbars";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
require("dotenv").config();

Axios.defaults.withCredentials = true;

function ModalLogx({
  mobileZoom,
  setMobileZoom,
  zoomedModal,
  setZoomedModal,
  screenHeight,
  formtype,
  CloseModalForm,
  showModalForm,
  PaperStyle,
  signupstyle,
  loginstyle,
  darkmode,
}: ImodalLog): JSX.Element {
  var usetheme = useTheme();
  var matchPc = useMediaQuery(usetheme.breakpoints.up("md"));
  var matchTablet = useMediaQuery(usetheme.breakpoints.up("sm"));

  ///
  ///
  ///
  ///CREATE A SLIDE UP ANIMATION WITH  REACT SPRING
  const modalanimation = useSpring({
    config: {
      duration: 400,
    },
    opacity: showModalForm ? 1 : 0.9,
    transform: showModalForm ? `translateY(0%)` : `translateY(100%)`,
  });

  const modalanimationTwo = useSpring({
    config: {
      duration: 350,
    },
    opacity: showModalForm ? 1 : 0.9,
    transform: showModalForm ? `translateY(0%)` : `translateY(100%)`,
  });

  ///
  ///
  ///
  ///CREATE A SLIDE UP ANIMATION WITH  REACT SPRING
  const mobileLogmodalanimation: any = useSpring({
    config: {
      duration: 115,
    },
    opacity: mobileZoom ? 1 : 0.98,
    position: mobileZoom ? `static` : `fixed`,
    top: "27vh",
    zindex: 100,
    transform: mobileZoom ? `translateY(0%)` : `translateY(-10%)`,
  });

  ///
  ///
  ///HISTORY VARIABLE
  const history = useHistory();
  ///
  ///
  const { REACT_APP_SUPERSTARZ_URL } = process.env;

  ///
  ///
  ///LOGGING UPDATE VALUES DETAILS
  const initialLogValue = {
    inputedUsername: "",
    inputedPassword: "",
  };
  const initialCleanLogValue = {
    inputedUsername: "",
    inputedPassword: "",
  };
  const initialErrorLogValue = {
    inputedUsername: 0,
    inputedPassword: 0,
  };

  const [rawLoginValues, setRawLoginValues] = useState(initialLogValue);
  const [cleanLoginValues, setCleanLoginValues] =
    useState(initialCleanLogValue);
  const [errorsLoginValues, setErrorsLoginValues] =
    useState(initialErrorLogValue);

  const [loginShowPassword, setLoginShowPassword] = useState<boolean>(false);
  const loginShowPasswordTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  ///
  ///
  ///
  /// SANITISE LOG IN FORM INPUT CLIENT SIDE
  const updateLoginvalues = (e: any) => {
    const { name, value } = e.target;

    setErrorsLoginValues({ ...errorsLoginValues, [name]: 0 });
    setRawLoginValues({ ...rawLoginValues, [name]: value });
    setCleanLoginValues({ ...cleanLoginValues, [name]: value });
  };

  ///
  ///
  ///
  /// SENDING LOGIN  DATA TO SERVER SIDE
  const [serverErrorData, setServerErrorData] = useState<string | null>(null);
  const [serverErrorDisplay, setServerErrorDisplay] = useState<number>(0);
  const [serverEmojiplain, setserverEmojiplain] = useState<boolean>(true);

  const logmein = () => {
    if (cleanLoginValues.inputedUsername && cleanLoginValues.inputedPassword) {
      Axios.post(
        `http://${REACT_APP_SUPERSTARZ_URL}/loging`,
        {
          values: cleanLoginValues,
        },
        { withCredentials: true }
      )
        .then((response) => {
          if (response.data.message === "Wrong Password") {
            setServerErrorData("Wrong username and  password combination");
            setServerErrorDisplay(1);
            setserverEmojiplain(false);
          } else {
            if (response.data.message === "Wrong username") {
              setServerErrorData("Username does not exist");
              setServerErrorDisplay(1);
              setserverEmojiplain(false);
            } else if (response.data.payload) {
              history.push({
                pathname: "/supercheck",
                state: { userdata: response.data.payload },
              });
            } else {
              setServerErrorData("User info could not be retrieved");
              setServerErrorDisplay(1);
              setserverEmojiplain(false);
            }
          }
        })
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            //express typo can activate this
            // Request made and server responded
            //express typo can activate this
            //let textFieldParam = error.response.data.error.errors[0].param;
            let affectedTextField = "Wrong password and username combination";

            let dynamicError = `${affectedTextField}  `;
            setServerErrorData(dynamicError);
            setServerErrorDisplay(1);
            setserverEmojiplain(false);
          } else if (error.request) {
            // The request was made but no response was received Or request not made
            // Axios.post("http://localhost:3003/reg" can activate this error
            setServerErrorData(
              "Error connecting to server, Check your connection"
            );
            setServerErrorDisplay(1);
            setserverEmojiplain(true);
          } else {
            // Something happened in setting up the request that triggered an Error
            setServerErrorData("Request setup failed , Pls try again");
            setServerErrorDisplay(1);
            setserverEmojiplain(true);
          }
        });
    } else {
      let passwordErrorHolder = errorsLoginValues.inputedPassword;

      let usernameErrorHolder = errorsLoginValues.inputedUsername;

      if (!cleanLoginValues.inputedPassword) {
        passwordErrorHolder = 1;
      }

      if (!cleanLoginValues.inputedUsername) {
        usernameErrorHolder = 1;
      }

      setErrorsLoginValues({
        ...errorsLoginValues,
        inputedPassword: passwordErrorHolder,
        inputedUsername: usernameErrorHolder,
      });
    }
  };

  ///
  ///
  ///UPDATE SIGN UP DETAILS
  ///
  ///
  ///
  /// SANITISE SIGN UP FORM INPUT CLIENT
  const initialRawSignValue = {
    inputedEmail: "",
    inputedUsername: "",
    inputedPassword: "",
  };
  const initialCleanSignValue = {
    inputedEmail: "",
    inputedUsername: "",
    inputedPassword: "",
  };

  const initialErrorSignValue = {
    inputedEmail: 0,
    inputedUsername: 0,
    inputedPassword: 0,
  };

  const [rawSignupValues, setRawSignupValues] = useState(initialRawSignValue);
  const [cleanSignupValues, setCleanSignupValues] = useState(
    initialCleanSignValue
  );
  const [errorsSignupValues, setErrorsSignupValues] = useState(
    initialErrorSignValue
  );

  const EmailCheckingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const UsernameCheckingTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  interface Ispinnerinterface {
    inputedUsername: boolean;
    inputedPassword: boolean;
    inputedEmail: boolean;
  }

  const initialspinner: Ispinnerinterface = {
    inputedUsername: false,
    inputedPassword: false,
    inputedEmail: false,
  };

  const [errorFormChecking, setErrorFormChecking] = useState(initialspinner);
  const PasswordCheckingTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [signupShowPassword, setSignupShowPassword] = useState<boolean>(false);
  const [cantPassBadEmail, setCantPassBadEmail] = useState<boolean>(false);

  const updateSignvalues = (e: any) => {
    const { name, value } = e.target;

    if (name === "inputedUsername") {
      let usernameCleaner = /[^a-z0-9áéíóúñü\._]/gim;
      let cleanValue = value.replace(usernameCleaner, "");

      let usernameLimiter = /^.{26}$/;
      let finalUsername = cleanValue.replace(usernameLimiter, "");

      let checkUsernameClean = usernameCleaner.test(value);
      let checkUsernameLimited = usernameLimiter.test(cleanValue);

      if (checkUsernameClean) {
        if (UsernameCheckingTimer.current) {
          clearTimeout(UsernameCheckingTimer.current);
          setErrorFormChecking({ ...errorFormChecking, [name]: false });
        }
        setErrorsSignupValues({ ...errorsSignupValues, [name]: 1 });
      } else {
        setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
      }

      let userNameLength = finalUsername.length;

      if (checkUsernameClean) {
      } else {
        if (checkUsernameLimited || userNameLength > 26) {
        } else {
          setRawSignupValues({
            ...rawSignupValues,
            [name]: finalUsername,
          });
          setCleanSignupValues({
            ...cleanSignupValues,
            [name]: finalUsername,
          });
          /// AXIOS REQUEST FOR CHECK USERNAME
          if (UsernameCheckingTimer.current) {
            clearTimeout(UsernameCheckingTimer.current);
            setErrorFormChecking({
              ...errorFormChecking,
              [name]: false,
            });
            setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
          }
          setErrorFormChecking({ ...errorFormChecking, [name]: true });
          setErrorsSignupValues({ ...errorsSignupValues, [name]: 2 });
          UsernameCheckingTimer.current = setTimeout(() => {
            if (value.length === 0) {
              setErrorsSignupValues({
                ...errorsSignupValues,
                [name]: 0,
              });
              setErrorFormChecking({
                ...errorFormChecking,
                [name]: false,
              });
            } else {
              Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/usernamecheck`, {
                value: finalUsername,
              })
                .then((response) => {
                  if (response.data.message === "username is not unique") {
                    setErrorsSignupValues({
                      ...errorsSignupValues,
                      [name]: 2,
                    });
                    setErrorFormChecking({
                      ...errorFormChecking,
                      [name]: false,
                    });
                  } else if (
                    response.data.message === "username is available"
                  ) {
                    setErrorsSignupValues({
                      ...errorsSignupValues,
                      [name]: 3,
                    });
                    setErrorFormChecking({
                      ...errorFormChecking,
                      [name]: false,
                    });
                  } else {
                    setErrorsSignupValues({
                      ...errorsSignupValues,
                      [name]: 0,
                    });
                    setErrorFormChecking({
                      ...errorFormChecking,
                      [name]: false,
                    });
                  }
                })
                .catch(function (error) {
                  if (error.response) {
                    setErrorsSignupValues({
                      ...errorsSignupValues,
                      [name]: 0,
                    });
                    setErrorFormChecking({
                      ...errorFormChecking,
                      [name]: false,
                    });
                  } else if (error.request) {
                    setErrorsSignupValues({
                      ...errorsSignupValues,
                      [name]: 0,
                    });
                    setErrorFormChecking({
                      ...errorFormChecking,
                      [name]: false,
                    });
                  } else {
                    setErrorsSignupValues({
                      ...errorsSignupValues,
                      [name]: 0,
                    });
                    setErrorFormChecking({
                      ...errorFormChecking,
                      [name]: false,
                    });
                  }
                });
            }
          }, 3000);
          /// AXIOS REQUEST FOR CHECK USERNAME
        }
      }
      ///
    } else if (name === "inputedEmail") {
      const emailValidation =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const emailCleaner = /[^*$%#+@a-z0-9áéíóúñü \.'_]/gim;
      let finalEmail = value.replace(emailCleaner, "");

      let checkEmailClean = emailCleaner.test(value);
      let checkEmailValidated = emailValidation.test(
        String(value).toLowerCase()
      );
      if (EmailCheckingTimer.current) {
        clearTimeout(EmailCheckingTimer.current);
        setErrorFormChecking({ ...errorFormChecking, [name]: false });
      }
      if (!checkEmailValidated) {
        setErrorsSignupValues({ ...errorsSignupValues, [name]: 1 });
        setErrorFormChecking({ ...errorFormChecking, [name]: true });
        EmailCheckingTimer.current = setTimeout(() => {
          setErrorFormChecking({ ...errorFormChecking, [name]: false });
          setErrorsSignupValues({ ...errorsSignupValues, [name]: 2 });
          checkEmailClean &&
            setErrorsSignupValues({ ...errorsSignupValues, [name]: 3 });
        }, 2000);
      } else {
        if (EmailCheckingTimer.current) {
          clearTimeout(EmailCheckingTimer.current);
          setErrorFormChecking({ ...errorFormChecking, [name]: false });
        }
        checkEmailClean
          ? setErrorsSignupValues({ ...errorsSignupValues, [name]: 3 })
          : setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
      }

      setRawSignupValues({ ...rawSignupValues, [name]: finalEmail });
      setCleanSignupValues({ ...cleanSignupValues, [name]: finalEmail });
      ////////
    } else {
      if (PasswordCheckingTimer.current) {
        clearTimeout(PasswordCheckingTimer.current);
        setErrorFormChecking({ ...errorFormChecking, [name]: false });
      }
      setErrorsSignupValues({ ...errorsSignupValues, [name]: 2 });

      setErrorFormChecking({ ...errorFormChecking, [name]: true });
      PasswordCheckingTimer.current = setTimeout(() => {
        setErrorFormChecking({ ...errorFormChecking, [name]: false });
        setErrorsSignupValues({ ...errorsSignupValues, [name]: 1 });
      }, 2000);

      var passwordLength = value.length;

      if (passwordLength >= 8 || passwordLength === 0) {
        if (PasswordCheckingTimer.current) {
          clearTimeout(PasswordCheckingTimer.current);
          setErrorFormChecking({ ...errorFormChecking, [name]: false });
        }
        setErrorsSignupValues({ ...errorsSignupValues, [name]: 0 });
      }
      setRawSignupValues({ ...rawSignupValues, [name]: value });
      setCleanSignupValues({ ...cleanSignupValues, [name]: value });
    }
  };

  ///
  ///
  ///
  /// SENDING SIGN UP  DATA TO SERVER SIDE
  const signmeup = () => {
    if (
      cleanSignupValues.inputedEmail &&
      cleanSignupValues.inputedUsername &&
      cleanSignupValues.inputedPassword &&
      errorsSignupValues.inputedPassword === 0
    ) {
      if (errorsSignupValues.inputedEmail === 0) {
        Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/registration`, {
          values: cleanSignupValues,
        })
          .then((response) => {
            if (response.data.message === "username not unique") {
              setServerErrorData("Username is taken");
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
            } else if (response.data.message === "Registration Successful") {
              console.log(response.status);
              alert("REGISTRATION COMPLETE");
            } else {
              setServerErrorData("Something went wrong");
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
            }
          })
          .catch(function (error) {
            if (error.response) {
              // Request made and server responded
              //express typo can activate this
              let textFieldParam = error.response.data.error.errors[0].param;
              let affectedTextField = " ";

              if (textFieldParam === "values.inputedPassword") {
                affectedTextField = "Password must be at Least 8 characters";
              } else if (textFieldParam === "values.inputedEmail") {
                affectedTextField = "Email address is not valid";
              } else {
                affectedTextField =
                  "Usernames use letters, numbers, underscores and periods";
              }
              let dynamicError = `${affectedTextField}.  ${error.response.data.error.errors[0].msg} `;
              setServerErrorData(dynamicError);
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
            } else if (error.request) {
              // The request was made but no response was received Or request not made
              // Axios.post("http://localhost:3003/reg" can activate this error
              setServerErrorData(
                "Error connecting to server, Check your connection"
              );
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
            } else {
              // Something happened in setting up the request that triggered an Error
              setServerErrorData("Request setup failed , Pls try again");
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
            }
          });
      } else {
        setCantPassBadEmail(true);
        setTimeout(() => {
          setCantPassBadEmail(false);
        }, 3000);
      }
    } else {
      let passwordErrorHolder = errorsSignupValues.inputedPassword;
      let emailErrorHolder = errorsSignupValues.inputedEmail;
      let usernameErrorHolder = errorsSignupValues.inputedUsername;

      if (!cleanSignupValues.inputedPassword) {
        passwordErrorHolder = 4;
      }
      if (!cleanSignupValues.inputedEmail) {
        emailErrorHolder = 4;
      }
      if (!cleanSignupValues.inputedUsername) {
        usernameErrorHolder = 4;
      }

      setErrorsSignupValues({
        ...errorsSignupValues,
        inputedPassword: passwordErrorHolder,
        inputedEmail: emailErrorHolder,
        inputedUsername: usernameErrorHolder,
      });
    }
  };

  ///
  ///
  ///
  ///
  ///
  /// UPDATE SIGN UP DETAILS

  ///
  ///
  ///
  /// SHOW A FULLSCREEN MODAL VIEW
  const zoomlogmodal = () => {
    setZoomedModal(!zoomedModal);
  };

  ///
  ///
  ///
  /// SHOW  LOGIN PASSWORD FOR A WHILE
  const ShowLoginPasswordForaWhile = useCallback(() => {
    if (loginShowPasswordTimer.current) {
      clearTimeout(loginShowPasswordTimer.current);
    }
    setLoginShowPassword(!loginShowPassword);
    loginShowPasswordTimer.current = setTimeout(() => {
      setLoginShowPassword(false);
    }, 1500);
  }, [setLoginShowPassword]);

  ///
  ///
  ///
  /// SHOW  SIGNUP PASSWORD FOR A WHILE

  const signupShowPasswordTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const ShowSignupPasswordForaWhile = useCallback(() => {
    if (signupShowPasswordTimer.current) {
      clearTimeout(signupShowPasswordTimer.current);
    }
    setSignupShowPassword(!signupShowPassword);
    signupShowPasswordTimer.current = setTimeout(() => {
      setSignupShowPassword(false);
    }, 1500);
  }, [setSignupShowPassword]);

  ///
  ///
  ///
  /// LOGOUT

  ///
  ///
  ///
  /// USEREF TARGETS A DIV(BACKGROUND) AND CLOSES MODAL ON CLICK
  const ModalBackgroundRef = useRef<HTMLInputElement>(null);
  const onBackgroundFocus = (e: any): void => {
    if (ModalBackgroundRef.current === e.target) {
      CloseModalForm(0);
    }
  };

  ///
  ///
  ///
  /// ESCAPE KEY CLOSE MODAL
  const escapePress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModalForm) {
        CloseModalForm(0);
      }
    },
    [showModalForm, CloseModalForm]
  );
  useEffect(() => {
    document.addEventListener("keydown", escapePress);
    return () => document.removeEventListener("keydown", escapePress);
  }, [escapePress]);

  ///
  ///
  ///
  ///CLOSE MODAL FORM ON SMALL ICON PRESS
  const iconclicked = () => {
    CloseModalForm(0);
  };

  ///
  ///
  ///
  /// RANDOMISE IMAGE
  const [showimage, setShowimage] = useState<string>(" ");
  useEffect(() => {
    let imagecontrol: number[] = [1, 2, 3, 4, 5, 6];
    var result = null;
    var randomimage =
      imagecontrol[Math.floor(Math.random() * imagecontrol.length)];
    const img = new Image(); ///new image instance
    if (randomimage === 1) {
      result = image1;
    } else if (randomimage === 2) {
      result = image2;
    } else if (randomimage === 3) {
      result = image3;
    } else if (randomimage === 4) {
      result = image4;
    } else if (randomimage === 5) {
      result = image5;
    } else {
      result = image6;
    }
    img.src = result; //src forces a download
    setShowimage(result);
  }, [setShowimage]);

  ///
  ///
  ///
  /// GET IMAGE WIDTH ,HEIGHT AND SET WIDE IMAGE
  const ModalSlidingImageRef = useRef<HTMLImageElement>(null);
  const [imageHeightoverflow, setImageHeightoverflow] =
    useState<boolean>(false);
  const [wideImage, setWideImage] = useState<boolean>(false);

  const onimageload = useCallback(
    (e: any) => {
      if (ModalSlidingImageRef && ModalSlidingImageRef.current) {
        const imageHeight = ModalSlidingImageRef.current.clientHeight;
        const imageWidth = ModalSlidingImageRef.current.clientWidth;

        if (imageHeight + (imageWidth / imageHeight) * 3 > screenHeight) {
          setImageHeightoverflow(true);
        }

        if (imageWidth > imageHeight + (imageWidth / imageHeight) * 100) {
          setWideImage(true);
        }
      }
    },
    [setImageHeightoverflow, setWideImage, screenHeight]
  );

  const logout = () => {
    Axios.post(`http://${REACT_APP_SUPERSTARZ_URL}/logout`, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.message === "cookie deleted") {
          alert("logout  complete");
        } else if (response.data.message === "cookie null") {
          alert("logged out  already");
        }
      })
      .catch(function (error) {
        alert("logout fail");
      });
  };

  ///
  ///
  ///
  /// DYNAMIC MODAL LAYOUT VARIABLES

  ///
  ///
  ///
  /// DYNAMIC MODAL LAYOUT VARIABLES
  const wideImageControlTrue: string = "75vw";
  const wideImageControlfalse: string = "70vw";
  const zoomImageControl: string = "100vw";
  const GridMiniAwide: IGrid = 8;
  const GridMiniBwide: IGrid = 4;
  const GridMiniAlong: IGrid = 7;
  const GridMiniBlong: IGrid = 5;
  const GridZoomAwide: IGrid = 8;
  const GridZoomBwide: IGrid = 4;
  const GridZoomAlong: IGrid = 6;
  const GridZoomBlong: IGrid = 6;

  let GridHolderA: IGrid = 7;
  let GridHolderB: IGrid = 5;

  let GridxA: IGrid = 7;
  let GridxB: IGrid = 5;

  let GridyA: IGrid = 7;
  let GridyB: IGrid = 5;

  let wideImageControl: string = "70vw";
  let imageReal: string = "75vw";

  let borderGrid: string = "11px";
  var WidthHolder: string = "82%";

  var opacitySlidingModalImage = "0";
  var zIndexModalImageSmall = 10;
  var zIndexModalImageZoom = 0;
  var opacityFixedModalImage = "1";

  var slidingImageWidth = "50%";

  var mobilemodalrad = "4px";
  mobileZoom ? (mobilemodalrad = "0px") : (mobilemodalrad = "4px");

  if (zoomedModal) {
    if (imageHeightoverflow) {
      opacitySlidingModalImage = "1";
      zIndexModalImageSmall = 0;
      zIndexModalImageZoom = 10;
      opacityFixedModalImage = "0";
    }

    borderGrid = "0px";

    if (wideImage) {
      slidingImageWidth = "66%";
      WidthHolder = "76%";
      wideImageControl = wideImageControlTrue;
      GridxA = GridZoomAwide;
      GridxB = GridZoomBwide;
    } else {
      slidingImageWidth = "50%";
      WidthHolder = "88%";
      wideImageControl = wideImageControlfalse;
      GridxA = GridZoomAlong;
      GridxB = GridZoomBlong;
    }
    imageReal = zoomImageControl;
    GridHolderA = GridxA;
    GridHolderB = GridxB;
  } else {
    WidthHolder = "82%";
    borderGrid = "11px";

    if (wideImage) {
      wideImageControl = wideImageControlTrue;
      GridyA = GridMiniAwide;
      GridyB = GridMiniBwide;
    } else {
      wideImageControl = wideImageControlfalse;
      GridyA = GridMiniAlong;
      GridyB = GridMiniBlong;
    }
    imageReal = wideImageControl;
    GridHolderA = GridyA;
    GridHolderB = GridyB;
  }
  ///
  ///
  ///
  /// DYNAMIC MODAL LAYOUT VARIABLES
  /// DYNAMIC MODAL LAYOUT VARIABLES

  ///
  ///
  ///FADE SLIDING IMAGE
  var fadeSlidingimage = "fadermodal-imageslider";
  if (opacitySlidingModalImage === "0") {
    fadeSlidingimage = "";
  } else {
    fadeSlidingimage = "fadermodal-imageslider-zoomload";
    setTimeout(function () {
      fadeSlidingimage = "fadermodal-imageslider";
    }, 1600);
  }

  ///
  ///
  ///SUPERSTARZ ICON SELECT
  var SuperIcon = "";
  darkmode
    ? (SuperIcon = SuperstarzIconDark)
    : (SuperIcon = SuperstarzIconLight);

  let usernameErrorData = null;
  let usernameErrorDisplay = 0;

  let emailErrorData = null;
  let emailErrorDisplay = 0;

  let passwordErrorData = null;
  let passwordErrorDisplay = 0;

  switch (errorsSignupValues.inputedUsername) {
    case 1:
      usernameErrorData =
        "Usernames can only use letters, numbers, underscores and periods ";
      usernameErrorDisplay = 1;
      break;
    case 2:
      usernameErrorData = "Username is taken";
      usernameErrorDisplay = 1;
      break;
    case 3:
      usernameErrorData = "Username is available";
      usernameErrorDisplay = 1;
      break;
    case 4:
      usernameErrorData = "Username  required";
      usernameErrorDisplay = 1;
      break;

    default:
      usernameErrorData = null;
      usernameErrorDisplay = 0;
      break;
  }

  switch (errorsSignupValues.inputedPassword) {
    case 1:
      passwordErrorData = "Password must be at Least 8 characters";
      passwordErrorDisplay = 1;
      break;

    case 2:
      passwordErrorData = "Checking";
      passwordErrorDisplay = 1;

      break;
    case 4:
      passwordErrorData = " Password  required ";
      passwordErrorDisplay = 1;
      break;

    default:
      passwordErrorData = null;
      passwordErrorDisplay = 0;
      break;
  }

  switch (errorsSignupValues.inputedEmail) {
    case 1:
      emailErrorData = "Checking";
      emailErrorDisplay = 1;
      break;

    case 2:
      emailErrorData = "Email address is not valid";
      emailErrorDisplay = 1;
      break;

    case 3:
      emailErrorData = "Email is restricted to certain characters";
      emailErrorDisplay = 1;
      break;

    case 4:
      emailErrorData = "Email required";
      emailErrorDisplay = 1;
      break;

    default:
      emailErrorData = null;
      emailErrorDisplay = 0;
      break;
  }

  ///
  ///
  ///
  ///ALL VARIABLES ,ERROR VARIABLES,CONSTANT AND  STATES

  return (
    <>
      {showModalForm ? (
        matchPc ? (
          /*PC  PC  PC  PC  PC  PC  PC  PC  PPC  PC  PC  PC  PC  PC  PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC C */ <DialogContent
            style={{
              paddingLeft: "0px",
              height: "100%",
              zIndex: 100,
            }}
          >
            <DialogContent
              className={`${fadeSlidingimage} modalImageCustomSlider FormDialog-containerx dontallowhighlighting`}
              onClick={onBackgroundFocus}
              style={{
                overflow: "auto",
                cursor: "pointer",
                height: "101%",
                padding: "0px",
                width: slidingImageWidth,
                opacity: opacitySlidingModalImage,
                zIndex: zIndexModalImageZoom,
              }}
              ref={ModalBackgroundRef}
            >
              {" "}
              <Scrollbars
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <animated.div style={modalanimationTwo}>
                  <img
                    ref={ModalSlidingImageRef}
                    onClick={zoomlogmodal}
                    onLoad={onimageload}
                    src={showimage}
                    className="modalImageStylex"
                    style={{
                      opacity: opacitySlidingModalImage,
                    }}
                    alt="Logzoom"
                  />
                </animated.div>
              </Scrollbars>
            </DialogContent>

            <DialogContent
              className="fadermodal FormDialog-container dontallowhighlighting"
              onClick={onBackgroundFocus}
              style={{ overflow: "hidden", cursor: "pointer" }}
              ref={ModalBackgroundRef}
            >
              <ServerError
                device="pc"
                serverEmojiplain={serverEmojiplain}
                setServerErrorData={setServerErrorData}
                serverErrorDisplay={serverErrorDisplay}
                serverErrorData={serverErrorData}
                darkmode={darkmode}
              />
              <animated.div style={modalanimation}>
                <Paper
                  style={{
                    backgroundImage: PaperStyle,
                    borderRadius: borderGrid,
                    cursor: "default",
                  }}
                >
                  <Grid
                    container
                    className="containerStyle"
                    style={{
                      width: imageReal,
                      borderRadius: borderGrid,
                    }}
                  >
                    <Grid
                      item
                      xs={GridHolderA}
                      style={{ zIndex: zIndexModalImageSmall }}
                    >
                      <img
                        onClick={iconclicked}
                        className={
                          zoomedModal
                            ? "hide-logo"
                            : "log-logo  make-small-icons-clickable-neutralB"
                        }
                        src={SuperIcon}
                        alt="SuperstarZ logosmallmode"
                      />

                      <img
                        onClick={zoomlogmodal}
                        src={showimage}
                        className="modalImageStyle"
                        style={{
                          opacity: opacityFixedModalImage,
                          borderTopLeftRadius: borderGrid,
                          borderBottomLeftRadius: borderGrid,
                        }}
                        alt="Logsmall"
                      />
                    </Grid>

                    {formtype ? (
                      <Grid item xs={GridHolderB}>
                        <Grid xs={12} item className="formholder">
                          <Grid
                            item
                            xs={12}
                            className="center-content-vertically"
                            style={{ marginTop: "-5px" }}
                          >
                            <img
                              onClick={iconclicked}
                              className={
                                zoomedModal
                                  ? "zoom-login-logo  make-small-icons-clickable-neutral"
                                  : "hide-logo "
                              }
                              src={SuperIcon}
                              alt="SuperstarZ logo"
                            />

                            <button
                              onClick={logout}
                              style={{
                                cursor: "pointer",
                                opacity: 0.1,
                                position: "fixed",
                                top: "0.5em",
                                borderRadius: "50%",
                              }}
                            >
                              {" "}
                              ....
                            </button>
                            <ModalFormLoginError
                              device="pc"
                              type={true}
                              ErrorDisplay={errorsLoginValues.inputedUsername}
                              darkmode={darkmode}
                              WidthHolder={WidthHolder}
                            />

                            <TextFieldLogin
                              updateLoginvalues={updateLoginvalues}
                              rawLoginValues={rawLoginValues}
                              ShowLoginPasswordForaWhile={
                                ShowLoginPasswordForaWhile
                              }
                              loginShowPassword={loginShowPassword}
                              size="medium"
                              passwordType={false}
                              withHolder={WidthHolder}
                            />
                            <TextFieldLogin
                              updateLoginvalues={updateLoginvalues}
                              rawLoginValues={rawLoginValues}
                              ShowLoginPasswordForaWhile={
                                ShowLoginPasswordForaWhile
                              }
                              loginShowPassword={loginShowPassword}
                              size="medium"
                              passwordType={true}
                              withHolder={WidthHolder}
                            />
                            <ModalFormLoginError
                              device="pc"
                              type={false}
                              ErrorDisplay={errorsLoginValues.inputedPassword}
                              darkmode={darkmode}
                              WidthHolder={WidthHolder}
                            />

                            <Grid
                              container
                              style={{ marginTop: "70px", zIndex: 300 }}
                            >
                              <Grid item xs={4}></Grid>
                              <Grid
                                item
                                className="buttonpad buttonshake"
                                xs={4}
                              >
                                <Button
                                  onClick={logmein}
                                  style={loginstyle}
                                  fullWidth={true}
                                  variant="outlined"
                                  size="large"
                                  color="primary"
                                >
                                  Log In
                                </Button>
                              </Grid>{" "}
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid xs={GridHolderB} item className="formholder">
                        <Grid
                          item
                          xs={12}
                          className="center-content-vertically"
                          style={{ padding: "0px" }}
                        >
                          <img
                            onClick={iconclicked}
                            className={
                              zoomedModal
                                ? "zoom-signup-logo make-small-icons-clickable-neutral"
                                : "hide-logo make-small-icons-clickable-neutral "
                            }
                            src={SuperIcon}
                            alt="SuperstarZ logo"
                          />
                          <ModalFormSignupError
                            device="pc"
                            ErrorType={0}
                            textField="email"
                            errorFormChecking={errorFormChecking.inputedEmail}
                            WidthHolder={WidthHolder}
                            darkmode={darkmode}
                            type={true}
                            cantPassBadEmail={cantPassBadEmail}
                            ErrorDisplay={emailErrorDisplay}
                            ErrorData={emailErrorData}
                          />

                          <TextFieldSignup
                            updateSignvalues={updateSignvalues}
                            rawSignupValues={rawSignupValues}
                            ShowSignupPasswordForaWhile={
                              ShowSignupPasswordForaWhile
                            }
                            signupShowPassword={signupShowPassword}
                            size="medium"
                            emailType={true}
                            passwordType={false}
                            withHolder={WidthHolder}
                          />

                          <ModalFormSignupError
                            device="pc"
                            ErrorType={errorsSignupValues.inputedUsername}
                            textField="username"
                            errorFormChecking={
                              errorFormChecking.inputedUsername
                            }
                            WidthHolder={WidthHolder}
                            darkmode={darkmode}
                            type={true}
                            cantPassBadEmail={cantPassBadEmail}
                            ErrorDisplay={usernameErrorDisplay}
                            ErrorData={usernameErrorData}
                          />

                          <TextFieldSignup
                            updateSignvalues={updateSignvalues}
                            rawSignupValues={rawSignupValues}
                            ShowSignupPasswordForaWhile={
                              ShowSignupPasswordForaWhile
                            }
                            signupShowPassword={signupShowPassword}
                            size="medium"
                            emailType={false}
                            passwordType={false}
                            withHolder={WidthHolder}
                          />

                          <TextFieldSignup
                            updateSignvalues={updateSignvalues}
                            rawSignupValues={rawSignupValues}
                            ShowSignupPasswordForaWhile={
                              ShowSignupPasswordForaWhile
                            }
                            signupShowPassword={signupShowPassword}
                            size="medium"
                            emailType={false}
                            passwordType={true}
                            withHolder={WidthHolder}
                          />
                          <ModalFormSignupError
                            device="pc"
                            ErrorType={0}
                            textField="password"
                            errorFormChecking={
                              errorFormChecking.inputedPassword
                            }
                            darkmode={darkmode}
                            WidthHolder={WidthHolder}
                            type={false}
                            cantPassBadEmail={cantPassBadEmail}
                            ErrorDisplay={passwordErrorDisplay}
                            ErrorData={passwordErrorData}
                          />

                          <Grid container className="modal-hold-signup">
                            <Grid item xs={4}></Grid>
                            <Grid item className="buttonpad buttonshake" xs={4}>
                              <Button
                                style={signupstyle}
                                onClick={signmeup}
                                fullWidth={true}
                                variant="contained"
                                size="large"
                                color="secondary"
                              >
                                Sign Up
                              </Button>
                            </Grid>{" "}
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </animated.div>
            </DialogContent>
          </DialogContent> /*PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC  PC */
        ) : (
          /*MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE*/
          <DialogContent
            className="fadermodal FormDialog-container-mobile dontallowhighlighting"
            style={{
              overflow: "auto",
              cursor: "pointer",
              padding: "0px",
              zIndex: 100,
            }}
          >
            <ServerError
              device="mobile"
              serverEmojiplain={serverEmojiplain}
              setServerErrorData={setServerErrorData}
              serverErrorDisplay={serverErrorDisplay}
              serverErrorData={serverErrorData}
              darkmode={darkmode}
            />
            <animated.div style={modalanimation}>
              <Paper
                className={PaperStyle}
                style={{
                  cursor: "default",
                }}
              >
                <Grid container>
                  <Grid item xs={12} style={{ marginTop: "-2.5px" }}>
                    <img
                      onClick={() => setMobileZoom(!mobileZoom)}
                      onLoad={onimageload}
                      src={showimage}
                      className="modalMobileImageStyle"
                      alt="SuperstarZ"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    className={mobileZoom ? "zoomMobile" : "smallMobile"}
                  >
                    {" "}
                    <animated.div style={mobileLogmodalanimation}>
                      <img
                        onClick={iconclicked}
                        className={
                          mobileZoom
                            ? "log-logoMobileZoom  make-small-icons-clickable-neutralB"
                            : "log-logoMobile  make-small-icons-clickable-neutralB"
                        }
                        src={SuperIcon}
                        alt="Express Yourself"
                      />
                      <Paper
                        style={{
                          backgroundImage: PaperStyle,
                          cursor: "default",
                          height: "99vh",
                          borderRadius: "0px",
                          marginTop: "-1.9px",
                          borderTopRightRadius: mobilemodalrad,
                          borderTopLeftRadius: mobilemodalrad,
                        }}
                      >
                        <Grid xs={12} item className="formholder">
                          {formtype ? (
                            <Grid
                              item
                              xs={12}
                              className=""
                              style={{ marginTop: "-1.5px" }}
                            >
                              <ModalFormLoginError
                                type={true}
                                device="mobile"
                                ErrorDisplay={errorsLoginValues.inputedUsername}
                                darkmode={darkmode}
                                WidthHolder={WidthHolder}
                              />

                              <TextFieldLogin
                                updateLoginvalues={updateLoginvalues}
                                rawLoginValues={rawLoginValues}
                                ShowLoginPasswordForaWhile={
                                  ShowLoginPasswordForaWhile
                                }
                                loginShowPassword={loginShowPassword}
                                size="small"
                                passwordType={false}
                                withHolder={WidthHolder}
                              />
                              <TextFieldLogin
                                updateLoginvalues={updateLoginvalues}
                                rawLoginValues={rawLoginValues}
                                ShowLoginPasswordForaWhile={
                                  ShowLoginPasswordForaWhile
                                }
                                loginShowPassword={loginShowPassword}
                                size="small"
                                passwordType={true}
                                withHolder={WidthHolder}
                              />
                              <ModalFormLoginError
                                type={false}
                                ErrorDisplay={errorsLoginValues.inputedPassword}
                                device="mobile"
                                darkmode={darkmode}
                                WidthHolder={WidthHolder}
                              />
                              <Grid
                                container
                                style={{ marginTop: "40px", zIndex: 2 }}
                              >
                                <Grid item xs={4}></Grid>
                                <Grid
                                  item
                                  className="buttonpad buttonshake"
                                  xs={4}
                                >
                                  <Button
                                    onClick={logmein}
                                    style={loginstyle}
                                    fullWidth={true}
                                    variant="outlined"
                                    size="large"
                                    color="primary"
                                  >
                                    Log In
                                  </Button>
                                </Grid>{" "}
                              </Grid>
                            </Grid>
                          ) : (
                            <Grid
                              item
                              xs={12}
                              className=""
                              style={{ marginTop: "-1.5px" }}
                            >
                              <ModalFormSignupError
                                device="mobile"
                                ErrorType={0}
                                textField="email"
                                errorFormChecking={
                                  errorFormChecking.inputedEmail
                                }
                                WidthHolder={WidthHolder}
                                darkmode={darkmode}
                                type={true}
                                cantPassBadEmail={cantPassBadEmail}
                                ErrorDisplay={emailErrorDisplay}
                                ErrorData={emailErrorData}
                              />

                              <TextFieldSignup
                                updateSignvalues={updateSignvalues}
                                rawSignupValues={rawSignupValues}
                                ShowSignupPasswordForaWhile={
                                  ShowSignupPasswordForaWhile
                                }
                                signupShowPassword={signupShowPassword}
                                size="small"
                                emailType={true}
                                passwordType={false}
                                withHolder={WidthHolder}
                              />

                              <ModalFormSignupError
                                device="mobile"
                                ErrorType={errorsSignupValues.inputedUsername}
                                textField="username"
                                errorFormChecking={
                                  errorFormChecking.inputedUsername
                                }
                                WidthHolder={WidthHolder}
                                darkmode={darkmode}
                                type={true}
                                cantPassBadEmail={cantPassBadEmail}
                                ErrorDisplay={usernameErrorDisplay}
                                ErrorData={usernameErrorData}
                              />
                              <TextFieldSignup
                                updateSignvalues={updateSignvalues}
                                rawSignupValues={rawSignupValues}
                                ShowSignupPasswordForaWhile={
                                  ShowSignupPasswordForaWhile
                                }
                                signupShowPassword={signupShowPassword}
                                size="small"
                                emailType={false}
                                passwordType={false}
                                withHolder={WidthHolder}
                              />

                              <TextFieldSignup
                                updateSignvalues={updateSignvalues}
                                rawSignupValues={rawSignupValues}
                                ShowSignupPasswordForaWhile={
                                  ShowSignupPasswordForaWhile
                                }
                                signupShowPassword={signupShowPassword}
                                size="small"
                                emailType={false}
                                passwordType={true}
                                withHolder={WidthHolder}
                              />
                              <ModalFormSignupError
                                device="mobile"
                                ErrorType={0}
                                textField="password"
                                errorFormChecking={
                                  errorFormChecking.inputedPassword
                                }
                                darkmode={darkmode}
                                WidthHolder={WidthHolder}
                                type={false}
                                cantPassBadEmail={cantPassBadEmail}
                                ErrorDisplay={passwordErrorDisplay}
                                ErrorData={passwordErrorData}
                              />

                              <Grid
                                container
                                style={{ marginTop: "40px", zIndex: 2 }}
                                className="modal-hold-signup"
                              >
                                <Grid item xs={4}></Grid>
                                <Grid
                                  item
                                  className="buttonpad buttonshake"
                                  xs={4}
                                >
                                  <Button
                                    style={signupstyle}
                                    onClick={signmeup}
                                    fullWidth={true}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                  >
                                    Sign Up
                                  </Button>
                                </Grid>{" "}
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </Paper>
                    </animated.div>
                  </Grid>
                </Grid>
              </Paper>
            </animated.div>
          </DialogContent>
        ) /*MOBILE  MOBILE  MOBILE  MOBILE MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE MOBILE  MOBILE  MOBILE*/
      ) : null}
    </>
  );
}

export const ModalLog = React.memo(ModalLogx);
