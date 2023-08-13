var knex = require("../database/connection");

class Auxiliares{

    async getAuxiliares(tp){
        try{
          var result = [];
            
          result = await knex.select(["id_auxiliares"])
          .column(knex.raw("concat(codigo, '-', descricao) as nome"))
          .table("auxiliares").where({tipo: tp})//.orderBy('codigo', 'asc');
          .orderByRaw('codigo::decimal');
                    
          return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async getAuxiliaresEd(tp){
        try{
          var result = [];
            
          result = await knex.select(["id_auxiliares", 'codigo', 'descricao'])
          .table("auxiliares").where({tipo: tp})
          .orderByRaw('codigo::decimal');
                    
          return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }

    async create(dados){
        try{
          var { codigo, descricao, tipo} = dados;
    
          await knex.insert({codigo, descricao, tipo}).table("auxliares");
        }catch(err){
            console.log(err);
        }
    } 

    async update(dados){
        try{
          var { id_auxiliares, codigo, descricao, tipo } = dados;
          
          await knex('auxiliares').where('id_auxiliares', id_auxiliares)
          .update({ codigo, descricao, tipo });
          
        }catch(err){
            console.log(err);
        }
    } 

    async delete(id){
        try{
          
          await knex('auxiliares').where('id_auxiliares', id)
          .update({ deleted: 1 });
          
        }catch(err){
            console.log(err);
        }
      } 

}

module.exports = new Auxiliares();