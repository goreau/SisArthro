var knex = require("../database/connection");

class Especie {
  //id_genero, nome, tipo
  //id_especie, id_genero, nome

  async createGen(dados) {
    try{
      var { nome, tipo } = dados;

      await knex.insert({nome, tipo}).table("genero");
    }catch(err){
        console.log(err);
    }
  }

  async createSpp(dados) {
    try{
      var { id_genero, nome } = dados;

      await knex.insert({id_genero, nome}).table("especie");
    }catch(err){
        console.log(err);
    }
  }

  async updateGen(dados){
    try{
      var { id_genero, nome, tipo } = dados;
      
      await knex('genero').where('id_genero', id_genero)
      .update({ nome, tipo });
      
    }catch(err){
        console.log(err);
    }
  } 

  async updateSpp(dados){
    try{
      var { id_especie, id_genero, nome } = dados;
      
      await knex('especie').where('id_especieo', id_especie)
      .update({ id_genero, nome });
      
    }catch(err){
        console.log(err);
    }
  } 

  async deleteGen(id){
    try{
      
      await knex('genero').where('id_genero', id)
      .delete();
      
    }catch(err){
        console.log(err);
    }
  } 

  async deleteSpp(id){
    try{
      
      await knex('especie').where('especie', id)
      .delete();
      
    }catch(err){
        console.log(err);
    }
  } 

  async getGenero(id){
    try{
        var result =  await knex.select('*')
        .table("genero")
        .where({'id_genero': id}); 

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getEspecie(id){
    try{
        var result =  await knex.select('*')
        .table("especie")
        .where({'id_especie': id}); 

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getGeneros(filter){
    try{
        var result =  await knex.select('*')
        .table("genero")
        .orderBy('nome');
       // .where({'id_genero': id}); 

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getEspecies(filter){
    try{
        var result =  await knex.select(['e.id_especie','g.nome as genero', 'e.nome'])
        .table("especie as e")
        .join('genero as g','g.id_genero','=','e.id_genero')
        .orderBy('genero');
       // .where({'id_especie': id}); 

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getCombo(filt){
    try{
        var result =  await knex.select(["e.id_especie"])
        .column(knex.raw("CONCAT(TRIM(g.nome), ' ', TRIM(e.nome)) as especie"))
        .table("especie as e")
        .join('genero as g','g.id_genero','=','e.id_genero')
        .orderBy('especie','asc')
      //  .orderBy('e.nome','asc')
       // .where({'l.id_municipio': mun}); //usar o filtro aqui

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }
}

module.exports = new Especie();