const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ msg: "Unauthorized access" })
  }

  try {
    const [type, token] = authorization.split(" ")

    if (type !== "Bearer" && type !== "Token") {
      return res.status(401).json({ msg: "Unauthorized access" })
    }

    const decoded = jwt.verify(token, process.env.SECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" })
  }
}
