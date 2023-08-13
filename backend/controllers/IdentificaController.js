var Identifica = require("../models/Identifica");

class IdentificaController {
  async create(req, res) {
    try {
      var dados = req.body;
      var result = await Identifica.create(dados);
      res.status(200);
    
      res.json({ msg: "Identificação cadastrada!", master: result });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async createDet(req, res) {
    try {
      var dados = req.body;
      var result = await Identifica.createDet(dados);
      res.status(200);
      res.json({ msg: "Identificação cadastrada!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getIdentificas(req, res) {
    var id = req.params.id;
    var locs = await Identifica.getIdentificas(id);
    res.json(locs);
  }

  async getIdentificaDet(req, res) {
    var id = req.params.id;
    var locs = await Identifica.getIdentificaDet(id);
    res.json(locs);
  }

  async update(req, res) {
    try {
      var dados = req.body;
      var result = await Identifica.update(dados);
      res.status(200);
      res.json({ msg: "Identificação alterada!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateDet(req, res) {
    try {
      var dados = req.body;
      var result = await Identifica.updateDet(dados);
      res.status(200);
      res.json({ msg: "Identificação alterada!" });
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async getIdentificas(req, res) {
    var filter = req.params.filter;
    var locs = await Identifica.getIdentificas(filter);
    res.json(locs);
  }

  async getIdentificaDets(req, res) {
    var master = req.params.master;
    var locs = await Identifica.getIdentificaDets(master);
    res.json(locs);
  }

  async getIdentifica(req, res) {
    var id = req.params.id;
    var locs = await Identifica.getIdentifica(id);
    res.json(locs);
  }

  async getIdentificaDet(req, res) {
    var id = req.params.id;
    var locs = await Identifica.getIdentificaDet(id);
    res.json(locs);
  }

  async delete(req, res) {
    var id = req.params.id;
    var result = await Identifica.delete(id);
    res.status(200);
    res.json({ msg: "Identificação excluída!" });
  }

  async deleteDet(req, res) {
    var id = req.params.id;
    var result = await Identifica.deleteDet(id);
    res.status(200);
    res.json({ msg: "Identificação excluída!" });
  }
}

module.exports = new IdentificaController();
