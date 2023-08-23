var knex = require("../database/connection");
const moment = require('moment');


class Relatorio{
  strFilter = [];

  async getCaptura(filter){
    try{
        var filtros = await this.createFilter(filter,'captura', true);

        var result =  knex.select(['c.id_captura as id', 'm.nome as municipio', 'l.nome as localidade'])
        .column(knex.raw("CASE execucao WHEN 1 THEN 'Estado' WHEN 2 THEN 'MUnicipio' ELSE 'Outros' END as execucao"))
        .column(knex.raw("CONCAT(aa.codigo, ' - ', aa.descricao) as agravo"))
        .column(knex.raw("CONCAT(av.codigo, ' - ', av.descricao) as atividade"))
        .column(knex.raw("array_agg(json_build_object('dets', d.*)) as detail"))
        .column(knex.raw("to_char(c.dt_captura, 'dd/mm/yyyy') as dt_captura"))
        .column(knex.raw("'1' as tp"))
        .table("captura as c")
        .join('municipio as m','m.id_municipio','=','c.id_municipio')
        .join('localidade as l','l.id_localidade','=','c.cod_loc')
        .join('auxiliares as az','az.id_auxiliares','=','c.zona')
        .join('auxiliares as aa','aa.id_auxiliares','=','c.agravo')
        .join('auxiliares as av','av.id_auxiliares','=','c.atividade')
        .join (knex.raw("(SELECT id_captura, d.fant_area, d.fant_quart, c.codigo as codend, CONCAT(ST_X(coordenadas),', ', ST_Y(coordenadas)) as coordenadas, CONCAT(am.codigo, '-',am.descricao) as metodo, " +
                    "CONCAT(aa.codigo, '-',aa.descricao) as ambiente, CONCAT(alc.codigo, '-',alc.descricao) as local_captura, amostra, quant_potes " +
                    "FROM captura_det d join codend c on d.codend=c.id_codend join auxiliares am on (am.id_auxiliares=d.metodo) join auxiliares aa on (aa.id_auxiliares=d.ambiente) " +
                    "join auxiliares alc on (alc.id_auxiliares=d.local_captura)) as d"
              ),'d.id_captura','=','c.id_captura')
        .groupBy(['tp','c.id_captura', 'c.dt_captura', 'm.nome', 'l.nome', 'execucao','aa.codigo','aa.descricao','av.codigo','av.descricao'])
        .modify(function(queryBuilder) {
          filtros.forEach(el => {
            queryBuilder.where(el.field, el.operator, el.value);
          });
        })

        return result;
    }catch(err){
        console.log(err);
        return [];
    }
  } 

  async getCapturaExp(filter){
    try{
        var filtros = await this.createFilter(filter,'captura', false);

        var result =  await knex.select(['m.nome as municipio', 'l.nome as localidade','d.fant_area', 'd.fant_quart', 'cd.codigo as codend', 'amostra', 'quant_potes'])
        .column(knex.raw("CASE execucao WHEN 1 THEN 'Estado' WHEN 2 THEN 'MUnicipio' ELSE 'Outros' END as execucao"))
        .column(knex.raw("CONCAT(aa.codigo, ' - ', aa.descricao) as agravo"))
        .column(knex.raw("CONCAT(av.codigo, ' - ', av.descricao) as atividade"))
        .column(knex.raw("CONCAT(ST_X(coordenadas),', ', ST_Y(coordenadas)) as coordenadas"))
        .column(knex.raw("CONCAT(am.codigo, '-',am.descricao) as metodo"))
        .column(knex.raw("CONCAT(aa.codigo, '-',aa.descricao) as ambiente"))
        .column(knex.raw("CONCAT(alc.codigo, '-',alc.descricao) as local_captura"))
        .column(knex.raw("to_char(c.dt_captura, 'dd/mm/yyyy') as dt_captura"))
        .table("captura as c")
        .join('captura_det as d','d.id_captura','=','c.id_captura')
        .join('municipio as m','m.id_municipio','=','c.id_municipio')
        .join('localidade as l','l.id_localidade','=','c.cod_loc')
        .join('codend as cd','cd.id_codend','=','d.codend')
        .join('auxiliares as az','az.id_auxiliares','=','c.zona')
        .join('auxiliares as aa','aa.id_auxiliares','=','c.agravo')
        .join('auxiliares as av','av.id_auxiliares','=','c.atividade')
        .join('auxiliares as am','am.id_auxiliares','=','d.metodo')
        .join('auxiliares as ab','ab.id_auxiliares','=','d.ambiente')
        .join('auxiliares as alc','alc.id_auxiliares','=','d.local_captura')
        .modify(function(queryBuilder) {
          filtros.forEach(el => {
            queryBuilder.where(el.field, el.operator, el.value);
          });
        });


        return result
       // .where({'l.id_municipio': mun}); //usar o filtro aqui

    }catch(err){
        console.log(err);
        return [];
    }
  } 


