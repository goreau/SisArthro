var Especie = require("../models/Especie");

class EspecieController {
  async createGen(req, res) {
    try {
      var dados = req.body;
      var result = await Especie.createGen(dados);
      res.status(200);
      res.json({ msg: "Gênero cadastrado!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async createSpp(req, res) {
    try {
      var dados = req.body;
      var result = await Especie.createSpp(dados);
      res.status(200);
      res.json({ msg: "Espécie cadastrada!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getGenero(req, res) {
    var id = req.params.id;
    var locs = await Especie.getGenero(id);
    res.json(locs);
  }

  async getEspecie(req, res) {
    var id = req.params.id;
    var locs = await Especie.getEspecie(id);
    res.json(locs);
  }

  async getGeneros(req, res) {
    var filter = req.params.filter;
    var locs = await Especie.getGeneros(filter);
    res.json(locs);
  }

  async getEspecies(req, res) {
    var filter = req.params.filter;
    var locs = await Especie.getEspecies(filter);
    res.json(locs);
  }

  async updateGen(req, res) {
    try {
      var dados = req.body;
      var result = await Especie.updateGen(dados);
      res.status(200);
      res.json({ msg: "Gênero alterado!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateSpp(req, res) {
    try {
      var dados = req.body;
      var result = await Especie.updateSpp(dados);
      res.status(200);
      res.json({ msg: "Espécie alterada!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getEspecies(req, res) {
    var filter = req.params.mun;
    var locs = await Especie.getEspecies(filter);
    res.json(locs);
  }

  async deleteGen(req, res) {
    var id = req.params.id;
    var result = await Especie.deleteGen(id);
    res.status(200);
    res.json({ msg: "Gênero excluído!" });
  }

  async deleteSpp(req, res) {
    var id = req.params.id;
    var result = await Especie.deleteSpp(id);
    res.status(200);
    res.json({ msg: "Espécie excluída!" });
  }

  async getCombo(req, res) {
    var filter = req.params.mun;
    var locs = await Especie.getCombo(filter);
    res.json(locs);
  }
}

module.exports = new EspecieController();
