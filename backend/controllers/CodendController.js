var Codend = require("../models/Codend");

class CodendController {
  async create(req, res) {
    try {
      var dados = req.body;
      var result = await Codend.create(dados);
      res.status(200);
      res.json({ msg: "Endereço cadastrado!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getCodend(req, res) {
    var id = req.params.id;
    var locs = await Codend.getCodend(id);
    res.json(locs);
  }

  async update(req, res) {
    try {
      var dados = req.body;
      var result = await Codend.update(dados);
      res.status(200);
      res.json({ msg: "Endereço alterado!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getCodends(req, res) {
    var filter = req.params.mun;
    var locs = await Codend.getCodends(filter);
    res.json(locs);
  }

  async getCodendsByMun(req, res) {
    var mun = req.params.mun;
    var locs = await Codend.getCodendsByMun(mun);
    res.json(locs);
  }
}

module.exports = new CodendController();
