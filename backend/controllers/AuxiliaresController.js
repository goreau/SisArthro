var Auxiliares = require("../models/Auxiliares");

class AuxiliaresController{
    async getAuxiliares(req, res){
        var tp = req.params.tp;
        var auxs = await Auxiliares.getAuxiliares(tp);
        res.json(auxs);
    }

    async getAllData(req, res){
      var auxs = await Auxiliares.getAllData();
      res.json(auxs);
    }

    async mobExporta(req, res){
      try {
        var dados = req.body;
        var result = await Auxiliares.mobExporta(dados);
        res.status(200);
        res.json({status: 'ok', result: result});
      } catch (error) {
        res.status(400).send(error);
      }
    }

    async getAuxiliaresEd(req, res){
        var tp = req.params.tp;
        var auxs = await Auxiliares.getAuxiliaresEd(tp);
        res.json(auxs);
    }

    async create(req, res) {
        try {
          var dados = req.body;
          var result = await Auxiliares.create(dados);
          res.status(200);
          res.json({ msg: "Informação cadastrada!" });
        } catch (error) {
          res.status(400).send(error);
        }
      }

      async update(req, res) {
        try {
          var dados = req.body;
          var result = await Auxiliares.update(dados);
          res.status(200);
          res.json({ msg: "Informação alterada!" });
        } catch (error) {
          res.status(400).send(error);
        }
      }

      async delete(req, res) {
        var id = req.params.id;
        var result = await Auxiliares.delete(id);
        res.status(200);
        res.json({ msg: "Informação excluída!" });
      }

}

module.exports = new AuxiliaresController();