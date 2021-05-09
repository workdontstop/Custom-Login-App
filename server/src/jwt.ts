const { sign, verify } = require("jsonwebtoken");

const createTokens = (logindata: any) => {
  const accessToken = sign(
    { username: logindata.username, id: logindata.id },
    "jwtsecret"
  );

  return accessToken;
};

const validateToken = (req: any, res: any, next: any) => {
  const accessToken = req.cookies["access-token"];

  if (!accessToken)
    return res.status(400).json({ error: "user not authenthicated" });
  try {
    const validToken = verify(accessToken, "jwtsecret");
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken };
