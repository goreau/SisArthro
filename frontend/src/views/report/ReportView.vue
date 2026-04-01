<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ title }}</p>
          </header>
          <div class="card-content">
            <span class="filter">{{ strFiltro }}</span>
            <MyTable :tableData="dataTable" :columns="columns" :filtered="false" :tableName="tableName" :exports="true"
              :expColumns="expColumns" v-if="id > 0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyTable from "@/components/forms/MyTable.vue";
import reportService from "@/services/report.service";

export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      filter: {},
      dataTable: [],
      columns: [],
      expColumns: [],
      title: 'Relatórios',
      strFiltro: '',
      tableName: 'relatorio',
    };
  },
  components: {
    MyTable,
  },
  methods: {
    createColumns() {
      switch (this.id) {
        case '101':
          this.title = 'Extrato de Capturas';
          this.columns = [
            { title: "Município", field: "municipio", responsive: 0, minWidth: 250 },
            { title: "Número", field: "numcapt", responsive: 0, minWidth: 200 },
            { title: "Data", field: "dt_captura", responsive: 0, minWidth: 180 },
            { title: "Execução", field: "execucao", responsive: 2, minWidth: 100 },
            { title: "Zona", field: "zona", responsive: 1, minWidth: 150 },
            { title: "Agravo", field: "agravo", responsive: 0, minWidth: 200 },
            { title: "Atividade", field: "atividade", responsive: 0, minWidth: 250 },
            { title: "Quadra", field: "fant_quart", responsive: 0, minWidth: 150 },
            { title: "Codend", field: "codend", responsive: 1, minWidth: 150 },
            { title: "Método", field: "metodo", responsive: 0, minWidth: 200 },
            { title: "Ambiente", field: "ambiente", responsive: 1, minWidth: 150 },
            { title: "Local Capt", field: "local_captura", responsive: 2, minWidth: 150 },
            { title: "No Arm", field: "num_arm", responsive: 2, minWidth: 100 },
            { title: "Amostra", field: "amostra", responsive: 0, minWidth: 150 },
            { title: "Espécie", field: "especie", responsive: 1, minWidth: 200 },
          ];
          this.expColumns = [
            { title: "Município", field: "municipio" },
            { title: "Número", field: "numcapt" },
            { title: "Data", field: "dt_captura" },
            { title: "Execução", field: "execucao" },
            { title: "Zona", field: "zona" },
            { title: "Agravo", field: "agravo" },
            { title: "Atividade", field: "atividade" },
            { title: "Localidade", field: "localidade" },
            { title: "Quadrante", field: "quadrante" },
            { title: "Equipe", field: "equipe" },
            { title: "Obs", field: "obs" },

            { title: "Área", field: "fant_area" },
            { title: "Quadra", field: "fant_quart" },
            { title: "Codend", field: "codend" },
            { title: "Coordenadas", field: "coordenadas" },
            { title: "Método", field: "metodo" },
            { title: "Ambiente", field: "ambiente" },
            { title: "Local Capt", field: "local_captura" },
            { title: "Localidade", field: "localidade" },
            { title: "No Arm", field: "num_arm" },
            { title: "Altura", field: "altura" },
            { title: "Hora Ini", field: "hora_inicio" },
            { title: "Hora Fim", field: "hora_final" },
            { title: "Temp Ini", field: "temp_inicio" },
            { title: "Temp Fim", field: "temp_final" },
            { title: "Umid Ini", field: "umidade_inicio" },
            { title: "Umid Fim", field: "umidade_final" },
            { title: "Amostra", field: "amostra" },
            { title: "Qt Potes", field: "quant_potes" },
            { title: "Espécie", field: "especie" },
            { title: "Pool", field: "pool" },
            { title: "Macho", field: "macho" },
            { title: "Fêmea", field: "femea" },
            { title: "Fêmea Ing", field: "femea_ing" },
            { title: "Larva", field: "larva" },
            { title: "Ninfa", field: "ninfa" },
          ];
          break;
        case '102':
          this.title = 'Extrato de Identificações';
          this.columns = [
            { title: "Município", field: "municipio", responsive: 0, minWidth: 250 },
            { title: "Número", field: "numcapt", responsive: 0, minWidth: 200 },
            { title: "Data Captura", field: "dt_captura", responsive: 0, minWidth: 180 },
            { title: "Data Identificação", field: "dt_identificacao", responsive: 0, minWidth: 180 },
            { title: "Responsável", field: "responsavel", responsive: 2, minWidth: 250 },
            { title: "Amostra", field: "amostra", responsive: 0, minWidth: 150 },
            { title: "Espécie", field: "especie", responsive: 0, minWidth: 200 },
            { title: "Macho", field: "macho", responsive: 1, minWidth: 100 },
            { title: "Fêmea", field: "femea", responsive: 1, minWidth: 100 },
            { title: "Fêmea Ing", field: "femea_ing", responsive: 1, minWidth: 100 },
            { title: "Larva", field: "larva", responsive: 1, minWidth: 100 },
            { title: "Ninfa", field: "ninfa", responsive: 1, minWidth: 100 },
            { title: "No Pool", field: "pool", responsive: 0, minWidth: 200 },

          ];
          break;
        case '103':
          this.title = 'Extrato de Caracterizações';
          this.columns = [
            { title: "Município", field: "municipio", responsive: 0, minWidth: 250 },
            { title: "Ciclo", field: "ciclo", responsive: 0, minWidth: 150 },
            { title: "Quadra", field: "quadra", responsive: 0, minWidth: 150 },
            { title: "CodEnd", field: "codend", responsive: 0, minWidth: 150 },
            { title: "Situação", field: "situacao", responsive: 1, minWidth: 150 },
            { title: "Tipo Imóvel", field: "tipo_imovel", responsive: 1, minWidth: 150 },
            { title: "Nº Cães", field: "num_cao", responsive: 0, minWidth: 150 },
            { title: "Nº Caes Pos", field: "num_cao_pos", responsive: 0, minWidth: 150 },
            { title: "Ano Ident.", field: "ano_identifica", responsive: 1, minWidth: 150 },
            { title: "Soma", field: "soma", responsive: 0, minWidth: 150 },

          ];
          this.expColumns = [
            { title: "Município", field: "municipio" },
            { title: "Ciclo", field: "ciclo" },
            { title: "Localidade/ATL", field: "atl" },
            { title: "Área", field: "fant_area" },
            { title: "Quadra", field: "quadra" },
            { title: "CodEnd", field: "codend" },
            { title: "Quadrante", field: "quadrante" },
            { title: "Endereço", field: "endereco" },
            { title: "Situação", field: "situacao" },
            { title: "Tipo Imóvel", field: "tipo_imovel" },
            { title: "Vegetação", field: "vegetacao" },
            { title: "Mat. Org.", field: "mat_organica" },
            { title: "Galinha", field: "galinha" },
            { title: "Cão", field: "cao" },
            { title: "Porco", field: "porco" },
            { title: "Cavalo", field: "cavalo" },
            { title: "Coelho", field: "coelho" },
            { title: "Outros", field: "outros" },
            { title: "Especific.", field: "ot_especifica" },
            { title: "Nº Cães", field: "num_cao" },
            { title: "Nº Caes Pos", field: "num_cao_pos" },
            { title: "Ano Ident.", field: "ano_identifica" },
            { title: "Soma", field: "soma" },
          ];
          break;
        case '104':
          this.title = 'Resumo de Investigação de Foco';
          this.columns = [
            {
              title: "Identificação", headerHozAlign: "center", columns: [
                { title: "Município", field: "municipio" },
                { title: "Área", field: "area" },
                {
                  title: "Quadra", field: "quadra", formatter: function (cell, formatterParams, onRendered) {
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                  }
                },
              ]
            },
            {
              title: "Quantidades", headerHozAlign: "center", columns: [
                { title: "Imóveis", field: "imoveis" },
                { title: "Cães", field: "caes" },
                {
                  title: "Coletas", field: "coleta", formatter: function (cell, formatterParams, onRendered) {
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                  }
                },
              ]
            },
            {
              title: "Positivos", headerHozAlign: "center", columns: [
                { title: "Parasitológico", field: "parasito" },
                { title: "DPP", field: "dpp" },
                {
                  title: "Elisa", field: "elisa", formatter: function (cell, formatterParams, onRendered) {
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                  }
                },
              ]
            },
            {
              title: "Eutanásia", headerHozAlign: "center", columns: [
                { title: "Eutanasiados", field: "eutanasia" },
                { title: "Óbitos", field: "obito" },
                { title: "Recusas", field: "recusa" },
                { title: "Outros", field: "outros" },
              ]
            }
          ];
          break;
        case '105':
          this.title = 'Resumo de Inquérito Canino';
          this.columns = [
            {
              title: "Identificação", headerHozAlign: "center", columns: [
                { title: "Município", field: "municipio" },
                { title: "Área", field: "area" },
                {
                  title: "Quadra", field: "quadra", formatter: function (cell, formatterParams, onRendered) {
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                  },
                },
              ]
            },
            {
              title: "Quantidades", headerHozAlign: "center", columns: [
                { title: "Imóveis", field: "imoveis" },
                { title: "Cães", field: "caes" },
                { title: "Encoleiramentos", field: "coleira" },
                {
                  title: "Coletas", field: "coleta", formatter: function (cell, formatterParams, onRendered) {
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                  }
                },
              ]
            },
            {
              title: "Exames Laboratoriais", headerHozAlign: "center", columns: [
                { title: "DPP Pos", field: "dpp" },
                { title: "Elisa Pos", field: "elisa" },
                {
                  title: "Positivos", field: "final", formatter: function (cell, formatterParams, onRendered) {
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                  }
                },
              ]
            },
            {
              title: "Eutanásia", headerHozAlign: "center", columns: [
                { title: "Eutanasiados", field: "eutanasia" },
                { title: "Óbitos", field: "obito" },
                { title: "Recusas", field: "recusa" },
                { title: "Outros", field: "outros" },
              ]
            }
          ];
          break;
        case '106':
          this.title = 'Notificação de Cães';
          this.columns = [
            { title: "Município", field: "notificante", responsive: 0, minWidth: 250 },
            { title: "Código", field: "codigo", responsive: 0, minWidth: 150 },
            { title: "Unidade", field: "unidade", responsive: 1, minWidth: 200 },
            { title: "Mun. Cão", field: "mun_cao", responsive: 0, minWidth: 250 },
            { title: "Deslocamentos", field: "municipio", responsive: 1, minWidth: 250 },
            { title: "Nome Cão", field: "nome", responsive: 0, minWidth: 200 },
            { title: "Raça", field: "raca", responsive: 1, minWidth: 200 },
            { title: "Exames", field: "exames", responsive: 1, minWidth: 250 },
            { title: "Óbito", field: "obito", responsive: 0, minWidth: 100 },
            { title: "Sinais", field: "sinais", responsive: 0, minWidth: 200 },
          ];
          break;
        case '107':
          this.title = 'Extrato de Notificação de Cães';
          this.columns = [
            {
              title: "Município", field: "municipio", responsive: 0, minWidth: 250,
              formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('municipio');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Código", field: "codigo", responsive: 0, minWidth: 150, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('codigo');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Nome Cão", field: "cao", responsive: 0, minWidth: 150, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('cao');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Sexo", field: "sexo", responsive: 1, minWidth: 100, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('sexo');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Raça", field: "raca", responsive: 1, minWidth: 250, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('raca');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Sinais", field: "sinais", responsive: 1, minWidth: 250, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('sinais');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Mun. Cão", field: "mun_cao", responsive: 1, minWidth: 250, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('mun_cao');
                  var cao = prevRow.getCell('cao');
                  var atual = row.getCell('cao');
                  if (previus.getValue() == val && cao.getValue() == atual.getValue()) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Tempo Mun.", field: "tempo", responsive: 1, minWidth: 100, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('tempo');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Material", field: "material", responsive: 1, minWidth: 150, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('material');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Exame", field: "exame", responsive: 0, minWidth: 250, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('exame');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Resultado", field: "resultado", responsive: 0, minWidth: 250, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('resultado');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Espécie", field: "especie", responsive: 1, minWidth: 150, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('especie');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Óbito", field: "obito", responsive: 0, minWidth: 150, formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('obito');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
          ];
          this.expColumns = [
            {
              title: "Município", field: "municipio", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('municipio');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Código", field: "codigo", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('codigo');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Unidade", field: "unidade", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('unidade');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Responsável", field: "vet_resp", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('vet_resp');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Nome Cão", field: "cao", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('cao');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Idade", field: "idade_t", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('idade_t');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Sexo", field: "sexo", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('sexo');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Registro", field: "registro", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('registro');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Reg/Chip", field: "numero", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('numero');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Raça", field: "raca", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('raca');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Sinais", field: "sinais", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('sinais');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Mun. Cão", field: "mun_cao", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('mun_cao');
                  var cao = prevRow.getCell('cao');
                  var atual = row.getCell('cao');
                  if (previus.getValue() == val && cao.getValue() == atual.getValue()) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Tempo Mun.", field: "tempo", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('tempo');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Deslocamentos", field: "deslocamento", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('deslocamento');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Permanência", field: "permanencia", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('permanencia');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Observação", field: "observacao", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('observacao');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Laboratório", field: "laboratorio", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('laboratorio');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Material", field: "material", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('material');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Exame", field: "exame", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('exame');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Resultado", field: "resultado", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('resultado');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Espécie", field: "especie", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('especie');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Repetir", field: "repetir", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue() ? 'S' : 'N';
                if (prevRow) {
                  var previus = prevRow.getCell('repetir');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Óbito", field: "obito", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('obito');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Dt Óbito", field: "dt_obito", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('dt_obito');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Causa Óbito", field: "causa_obito", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('causa_obito');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Especificação", field: "ob_especifica", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('ob_especifica');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
            {
              title: "Responsável", field: "responsavel", formatter: function (cell, formatterParams, onRendered) {
                var row = cell.getRow();
                var prevRow = row.getPrevRow();
                var val = cell.getValue();
                if (prevRow) {
                  var previus = prevRow.getCell('responsavel');
                  if (previus.getValue() == val) {
                    val = '...';
                  }
                }

                return val;
              },
            },
          ];
          break;
        case '108':
          this.title = 'Extrato de Animais Cadastrados';
          this.columns = [
            { title: "Município", field: "municipio", responsive: 0, minWidth: 250 },
            { title: "Área", field: "area", responsive: 0, minWidth: 150 },
            { title: "Quadra", field: "quadra", responsive: 0, minWidth: 150 },
            { title: "CodEnd", field: "codend", responsive: 0, minWidth: 150 },
            { title: "Endereço", field: "endereco", responsive: 0, minWidth: 250 },
            { title: "Situação", field: "situacao", responsive: 1, minWidth: 150 },
            { title: "Proprietário", field: "proprietario", responsive: 0, minWidth: 150 },
            { title: "Data", field: "data", responsive: 0, minWidth: 150 },
            { title: "Nome Animal", field: "nome_cao", responsive: 0, minWidth: 150 },
            { title: "Tipo", field: "especie", responsive: 0, minWidth: 150 },
            { title: "RA", field: "ra", responsive: 0, minWidth: 150 },
            { title: "Raça", field: "raca", responsive: 0, minWidth: 150 },
            { title: "Cor", field: "cor", responsive: 0, minWidth: 150 },
            { title: "Ano Nasc", field: "nascimento", responsive: 0, minWidth: 150 },
            { title: "Sexo", field: "sexo", responsive: 0, minWidth: 150 },
            { title: "Peso", field: "peso", responsive: 0, minWidth: 150 },
            { title: "Coordenadas", field: "coordenadas", responsive: 0, minWidth: 150 },
            { title: "Responsável", field: "responsavel", responsive: 0, minWidth: 150 },
            { title: "Criado em", field: "criado", responsive: 0, minWidth: 150 },
            { title: "Editado em", field: "editado", responsive: 0, minWidth: 150 },
          ];
          this.expColumns = [
            { title: "Município", field: "municipio" },
            { title: "Área", field: "area" },
            { title: "Quadra", field: "quadra" },
            { title: "CodEnd", field: "codend" },
            { title: "Endereço", field: "endereco" },
            { title: "Situação", field: "situacao", responsive: 1, minWidth: 150 },
            { title: "Proprietário", field: "proprietario" },
            { title: "Data", field: "data" },
            { title: "Nome Animal", field: "nome_cao" },
            { title: "Tipo", field: "especie" },
            { title: "RA", field: "ra" },
            { title: "Raça", field: "raca" },
            { title: "Cor", field: "cor" },
            { title: "Ano Nasc", field: "nascimento" },
            { title: "Sexo", field: "sexo" },
            { title: "Peso", field: "peso" },
            { title: "Coordenadas", field: "coordenadas" },
            { title: "Responsável", field: "responsavel" },
            { title: "Criado em", field: "criado" },
            { title: "Editado em", field: "editado" },
          ];
          break;
        case '109':
          this.title = 'Resumo de Caracterizações';
          this.columns = [
            { title: "Município", field: "municipio", responsive: 0, minWidth: 250 },
            { title: "Localidade/ATL", field: "atl", responsive: 0, minWidth: 150 },
            { title: "Ciclo", field: "ciclo", responsive: 0, minWidth: 150 },
            { title: "Trabalhados", field: "trabalhados", responsive: 0, minWidth: 150 },
            { title: "Pendentes", field: "pendentes", responsive: 0, minWidth: 150 },
            /* { title: "Galinha", field: "galinha" },
             { title: "Cão", field: "cao" },
             { title: "Porco", field: "porco" },
             { title: "Cavalo", field: "cavalo" },
             { title: "Coelho", field: "coelho" },
             { title: "Outros", field: "outros" },*/
            { title: "Nº Cães", field: "num_cao", responsive: 0, minWidth: 150 },
            { title: "Nº Caes Pos", field: "num_cao_pos", responsive: 0, minWidth: 150 },
            { title: "Média Soma", field: "media", responsive: 0, minWidth: 150 },

          ];
        default:
          break;
      }
    }
  },
  mounted() {

    reportService.getRelat(this.id, this.filter)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => { });

    this.createColumns();
  },
  created() {
    this.id = this.$route.params.id;
    this.filter = localStorage.getItem('filterRelArthro');
  },
};
</script>

<style scoped>
.visible {
  display: none !important;
}

.filter {
  font-size: small;
  font-weight: 600;
}
</style>
