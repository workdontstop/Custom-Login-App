const util = require("util");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
import express = require("express");
var app: Application = express();
var cors = require("cors");

app.use(
  cors({
    credentials: true,
    origin: "http://192.168.43.136:3000",
  })
);

app.use(express.json());
app.use(cookieParser());
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("./jwt");
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

const register = `INSERT INTO members (username,password,email,color,status,notification,tutorial,date) VALUES (?,?,?,?,?,?,?,?)`;
const login = `SELECT username,id,password,color,profile_image FROM members WHERE username =?`;
const checkpassword = `SELECT id FROM members WHERE  username =?`;

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
            username: logindata[0].username,
            userimage: logindata[0].profile_image,
            usercolor: logindata[0].color,
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
          await execQuery(register, [
            values.inputedUsername,
            hash,
            values.inputedEmail,
            color,
            1,
            0,
            1,
            currentTime,
          ]);
          //console.log("success");
          return res.send({ message: "Registration Successful" });
        } catch (err) {
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
