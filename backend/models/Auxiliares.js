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

    async getAllData(){
      try{
        var result = [];
          
        result = await knex.select(["id_auxiliares as id", "tipo", "codigo", "descricao"])
        .table("auxiliares");
                  
        var ret = {'dados': result};
        return ret;
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

    criaLog(dados, result){
      var fs = require('fs');
      var now = new Date();
      var fileName = './mobile/recebido_' + now.getFullYear() + "-"+ this.pad(now.getMonth()+1) + "-" + this.pad(now.getDate()) +'.txt'
      var logStream = fs.createWriteStream(fileName, {flags: 'a+'});
      // use {flags: 'a'} to append and {flags: 'w'} to erase and write a new file
     // var horas = 
      var start = `${this.pad(now.getHours())}:${this.pad(now.getMinutes())} - `;
      logStream.write(start + dados);
      logStream.write('\r\n---> ' + JSON.stringify(result));
      logStream.end('\r\n==========================================\r\n');
    }

    pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
    }

    async mobExporta(dados){
      var result = [];
      
      var tudo = JSON.parse(dados.data);
      for(const element of tudo) {
        var res = await this.transMobile(element);
        if (res){
          result.push({'id': element.id_master, 'status': 1});
        } else {
          result.push({'id': element.id_master, 'status': 0});
        }
      }
 
      this.criaLog(dados.data, result);
      return result;
    }

  /*  async mobExportaok_(dados){
      var result = [];
      
      var tudo = JSON.parse(dados.data);

    //  tudo.map(async (element) => {
      //for(const element of tudo) {
      tudo.forEach(async element => {
       /* await this.transMobile(element).then(async (res)=>{
          result.push({'id': element.id_master, 'status': 1});
          console.log(res);
        });*/
   /*     var res = await this.transMobile(element);
          result.push({'id': element.id_master, 'status': 1});
          console.log(res);
        
      });
      this.criaLog(dados.data, result);
      return result;
    }*/

    async transMobile(element){
      var {id_master,dt_captura,execucao,exec_3,zona,id_municipio,cod_loc,quadrante,agravo,atividade,equipe,obs,id_usuario,detail} = element;
      var dets = JSON.parse(detail);
      try{
      await knex.transaction(function(trx) {
        return trx
          .insert({dt_captura,execucao,exec_3,zona,id_municipio,cod_loc,quadrante,agravo,atividade,equipe,obs,id_usuario}, 'id_captura')
          .into('captura')
          .then(function(ids) {
            dets.forEach((capt) => {
              capt.id_captura = ids[0].id_captura;
              capt.coordenadas = knex.raw(
                `ST_GeomFromText('POINT(${capt.latitude} ${capt.longitude})',4326)`
              );
              capt.amostra = capt.amostra == '' ? 0 : capt.amostra;
              capt.altura = capt.altura == '' ? 0 : capt.altura;
              delete capt.latitude;
              delete capt.longitude;
            });
            return trx('captura_det').insert(dets);
          });
      });
      return true;
    } catch (error){
      console.error(error);
      return false;
    }
    /*  .then(function(inserts) {
        return true;
      })
      .catch(function(error) {
        console.error(error);
        return false;
      });*/
    }

   /* async mobExportamoroles(dados){
      var result = [];
      this.criaLog(dados.data);
      var tudo = JSON.parse(dados.data);

      await Promise.all(tudo.map(async (element) => {
      //for(const element of tudo) {
     // tudo.forEach(async element => {
        var {id_master,dt_captura,execucao,exec_3,zona,id_municipio,cod_loc,quadrante,agravo,atividade,equipe,obs,id_usuario,detail} = element;
        var dets = JSON.parse(detail);
      //  var {area,quadra,codend,latitude,longitude,metodo,ambiente,local_captura,num_arm,altura,hora_inicio,hora_final,temp_inicio,temp_final,umidade_inicio,umidade_final,amostra,quant_potes,fant_area,fant_quart} = detail;
        knex.transaction(function(trx) {
          return trx
            .insert({dt_captura,execucao,exec_3,zona,id_municipio,cod_loc,quadrante,agravo,atividade,equipe,obs,id_usuario}, 'id_captura')
            .into('captura')
            .then(function(ids) {
              dets.forEach((capt) => {
                capt.id_captura = ids[0].id_captura;
                capt.coordenadas = knex.raw(
                  `ST_GeomFromText('POINT(${capt.latitude} ${capt.longitude})',4326)`
                );
                capt.amostra = capt.amostra == '' ? 0 : capt.amostra;
                capt.altura = capt.altura == '' ? 0 : capt.altura;
                delete capt.latitude;
                delete capt.longitude;
              });
              return trx('captura_det').insert(dets);
            });
        })
        .then(function(inserts) {
          result.push({'id': id_master, 'status': 1});
          console.log('marcou');
        })
        .catch(function(error) {
          console.error(error);
        });
      }))
      .then(function (){
        console.log('respondeu');
        return result;
      });
      
    }

    async mobExportaX(dados){
      try{
        var result = [];

        var tudo = JSON.parse(dados.data);
        

        tudo.forEach(async element => {
          
          
          
              const trxProvider = knex.transactionProvider();
              
              var {id_master,dt_captura,execucao,exec_3,zona,id_municipio,cod_loc,quadrante,agravo,atividade,equipe,obs,id_usuario,detail} = element;
              try{
                const trx = await trxProvider();
                var id_captura = await trx('captura').insert({dt_captura,execucao,exec_3,zona,id_municipio,cod_loc,quadrante,agravo,atividade,equipe,obs,id_usuario});
              } catch (erro) {
                trx.rollback();
              }
              
              var dets = JSON.parse(detail);
             // console.log(dets);
             const dTrx = await trxProvider();
              dets.forEach(async el => {               
                var {area,quadra,codend,latitude,longitude,metodo,ambiente,local_captura,num_arm,altura,hora_inicio,hora_final,temp_inicio,temp_final,umidade_inicio,umidade_final,amostra,quant_potes,fant_area,fant_quart} = el;
                  
                var ret = dTrx('captura_det').insert({id_captura, area,quadra,codend,latitude,longitude,metodo,ambiente,local_captura,num_arm,altura,hora_inicio,hora_final,temp_inicio,temp_final,umidade_inicio,umidade_final,amostra,quant_potes,fant_area,fant_quart});
              });
trx.commit();
dTrx.commit();
              result.push({'id': id_master, 'status': 1});
                   
        });
console.log('passou ');
        return result;
      }catch(err){
        console.log(err);
          trx.rollback();
      }
  } */

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