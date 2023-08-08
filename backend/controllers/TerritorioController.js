var Territorio = require("../models/Territorio");
const fetch = require('node-fetch');

class TerritorioController{
    async getMunicipios(req, res){
        var id = req.params.id;
        var muns = await Territorio.getMunicipios(id);
        res.json(muns);
    }

    async getCodsis(req, res){
        var id = req.params.id;
        var muns = await Territorio.getCodsis(id);
        res.json(muns);
    }


    async getTerritorio(req, res){
        var id_mun = req.params.id;
        var territorio = await Territorio.getTerritorio(id_mun);
        res.json(territorio);
    }

    async getSisawebArea(req, res){
        var id_mun = req.params.id;
       
        var url = process.env.SISAWEB_API;

        fetch(url + 'area.php?id='+id_mun)
        .then(res => res.json())
        .then(json => res.json(json));
    }

    async getSisawebQuarteirao(req, res){
        var id_area = req.params.id;
        var url = process.env.SISAWEB_API;
        
        fetch(url + `quarteirao.php?id=${id_area}`)
        .then(res => res.json())
        .then(json => res.json(json));
    }

}

module.exports = new TerritorioController();