var knex = require("../database/connection");

class Codend{
//id_codend, id_municipio, logradouro, numero, complemento, id_area, id_quarteirao, codigo, created_at, updated_at, id_usuario
  async create(dados){
    try{
      var { id_municipio, logradouro, numero, complemento, id_area, fant_area, id_quarteirao, fant_quart, id_usuario } = dados;

      await knex.insert({id_municipio, logradouro, numero, complemento, id_area, fant_area, id_quarteirao, fant_quart, id_usuario}).table("codend");
    }catch(err){
        console.log(err);
    }
  } 

  async getCodend(id){
    try{
        var result =  await knex.select(["c.id_codend", "c.logradouro", "c.numero", "c.complemento", "c.id_area", "c.id_quarteirao", "c.id_municipio", "m.nome as municipio"])
        .table("codend as c")
        .join('municipio as m','m.id_municipio','=','c.id_municipio')
        .where({'c.id_codend': id}); //usar o filtro aqui
console.log(id)
        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async update(dados){
    try{
      var { id_codend, logradouro, numero, complemento, id_area, fant_area, id_quarteirao, fant_quart } = dados;
      
      await knex('codend').where('id_codend', id_codend)
      .update({ logradouro, numero, complemento, id_area, fant_area, id_quarteirao, fant_quart });
      
    }catch(err){
        console.log(err);
    }
  } 

  async getCodends(filt){
    try{
        var result =  await knex.select(["c.id_codend", "m.nome as municipio", "c.fant_quart as quarteirao", "c.codigo"])
        .column(knex.raw("CONCAT(TRIM(c.logradouro), ', ', TRIM(c.numero)) as endereco"))
        .table("codend as c")
        .join('municipio as m','m.id_municipio','=','c.id_municipio');
       // .where({'l.id_municipio': mun}); //usar o filtro aqui

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }
  
  async getCodendsByMun(mun){
    try{
        var result =  await knex.select(["c.id_codend"])
        .column(knex.raw("CONCAT(c.codigo, ' - (', TRIM(c.logradouro), ', ', TRIM(c.numero), ')') as codigo"))
        .table("codend as c")
        .where({'c.id_municipio': mun}); 

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

}

module.exports = new Codend();