const Worker = require("../models/Worker");
const Login = require("../models/Login");
const crypto = require("crypto");

//Nodemailer
const mailer = require("../config/mailer");
const { sendMail } = require("../config/mailer");

const mailTo = async (mail) => {
  mailer.sendMail(
    {
      to: mail,
      from: "sender@fake.com",
      template: "../mail/template",
    },
    (err) => {
      if (err) return console.log(err);
      return console.log("Email sent");
    }
  );
};

module.exports = {
  async index(req, res) {
    const workers = await Worker.findAll({
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
    });
    res.json(workers);
  },

  async store(req, res) {
    const { name, cpf, phone, email, occupationId } = req.body;
    const password = crypto.randomBytes(10).toString("hex");
    const { isAdmin } = req.body;

    try {
      if (
        !name ||
        !cpf ||
        !phone ||
        !email ||
        !occupationId ||
        !password ||
        !isAdmin
      ) {
        throw err;
      }
      await Worker.create({
        name,
        cpf,
        phone,
        email,
        occupationId,
      });
      const { id: workerId } = await Worker.findOne({ where: { email } });
      await Login.create({
        password,
        isAdmin,
        workerId,
      });
      sendMail(email);
      res.json("Usuário criado com sucesso");
    } catch (err) {
      res.status(500).json({ message: "Server error!" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, cpf, phone, email } = req.body;

    try {
      if (!name && !cpf && !phone && !email) throw err;

      Worker.update({ name, cpf, phone, email }, { where: { id } });
      res.json({ message: "Usuário modificado com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: "Server error!" });
    }
  },
};
