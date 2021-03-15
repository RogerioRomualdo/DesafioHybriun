const Occupation = require("../models/Occupation");

module.exports = {
  async index(req, res) {
    const occupations = await Occupation.findAll({
      attributes: ["name", "shiftStart", "shiftEnd", "breakStart", "breakEnd"],
    });
    res.json(occupations);
  },
  async store(req, res) {
    const { name, shiftStart, shiftEnd, breakStart, breakEnd } = req.body;

    const occupation = await Occupation.create({
      name,
      shiftStart,
      shiftEnd,
      breakStart,
      breakEnd,
    });

    res.json(occupation);
  },
};
