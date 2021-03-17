const Worker = require("../models/Worker");
const { validateLoginAttempt } = require("../helpers/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = {
  async auth(req, res) {
    try {
      if (!validateLoginAttempt(req.body)) throw err;

      const { email, password } = req.body;

      const worker = await Worker.findOne({
        attributes: ["email", "id"],
        where: { email },
        include: {
          association: "login",
          attributes: ["password"],
        },
      });

      if (!worker) return res.status(400).send({ error: "User not found" });

      if (!(await bcrypt.compare(password, worker.login.password)))
        return res.status(400).send({ error: "Incorrect password" });

      res.json(
        jwt.sign({ id: worker.id }, authConfig.secret, { expiresIn: 86400 })
      );
    } catch (err) {
      console.log(console.error());
    }
  },
};
