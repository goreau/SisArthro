var knex = require("../database/connection");

class Auxiliares{

    async getAuxiliares(tp){
        try{
          var result = [];
            
          result = await knex.select(["id_auxiliares"])
          .column(knex.raw("concat(codigo, '-', descricao) as nome"))
          .table("auxiliares").where({tipo: tp}).orderBy('codigo', 'asc');
                    
          return result;
        }catch(err){
            console.log(err);
            return [];
        }
    }
}

module.exports = new Auxiliares();