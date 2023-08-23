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

    async getTerritorios(req, res){
        var id = req.params.id;
        var tipo = req.params.tipo
        var territorios = await Territorio.getTerritorios(tipo, id);
        res.json(territorios);
    }

    async getSisawebArea(req, res){
        try {
            var id_mun = req.params.id;
       
            var url = process.env.SISAWEB_API;

            fetch(url + 'area.php?id='+id_mun)
            .then(res => res.json())
            .then(json => res.json(json));
        } catch (error) {
            res.status(400).send('Erro de comunicação com o Sisaweb');
        } 
    }

    async getSisawebQuarteirao(req, res){
        try {
            var id_area = req.params.id;
            var url = process.env.SISAWEB_API;
            
            fetch(url + `quarteirao.php?id=${id_area}`)
            .then(res => res.json())
            .then(json => res.json(json));
        } catch (error) {
            res.status(400).send('Erro de comunicação com o Sisaweb');
        } 
    }
}

module.exports = new TerritorioController();