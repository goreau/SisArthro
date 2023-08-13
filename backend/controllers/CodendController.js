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

  async getCodendsByQuadra(req, res) {
    var qt = req.params.qt;
    var locs = await Codend.getCodendsByQuadra(qt);
    res.json(locs);
  }

  async delete(req, res) {
    var id = req.params.id;
    var result = await Codend.delete(id);
    res.status(200);
    res.json({ msg: "Endereço excluído!" });
  }
}

module.exports = new CodendController();
