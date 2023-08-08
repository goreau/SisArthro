var knex = require("../database/connection");

class Captura{
//id_captura, dt_captura, execucao, exec_3, zona, id_municipio, cod_sis, localidade, cod_loc, quadrante, agravo, atividade, equipe, obs, created_at, updated_at, id_usuario, codigo

//id_captura_det, id_captura, area, quadra, codend, coordenadas, metodo, ambiente, local_captura, num_arm, altura, hora_inicio, hora_final, temp_inicio, temp_final, umidade_inicio, umidade_final, amostra, quant_potes, fant_area, fant_quart
async create(dados){
  try{
    var { id_captura, dt_captura, execucao, exec_3, zona, id_municipio, cod_sis, localidade, cod_loc, quadrante, agravo, atividade, equipe, obs, id_usuario } = dados;

    await knex.insert({id_captura, dt_captura, execucao, exec_3, zona, id_municipio, cod_sis, localidade, cod_loc, quadrante, agravo, atividade, equipe, obs, id_usuario })
    .table("captura")
    .returning('*');
  }catch(err){
      console.log(err);
  }
}   

async createDet(dados){
  try{
    var { area, fant_area, quadra, fant_quart, codend, coordenadas, metodo, ambiente, local_captura, num_arm, altura, hora_inicio, hora_final, temp_inicio, temp_final, umidade_inicio, umidade_final, amostra, quant_potes } = dados;

    await knex.insert({area, fant_area, quadra, fant_quart, codend, coordenadas, metodo, ambiente, local_captura, num_arm, altura, hora_inicio, hora_final, temp_inicio, temp_final, umidade_inicio, umidade_final, amostra, quant_potes })
    .table("captura_det");
  }catch(err){
      console.log(err);
  }
}  

async update(dados){
  try{
    var { id_captura, dt_captura, execucao, exec_3, zona, id_municipio, cod_sis, localidade, cod_loc, quadrante, agravo, atividade, equipe, obs } = dados;
    
    await knex('captura').where('id_captura', id_captura)
    .update({ dt_captura, execucao, exec_3, zona, id_municipio, cod_sis, localidade, cod_loc, quadrante, agravo, atividade, equipe, obs });
    
  }catch(err){
      console.log(err);
  }
}   

async updateDet(dados){
  try{
    var { id_captura_det, area, fant_area, quadra, fant_quart, codend, coordenadas, metodo, ambiente, local_captura, num_arm, altura, hora_inicio, hora_final, 
      temp_inicio, temp_final, umidade_inicio, umidade_final, amostra, quant_potes } = dados;

    await knex('captura_det').where('id_captura_det', id_captura_det)
    .update({area, fant_area, quadra, fant_quart, codend, coordenadas, metodo, ambiente, local_captura, num_arm, altura, hora_inicio, hora_final, 
      temp_inicio, temp_final, umidade_inicio, umidade_final, amostra, quant_potes })
    .table("captura_det");
  }catch(err){
      console.log(err);
  }
} 


async getCapturas(filter){
      try{
        var result = [];
          
        result = await knex.select("*")
        .table("captura").orderBy('id_captura', 'desc');
                  
        return result;
      }catch(err){
          console.log(err);
          return [];
      }
  }

  async getCapturasDet(master){
    try{
      var result = [];
        
      result = await knex.select("*")
      .table("captura_det").where('id_captura','=',master).orderBy('id_captura_det', 'asc');
                
      return result;
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getCaptura(id){
    try{
      var result = [];
        
      result = await knex.select("*")
      .table("captura").where('id_captura', '=',id);
                
      return result[0];
    }catch(err){
        console.log(err);
        return [];
    }
  }

  async getCapturaDet(id){
    try{
      var result = [];
        
      result = await knex.select("*")
      .table("captura_det").where('id_captura_det', '=',id);
                
      return result[0];
    }catch(err){
        console.log(err);
        return [];
    }
}

}

module.exports = new Captura();