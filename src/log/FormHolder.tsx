import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  ImodalLog,
  IGrid,
  Ispinnerinterface,
  IFormHolder,
} from "./log-Interfaces";
import Axios from "axios";
import SuperstarzIconLight from "./../images/ssmall.png";
import SuperstarzIconDark from "./../images/sdsmall.png";
import { TextFieldLogin } from "./TextFieldLogin";
import { TextFieldSignup } from "./TextFieldSignup";
import { ServerError } from "./ServerError";
import { ModalFormSignupError } from "./ModalFormSignupError";
import { ModalFormLoginError } from "./ModalFormLoginError";
import { DialogContent, Button, Paper, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { isBrowser, isTablet } from "react-device-detect";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import IsLoggedReducer from "./reducers/IsloggedReducer";
import { LoginApply } from "./actions/LoginApply";

function FormHolderx({
  darkmode,
  zoomedModal,
  WidthHolder,
  loginstyle,
  loginForm,
  signupstyle,
  serverEmojiplain,
  setServerErrorData,
  serverErrorDisplay,
  serverErrorData,
  setServerErrorDisplay,
  setserverEmojiplain,
}: IFormHolder) {
  const dispatch = useDispatch();

  const BUY_ICECREAM = "SIGN_IN";

  const { loggedIn } = useSelector((state: RootStateOrAny) => ({
    ...state.IsLoggedReducer,
  }));

  const matchPc = isBrowser;
  const matchTablet = isTablet;
  const [focusUsername, setFocusUsername] = useState<boolean>(false);
  const [focusPassword, setFocusPassword] = useState<boolean>(false);

  const [focusUsernameSign, setFocusUsernameSign] = useState<boolean>(false);
  const [focusPasswordSign, setFocusPasswordSign] = useState<boolean>(false);
  const [focusEmailSign, setFocusEmailSign] = useState<boolean>(false);

  const [showFocusTextFieldByHidePadding, setShowFocusTextFieldByHidePadding] =
    useState<boolean>(false);

  var fieldSize = "";
  var tabletMobile = "";
  if (matchTablet) {
    fieldSize = "smallTablet";
    tabletMobile = "Tablet";
  } else {
    fieldSize = "small";
    tabletMobile = "Mobile";
  }

  ///
  ///
  ///
  ///HISTORY VARIABLE
  const history = useHistory();
  ///

  ///
  ///
  ///SUPERSTARZ ICON SELECT
  var SuperIcon = "";
  darkmode
    ? (SuperIcon = SuperstarzIconDark)
    : (SuperIcon = SuperstarzIconLight);

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
  /// SHOW  LOGIN PASSWORD FOR A WHILE
  const ShowLoginPasswordForaWhile = useCallback(() => {
    if (loginShowPasswordTimer.current) {
      clearTimeout(loginShowPasswordTimer.current);
    }
    setLoginShowPassword(!loginShowPassword);
    loginShowPasswordTimer.current = setTimeout(() => {
      setLoginShowPassword(false);
    }, 2000);
  }, [loginShowPassword]);

  ///
  ///
  ///
  /// SANITISE LOG IN FORM INPUT CLIENT SIDE
  const updateLoginvalues = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      setErrorsLoginValues({ ...errorsLoginValues, [name]: 0 });
      setRawLoginValues({ ...rawLoginValues, [name]: value });
      setCleanLoginValues({ ...cleanLoginValues, [name]: value });
    },

    [errorsLoginValues, rawLoginValues, cleanLoginValues]
  );

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
            setServerErrorData("wrong username and  password combination");
            setServerErrorDisplay(1);
            setserverEmojiplain(false);
          } else {
            if (response.data.message === "Wrong username") {
              setServerErrorData("username does not exist");
              setServerErrorDisplay(1);
              setserverEmojiplain(false);
            } else if (response.data.payload) {
              history.push({
                pathname: "/supercheck",
                state: { userdata: response.data.payload },
              });
              ///dispatch(LoginApply());
              /// alert(loggedIn);
            } else {
              setServerErrorData("user info could not be retrieved");
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
            let affectedTextField = "wrong password and username combination";

            let dynamicError = `${affectedTextField}  `;
            setServerErrorData(dynamicError);
            setServerErrorDisplay(1);
            setserverEmojiplain(false);
          } else if (error.request) {
            // The request was made but no response was received Or request not made
            // Axios.post("http://localhost:3003/reg" can activate this error
            setServerErrorData(
              "error connecting to server, check your connection"
            );
            setServerErrorDisplay(1);
            setserverEmojiplain(true);
          } else {
            // Something happened in setting up the request that triggered an Error
            setServerErrorData("request setup failed , pls try again");
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
  const signupShowPasswordTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [cantPassBadEmail, setCantPassBadEmail] = useState<boolean>(false);

  ///
  ///
  ///
  ///SIGN UP ERROR VARIABLES
  let usernameErrorData = null;
  let usernameErrorDisplay = 0;

  let emailErrorData = null;
  let emailErrorDisplay = 0;

  let passwordErrorData = null;
  let passwordErrorDisplay = 0;

  switch (errorsSignupValues.inputedUsername) {
    case 1:
      usernameErrorData =
        "usernames can only use letters, numbers, underscores and periods ";
      usernameErrorDisplay = 1;
      break;
    case 2:
      usernameErrorData = "username is taken";
      usernameErrorDisplay = 1;
      break;
    case 3:
      usernameErrorData = "username is available";
      usernameErrorDisplay = 1;
      break;
    case 4:
      usernameErrorData = "username  required";
      usernameErrorDisplay = 1;
      break;

    default:
      usernameErrorData = null;
      usernameErrorDisplay = 0;
      break;
  }

  switch (errorsSignupValues.inputedPassword) {
    case 1:
      passwordErrorData = "password must be at Least 8 characters";
      passwordErrorDisplay = 1;
      break;

    case 2:
      passwordErrorData = "checking";
      passwordErrorDisplay = 1;

      break;
    case 4:
      passwordErrorData = " password  required ";
      passwordErrorDisplay = 1;
      break;

    default:
      passwordErrorData = null;
      passwordErrorDisplay = 0;
      break;
  }

  switch (errorsSignupValues.inputedEmail) {
    case 1:
      emailErrorData = "checking";
      emailErrorDisplay = 1;
      break;

    case 2:
      emailErrorData = "email address is not valid";
      emailErrorDisplay = 1;
      break;

    case 3:
      emailErrorData = "email is restricted to certain characters";
      emailErrorDisplay = 1;
      break;

    case 4:
      emailErrorData = "email required";
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
  ///SIGN UP ERROR VARIABLES

  ///
  ///
  ///
  /// SHOW  SIGNUP PASSWORD FOR A WHILE
  const ShowSignupPasswordForaWhile = useCallback(() => {
    if (signupShowPasswordTimer.current) {
      clearTimeout(signupShowPasswordTimer.current);
    }
    setSignupShowPassword(!signupShowPassword);
    signupShowPasswordTimer.current = setTimeout(() => {
      setSignupShowPassword(false);
    }, 2000);
  }, [signupShowPassword]);

  /// SANITISE LOG IN FORM INPUT CLIENT SIDE
  const updateSignvalues = useCallback(
    (e: any) => {
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
    },
    [cleanSignupValues, rawSignupValues, errorsSignupValues, errorFormChecking]
  );
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
              setServerErrorData("username is taken");
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
            } else if (response.data.message === "Registration Successful") {
              console.log(response.status);
              alert("REGISTRATION COMPLETE");
            } else {
              setServerErrorData("something went wrong");
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
                affectedTextField = "password must be at least 8 characters";
              } else if (textFieldParam === "values.inputedEmail") {
                affectedTextField = "email address is not valid";
              } else {
                affectedTextField =
                  "usernames use letters, numbers, underscores and periods";
              }
              let dynamicError = `${affectedTextField}.  ${error.response.data.error.errors[0].msg} `;
              setServerErrorData(dynamicError);
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
            } else if (error.request) {
              // The request was made but no response was received Or request not made
              // Axios.post("http://localhost:3003/reg" can activate this error
              setServerErrorData(
                "error connecting to server, check your connection"
              );
              setServerErrorDisplay(1);
              setserverEmojiplain(true);
            } else {
              // Something happened in setting up the request that triggered an Error
              setServerErrorData("request setup failed , pls try again");
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

  return (
    <>
      {loginForm ? (
        matchPc /*PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC */ ? (
          <>
            <img
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
              focus={focusUsername}
              device="pc"
              type={true}
              ErrorDisplay={errorsLoginValues.inputedUsername}
              darkmode={darkmode}
              WidthHolder={WidthHolder}
            />
            <TextFieldLogin
              darkmode={darkmode}
              focus={focusUsername}
              setFocus={setFocusUsername}
              updateLoginvalues={updateLoginvalues}
              rawLoginValues={rawLoginValues}
              ShowLoginPasswordForaWhile={ShowLoginPasswordForaWhile}
              loginShowPassword={loginShowPassword}
              size="medium"
              passwordType={false}
              withHolder={WidthHolder}
            />
            <TextFieldLogin
              darkmode={darkmode}
              focus={focusPassword}
              setFocus={setFocusPassword}
              updateLoginvalues={updateLoginvalues}
              rawLoginValues={rawLoginValues}
              ShowLoginPasswordForaWhile={ShowLoginPasswordForaWhile}
              loginShowPassword={loginShowPassword}
              size="medium"
              passwordType={true}
              withHolder={WidthHolder}
            />
            <ModalFormLoginError
              focus={focusPassword}
              device="pc"
              type={false}
              ErrorDisplay={errorsLoginValues.inputedPassword}
              darkmode={darkmode}
              WidthHolder={WidthHolder}
            />
            <Grid container style={{ marginTop: "70px", zIndex: 300 }}>
              <Grid item xs={4}></Grid>
              <Grid item className="buttonpad buttonshake" xs={4}>
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
          </> /*PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC */
        ) : (
          /*MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE*/
          <>
            <ModalFormLoginError
              focus={focusUsername}
              type={true}
              device={tabletMobile}
              ErrorDisplay={errorsLoginValues.inputedUsername}
              darkmode={darkmode}
              WidthHolder={WidthHolder}
            />
            <TextFieldLogin
              darkmode={darkmode}
              focus={focusUsername}
              setFocus={setFocusUsername}
              updateLoginvalues={updateLoginvalues}
              rawLoginValues={rawLoginValues}
              ShowLoginPasswordForaWhile={ShowLoginPasswordForaWhile}
              loginShowPassword={loginShowPassword}
              size={fieldSize}
              passwordType={false}
              withHolder={WidthHolder}
            />
            <TextFieldLogin
              darkmode={darkmode}
              focus={focusPassword}
              setFocus={setFocusPassword}
              updateLoginvalues={updateLoginvalues}
              rawLoginValues={rawLoginValues}
              ShowLoginPasswordForaWhile={ShowLoginPasswordForaWhile}
              loginShowPassword={loginShowPassword}
              size={fieldSize}
              passwordType={true}
              withHolder={WidthHolder}
            />
            <ModalFormLoginError
              focus={focusPassword}
              type={false}
              ErrorDisplay={errorsLoginValues.inputedPassword}
              device={tabletMobile}
              darkmode={darkmode}
              WidthHolder={WidthHolder}
            />
            <Grid container className="modal-hold-login">
              <Grid item xs={4} sm={5}></Grid>
              <Grid item className="buttonpad buttonshake" xs={4} sm={2}>
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
          </> /*MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE*/
        )
      ) : matchPc /*PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC */ ? (
        <>
          {" "}
          <img
            className={
              zoomedModal
                ? "zoom-signup-logo make-small-icons-clickable-neutral"
                : "hide-logo make-small-icons-clickable-neutral "
            }
            src={SuperIcon}
            alt="SuperstarZ logo"
          />
          <ModalFormSignupError
            focus={focusEmailSign}
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
            darkmode={darkmode}
            showFocusTextFieldByHidePadding={showFocusTextFieldByHidePadding}
            setShowFocusTextFieldByHidePadding={
              setShowFocusTextFieldByHidePadding
            }
            focus={focusEmailSign}
            setFocus={setFocusEmailSign}
            updateSignvalues={updateSignvalues}
            rawSignupValues={rawSignupValues}
            ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
            signupShowPassword={signupShowPassword}
            size="medium"
            emailType={true}
            passwordType={false}
            withHolder={WidthHolder}
          />
          <ModalFormSignupError
            focus={focusUsernameSign}
            device="pc"
            ErrorType={errorsSignupValues.inputedUsername}
            textField="username"
            errorFormChecking={errorFormChecking.inputedUsername}
            WidthHolder={WidthHolder}
            darkmode={darkmode}
            type={true}
            cantPassBadEmail={cantPassBadEmail}
            ErrorDisplay={usernameErrorDisplay}
            ErrorData={usernameErrorData}
          />
          <TextFieldSignup
            darkmode={darkmode}
            showFocusTextFieldByHidePadding={showFocusTextFieldByHidePadding}
            setShowFocusTextFieldByHidePadding={
              setShowFocusTextFieldByHidePadding
            }
            focus={focusUsernameSign}
            setFocus={setFocusUsernameSign}
            updateSignvalues={updateSignvalues}
            rawSignupValues={rawSignupValues}
            ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
            signupShowPassword={signupShowPassword}
            size="medium"
            emailType={false}
            passwordType={false}
            withHolder={WidthHolder}
          />
          <TextFieldSignup
            darkmode={darkmode}
            showFocusTextFieldByHidePadding={showFocusTextFieldByHidePadding}
            setShowFocusTextFieldByHidePadding={
              setShowFocusTextFieldByHidePadding
            }
            focus={focusPasswordSign}
            setFocus={setFocusPasswordSign}
            updateSignvalues={updateSignvalues}
            rawSignupValues={rawSignupValues}
            ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
            signupShowPassword={signupShowPassword}
            size="medium"
            emailType={false}
            passwordType={true}
            withHolder={WidthHolder}
          />
          <ModalFormSignupError
            focus={focusPasswordSign}
            device="pc"
            ErrorType={0}
            textField="password"
            errorFormChecking={errorFormChecking.inputedPassword}
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
          </Grid>{" "}
        </> /*PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC PC */
      ) : (
        /*MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE*/
        <>
          {" "}
          <ModalFormSignupError
            focus={focusEmailSign}
            device={tabletMobile}
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
            darkmode={darkmode}
            showFocusTextFieldByHidePadding={showFocusTextFieldByHidePadding}
            setShowFocusTextFieldByHidePadding={
              setShowFocusTextFieldByHidePadding
            }
            focus={focusEmailSign}
            setFocus={setFocusEmailSign}
            updateSignvalues={updateSignvalues}
            rawSignupValues={rawSignupValues}
            ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
            signupShowPassword={signupShowPassword}
            size={fieldSize}
            emailType={true}
            passwordType={false}
            withHolder={WidthHolder}
          />
          <ModalFormSignupError
            focus={focusUsernameSign}
            device={tabletMobile}
            ErrorType={errorsSignupValues.inputedUsername}
            textField="username"
            errorFormChecking={errorFormChecking.inputedUsername}
            WidthHolder={WidthHolder}
            darkmode={darkmode}
            type={true}
            cantPassBadEmail={cantPassBadEmail}
            ErrorDisplay={usernameErrorDisplay}
            ErrorData={usernameErrorData}
          />
          <TextFieldSignup
            darkmode={darkmode}
            showFocusTextFieldByHidePadding={showFocusTextFieldByHidePadding}
            setShowFocusTextFieldByHidePadding={
              setShowFocusTextFieldByHidePadding
            }
            focus={focusUsernameSign}
            setFocus={setFocusUsernameSign}
            updateSignvalues={updateSignvalues}
            rawSignupValues={rawSignupValues}
            ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
            signupShowPassword={signupShowPassword}
            size={fieldSize}
            emailType={false}
            passwordType={false}
            withHolder={WidthHolder}
          />
          <TextFieldSignup
            darkmode={darkmode}
            showFocusTextFieldByHidePadding={showFocusTextFieldByHidePadding}
            setShowFocusTextFieldByHidePadding={
              setShowFocusTextFieldByHidePadding
            }
            focus={focusPasswordSign}
            setFocus={setFocusPasswordSign}
            updateSignvalues={updateSignvalues}
            rawSignupValues={rawSignupValues}
            ShowSignupPasswordForaWhile={ShowSignupPasswordForaWhile}
            signupShowPassword={signupShowPassword}
            size={fieldSize}
            emailType={false}
            passwordType={true}
            withHolder={WidthHolder}
          />
          <ModalFormSignupError
            focus={focusPasswordSign}
            device={tabletMobile}
            ErrorType={0}
            textField="password"
            errorFormChecking={errorFormChecking.inputedPassword}
            darkmode={darkmode}
            WidthHolder={WidthHolder}
            type={false}
            cantPassBadEmail={cantPassBadEmail}
            ErrorDisplay={passwordErrorDisplay}
            ErrorData={passwordErrorData}
          />
          <Grid container className="modal-hold-signup">
            <Grid item xs={4} sm={5}></Grid>
            <Grid item className="buttonpad buttonshake" xs={4} sm={2}>
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
          </Grid>{" "}
        </>
      )}
    </>
    /*MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILEMOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE  MOBILE*/
  );
}

export const FormHolder = React.memo(FormHolderx);
