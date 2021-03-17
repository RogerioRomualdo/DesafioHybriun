const Clockin = require("../models/Clockin");
const Worker = require("../models/Worker");
const {
  validateClockinStore,
  validateClockinUpdate,
} = require("../helpers/validation");

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    await Worker.findOne({ where: { id } });
  },

  async store(req, res) {
    try {
      if (!validateClockinStore(req.body, req.params)) throw err;

      const { id } = req.params;
      const { checkIn, checkOut, breakStart, breakEnd } = req.body;
      const { id: workerId } = await Worker.findOne({ where: { id } });

      Clockin.create({ workerId, checkIn, checkOut, breakStart, breakEnd });
      return res.json("Criado");
    } catch (err) {
      res.status(500).json({ message: "Server error!" });
    }
  },

  async update(req, res) {
    try {
      if (!validateClockinUpdate()) throw err;

      const { workerId } = req.params;
      const { checkIn, checkOut, breakStart, breakEnd } = req.body;

      const clockin = await Clockin.findOne({
        attributes: ["id"],
        order: [["createdAt", "DESC"]],
        include: {
          association: "worker",
          attributes: [],
          where: { id: workerId },
        },
      });

      await Clockin.update(
        { workerId, checkIn, checkOut, breakStart, breakEnd },
        { where: { id: clockin.id } }
      );

      res.json("O clockin foi atualizado!");
    } catch (err) {
      res.status(500).json({ message: "Server error!" });
    }
  },
};
