const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    res.json(user)
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" })
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err
      res.json({ token })
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json(user)
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.updateUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    const updateData = { username, email }

    if (password) {
      const salt = await bcryptjs.genSalt(10)
      updateData.password = await bcryptjs.hash(password, salt)
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error })
  }
}
