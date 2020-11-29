const jwt = require("jsonwebtoken");
const { Unauthorize } = require("../utils/error");

exports.isAuthorized = (req, _, next) => {
  const auth = req.headers.authorization;
  if (!auth) next(new Unauthorize("No authorization token supplied"));
  const token = auth.replace(/bearer\s+/i, "");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (ex) {
    if (ex instanceof jwt.JsonWebTokenError) {
      next(new Unauthorize(ex.message));
    }
    next(ex);
  }
};
