const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const mailer = require("../config/mailer");

const Worker = require("../models/Worker");
const Login = require("../models/Login");
const {
  validateWorkerStore,
  validateWorkerUpdate,
} = require("../helpers/validation");
const authConfig = require("../config/auth.json");

const mailTo = async (mail, password) => {
  mailer.sendMail(
    {
      to: mail,
      from: "sender@fake.com",
      template: "../mail/template",
      context: { password },
    },
    (err) => {
      if (err) return console.log(err);
      return console.log("Email sent");
    }
  );
};

module.exports = {
  async index(req, res) {
    const workers = await Worker.findAll(
      {
        attributes: ["name", "email", "phone"],
        include: [
          {
            association: "occupation",
            attributes: [
              "name",
              "shiftStart",
              "shiftEnd",
              "breakStart",
              "breakEnd",
            ],
          },
        ],
      },
      (err) => {
        if (err) res.status(500).json({ message: "Server Error!" });
      }
    );
    res.json(workers);
  },

  async store(req, res) {
    try {
      if (!(await validateWorkerStore(req.body, "store"))) throw err;

      const { name, cpf, phone, occupationId, isAdmin } = req.body;
      const email = req.body.email.toLowerCase();
      const password = crypto.randomBytes(10).toString("hex");

      const worker = await Worker.create({
        name,
        cpf,
        phone,
        email,
        occupationId,
      });

      await Login.create({
        password,
        isAdmin,
        workerId: worker.id,
      });

      await mailTo(email, password);

      res.json(
        jwt.sign({ id: worker.id }, authConfig.secret, { expiresIn: 86400 })
      );
    } catch (err) {
      res.status(500).json({ message: "Server error!" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, cpf, phone, email } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    try {
      if (!validateWorkerUpdate(req.body, "update")) throw err;

      if (name || cpf || phone || email)
        await Worker.update({ name, cpf, phone, email }, { where: { id } });

      if (password) {
        await Login.update({ password }, { where: { workerId: id } });
      }

      return res.json("Usuário atualizado");
    } catch (err) {
      if (err) res.status(500).json({ message: "Server error!" });
    }
  },
};
