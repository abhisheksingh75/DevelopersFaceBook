const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = function(req, res, next) {
  //get token header
  const token = req.header("x-auth-token")

  //check if token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" })
  }
  //try catch
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"))
    req.user = decoded.users
    next()
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" })
  }
}
