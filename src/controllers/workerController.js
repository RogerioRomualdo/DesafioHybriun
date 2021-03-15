const Worker = require("../models/Worker");
const Login = require("../models/Login");

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
    const { password, isAdmin } = req.body;

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

    res.json("Usuário criado com sucesso");
  },
};
