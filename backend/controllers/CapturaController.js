var Captura = require("../models/Captura");

class CapturaController{
    async create(req, res) {
        try {
          var dados = req.body;
          var result = await Captura.create(dados);
          res.status(200);
          res.json({ msg: "Captura cadastrada!", data: result[0] });
        } catch (error) {
          res.status(400).send(error);
        }
    }

    async createDet(req, res) {
        try {
          var dados = req.body;
          var result = await Captura.createDet(dados);
          res.status(200);
          res.json({ msg: "Captura cadastrada!", data: result[0] });
        } catch (error) {
          res.status(400).send(error);
        }
    }

    async update(req, res) {
        try {
          var dados = req.body;
          var result = await Captura.update(dados);
          res.status(200);
          res.json({ msg: "Captura alterada!" });
        } catch (error) {
          res.status(400).send(error);
        }
    }

    async updateDet(req, res) {
        try {
          var dados = req.body;
          var result = await Captura.updateDet(dados);
          res.status(200);
          res.json({ msg: "Captura alterada!" });
        } catch (error) {
          res.status(400).send(error);
        }
      }

    async getCapturas(req, res){
        var filter = req.params.filter;
        var caps = await Captura.getCapturas(filter);
        res.json(caps);
    }

    async getCapturasDet(req, res){
        var master = req.params.master;
        var caps = await Captura.getCapturasDet(master);
        res.json(caps);
    }

    async getCaptura(req, res){
        var id = req.params.id;
        var cap = await Captura.getCaptura(id);
        res.json(cap);
    }

    async getCapturaDet(req, res){
        var id = req.params.id;
        var cap = await Captura.getCapturaDet(id);
        res.json(cap);
    }

}

module.exports = new CapturaController();