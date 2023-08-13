var Localidade = require("../models/Localidade");

class LocalidadeController {
  async create(req, res) {
    try {
      var dados = req.body;
      var result = await Localidade.create(dados);
      res.status(200);
      res.json({ msg: "Localidade cadastrada!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getLocalidade(req, res) {
    var id = req.params.id;
    var locs = await Localidade.getLocalidade(id);
    res.json(locs);
  }

  async update(req, res) {
    try {
      var dados = req.body;
      var result = await Localidade.update(dados);
      res.status(200);
      res.json({ msg: "Localidade alterada!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getLocalidades(req, res) {
    var filter = req.params.mun;
    var locs = await Localidade.getLocalidades(filter);
    res.json(locs);
  }

  async getLocalidadesByMun(req, res) {
    var mun = req.params.mun;
    var locs = await Localidade.getLocalidades(mun);
    res.json(locs);
  }

  async delete(req, res) {
    var loc = req.params.id;
    var result = await Localidade.delete(loc);
    res.status(200);
    res.json({ msg: "Localidade excluída!" });
  }
}

module.exports = new LocalidadeController();
