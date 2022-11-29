const jwt = require("jsonwebtoken");
const userService = require("../service/userService");

exports.Authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    const exists = await userService.checkIfUserExists(req.userId);
    if (!exists) {
      throw new OslashException(401, "User not found");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Unauthorized");
  }
};
