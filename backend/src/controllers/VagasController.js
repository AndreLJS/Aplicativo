const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const [count] = await connection("vagas").count();

    const vagas = await connection("vagas")
      .join("company", "company.id", "=", "vagas.company_id")
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        "vagas.*",
        "company.name",
        "company.email",
        "company.whatsapp",
        "company.city",
        "company.uf",
      ]);
    const total = count["count(*)"] || count["count"];

    res.header("x-total-count", total);
    return res.json(vagas);
  },
  async store(req, res) {
    const {
      title,
      description,
      qualification,
      formation,
      workplace,
      value,
    } = req.body;
    const company_id = req.headers.authorization;

    const [id] = await connection("vagas").insert({
      title,
      description,
      qualification,
      formation,
      workplace,
      value,
      company_id,
    });
    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const company_id = req.headers.authorization;

    const vagas = await connection("vagas")
      .where("id", id)
      .select("company_id")
      .first();

    if (vagas.company_id !== company_id) {
      return res.status(401).json({ error: "Operation not permitted." });
    }
    await connection("vagas").where("id", id).delete();

    return res.status(204).send();
  },
};