  async getEstratoCapt(filter){
      try{
          var filtros = await this.createFilter(filter,'captura', true);

          var result =  await knex.select(['m.nome as municipio', 'l.codigo as codloc', 'l.nome as localidade', 'c.quadrante', 'c.equipe', 'c.obs', 'c.updated_at',
          'd.fant_area', 'd.fant_quart', 'cd.codigo as codend','num_arm', 'altura','hora_inicio','hora_final','temp_inicio','temp_final', 'umidade_inicio','umidade_final', 'amostra', 'quant_potes'])
          .column(knex.raw("CASE execucao WHEN 1 THEN 'Estado' WHEN 2 THEN 'MUnicipio' ELSE 'Outros' END as execucao"))
          .column(knex.raw("to_char(c.dt_captura, 'dd/mm/yyyy') as dt_captura"))
          .column(knex.raw("CONCAT(az.codigo, ' - ', az.descricao) as zona"))
          .column(knex.raw("CONCAT(aa.codigo, ' - ', aa.descricao) as agravo"))
          .column(knex.raw("CONCAT(av.codigo, ' - ', av.descricao) as atividade"))
          .column(knex.raw("CONCAT(ST_X(coordenadas),', ', ST_Y(coordenadas)) as coordenadas"))
          .column(knex.raw("CONCAT(am.codigo, '-',am.descricao) as metodo"))
          .column(knex.raw("CONCAT(aa.codigo, '-',aa.descricao) as ambiente"))
          .column(knex.raw("CONCAT(alc.codigo, '-',alc.descricao) as local_captura"))
          .table("captura as c")
          .join('captura_det as d','d.id_captura','=','c.id_captura')
          .join('municipio as m','m.id_municipio','=','c.id_municipio')
          .join('localidade as l','l.id_localidade','=','c.cod_loc')
          .join('codend as cd','cd.id_codend','=','d.codend')
          .join('auxiliares as az','az.id_auxiliares','=','c.zona')
          .join('auxiliares as aa','aa.id_auxiliares','=','c.agravo')
          .join('auxiliares as av','av.id_auxiliares','=','c.atividade')
          .join('auxiliares as am','am.id_auxiliares','=','d.metodo')
          .join('auxiliares as ab','ab.id_auxiliares','=','d.ambiente')
          .join('auxiliares as alc','alc.id_auxiliares','=','d.local_captura')
          .modify(function(queryBuilder) {
            filtros.forEach(el => {
              queryBuilder.where(el.field, el.operator, el.value);
            });
          });
 
          return result;
      }catch(err){
          console.log(err);
          return [];
      }
    } 

    async getIdentificacao(filter){
      try{
        var filtros = await this.createFilter(filter,'identificacao', true);

        var result = await knex.select(['m.nome as municipio', 'i.responsavel'])
          .column(knex.raw("array_agg(json_build_object('dets', d.*)) as detail"))
          .column(knex.raw("'2' as tp"))
          .column(knex.raw("to_char(c.dt_captura, 'dd/mm/yyyy') as dt_captura"))
          .column(knex.raw("to_char(i.dt_identificacao, 'dd/mm/yyyy') as dt_identificacao"))
          .table("identificacao as i")
          .join ('captura as c','c.id_captura','=','i.id_captura')
          .join('municipio as m','m.id_municipio','=','c.id_municipio')
          .join(knex.raw("(SELECT id_identificacao, amostra, CONCAT(g.nome, ' ', e.nome) as especie, macho, femea, femea_ing, larva, ninfa, pool "+
              "FROM identificacao_det JOIN especie e using(id_especie) JOIN genero g using(id_genero)) as d"),'d.id_identificacao','=','i.id_identificacao')
          .groupBy(['m.nome', 'responsavel', 'dt_identificacao','c.dt_captura'])
          .modify(function(queryBuilder) {
            filtros.forEach(el => {
              queryBuilder.where(el.field, el.operator, el.value);
            });
          });

          return result;
      }catch(err){
        console.log(err);
        return [];
      }
    }

