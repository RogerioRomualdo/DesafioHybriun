const Worker = require("../models/Worker");

module.exports = {
  async validateWorkerStore(reqBody) {
    const { name, cpf, phone, email, occupationId } = reqBody;

    if (!name || !cpf || !phone || !email || !occupationId) {
      return false;
    }
    return true;
  },

  async validateWorkerUpdate(reqBody) {
    const { name, cpf, phone, email, password } = reqBody;

    if (!name && !cpf && !phone && !email && !password) return false;
    return true;
  },

  async validateOccupationStore(reqBody) {
    const { name, shiftStart, shiftEnd, breakStart, breakEnd } = reqBody;

    if (name || shiftStart || shiftEnd || breakStart || breakEnd) return false;
  },

  async validateClockinUpdate(reqBody) {
    const { checkIn, checkOut, breakStart, breakEnd } = reqBody;

    if (!checkIn && !checkOut && !breakStart && !breakEnd) return false;
    return true;
  },

  async validateClockinStore(reqBody, reqParams) {
    const { id } = reqParams;
    const { checkIn, checkOut, breakStart, breakEnd } = reqBody;

    if (!checkIn && !checkOut && !breakStart && !breakEnd) return false;
    if (!(await Worker.findOne({ where: { id } }))) return false;
    return true;
  },

  async validateLoginAttempt(reqBody) {
    const { email, password } = reqBody;

    if (!email || !password) return false;
    if (!(await Worker.findOne({ where: { email } }))) return false;
    return true;
  },
};
