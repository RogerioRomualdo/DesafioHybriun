const { validateOccupationStore } = require("../helpers/validation");
const Occupation = require("../models/Occupation");

module.exports = {
  async index(req, res) {
    const occupations = await Occupation.findAll({
      attributes: ["name", "shiftStart", "shiftEnd", "breakStart", "breakEnd"],
    });
    res.json(occupations);
  },

  async store(req, res) {
    try {
      if (!validateOccupationStore(req.body)) throw err;

      const { name, shiftStart, shiftEnd, breakStart, breakEnd } = req.body;

      const occupation = await Occupation.create({
        name,
        shiftStart,
        shiftEnd,
        breakStart,
        breakEnd,
      });

      res.json("Occupation created");
    } catch (err) {
      res.status(400).send({ error: "Server Error!" });
    }
  },
};
