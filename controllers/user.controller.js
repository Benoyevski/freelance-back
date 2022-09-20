const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.user = {
  getStudents: async (req, res) => {
    const data = await User.find({});
    res.json(data);
  },

  login: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });
    if (!candidate) {
      return res.status(401).json("User not find");
    }

    const valid = await bcrypt.compare(password, candidate.password);
    if (!valid) {
      return res.status(401).json("password wrong");
    }
    const payload = {
      id: candidate._id,
    };
    const token = await jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "95h",
    });
    res.json({
      token,
      id: candidate._id,
    });
  },
  auth: async (req, res) => {
    try {
      const { login, password } = req.body;
      const hash = await bcrypt.hash(password, 7);
      const user = await User.create({

        role: req.body.role,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        mail: req.body.mail,

        login: login,
        password: hash,
      });
      res.json(user);
    } catch (e) {
      res.json({ error: e });
    }
  },

  updateStudent: async (req, res) => {
    const data = await User.findByIdAndUpdate(req.params.id, req.body)
    res.json(data)
  },
  deleteStudent: async (req, res) => {
    const data = await User.findByIdAndDelete(req.params.id)
    res.json(data)
  },
};
