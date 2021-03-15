const Clockin = require("../models/Clockin");
const Worker = require("../models/Worker");

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    await Worker.findOne({ where: { id } });
  },

  async store(req, res) {
    const { id } = req.params;
    const { checkIn, checkOut, breakStart, breakEnd } = req.body;

    try {
      if (!checkIn && !checkOut && !breakStart && !breakEnd) throw err;
      const { id: workerId } = await Worker.findOne({ where: { id } });

      Clockin.create({ workerId, checkIn, checkOut, breakStart, breakEnd });
      return res.json("Criado");
    } catch (err) {
      res.status(500).json({ message: "Server error!" });
    }
  },

  async update(req, res) {
    const { workerId } = req.params;
    const { checkIn, checkOut, breakStart, breakEnd } = req.body;

    try {
      if (checkIn || checkOut || breakStart || breakEnd) {
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
      } else throw new err();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error!" });
    }
  },
};
