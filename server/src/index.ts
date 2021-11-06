const util = require("util");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
import express = require("express");
var app: Application = express();
var cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: "http://192.168.43.137:3000",
    ////origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(cookieParser());
const bcrypt = require("bcrypt");
const { createTokens, validateToken, createTokensUpdate } = require("./jwt");
import { Request, Response, Application } from "express";
import { body, validationResult } from "express-validator";
import { strict } from "node:assert";
import jwt_decode from "jwt-decode";
const CONNECTION_CONFIG = {
  user: "root",
  host: "localhost",
  password: "password",
  database: "superdata",
};
///
///reg
const register = `INSERT INTO members (username,password,email,color,status,notification,tutorial,date,reg) VALUES (?,?,?,?,?,?,?,?,?)`;
///
///login
const login = `SELECT username,id,password,color,profile_image,first_name,sur_name,quote,reg,billboard1,billboard2,biography FROM members WHERE username =?`;
///
///checkIsLogged
const loginId = `SELECT username,id,password,color,profile_image,first_name,sur_name,quote,reg,billboard1,billboard2,biography  FROM members WHERE id =?`;
///
///usernamecheck
const checkpassword = `SELECT id FROM members WHERE  username =?`;

///checkIsLogged
const posts = `SELECT id,sender,post_count,topic,caption,item1,itemtype1,item2,itemtype2,item3,itemtype3,item4,itemtype4,item5,itemtype5,item6,itemtype6,item7,itemtype7,item8,itemtype8,item9,itemtype9,item10,itemtype10,item11,itemtype11,item12,itemtype12,item13,itemtype13,item14,itemtype14,item15,itemtype15,item16,itemtype16,time  FROM posts WHERE id `;

app.post("/feeds_chronological", async (req: Request, res: Response) => {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const chronologicalQuery = util.promisify(connection.query.bind(connection));
  try {
    const chronologicaldata = await chronologicalQuery(posts);

    return res.send({
      ///gettingcookie: userSessionData,
      message: "feeds fetched",
      payload: chronologicaldata,
    });
  } catch {
    return res.send({ message: "error in fetching feeds" });
  }
});

app.post(
  "/keepmeloggedin",
  validateToken,
  async (req: Request, res: Response) => {
    if (req.cookies.accesst) {
      const { values } = req.body;
      const userSessionData: any = jwt_decode(req.cookies.accesst);
      const accessToken = createTokensUpdate(userSessionData);
      if (values === "session") {
        return res
          .cookie("accesst", accessToken, {
            sameSite: "strict",
            httpOnly: true,
            //secure: true,
          })
          .send({ message: "session_Cookie_Activated" });
      } else {
        const days30inseconds = 60 * 60 * 24 * 30 * 1000;
        const CurrentTimePlusSecs = new Date(
          new Date().getTime() + 60 * 60 * 24 * 30 * 1000
        );

        const userSessionData: any = jwt_decode(req.cookies.accesst);
        const accessToken = createTokensUpdate(userSessionData);

        return res
          .cookie("accesst", accessToken, {
            sameSite: "strict",
            expires: CurrentTimePlusSecs,
            maxAge: days30inseconds,
            httpOnly: true,
            //secure: true,
          })
          .send({ message: "forever_Cookie_Activated" });
      }
    } else {
      return res.send({ message: "cookie null" });
    }
  }
);

app.post("/logout", async (req: Request, res: Response) => {
  if (req.cookies.accesst) {
    return res.clearCookie("accesst").send({ message: "cookie deleted" });
  } else {
    return res.send({ message: "cookie null" });
  }
});

app.post(
  "/checkIsLogged",
  validateToken,
  async (req: Request, res: Response) => {
    if (req.cookies.accesst) {
      const userSessionData: any = jwt_decode(req.cookies.accesst);

      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const loginQuery = util.promisify(connection.query.bind(connection));
      try {
        const logindata = await loginQuery(loginId, [userSessionData.id]);

        const payloadValue = {
          id: logindata[0].id,
          username: logindata[0].username,
          userimage: logindata[0].profile_image,
          usercolor: logindata[0].color,
          userfirstname: logindata[0].first_name,
          usersurname: logindata[0].sur_name,
          userquote: logindata[0].quote,
          userreg: logindata[0].reg,
          userbillboard1: logindata[0].billboard1,
          userbillboard2: logindata[0].billboard2,
          biography: logindata[0].biography,
        };

        return res.send({
          ///gettingcookie: userSessionData,
          message: "logged in",
          payload: payloadValue,
        });
      } catch {
        return res.send({ message: "Wrong id" });
      }
    } else {
      return res.send({
        message: "logged out",
      });
    }
  }
);

app.post("/logout", async (req: Request, res: Response) => {
  if (req.cookies.accesst) {
    return res.clearCookie("accesst").send({ message: "cookie deleted" });
  } else {
    return res.send({ message: "cookie null" });
  }
});

