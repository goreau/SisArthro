<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-three-fifths">
        <Loader :active="isLoading" />
        <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Localidade</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column is-5 is-offset-1">
                  <div class="field">
                    <label class="label">Município</label>
                    <div class="control">
                      <CmbMunicipio :id_prop="currentUser.id"
                        @selMun="this.localidadeStore.localidade.id_municipio = $event"
                        :sel="this.localidadeStore.localidade.id_municipio"
                        :errclass="{ 'is-danger': v$.localidadeStore.localidade.id_municipio.$error }" />
                      <span class="is-error" v-if="v$.localidadeStore.localidade.id_municipio.$error">
                        {{ v$.localidadeStore.localidade.id_municipio.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column is-5">
                  <div class="field">
                    <label class="label">Data do Cadastro</label>
                    <div class="control">
                      <input type="text" id="dtCadastro">
                    </div>
                    <span class="is-error" v-if="v$.localidadeStore.localidade.dt_cadastro.$error">
                      {{ v$.localidadeStore.localidade.dt_cadastro.$errors[0].$message }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-10 is-offset-1">
                  <fieldset class="fieldset">
                    <legend>Tipo de Área</legend>
                    <div class="field">
                      <label v-for="item in tiposArea" :key="item.id_auxiliares" class="radio">
                        <input type="radio" name="tipoArea" :value="item.id_auxiliares"
                          v-model="this.localidadeStore.localidade.tp_area" />
                        {{ item.nome }}
                      </label>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div class="columns">
                <div class="column is-8 is-offset-1">
                  <div class="field">
                    <label class="label">Nome</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Nome" v-model="this.localidadeStore.localidade.nome"
                        :class="{ 'is-danger': v$.localidadeStore.localidade.nome.$error }" />
                      <span class="is-error" v-if="v$.localidadeStore.localidade.nome.$error">
                        {{ v$.localidadeStore.localidade.nome.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="column is-2">
                  <div class="field">
                    <label class="label">Código</label>
                    <div class="control">
                      <input class="input" type="text" placeholder="Código"
                        v-model="this.localidadeStore.localidade.codigo" readonly />
                    </div>
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-10 is-offset-1">
                  <fieldset class="fieldset">
                    <legend>Bairros</legend>
                    <div class="field">
                      <label class="label">Nome</label>

                      <!-- Input com botão acoplado usando Bulma (has-addons) -->
                      <div class="field has-addons">
                        <div class="control is-expanded">
                          <input v-model="novoBairro" class="input" type="text" placeholder="Digite o nome do bairro"
                            @keyup.enter.prevent="adicionarBairro" />
                        </div>
                        <div class="control">
                          <button type="button" class="button is-primary" @click="adicionarBairro">
                            <span class="icon is-small">
                              <i class="fas fa-plus"></i>
                            </span>
                            <span>Adicionar</span>
                          </button>
                        </div>
                      </div>

                      <!-- Feedback visual de erro caso tente inserir duplicado/vazio -->
                      <p v-if="mensagemErro" class="help is-danger">
                        {{ mensagemErro }}
                      </p>

                      <!-- Exibição dos bairros adicionados usando Tags do Bulma -->
                      <div class="mt-3">
                        <label class="label is-small">Bairros adicionados:</label>

                        <!-- Lista em formato de Tags/Badges removíveis -->
                        <div v-if="this.localidadeStore.localidade.bairros?.length > 0" class="tags">
                          <span v-for="(bairro, index) in this.localidadeStore.localidade.bairros" :key="index"
                            class="tag is-info is-light is-medium">
                            {{ bairro }}
                            <button type="button" class="delete is-small" @click="removerBairro(index)"
                              title="Remover bairro"></button>
                          </span>
                        </div>

                        <!-- Estado vazio -->
                        <p v-else class="has-text-grey-light is-size-7">
                          Nenhum bairro adicionado ainda.
                        </p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div class="columns">
                <div class="column is-10 is-offset-1">
                  <fieldset class="fieldset">
                    <legend>Censitários</legend>
                    <div class="field">
                      <label class="label">Código</label>

                      <!-- Input com botão acoplado usando Bulma (has-addons) -->
                      <div class="field has-addons">
                        <div class="control is-expanded">
                          <input v-model="novoCensitario" class="input" type="text"
                            placeholder="Digite o código do setor censitário"
                            @keyup.enter.prevent="adicionarCensitario" />
                        </div>
                        <div class="control">
                          <button type="button" class="button is-primary" @click="adicionarCensitario">
                            <span class="icon is-small">
                              <i class="fas fa-plus"></i>
                            </span>
                            <span>Adicionar</span>
                          </button>
                        </div>
                      </div>

                      <!-- Feedback visual de erro caso tente inserir duplicado/vazio -->
                      <p v-if="mensagemErro" class="help is-danger">
                        {{ mensagemErro }}
                      </p>

                      <!-- Exibição dos bairros adicionados usando Tags do Bulma -->
                      <div class="mt-3">
                        <label class="label is-small">Censitários adicionados:</label>

                        <!-- Lista em formato de Tags/Badges removíveis -->
                        <div v-if="this.localidadeStore.localidade.censitarios?.length > 0" class="tags">
                          <span v-for="(censitario, index) in this.localidadeStore.localidade.censitarios" :key="index"
                            class="tag is-info is-light is-medium">
                            {{ censitario }}
                            <button type="button" class="delete is-small" @click="removerCensitario(index)"
                              title="Remover setor censitário"></button>
                          </span>
                        </div>

                        <!-- Estado vazio -->
                        <p v-else class="has-text-grey-light is-size-7">
                          Nenhum setor censitário adicionado ainda.
                        </p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="columns">
                <div class="column is-10 is-offset-1">
                  <div class="field">
                    <label for="" class="label">Referência</label>
                    <input type="text" class="input" v-model="localidadeStore.localidade.referencia">
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-10 is-offset-1">
                  <div class="field">
                    <label for="" class="label">Observação</label>
                    <input type="text" class="input" v-model="localidadeStore.localidade.observacao">
                  </div>
                </div>
              </div>
              <div class="columns">
                <div class="column is-10 is-offset-1">
                  <fieldset class="fieldset">
                    <legend>Subdivisões da Localidade</legend>
                    <div class="field">
                      <label class="label">Descrição</label>

                      <!-- Input com botão acoplado usando Bulma (has-addons) -->
                      <div class="field has-addons">
                        <div class="control is-expanded">
                          <input v-model="novoSub" class="input" type="text" placeholder="Digite a descrição"
                            @keyup.enter.prevent="adicionarSub" />
                        </div>
                        <div class="control">
                          <button type="button" class="button is-primary" @click="adicionarSub">
                            <span class="icon is-small">
                              <i class="fas fa-plus"></i>
                            </span>
                            <span>Adicionar</span>
                          </button>
                        </div>
                      </div>

                      <!-- Feedback visual de erro caso tente inserir duplicado/vazio -->
                      <p v-if="mensagemErro" class="help is-danger">
                        {{ mensagemErro }}
                      </p>

                      <!-- Exibição dos bairros adicionados usando Tags do Bulma -->
                      <div class="mt-3">
                        <label class="label is-small">Subdivisões adicionadas:</label>

                        <!-- Lista em formato de Tags/Badges removíveis -->
                        <div v-if="this.localidadeStore.localidade.subdivisoes?.length > 0" class="tags">
                          <span v-for="(subdivisao, index) in this.localidadeStore.localidade.subdivisoes" :key="index"
                            class="tag is-info is-light is-medium">
                            {{ subdivisao }}
                            <button type="button" class="delete is-small" @click="removerSub(index)"
                              title="Remover subdivisão"></button>
                          </span>
                        </div>

                        <!-- Estado vazio -->
                        <p v-else class="has-text-grey-light is-size-7">
                          Nenhuma subdivisão adicionada ainda.
                        </p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div class="columns">
                <div class="column is-10 is-offset-1">
                  <fieldset class="fieldset">
                    <legend>Motivo</legend>
                    <div class="field">
                      <label v-for="item in motivos" :key="item.id_auxiliares" class="radio">
                        <input type="radio" name="motivo" :value="item.id_auxiliares"
                          v-model="this.localidadeStore.localidade.id_motivo" />
                        {{ item.nome }}
                      </label>
                    </div>
                    <input type="text" class="input" name="mot_esp"
                      v-model="this.localidadeStore.localidade.motivo_especifica"
                      v-show="this.localidadeStore.localidade.id_motivo == 3877" placeholder="Especificação dos outros">
                    <div class="field">
                      <label class="label">Agravo</label>

                      <!-- Select com botão acoplado (Bulma has-addons) -->
                      <div class="field has-addons">
                        <div class="control is-expanded">
                          <div class="select is-fullwidth">
                            <select v-model="novoAgravoId">
                              <option :value="null">Selecione um agravo...</option>
                              <option v-for="item in listaAgravos" :key="item.id_auxiliares"
                                :value="item.id_auxiliares">
                                {{ item.nome }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="control">
                          <button type="button" class="button is-primary" @click="adicionarAgravo">
                            <span class="icon is-small">
                              <i class="fas fa-plus"></i>
                            </span>
                            <span>Adicionar</span>
                          </button>
                        </div>
                      </div>
                      <!-- Mensagem de erro/alerta -->
                      <p v-if="mensagemErro" class="help is-danger">
                        {{ mensagemErro }}
                      </p>

                      <!-- Tags dos Agravos Selecionados -->
                      <div class="mt-3">
                        <label class="label is-small">Agravos Selecionados:</label>

                        <div v-if="this.localidadeStore.localidade.agravos?.length > 0" class="tags">
                          <span v-for="id in this.localidadeStore.localidade.agravos" :key="id"
                            class="tag is-info is-light is-medium">
                            <!-- Função helper que busca o nome pelo ID -->
                            {{ getNomeAgravo(id) }}
                            <button type="button" class="delete is-small" @click="removerAgravo(id)"
                              title="Remover agravo"></button>
                          </span>
                        </div>

                        <p v-else class="has-text-grey-light is-size-7">
                          Nenhum agravo selecionado.
                        </p>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <button class="button is-info is-outlined is-fullwidth" @click="verMapa">
                    <span class="icon">
                      <font-awesome-icon icon="fa-solid fa-repeat" />
                    </span>
                    <span>Coordenadas</span>
                  </button>
                </div>
              </div>
              <hr>
              <div class="columns">
                <div class="column is-10 is-offset-1">
                  <div class="field">
                    <label for="" class="label">Responsável</label>
                    <input type="text" class="input" v-model="this.localidadeStore.localidade.responsavel">
                  </div>
                </div>
              </div>
            </div>


          </div>
          <footer class="card-footer">
            <footerCard @submit="create" @cancel="null" @aux="null" :cFooter="cFooter" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import localidadeService from "@/services/localidade.service";
import capturaService from "@/services/captura.service.js";
import { mapStores, mapWritableState } from 'pinia'
import { useLocalidadeStore } from '@/store/localidadeStore'
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import moment from 'moment';
import {
  required$,
  combo$,
  minLength$,
  maxLength$
} from "../../components/forms/validators.js";

const localidadeStore = useLocalidadeStore()

export default {
  data() {
    return {
      v$: useValidate(),
      municipio: "",
      isLoading: false,
      message: "",
      caption: "",
      type: "",
      tiposArea: [],
      motivos: [],
      listaAgravos: [],
      novoBairro: '',
      novoCensitario: '',
      novoSub: '',
      novoAgravoId: null,
      mensagemErro: '',
      showMessage: false,
      cFooter: {
        strSubmit: "Salvar",
        strCancel: "Cancelar",
        strAux: "",
        aux: false,
      },
    };
  },
  validations() {
    return {
      localidadeStore: {
        localidade: {
          nome: {
            required$,
            minLength: minLength$(3),
            maxLength: maxLength$(100)
          },
          id_municipio: {
            minValue: combo$(1),
          },
          dt_cadastro: {
            required$
          }
        },
      }
    };
  },
  computed: {
    isEditMode() { return Number(this.$route.params.id) > 0 },
    currentUser() {
      return this.$authStore.loggedUser;
    },
    ...mapStores(useLocalidadeStore),

    // 2. Se quiser acessar ou usar v-model diretamente em 'form':
    ...mapWritableState(useLocalidadeStore, ['form'])
  },
  components: {
    Message,
    Loader,
    CmbMunicipio,
    footerCard,
  },
  methods: {
    adicionarBairro() {
      const valorFormatado = this.novoBairro.trim()
      this.mensagemErro = ''

      // 1. Validação: não permitir texto vazio
      if (!valorFormatado) {
        this.mensagemErro = 'Digite o nome de um bairro.'
        return
      }

      // 2. Validação: evitar duplicados (case-insensitive)
      const jaExiste = this.localidadeStore.localidade.bairros.some(
        b => b.toLowerCase() === valorFormatado.toLowerCase()
      )

      if (jaExiste) {
        this.mensagemErro = 'Este bairro já foi adicionado.'
        return
      }

      // 3. Adiciona no array e limpa o input
      this.localidadeStore.localidade.bairros.push(valorFormatado)
      this.novoBairro = ''
    },
    removerBairro(index) {
      this.localidadeStore.localidade.bairros.splice(index, 1)
    },
    adicionarCensitario() {
      const valorFormatado = this.novoCensitario.trim()
      this.mensagemErro = ''

      // 1. Validação: não permitir texto vazio
      if (!valorFormatado) {
        this.mensagemErro = 'Digite o código de um setor censitário.'
        return
      }

      // 2. Validação: evitar duplicados (case-insensitive)
      const jaExiste = this.localidadeStore.localidade.censitarios.some(
        b => b.toLowerCase() === valorFormatado.toLowerCase()
      )

      if (jaExiste) {
        this.mensagemErro = 'Este setor censiitário já foi adicionado.'
        return
      }

      // 3. Adiciona no array e limpa o input
      this.localidadeStore.localidade.censitarios.push(valorFormatado)
      this.novoCensitario = ''
    },
    removerCensitario(index) {
      this.localidadeStore.localidade.censitarios.splice(index, 1)
    },
    adicionarSub() {
      const valorFormatado = this.novoSub.trim()
      this.mensagemErro = ''

      // 1. Validação: não permitir texto vazio
      if (!valorFormatado) {
        this.mensagemErro = 'Digite a descrição da subdivisão.'
        return
      }

      // 2. Validação: evitar duplicados (case-insensitive)
      const jaExiste = this.localidadeStore.localidade.subdivisoes.some(
        b => b.toLowerCase() === valorFormatado.toLowerCase()
      )

      if (jaExiste) {
        this.mensagemErro = 'Essa descrição já foi adicionada.'
        return
      }

      // 3. Adiciona no array e limpa o input
      this.localidadeStore.localidade.subdivisoes.push(valorFormatado)
      this.novoSub = ''
    },
    removerSub(index) {
      this.localidadeStore.localidade.subdivisoes.splice(index, 1)
    },
    getNomeAgravo(id) {
      const agravo = this.listaAgravos.find(a => a.id_auxiliares === id)
      return agravo ? agravo.nome : `Agravo #${id}`
    },
    adicionarAgravo() {
      this.mensagemErro = ''

      if (!this.novoAgravoId) {
        this.mensagemErro = 'Selecione um agravo na lista.'
        return
      }

      // Verifica se o ID já foi adicionado ao array
      if (this.localidadeStore.localidade.agravos.includes(this.novoAgravoId)) {
        this.mensagemErro = 'Este agravo já foi adicionado.'
        return
      }

      // Adiciona o ID numérico ao array
      this.localidadeStore.localidade.agravos.push(this.novoAgravoId)

      // Reseta a seleção do dropdown
      this.novoAgravoId = null
    },
    removerAgravo(idParaRemover) {
      this.localidadeStore.localidade.agravos = this.loc.agravos.filter(id => id !== idParaRemover)
    },
    setDate($event) {
      if ($event) {
        this.localidadeStore.localidade.dt_cadastro = moment(String($event)).format('YYYY-MM-DD');
      }
    },
    applyDataMask(field) {
      var mask = field.dataset.mask.split('');

      // For now, this just strips everything that's not a number
      function stripMask(maskedData) {
        function isDigit(char) {
          return /\d/.test(char);
        }
        return maskedData.split('').filter(isDigit);
      }

      // Replace `_` characters with characters from `data`
      function applyMask(data) {
        return mask.map(function (char) {
          if (char != '_') return char;
          if (data.length == 0) return char;
          return data.shift();
        }).join('')
      }

      function reapplyMask(data) {
        return applyMask(stripMask(data));
      }

      function changed() {
        var oldStart = field.selectionStart;
        var oldEnd = field.selectionEnd;

        field.value = reapplyMask(field.value);

        field.selectionStart = oldStart;
        field.selectionEnd = oldEnd;
      }

      field.addEventListener('click', changed)
      field.addEventListener('keyup', changed)
    },
    create() {
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        document.getElementById("login").classList.add("is-loading");

        if (this.isEditMode) {
          localidadeService
            .edit(this.localidadeStore.localidade)
            .then(
              (response) => {
                this.showMessage = true;
                this.message = "Cadastro da localidade atualizado com sucesso.";
                this.type = "success";
                this.caption = "Localidade";
                setTimeout(() => (this.showMessage = false), 3000);
              },
              (error) => {
                this.message = error;
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Usuário";
                setTimeout(() => (this.showMessage = false), 3000);
              }
            )
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        } else {
          localidadeService
            .create(this.localidadeStore.localidade)
            .then(
              (response) => {
                this.showMessage = true;
                this.message = "Localidade cadastrada.";
                this.type = "success";
                this.caption = "Localidade";
                setTimeout(() => (this.showMessage = false), 3000);
              },
              (error) => {
                this.message = error;
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Usuário";
                setTimeout(() => (this.showMessage = false), 3000);
              }
            )
            .finally(() => {
              document.getElementById("login").classList.remove("is-loading");
            });
        }
      } else {
        this.message = "Corrija os erros para enviar as informações";
        this.showMessage = true;
        this.type = "alert";
        this.caption = "Localidade";
        setTimeout(() => (this.showMessage = false), 3000);
      }
    },
    verMapa() {
      this.$router.push("/mapa_localidade");
    },
    loadCombos() {
      capturaService.getAuxiliares(1)
        .then((res) => {
          this.tiposArea = res.data;
        })
        .catch((err) => {
          console.log(err.response);
          this.tiposArea = [];
        });

      capturaService.getAuxiliares(31)
        .then((res) => {
          this.motivos = res.data;
        })
        .catch((err) => {
          console.log(err.response);
          this.motivos = [];
        })

      capturaService.getAuxiliares(2)
        .then((res) => {
          this.listaAgravos = res.data;
        })
        .catch((err) => {
          console.log(err.response);
          this.listaAgravos = [];
        });
    },
    async verificaEdit() {
      if (!this.isEditMode) {
        console.log(this.$route.params.id);
        return;
      }

      const paramId = Number(this.$route.params.id);
      const storeId = Number(this.localidadeStore.localidade?.id_localidade);

      // SE JÁ É O MESMO ID QUE ESTÁ NA STORE:
      // Não precisa buscar do backend novamente! Os dados editados (incluindo polígonos) já estão seguros na store.
      if (paramId === storeId) {
        console.log('Dados mantidos da store (edição em andamento)');
        return;
      }

      // SE É UM ID DIFERENTE (ou a store está vazia/primeira carga do registro):
      this.isLoading = true;

      try {
        const response = await localidadeService.getLocalidade(paramId);
        const data = response.data;

        data.agravos = data.agravos || [];
        data.censitarios = data.censitarios || [];
        data.bairros = data.bairros || [];
        data.subdivisoes = data.subdivisoes || [];


        // 1. Atualiza o objeto geral da localidade na store
        this.localidadeStore.localidade = data;

        // 2. Se tiver coordenadas vindas do banco, faz o parse e atualiza
        if (data.fant_coordenadas) {
          try {
            const geojsonObj = typeof data.fant_coordenadas === 'string'
              ? JSON.parse(data.fant_coordenadas)
              : data.fant_coordenadas;

            if (geojsonObj && geojsonObj.coordinates) {
              this.localidadeStore.setCoordenadas(geojsonObj);
            }
          } catch (e) {
            console.error("Erro ao fazer parse do fant_coordenadas:", e);
            data.fant_coordenadas = null;
          }
        }

      } catch (error) {
        this.message =
          (error.response && error.response.data && error.response.data.message) ||
          error.response?.data ||
          error.message ||
          error.toString();

        this.showMessage = true;
        this.type = "alert";
        this.caption = "Localidade";
        setTimeout(() => (this.showMessage = false), 3000);
      } finally {
        // Garante que o loading apague só depois de terminar a chamada HTTP
        this.isLoading = false;
      }
    },
    async verificaEditMeu() {
      if (this.isEditMode) {
        this.isLoading = true;

        localidadeService.getLocalidade(this.$route.params.id).then(
          (response) => {
            let data = response.data;

            const paramId = Number(this.$route.params.id)
            const storeId = Number(this.localidadeStore.localidade.id_localidade)


            if (data.fant_coordenadas && paramId !== storeId) {
              try {
                // 1. Converte a string JSON para um objeto JavaScript
                const geojsonObj = typeof data.fant_coordenadas === 'string'
                  ? JSON.parse(data.fant_coordenadas)
                  : data.fant_coordenadas;

                // 2. Salva o objeto geojson completo na store (ou como a sua store espera)
                localidadeStore.localidade = data;

                // 3. Se você precisa passar especificamente o array de coordenadas (coordinates[0]) para a store ou método:
                if (geojsonObj && geojsonObj.coordinates) {
                  // Se o seu setCoordenadas espera o objeto Polygon completo ou apenas o array, ajuste aqui:
                  localidadeStore.setCoordenadas(geojsonObj); // Recomendado manter o objeto GeoJSON completo
                }

              } catch (e) {
                console.error("Erro ao fazer parse do fant_coordenadas:", e);
                data.fant_coordenadas = null;
              }
            } else {
              //       localidadeStore.localidade = data;
            }
          },
          (error) => {
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.response.data ||
              error.message ||
              error.toString();
            this.showMessage = true;
            this.type = "alert";
            this.caption = "Localidade";
            setTimeout(() => (this.showMessage = false), 3000);
          }
        );

        this.isLoading = false;
      } else {
        console.log(this.$route.params.id)
      }
    }
  },

  mounted() {
    let cUser = this.currentUser;
    if (cUser) {
      this.localidadeStore.localidade.id_usuario = cUser.id;
    }

    this.loadCombos()

    this.verificaEdit()

    if (!this.isEditMode) {
      this.localidadeStore.localidade.dt_cadastro = new Date()
    }

    const options = {
      type: "date",
      dateFormat: "dd/MM/yyyy",
      showHeader: false,
      startDate: (this.isEditMode && this.localidadeStore.localidade?.dt_cadastro)
        ? new Date(this.localidadeStore.localidade.dt_cadastro)
        : new Date(),
      color: "info",
      allowInput: true,
      cancelLabel: 'Cancelar',
      showClearButton: false,
      todayLabel: 'Hoje',
      maxDate: new Date(),
    };

    var calini = bulmaCalendar.attach('#dtCadastro', options);

    const element = document.querySelector('#dtCadastro');

    const input = document.querySelector('.datetimepicker-dummy-input');
    input.removeAttribute('readonly');
    input.setAttribute('value', "__/__/____");
    input.setAttribute('data-mask', "__/__/____");
    this.applyDataMask(input);

    input.addEventListener('blur', () => {
      this.localidadeStore.localidade.dt_cadastro = moment(input.value).format('YYYY-MM-DD');
    })

    if (element) {
      // bulmaCalendar instance is available as element.bulmaCalendar
      element.bulmaCalendar.on('select', datepicker => {
        this.localidadeStore.localidade.dt_cadastro = moment(datepicker.data.startDate).format('YYYY-MM-DD');
      });
    }
  },
};
</script>

<style scoped></style>
