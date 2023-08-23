var knex = require("../database/connection");

class Identifica {
  //id_identificacao, id_captura, responsavel, dt_identificacao, created_at, updated_at, id_usuario
  //id_identificacao_det, id_identificacao, amostra, id_especie, macho, femea, femea_ing, larva, ninfa, pool

  async create(dados) {
    try{
      var { id_captura, responsavel, dt_identificacao, id_usuario } = dados;

      const [cod] = await knex.insert({id_captura, responsavel, dt_identificacao, id_usuario})
      .table("identificacao")
      .returning("*");

      return cod;

    }catch(err){
        console.log(err);
    }
  }

  async createDet(dados) {
    try{
      var { id_identificacao, amostra, id_especie, macho, femea, femea_ing, larva, ninfa, pool } = dados;

      macho = macho == '' ? 0 : macho;
      femea = femea == '' ? 0 : femea;
      femea_ing = femea_ing == '' ? 0 : femea_ing;
      larva = larva == '' ? 0 : larva;
      ninfa = ninfa == '' ? 0 : ninfa;
console.log(femea);
      await knex.insert({id_identificacao, amostra, id_especie, macho, femea, femea_ing, larva, ninfa, pool}).table("identificacao_det");
    }catch(err){
        console.log(err);
    }
  }

  async update(dados){
    try{
      var { id_identificacao, id_captura, responsavel, dt_identificacao } = dados;
      
      await knex('identificacao').where('id_identificacao', id_identificacao)
      .update({ id_captura, responsavel, dt_identificacao });
      
    }catch(err){
        console.log(err);
    }
  } 

  async updateDet(dados){
    try{
      var { id_identificacao_det, id_identificacao, amostra, id_especie, macho, femea, femea_ing, larva, ninfa, pool } = dados;
      
      await knex('identificacao_det').where('id_identificacao_det', id_identificacao_det)
      .update({ id_identificacao, amostra, id_especie, macho, femea, femea_ing, larva, ninfa, pool });
      
    }catch(err){
        console.log(err);
    }
  } 

  async delete(id){
    try{
      
      await knex('identificacao').where('id_identificacao', id)
      .delete();
      
    }catch(err){
        console.log(err);
    }
  } 

  async deleteDet(id){
    try{
      
      await knex('identificacao_det').where('id_identificacao_det', id)
      .delete();
      
    }catch(err){
        console.log(err);
    }
  } 

  async getIdentificas(filt){
    try{
        var result =  await knex.select(["i.id_identificacao", "m.nome as municipio", "c.codigo", "i.dt_identificacao", "i.id_usuario"])
        .table("identificacao as i")
        .join('captura as c','c.id_captura','=','i.id_captura')
        .join('municipio as m','m.id_municipio','=','c.id_municipio');
       // .where({'l.id_municipio': mun}); //usar o filtro aqui

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getIdentificaDets(id){
    try{
        var result =  await knex.select(["i.id_identificacao_det","i.id_identificacao", "i.amostra", "i.pool"])
        .column(knex.raw("CONCAT(g.nome,' ',e.nome) as especie"))
        .table("identificacao_det as i")
        .join('especie as e','e.id_especie','=','i.id_especie')
        .join('genero as g','g.id_genero','=','e.id_genero')
        .where({'i.id_identificacao': id}); //usar o filtro aqui

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getIdentifica(id){
    try{
        var result =  await knex.select(['i.*', 'c.codigo'])
        .column(
          knex.raw(
            "concat(to_char(m.id_municipio, '000'), ' - ', m.nome) as municipio"
          )
        )
        .table("identificacao as i")
        .join('captura as c','c.id_captura','=','i.id_captura')
        .join('municipio as m','m.id_municipio','=','c.id_municipio')
        .where({'i.id_identificacao': id}); 

        return result[0];
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getIdentificaDet(id){
    try{
        var result =  await knex.select('*')
        .table("identificacao_det as i")
        .where({'i.id_identificacao_det': id}); 

        return result[0];
    }catch(err){
        console.log(err);
        return [];
    }
  }
}

module.exports = new Identifica();