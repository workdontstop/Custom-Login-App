const { sign, verify } = require("jsonwebtoken");
const secretKey =
  "nin$etails54890$$60x1breakneck20119ki77777$$ngofhsaganatlion71qqxxzigoid00910cwcdmekirokuvira$@sagnalgatapuika66$$$$xxfax";

const createTokens = (logindata: any) => {
  const accessToken = sign(
    { username: logindata[0].username, id: logindata[0].id },
    secretKey
  );

  return accessToken;
};

const createTokensUpdate = (logindata: any) => {
  const accessToken = sign(
    { username: logindata.username, id: logindata.id },
    secretKey
  );

  return accessToken;
};

const validateToken = (req: any, res: any, next: any) => {
  const accessToken = req.cookies["accesst"];

  if (!accessToken)
    return res.status(400).json({ error: "user not authenthicated" });
  try {
    const validToken = verify(accessToken, secretKey);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { createTokens, validateToken, createTokensUpdate };
