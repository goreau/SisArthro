var knex = require("../database/connection");

class Captura {
  //id_captura, dt_captura, execucao, exec_3, zona, id_municipio, cod_sis, localidade, cod_loc, quadrante, agravo, atividade, equipe, obs, created_at, updated_at, id_usuario, codigo

  //id_captura_det, id_captura, area, quadra, codend, coordenadas, metodo, ambiente, local_captura, num_arm, altura, hora_inicio, hora_final, temp_inicio, temp_final, umidade_inicio, umidade_final, amostra, quant_potes, fant_area, fant_quart
  async create(dados) {
    try {
      var {
        id_captura,
        dt_captura,
        execucao,
        exec_3,
        zona,
        id_municipio,
        cod_loc,
        quadrante,
        agravo,
        atividade,
        equipe,
        obs,
        id_usuario,
      } = dados;

      const [cod] = await knex
        .insert({
          id_captura,
          dt_captura,
          execucao,
          exec_3,
          zona,
          id_municipio,
          cod_loc,
          quadrante,
          agravo,
          atividade,
          equipe,
          obs,
          id_usuario,
        })
        .table("captura")
        .returning("*");

      return cod;
    } catch (err) {
      console.log(err);
    }
  }

  async createDet(dados) {
    try {
      var {
        id_captura,
        area,
        fant_area,
        quadra,
        fant_quart,
        codend,
        latitude,
        longitude,
        metodo,
        ambiente,
        local_captura,
        num_arm,
        altura,
        hora_inicio,
        hora_final,
        temp_inicio,
        temp_final,
        umidade_inicio,
        umidade_final,
        amostra,
        quant_potes,
      } = dados;
      var coordenadas = knex.raw(
        `ST_GeomFromText('POINT(${latitude} ${longitude})',4326)`
      );

      await knex
        .insert({
          id_captura,
          area,
          fant_area,
          quadra,
          fant_quart,
          codend,
          coordenadas,
          metodo,
          ambiente,
          local_captura,
          num_arm,
          altura,
          hora_inicio,
          hora_final,
          temp_inicio,
          temp_final,
          umidade_inicio,
          umidade_final,
          amostra,
          quant_potes,
        })
        .table("captura_det"); //.toSQL().toNative();
    } catch (err) {
      console.log(err);
    }
  }

  async update(dados) {
    try {
      var {
        id_captura,
        dt_captura,
        execucao,
        exec_3,
        zona,
        id_municipio,
        cod_loc,
        quadrante,
        agravo,
        atividade,
        equipe,
        obs,
      } = dados;

      await knex("captura")
        .where("id_captura", id_captura)
        .update({
          dt_captura,
          execucao,
          exec_3,
          zona,
          id_municipio,
          cod_loc,
          quadrante,
          agravo,
          atividade,
          equipe,
          obs,
        });
    } catch (err) {
      console.log(err);
    }
  }

  async updateDet(dados) {
    try {
      var {
        id_captura_det,
        area,
        fant_area,
        quadra,
        fant_quart,
        codend,
        latitude,
        longitude,
        metodo,
        ambiente,
        local_captura,
        num_arm,
        altura,
        hora_inicio,
        hora_final,
        temp_inicio,
        temp_final,
        umidade_inicio,
        umidade_final,
        amostra,
        quant_potes,
      } = dados;
      var coordenadas = knex.raw(
        `ST_GeomFromText('POINT(${latitude} ${longitude})',4326)`
      );

      await knex("captura_det")
        .where("id_captura_det", id_captura_det)
        .update({
          area,
          fant_area,
          quadra,
          fant_quart,
          codend,
          coordenadas,
          metodo,
          ambiente,
          local_captura,
          num_arm,
          altura,
          hora_inicio,
          hora_final,
          temp_inicio,
          temp_final,
          umidade_inicio,
          umidade_final,
          amostra,
          quant_potes,
        })
        .table("captura_det");
    } catch (err) {
      console.log(err);
    }
  }

  async getCapturas(filter) {
    try {
      var result = [];

      result = await knex
        .select("*")
        .table("captura")
        .orderBy("id_captura", "desc");

      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getCapturasDet(master) {
    try {
      var result = [];

      result = await knex
        .select([
          "d.fant_quart as quadra",
          "id_captura_det",
          "c.codigo as codend",
          "am.descricao as metodo",
          "al.descricao as local",
          "d.amostra",
        ])
        .table("captura_det as d")
        .join("codend as c", "c.id_codend", "=", "d.codend")
        .join("auxiliares as am", "am.id_auxiliares", "=", "d.metodo")
        .join("auxiliares as al", "al.id_auxiliares", "=", "d.local_captura")
        .where("id_captura", "=", master)
        .orderBy("id_captura_det", "asc");

      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getCaptura(id) {
    try {
      var result = [];

      result = await knex
        .select("c.*")
        .column(
          knex.raw(
            "concat(to_char(m.id_municipio, '000'), ' - ', m.nome) as municipio"
          )
        )
        .table("captura as c")
        .where("id_captura", "=", id)
        .join("municipio as m", "m.id_municipio", "=", "c.id_municipio");

      return result[0];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getCapturaDet(id) {
    try {
      var result = [];

      result = await knex
        .select("*")
        .column(
          knex.raw(
            "ST_Y(coordenadas) as longitude, ST_X(coordenadas) as latitude"
          )
        )
        .table("captura_det")
        .where("id_captura_det", "=", id);

      return result[0];
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async delete(id) {
    try {
      await knex.delete().where({ id_captura: id }).table("captura");
      return { status: true };
    } catch (err) {
      return { status: false, err: err };
    }
  }

  async deleteDet(id) {
    try {
      await knex.delete().where({ id_captura_det: id }).table("captura_det");
      return { status: true };
    } catch (err) {
      return { status: false, err: err };
    }
  }

  async getCombo(mun) {
    try {
      var result = [];

      result = await knex
        .select(["c.id_captura", 'c.codigo'])
        .table("captura as c")
        .leftJoin("identificacao as i", "i.id_captura", "=", "c.id_captura")
        .where("c.id_municipio", "=", mun)
        .whereNull('i.id_identificacao')
        
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async getComboAm(id) {
    try {
      var result = [];

      result = await knex
        .select(["d.amostra"])
        .table("captura as c")
        .leftJoin("captura_det as d", "d.id_captura", "=", "c.id_captura")
        .where("c.id_captura", "=", id)
        .whereNotNull('d.amostra');
        
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

}

module.exports = new Captura();
