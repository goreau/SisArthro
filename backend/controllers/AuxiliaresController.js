var Auxiliares = require("../models/Auxiliares");

class AuxiliaresController{
    async getAuxiliares(req, res){
        var tp = req.params.tp;
        var auxs = await Auxiliares.getAuxiliares(tp);
        res.json(auxs);
    }

}

module.exports = new AuxiliaresController();