app.post(
  "/usernamecheck",
  body("value")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"),
  async (req: Request, res: Response) => {
    const validateErrors = validationResult(req);
    if (!validateErrors.isEmpty()) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: validateErrors,
      });
    } else {
      const username = req.body.value;
      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const checkpassQuery = util.promisify(connection.query.bind(connection));
      try {
        const checkresult = await checkpassQuery(checkpassword, [username]);
        const IdIsAvailable = checkresult[0].id;
        if (IdIsAvailable) {
          return res.send({ message: "username is not unique" });
        }
      } catch {
        return res.send({ message: "username is available" });
      }
    }
  }
);

app.post(
  "/loging",
  body("values.inputedUsername")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"),
  body("values.inputedPassword")
    .isLength({ min: 8 })
    .exists({ checkFalsy: true }),
  async (req: Request, res: Response) => {
    const validateErrors = validationResult(req);
    if (!validateErrors.isEmpty()) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: validateErrors,
      });
    } else {
      const { values } = req.body;
      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const loginQuery = util.promisify(connection.query.bind(connection));
      try {
        const logindata = await loginQuery(login, [values.inputedUsername]);
        const DatabasePassword = logindata[0].password;
        const PasswordMatchResult = await bcrypt.compare(
          values.inputedPassword,
          DatabasePassword
        );
        if (!PasswordMatchResult) {
          return res.send({ message: "Wrong Password" });
        } else {
          const payloadValue = {
            id: logindata[0].id,
            username: logindata[0].username,
            userimage: logindata[0].profile_image,
            usercolor: logindata[0].color,
            userfirstname: logindata[0].first_name,
            usersurname: logindata[0].sur_name,
            userquote: logindata[0].quote,
            userreg: logindata[0].reg,
            userbillboard1: logindata[0].billboard1,
            userbillboard2: logindata[0].billboard2,
            biography: logindata[0].biography,
          };

          const days30inseconds = 60 * 60 * 24 * 30 * 1000;
          const CurrentTimePlusSecs = new Date(
            new Date().getTime() + 60 * 60 * 24 * 30 * 1000
          );
          const accessToken = createTokens(logindata);
          //res.clearCookie("accesst");
          //const tokenxx = req.cookies.accesst;
          //const user = jwt_decode(tokenxx);
          ///setting the cookie
          return res
            .cookie("accesst", accessToken, {
              sameSite: "strict",
              expires: CurrentTimePlusSecs,
              maxAge: days30inseconds,
              httpOnly: true,
              //secure: true,
            })
            .send({ payload: payloadValue });
        }
      } catch {
        return res.send({ message: "Wrong username" });
      }
    }
  }
);

app.post(
  "/registration",
  body("values.inputedEmail")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: false }),
  body("values.inputedUsername")
    .isLength({ max: 26 })
    .matches(/^([A-z0-9áéíóúñü\ \_.]+)$/, "gim"),
  body("values.inputedPassword")
    .isLength({ min: 8 })
    .exists({ checkFalsy: true }),
  async (req: Request, res: Response) => {
    const validateErrors = validationResult(req);
    if (!validateErrors.isEmpty()) {
      return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: validateErrors,
      });
    } else {
      const { values } = req.body;
      const color: string = "#cccccc";
      var currentTime = new Date();
      const connection = mysql.createConnection(CONNECTION_CONFIG);
      const execQuery = util.promisify(connection.query.bind(connection));
      bcrypt.hash(values.inputedPassword, 10).then(async (hash: string) => {
        try {
          const signupData = await execQuery(register, [
            values.inputedUsername,
            hash,
            values.inputedEmail,
            color,
            1,
            0,
            1,
            currentTime,
            1,
          ]);
          //console.log("success");

          const payloadValue = {
            id: signupData.insertId,
            username: values.inputedUsername,
            userimage: "",
            usercolor: color,
            userfirstname: "",
            usersurname: "",
            userquote: " ",
            userbillboard1: "",
            userbillboard2: "",
            biography: "",
          };

          const days30inseconds = 60 * 60 * 24 * 30 * 1000;
          const CurrentTimePlusSecs = new Date(
            new Date().getTime() + 60 * 60 * 24 * 30 * 1000
          );
          const accessToken = createTokensUpdate(payloadValue);
          //res.clearCookie("accesst");
          //const tokenxx = req.cookies.accesst;
          //const user = jwt_decode(tokenxx);
          ///setting the cookie
          return res
            .cookie("accesst", accessToken, {
              sameSite: "strict",
              expires: CurrentTimePlusSecs,
              maxAge: days30inseconds,
              httpOnly: true,
              //secure: true,
            })
            .send({ payload: payloadValue });
        } catch (err: any) {
          console.error(err.code);
          if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
            return res.send({ message: "username not unique" });
          } else {
            return res.send({ message: "error" });
          }
        }
      });
    }
  }
);

app.listen("1000", (): any => {
  console.log("running");
});