    async getIdentificacaoExp(filter){
      try{
        var filtros = await this.createFilter(filter,'identificacao', false);

        var result = await knex.select(['m.nome as municipio', 'i.responsavel', 'amostra', 'macho', 'femea', 'femea_ing', 'larva', 'ninfa', 'pool'])
          .column(knex.raw("'2' as tp"))
          .column(knex.raw("CONCAT(g.nome, ' ', e.nome) as especie"))
          .table("identificacao as i")
          .join("identificacao_det as d", "d.id_identificacao",'=',"i.id_identificacao")
          .join ('captura as c','c.id_captura','=','i.id_captura')
          .join('especie as e','e.id_especie','=','d.id_especie')
          .join('genero as g','g.id_genero','=','e.id_genero')
          .column(knex.raw("to_char(c.dt_captura, 'dd/mm/yyyy') as dt_captura"))
          .column(knex.raw("to_char(i.dt_identificacao, 'dd/mm/yyyy') as dt_identificacao"))
          .join('municipio as m','m.id_municipio','=','c.id_municipio')
          .modify(function(queryBuilder) {
            filtros.forEach(el => {
              queryBuilder.where(el.field, el.operator, el.value);
            });
          });

          return result;
      }catch(err){
        console.log(err);
        return [];
      }
    }

    async getEstratoIdent(filter){
      try{
        var filtros = await this.createFilter(filter,'identificacao', true);

        var result = await knex.select(['m.nome as municipio', 'i.responsavel', 'amostra', 'macho', 'femea', 'femea_ing', 'larva', 'ninfa', 'pool'])
          .column(knex.raw("'2' as tp"))
          .column(knex.raw("CONCAT(g.nome, ' ', e.nome) as especie"))
          .column(knex.raw("to_char(c.dt_captura, 'dd/mm/yyyy') as dt_captura"))
          .column(knex.raw("to_char(i.dt_identificacao, 'dd/mm/yyyy') as dt_identificacao"))
          .table("identificacao as i")
          .join("identificacao_det as d", "d.id_identificacao",'=',"i.id_identificacao")
          .join ('captura as c','c.id_captura','=','i.id_captura')
          .join('especie as e','e.id_especie','=','d.id_especie')
          .join('genero as g','g.id_genero','=','e.id_genero')
          .join('municipio as m','m.id_municipio','=','c.id_municipio')
          .modify(function(queryBuilder) {
            filtros.forEach(el => {
              queryBuilder.where(el.field, el.operator, el.value);
            });
          });

          return result;
      }catch(err){
        console.log(err);
        return [];
      }
    }

    async createFilter(filter, tipo, isStr) {
      var filtros = [];
      if (isStr)
        this.strFilter = [];

      if (filter.id_municipio && filter.id_municipio > 0){
        filtros.push({field: 'm.id_municipio', operator: '=', value: filter.id_municipio});

        var mun = await knex('municipio').where('id_municipio',filter.id_municipio).first();

        if (isStr)
          this.strFilter.push('Município: ' + mun.nome.trim());
      } else if (filter.id_drs && filter.id_drs > 0){
        filtros.push({field: 'm.id_drs', operator: '=', value: filter.id_drs});

        var mun = await knex('territorio').where('id_territorio',filter.id_drs).first();

        if (isStr)
          this.strFilter.push('DRS: ' + mun.nome.trim());
      } else if (filter.id_regional && filter.id_regional > 0){
        filtros.push({field: 'm.id_regional', operator: '=', value: filter.id_regional});

        var mun = await knex('territorio').where('id_territorio',filter.id_regional).first();

        if (isStr)
          this.strFilter.push('Regional: ' + mun.nome.trim());
      }

      if (filter.dt_inicio){
        if (tipo == 'captura'){
          filtros.push({field: 'c.dt_captura', operator: '>=',value: filter.dt_inicio});
          if (isStr)
          this.strFilter.push('Data de Captura >= ' + this.formatDate(filter.dt_inicio));
        } else if (tipo == 'identifiicacao'){
          filtros.push({field:'c.dt_captura', operator: '>=',value: filter.dt_inicio});
          if (isStr)
          this.strFilter.push('Data de Captura >= ' + this.formatDate(filter.dt_inicio));
        }
      }

      if (filter.dt_final){
        if (tipo == 'captura'){
          filtros.push({field: 'c.dt_captura', operator: '<=',value: filter.dt_final});
          if (isStr)
          this.strFilter.push('Data de Captura <= ' + this.formatDate(filter.dt_final));
        } else if (tipo == 'identifiicacao'){
          filtros.push({field:'c.dt_captura', operator: '<=',value: filter.dt_final});
          if (isStr)
          this.strFilter.push('Data de Captura <= ' + this.formatDate(filter.dt_final));
        }
      }

      return filtros;
    }

    formatDate(date) {
      return moment(date).format('DD/MM/YYYY');
    }
}

module.exports = new Relatorio();