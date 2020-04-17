const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const company_id = req.headers.authorization;

    const vagas = await connection("vagas")
      .where("company_id", company_id)
      .select("*");

    return res.json(vagas);
  },
};
