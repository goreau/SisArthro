var knex = require("../database/connection");

class Localidade{

  async create(dados){
    try{
      var { id_municipio, nome, id_usuario } = dados;

      await knex.insert({id_municipio, nome, id_usuario}).table("localidade");
    }catch(err){
        console.log(err);
    }
  } 

  async getLocalidade(id){
    try{
        var result =  await knex.select(["l.id_localidade", "l.nome", "l.codigo", "l.id_municipio", "m.nome as municipio"])
        .table("localidade as l")
        .join('municipio as m','m.id_municipio','=','l.id_municipio')
        .where({'l.id_localidade': id}); //usar o filtro aqui

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async update(dados){
    try{
      var { nome, id_localidade } = dados;
      
      await knex('localidade').where('id_localidade', id_localidade)
      .update({ nome });
      
    }catch(err){
        console.log(err);
    }
  } 

  async delete(id){
    try{
      
      await knex('localidade').where('id_localidade', id)
      .update({ deleted: 1 });
      
    }catch(err){
        console.log(err);
    }
  } 

  async getLocalidades(filt){
    try{
        var result =  await knex.select(["l.id_localidade", "l.nome", "l.codigo", "m.nome as municipio"])
        .column(knex.raw("to_char(created_at, 'dd/mm/yyyy') as data"))
        .table("localidade as l")
        .join('municipio as m','m.id_municipio','=','l.id_municipio')
        .where({'l.deleted': 0}); //usar o filtro aqui

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
}
  
  async getLocalidadesByMun(mun){
    try{
        var result =  await knex.select(["l.id_localidade", "l.nome","m.nome as municipio"])
        .table("localidade as l")
        .join('municipio as m','m.id_municipio','=','l.id_municipio')
        .where({'l.id_municipio': mun}); 

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

}

module.exports = new Localidade();