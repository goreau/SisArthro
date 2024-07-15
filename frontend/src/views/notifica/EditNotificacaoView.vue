<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-10 offset-1">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Notificação</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">1 - UNIDADE NOTIFICANTE
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-3">
                                    <label class="label">Número</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Preenc. Automático"
                                            v-model="notifica.codigo" readonly disabled />
                                    </div>
                                </div>
                                <div class="field column is-3 is-offset-3">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtNotifica">
                                    </div>
                                    <span class="is-error" v-if="v$.notifica.dt_notifica.$error">
                                        {{ v$.notifica.dt_notifica.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-4">
                                    <label class="label">CodSis - Município</label>
                                    <div class="control">
                                        <CmbMunicipio :id_prop="currentUser.id" @selMun="notifica.id_municipio = $event"
                                            :errclass="{ 'is-danger': v$.notifica.id_municipio.$error }" :sel="notifica.id_municipio" />
                                        <span class="is-error" v-if="v$.notifica.id_municipio.$error">
                                            {{ v$.notifica.id_municipio.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Unidade</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.unidade"
                                            :class="{ 'is-danger': v$.notifica.unidade.$error }" />
                                        <span class="is-error" v-if="v$.notifica.unidade.$error">
                                            {{ v$.notifica.unidade.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Veterinário Responsável</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.vet_resp"
                                            :class="{ 'is-danger': v$.notifica.vet_resp.$error }" />
                                        <span class="is-error" v-if="v$.notifica.vet_resp.$error">
                                            {{ v$.notifica.vet_resp.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">2 - INFORMAÇÕES SOBRE O
                                    CÃO</div>
                            </div>
                            <div class="columns">
                                <div class="field column is-4">
                                    <label class="label">Município</label>
                                    <div class="control">
                                        <CmbMunicipio :id_prop="currentUser.id" @selMun="notifica.id_mun_cao = $event"
                                            :errclass="{ 'is-danger': v$.notifica.id_mun_cao.$error }" :sel="notifica.id_mun_cao" />
                                        <span class="is-error" v-if="v$.notifica.id_mun_cao.$error">
                                            {{ v$.notifica.id_mun_cao.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Registro</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="registro" value="false" v-model="notifica.registro" />
                                            1 - Não
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="registro" value="true" v-model="notifica.registro" />
                                            2 - Sim
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.notifica.registro.$error">
                                        {{ v$.notifica.registro.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Registro</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.n_registro"
                                            :class="{ 'is-danger': v$.notifica.n_registro.$error }" />
                                        <span class="is-error" v-if="v$.notifica.n_registro.$error">
                                            {{ v$.notifica.n_registro.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Microchip</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.n_microchip"
                                            :class="{ 'is-danger': v$.notifica.n_microchip.$error }" />
                                        <span class="is-error" v-if="v$.notifica.n_microchip.$error">
                                            {{ v$.notifica.n_microchip.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-3">
                                    <label class="label">Nome Cão</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.nome"
                                            :class="{ 'is-danger': v$.notifica.nome.$error }" />
                                        <span class="is-error" v-if="v$.notifica.nome.$error">
                                            {{ v$.notifica.nome.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-6">
                                    <label class="label">Proprietário</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.proprietario"
                                            :class="{ 'is-danger': v$.notifica.proprietario.$error }" />
                                        <span class="is-error" v-if="v$.notifica.proprietario.$error">
                                            {{ v$.notifica.proprietario.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">CPF</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.cpf"
                                            :class="{ 'is-danger': v$.notifica.cpf.$error }" />
                                        <span class="is-error" v-if="v$.notifica.cpf.$error">
                                            {{ v$.notifica.cpf.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-5">
                                    <label class="label">Endereço</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.endereco"
                                            :class="{ 'is-danger': v$.notifica.endereco.$error }" />
                                        <span class="is-error" v-if="v$.notifica.endereco.$error">
                                            {{ v$.notifica.endereco.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Telefone</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.telefone"
                                            :class="{ 'is-danger': v$.notifica.telefone.$error }" />
                                        <span class="is-error" v-if="v$.notifica.telefone.$error">
                                            {{ v$.notifica.telefone.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Tempo Moradia</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.tempo_moradia"
                                            :class="{ 'is-danger': v$.notifica.tempo_moradia.$error }" />
                                        <span class="is-error" v-if="v$.notifica.tempo_moradia.$error">
                                            {{ v$.notifica.tempo_moradia.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Tipo</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="tipo_tempo" value="1"
                                                v-model="notifica.tipo_tempo" />
                                            1 - Meses
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="tipo_tempo" value="2"
                                                v-model="notifica.tipo_tempo" />
                                            2 - Anos
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.notifica.tipo_tempo.$error">
                                        {{ v$.notifica.tipo_tempo.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-4">
                                    <label class="label">Raça</label>
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="notifica.id_raca" class="input"
                                                :class="{ 'is-danger': v$.notifica.id_raca.$error }">
                                                <option value="0">-- Selecione --</option>
                                                <option v-for="reg in raca" :key="reg.id_raca" :value="reg.id_raca">
                                                    {{ reg.codigo }}
                                                </option>
                                            </select>
                                        </div>
                                        <span class="is-error" v-if="v$.notifica.id_raca.$error">
                                            {{ v$.notifica.id_raca.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Idade</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="notifica.idade"
                                            :class="{ 'is-danger': v$.notifica.idade.$error }" />
                                        <span class="is-error" v-if="v$.notifica.idade.$error">
                                            {{ v$.notifica.idade.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Tipo</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="tipo_idade" value="1"
                                                v-model="notifica.tipo_idade" />
                                            1 - Meses
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="tipo_idade" value="2"
                                                v-model="notifica.tipo_idade" />
                                            2 - Anos
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.notifica.tipo_idade.$error">
                                        {{ v$.notifica.tipo_idade.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Sexo</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="sexo" value="1" v-model="notifica.sexo" />
                                            1 - Fêmea
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="sexo" value="2" v-model="notifica.sexo" />
                                            2 - Macho
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.notifica.sexo.$error">
                                        {{ v$.notifica.sexo.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-12 has-text-centered cabeca">Sinais</div>
                            </div>
                            <div class="columns">
                                <div class="column is-1" v-for="reg in sinais" :key="reg.id_auxiliares">
                                    <label class="checkbox sinal">
                                        <input type="checkbox" name="sinais" :value="reg.id_auxiliares"
                                            @click="() => { selectSinal(reg.id_auxiliares) }" />
                                        <br>{{ reg.descricao }}
                                    </label>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-10 is-offset-1 has-text-centered cabeca">Deslocamentos</div>
                            </div>
                            <div class="columns">
                                <div class="field column is-4 is-offset-1">
                                    <label class="label">Município/UF</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="desloca.municipio"
                                            :class="{ 'is-danger': v$.desloca.desloca_municipio.$error }" />
                                        <span class="is-error" v-if="v$.desloca.desloca_municipio.$error">
                                            {{ v$.desloca.desloca_municipio.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Zona</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="zona" value="1" v-model="desloca.zona" />
                                            Rural
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="zona" value="2" v-model="desloca.zona" />
                                            Urbana
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.desloca.desloca_zona.$error">
                                        {{ v$.desloca.desloca_zona.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Permanência</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="desloca.permanencia"
                                            :class="{ 'is-danger': v$.desloca.desloca_permanencia.$error }" />
                                        <span class="is-error" v-if="v$.desloca.desloca_permanencia.$error">
                                            {{ v$.desloca.desloca_permanencia.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">&nbsp;</label>
                                    <button class="button is-primary is-outlined" @click="newDesloca">
                                        <span class="icon">
                                            <font-awesome-icon icon="fa-solid fa-plus-circle" />
                                        </span>
                                        <span>Inserir</span>
                                    </button>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="column is-8 is-offset-2">
                                    <MySimpleTable :tableData="dataTable" :columns="columns" />
                                </div>
                            </div>
                            <hr>
                            <div class="columns">
                                <div class="field column is-8 is-offset-2">
                                    <label class="label">Observação</label>
                                    <div class="control">
                                        <textarea class="textarea" placeholder="Opcional"
                                            v-model="notifica.observacao"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <footerCard @submit="edit" @cancel="null" @aux="details" :cFooter="cFooter" />
                        </footer>
                    </div>
                </div>
            </div>
            <div style="display: none">
                    <span class="icon is-small is-left" name="coisa">
                        <font-awesome-icon icon="fa-solid fa-edit" />
                    </span>
                    <span class="icon is-small is-left" name="coisa2">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </span>
            </div>
        </div>
    </div>
</template>

<script>
import notificaService from "@/services/notifica.service.js";
import caninoService from "@/services/canino.service";
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import MySimpleTable from "@/components/forms/MySimpleTable.vue";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import {
    required$,
    combo$,
    maxLength$,
    integer$,
    requiredIf$
} from "../../components/forms/validators.js";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
export default {
    components: {
        Loader,
        Message,
        CmbMunicipio,
        CmbAuxiliares,
        footerCard,
        MySimpleTable,
    },
    data() {
        return {
            raca: [],
            notifica: {
                id_municipio: 0,
                codigo: '',
                unidade: '',
                vet_resp: '',
                id_mun_cao: 0,
                registro: 0,
                n_registro: false,
                n_microchip: '',
                nome: '',
                proprietario: '',
                cpf: '',
                endereco: '',
                telefone: '',
                tempo_moradia: '',
                tipo_tempo: 0,
                id_raca: 0,
                idade: '',
                tipo_idade: 0,
                sexo: 0,
                sinais: [],
                deslocamentos: [],
                id_usuario: 0,
                dt_notifica: '',
                observacao: ''

            },
            desloca: {
                municipio: '',
                zona: 0,
                permanencia: '',
            },
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            cFooter: {
                strSubmit: 'Salvar',
                strCancel: 'Cancelar',
                strAux: 'Exames',
                aux: true
            },
            sinais: [],
            desloca: {
                municipio: '',
                zona: 0,
                permanencia: '',
            },
            editing: -1,
            teste: [],
            dataTable: [],
            columns: [],
        }
    },
    validations() {
        return {
            desloca: {
                desloca_municipio: {},
                desloca_zona: {},
                desloca_permanencia: {},
            },
            notifica: {
                dt_notifica: { required$, },
                id_municipio: { minValue: combo$(1) },
                n_registro: { requiredIf: requiredIf$(this.notifica.n_microchip == '' && this.notifica.registro == 2), maxLength: maxLength$(5) },
                n_microchip: { requiredIf: requiredIf$(this.notifica.n_registro == '' && this.notifica.registro == 2), maxLength: maxLength$(15) },
                unidade: {
                    required$,
                    maxLength: maxLength$(40)
                },
                vet_resp: {
                    required$,
                    maxLength: maxLength$(40)
                },
                id_mun_cao: { minValue: combo$(1) },
                registro: { required$, },
                nome: {
                    required$,
                    maxLength: maxLength$(20)
                },
                proprietario: {
                    required$,
                    maxLength: maxLength$(40)
                },
                cpf: {
                    maxLength: maxLength$(14)
                },
                endereco: {
                    required$,
                    maxLength: maxLength$(40)
                },
                telefone: {
                    maxLength: maxLength$(16)
                },
                tempo_moradia: { integer$ },
                tipo_tempo: { requiredIf: requiredIf$(this.notifica.tempo_moradia > 0) },
                id_raca: { minValue: combo$(1) },
                idade: { integer$ },
                tipo_idade: { requiredIf: requiredIf$(this.notifica.idade > 0) },
                sexo: { minValue: combo$(1) },
                dt_notifica: { required$, },
            },
        };
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    methods: {
        details() {
            this.$router.push("/notifica_exame/" + this.notifica.id_notificacao);
        },
        editDesloca(idx) {
            let dados = this.teste[idx];
            this.desloca = dados;
            this.editing = idx;
        },
        delDesloca(idx) {
            this.teste.splice(idx, 1);
            this.dataTable = JSON.parse(JSON.stringify(this.teste));
        },
        newDesloca() {
            if (this.editing < 0) {
                this.teste.push(JSON.parse(JSON.stringify(this.desloca)));//this.criarNovoObjeto(this.parasito));
            } else {
                this.teste[this.editing] = JSON.parse(JSON.stringify(this.desloca));
                this.editing = -1;
            }

            this.dataTable = JSON.parse(JSON.stringify(this.teste));
        },
        startSinais(){
            const chks = document.querySelectorAll('input[type="checkbox"]');
            for (let i = 0; i < chks.length; i++) {
                if (this.notifica.sinais.includes(parseInt(chks[i].value))){
                    chks[i].setAttribute('checked','checked');
                }
            }
        },
        selectSinal(id){
            if(this.notifica.sinais.includes(id)){
                const idx = this.notifica.sinais.indexOf(id);
                this.notifica.sinais.splice(idx, 1);
            }else{
                this.notifica.sinais.push(id)
            }
        },
        getSinais() {
            notificaService.getComboSinais()
            .then((res) => {
                this.sinais = res.data;
            })
            .catch((err) => {
                this.sinais = [];
            })
        },
        getRaca() {
            caninoService
                .getRaca(2)
                .then((res) => {
                    this.raca = res.data;
                })
                .catch((err) => {
                    this.raca = [];
                });
        },
        setDate($event) {
            if ($event) {
                this.notifica.dt_notifica = moment(String($event)).format('YYYY-MM-DD');
            }
        },
        loadData() {
            this.isLoading = true;

            notificaService.getNotifica(this.notifica.id_notificacao).then(
                async (response) => {
                    let data = response.data;
                    this.notifica.id_municipio = data.id_municipio;
                    this.notifica.codigo = data.codigo;
                    this.notifica.unidade = data.unidade;
                    this.notifica.vet_resp = data.vet_resp;
                    this.edt_date = moment(String(data.dt_notifica)).format('DD/MM/YYYY');
                    this.notifica.dt_notifica = data.dt_notifica;
                    this.notifica.id_mun_cao = data.id_mun_cao;
                    this.notifica.cpf = data.cpf;
                    if (data.deslocamentos != null){
                        this.teste = data.deslocamentos;                 
                        this.dataTable = [...this.teste];
                    }
                    this.notifica.endereco = data.endereco;
                    this.notifica.id_raca = data.id_raca;
                    this.notifica.idade = data.idade;
                    this.notifica.n_microchip = data.n_microchip;
                    this.notifica.n_registro = data.n_registro;
                    this.notifica.nome = data.nome;
                    this.notifica.observacao = data.observacao;
                    this.notifica.proprietario = data.proprietario;
                    this.notifica.registro = data.registro;
                    this.notifica.sexo = data.sexo;
                    if (data.sinais != null){
                        this.notifica.sinais = data.sinais;
                    }
                    this.notifica.telefone = data.telefone;
                    this.notifica.tempo_moradia = data.tempo_moradia;
                    this.notifica.tipo_idade = data.tipo_idade;
                    this.notifica.tipo_tempo = data.tipo_tempo;
                    
                    this.startCalendar();
                    this.startSinais();
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
                    this.caption = "CodEnd";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            );


            this.isLoading = false;
        },
        edit() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {
                document.getElementById('login').classList.add('is-loading');

                this.notifica.deslocamentos = this.teste;

                notificaService.edit(this.notifica).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Notificação alterada com sucesso";
                        this.type = "success";
                        this.caption = "Notificação";
                        setTimeout(() => {
                            this.showMessage = false;
                        }, 3000);
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Notificação";
                        setTimeout(() => (this.showMessage = false), 3000);
                    }
                )
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Notificação";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById('login').classList.remove('is-loading');
                    });
            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Captura";
                setTimeout(() => (this.showMessage = false), 3000);
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
        startCalendar() {
            const options = {
                type: "date",
                dateFormat: "dd/MM/yyyy",
                showHeader: false,
                color: "info",
                allowInput: true,
                startDate: this.notifica.dt_notifica,
                cancelLabel: 'Cancelar',
                showClearButton: false,
                todayLabel: 'Hoje',
                maxDate: new Date(),
            };

            var calini = bulmaCalendar.attach('#dtNotifica', options);

            const element = document.querySelector('#dtNotifica');

            const input = document.querySelector('.datetimepicker-dummy-input');
            input.removeAttribute('readonly');
            input.setAttribute('value', "__/__/____");
            input.setAttribute('data-mask', "__/__/____");
            this.applyDataMask(input);

            input.addEventListener('blur', () => {
                this.notifica.dt_notifica = moment(input.value).format('YYYY-MM-DD');
            })

            if (element) {
                // bulmaCalendar instance is available as element.bulmaCalendar
                element.bulmaCalendar.on('select', datepicker => {
                    this.notifica.dt_notifica = moment(datepicker.data.startDate).format('YYYY-MM-DD');
                });
            }
        }
    },
    mounted() {
        let cUser = this.currentUser;
        if (cUser) {
            this.notifica.id_usuario = cUser.id;
        }

        this.getRaca();

        this.myspan = document.getElementsByName("coisa")[0];
        this.myspan2 = document.getElementsByName("coisa2")[0];

        this.columns = [
            { title: "Município/UF", field: "municipio", type: "string" },
            { title: "Zona", field: "zona", type: "string" },
            { title: "Permanência", field: "permanencia", type: "string" },
            {
                title: "Ações",
                formatter: (cell, formatterParams) => {
                    const row = cell.getRow().getData();
                    const idx = cell.getRow().getPosition();

                    const btEdit = document.createElement("button");
                    btEdit.type = "button";
                    btEdit.title = "Editar";
                    btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btEdit.classList.add("button", "is-primary", "is-outlined");
                    btEdit.innerHTML = this.myspan.innerHTML;
                    btEdit.addEventListener("click", () => {
                        this.editDesloca(idx - 1);
                    });

                    const btDel = document.createElement("button");
                    btDel.type = "button";
                    btDel.title = "Excluir";
                    btDel.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btDel.classList.add("button", "is-danger", "is-outlined");
                    btDel.innerHTML = this.myspan2.innerHTML;
                    btDel.addEventListener("click", async () => {
                        this.delDesloca(idx - 1);
                    });

                    const buttonHolder = document.createElement("span");
                    buttonHolder.appendChild(btEdit);
                    buttonHolder.appendChild(btDel);

                    return buttonHolder;
                },
            }
        ]
    },
    created() {
        this.notifica.id_notificacao = this.$route.params.id;
        this.getSinais(); 
        this.loadData(); 
    },
}
</script>

<style scoped>
.cabeca {
    /*padding: 0 !important;*/
    border-top: 1px solid;
    font-weight: bold;
}

.sinal {
    font-size: x-small;
}
</style>