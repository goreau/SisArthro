<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ title }}</p>
          </header>
          <div class="card-content">
            <span class="filter">{{ strFiltro }}</span>
            <MyTable :tableData="dataTable" :columns="columns" :filtered="false" :tableName="tableName" :exports="true" :expColumns="expColumns" v-if="id > 0"/>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import MyTable from "@/components/forms/MyTable.vue";
import reportService from "@/services/report.service";

export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      filter: {},
      dataTable: [],
      isLoading: false,
      columns: [],
      expColumns: [],
      title: 'Relatórios',
      strFiltro: '',
      tableName: 'relatorio',
    };
  },
  components: {
    Loader,
    MyTable,
  },
  methods: {
    createColumns(){
      switch (this.id) {
        case '101':
          this.title = 'Extrato de Capturas';
          this.columns = [
                        { title: "Município", field: "municipio", type: "string" },
                        { title: "Data", field: "dt_captura", type: "string" },
                        { title: "Execução", field: "execucao", type: "string" },
                        { title: "Zona", field: "zona", type: "string" },
                        { title: "Agravo", field: "agravo", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Quadra", field: "fant_quart", type: "string" },
                        { title: "Codend", field: "codend", type: "string" },
                        { title: "Método", field: "metodo", type: "string" },
                        { title: "Ambiente", field: "ambiente", type: "string" },
                        { title: "Local Capt", field: "local_captura", type: "string" },
                        { title: "No Arm", field: "num_arm", type: "string" },
                        { title: "Amostra", field: "amostra", type: "string" },
                      ];
            this.expColumns = [
                        { title: "Município", field: "municipio", type: "string" },
                        { title: "Data", field: "dt_captura", type: "string" },
                        { title: "Execução", field: "execucao", type: "string" },
                        { title: "Zona", field: "zona", type: "string" },
                        { title: "Agravo", field: "agravo", type: "string" },
                        { title: "Atividade", field: "atividade", type: "string" },
                        { title: "Localidade", field: "localidade", type: "string" },
                        { title: "Quadrante", field: "quadrante", type: "string" },
                        { title: "Equipe", field: "equipe", type: "string" },
                        { title: "Obs", field: "obs", type: "string" },

                        { title: "Área", field: "fant_area", type: "string" },
                        { title: "Quadra", field: "fant_quart", type: "string" },
                        { title: "Codend", field: "codend", type: "string" },
                        { title: "Método", field: "metodo", type: "string" },
                        { title: "Ambiente", field: "ambiente", type: "string" },
                        { title: "Local Capt", field: "local_captura", type: "string" },
                        { title: "Localidade", field: "localidade", type: "string" },
                        { title: "No Arm", field: "num_arm", type: "string" },
                        { title: "Altura", field: "altura", type: "string" },
                        { title: "Hora Ini", field: "hora_inicio", type: "string" },
                        { title: "Hora Fim", field: "hora_final", type: "string" },
                        { title: "Temp Ini", field: "temp_inicio", type: "string" },
                        { title: "Temp Fim", field: "temp_final", type: "string" },
                        { title: "Umid Ini", field: "umidade_inicio", type: "string" },
                        { title: "Umid Fim", field: "umidade_final", type: "string" },
                        { title: "Amostra", field: "amostra", type: "string" },
                        { title: "Qt Potes", field: "quant_potes", type: "string" },
                        { title: "Resultado", field: "resultado", type: "string" },
                      ];      
          break;
        case '102':
          this.title = 'Extrato de Identificações';
          this.columns = [
            { title: "Município", field: "municipio" },
            { title: "Data Captura", field: "dt_captura" },
            { title: "Data Identificação", field: "dt_identificacao" },
            { title: "Responsável", field: "responsavel" },
            { title: "Amostra", field: "amostra" },
            { title: "Espécie", field: "especie" },
            { title: "Macho", field: "macho" },
            { title: "Fêmea", field: "femea" },
            { title: "Fêmea Ing", field: "femea_ing" },
            { title: "Larva", field: "larva" },
            { title: "Ninfa", field: "ninfa" },
            { title: "No Pool", field: "pool" },
                        
          ];
          break;
        case '103':
          this.title = 'Extrato de Caracterizações';
          this.columns = [
            { title: "Município", field: "municipio" },
            { title: "Quadra", field: "quadra" },
            { title: "CodEnd", field: "codend" },
            { title: "Situação", field: "situacao" },
            { title: "Tipo Imóvel", field: "tipo_imovel" },
            { title: "Nº Cães", field: "num_cao" },
            { title: "Nº Caes Pos", field: "num_cao_pos" },
            { title: "Ano Ident.", field: "ano_identifica" },
            { title: "Soma", field: "soma" },
                        
          ];
          this.expColumns = [
            { title: "Município", field: "municipio" },
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
            {title: "Identificação", headerHozAlign:"center", columns: [
              { title: "Município", field: "municipio" },
              { title: "Área", field: "area" },
              { title: "Quadra", field: "quadra", formatter: function(cell, formatterParams, onRendered){
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                }
              },
            ]},
            {title: "Quantidades", headerHozAlign:"center", columns: [
              { title: "Imóveis", field: "imoveis" },
              { title: "Cães", field: "caes" },
              { title: "Coletas", field: "coleta", formatter: function(cell, formatterParams, onRendered){
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                }
              },
            ]},
            {title: "Positivos", headerHozAlign:"center", columns: [
              { title: "Parasitológico", field: "parasito" },
              { title: "DPP", field: "dpp" },
              { title: "Elisa", field: "elisa", formatter: function(cell, formatterParams, onRendered){
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                } 
              },
            ]},
            {title: "Eutanásia", headerHozAlign:"center", columns: [
              { title: "Eutanasiados", field: "eutanasia" },
              { title: "Óbitos", field: "obito" },
              { title: "Recusas", field: "recusa" },
              { title: "Outros", field: "outros" },
            ]}          
          ];
          break;
        case '105':
          this.title = 'Resumo de Inquérito Canino';
          this.columns = [
            {title: "Identificação", headerHozAlign:"center", columns: [
              { title: "Município", field: "municipio" },
              { title: "Área", field: "area" },
              { title: "Quadra", field: "quadra", formatter: function(cell, formatterParams, onRendered){
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                }, 
              },
            ]},
            {title: "Quantidades", headerHozAlign:"center", columns: [
              { title: "Imóveis", field: "imoveis" },
              { title: "Cães", field: "caes" },
              { title: "Encoleiramentos", field: "coleira" },
              { title: "Coletas", field: "coleta", formatter: function(cell, formatterParams, onRendered){
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                }
              },
            ]},
            {title: "Exames Laboratoriais", headerHozAlign:"center", columns: [
              { title: "DPP Pos", field: "dpp" },
              { title: "Elisa Pos", field: "elisa" },
              { title: "Positivos", field: "final", formatter: function(cell, formatterParams, onRendered){
                    // Adiciona uma classe CSS para a borda direita
                    cell.getElement().classList.add("right-border");
                    return cell.getValue();
                }
              },
            ]},
            {title: "Eutanásia", headerHozAlign:"center", columns: [
              { title: "Eutanasiados", field: "eutanasia" },
              { title: "Óbitos", field: "obito" },
              { title: "Recusas", field: "recusa" },
              { title: "Outros", field: "outros" },
            ]}          
          ];
          break;
        case '106':
          this.title = 'Notificação de Cães';
          this.columns = [
            { title: "Município", field: "notificante" },
            { title: "Código", field: "codigo" },
            { title: "Unidade", field: "unidade" },
            { title: "Mun. Cão", field: "mun_cao" },
            { title: "Deslocamentos", field: "municipio" },
            { title: "Nome Cão", field: "nome" },
            { title: "Raça", field: "raca" },
            { title: "Exames", field: "exames"},
            { title: "Óbito", field: "obito" },
            { title: "Sinais", field: "sinais" },
          ];
          break;
        case '107':
          this.title = 'Extrato de Notificação de Cães';
          this.columns = [
            { title: "Município", field: "municipio", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('municipio');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Código", field: "codigo", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('codigo');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Nome Cão", field: "cao", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('cao');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Sexo", field: "sexo", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('sexo');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Raça", field: "raca", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('raca');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Sinais", field: "sinais", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('sinais');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Mun. Cão", field: "mun_cao", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('mun_cao');
                var cao = prevRow.getCell('cao');
                var atual = row.getCell('cao');
                if (previus.getValue() == val && cao.getValue() == atual.getValue()) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Tempo Mun.", field: "tempo", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('tempo');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Material", field: "material", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('material');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Exame", field: "exame", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('exame');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Resultado", field: "resultado", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('resultado');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Espécie", field: "especie", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('especie');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Óbito", field: "obito", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('obito');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
          ];
          this.expColumns = [
            { title: "Município", field: "municipio", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('municipio');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Código", field: "codigo", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('codigo');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Unidade", field: "unidade", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('unidade');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Responsável", field: "vet_resp", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('vet_resp');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Nome Cão", field: "cao", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('cao');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Idade", field: "idade_t", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('idade_t');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Sexo", field: "sexo", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('sexo');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Registro", field: "registro", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('registro');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Reg/Chip", field: "numero", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('numero');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Raça", field: "raca", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('raca');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Sinais", field: "sinais", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('sinais');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Mun. Cão", field: "mun_cao", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('mun_cao');
                var cao = prevRow.getCell('cao');
                var atual = row.getCell('cao');
                if (previus.getValue() == val && cao.getValue() == atual.getValue()) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Tempo Mun.", field: "tempo", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('tempo');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Deslocamentos", field: "deslocamento", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('deslocamento');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Permanência", field: "permanencia", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('permanencia');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Observação", field: "observacao", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('observacao');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Laboratório", field: "laboratorio", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('laboratorio');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Material", field: "material", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('material');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Exame", field: "exame", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('exame');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Resultado", field: "resultado", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('resultado');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Espécie", field: "especie", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('especie');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Repetir", field: "repetir", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue() ? 'S' : 'N';
              if (prevRow){
                var previus = prevRow.getCell('repetir');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            },},
            { title: "Óbito", field: "obito", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('obito');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Dt Óbito", field: "dt_obito", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('dt_obito');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Causa Óbito", field: "causa_obito", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('causa_obito');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Especificação", field: "ob_especifica", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('ob_especifica');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
            { title: "Responsável", field: "responsavel", formatter: function(cell, formatterParams, onRendered){
              var row = cell.getRow();
              var prevRow = row.getPrevRow();
              var val = cell.getValue();
              if (prevRow){
                var previus = prevRow.getCell('responsavel');
                if (previus.getValue() == val) {
                  val = '...';
                }
              }
    
              return val;
            }, },
          ];
          break;
        default:
          break;
      }
    }
  },
  mounted() {
    this.isLoading = true;
  
    reportService.getRelat(this.id,this.filter)
      .then((response) => {
        var data = response.data;
        this.dataTable = data.data;
        this.strFiltro = data.filter;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
    
    this.createColumns();
  },
  created() {
    this.id = this.$route.params.id;
    this.filter = localStorage.getItem('filter');
  },
};
</script>

<style scoped>
.visible {
  display: none !important;
}
.filter{
  font-size: small;
  font-weight: 600;
}
</style>
