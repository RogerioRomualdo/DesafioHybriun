const Worker = require("../models/Worker");

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

    const worker = await Worker.create({
      name,
      cpf,
      phone,
      email,
      occupationId,
    });

    res.json(worker);
  },
};
