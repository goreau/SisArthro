<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-10 offset-1">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">
                            Cadastro de Animais
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="field column is-4">
                                    <label class="label">Nome</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="" v-model="canino_det.nome"
                                            :class="{ 'is-danger': v$.canino_det.nome.$error }" />
                                        <span class="is-error" v-if="v$.canino_det.nome.$error">
                                            {{ v$.canino_det.nome.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Espécie</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="especie" value="1"
                                                v-model="canino_det.id_especie" />
                                            1 - Felino
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="especie" value="2"
                                                v-model="canino_det.id_especie" />
                                            2 - Canino
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.canino_det.id_especie.$error">
                                        {{ v$.canino_det.id_especie.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">RA</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="" v-model="canino_det.ra"
                                            :class="{ 'is-danger': v$.canino_det.ra.$error }" />
                                        <span class="is-error" v-if="v$.canino_det.ra.$error">
                                            {{ v$.canino_det.ra.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Ano Nasc</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="" v-model="canino_det.nascimento"
                                            :class="{ 'is-danger': v$.canino_det.nascimento.$error }" />
                                        <span class="is-error" v-if="v$.canino_det.nascimento.$error">
                                            {{ v$.canino_det.nascimento.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!----->
                            <div class="columns">
                                <div class="field column is-3">
                                    <label class="label">Sexo</label>
                                    <div class="control has-icons-left has-icons-right">
                                        <label class="radio">
                                            <input type="radio" name="sexo" value="1" v-model="canino_det.id_sexo" />
                                            1 - Macho
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="sexo" value="2" v-model="canino_det.id_sexo" />
                                            2 - Fêmea
                                        </label>
                                    </div>
                                    <span class="is-error" v-if="v$.canino_det.id_sexo.$error">
                                        {{ v$.canino_det.id_sexo.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Raça</label>
                                    <div class="control">
                                        <div class="select">
                                            <select v-model="canino_det.id_raca" class="input">
                                                <option value="0">-- Selecione --</option>
                                                <option v-for="reg in raca" :key="reg.id_raca" :value="reg.id_raca">
                                                    {{ reg.codigo }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Cor</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="10" @selValue="canino_det.id_cor = $event" :errclass="{
                                            'is-danger': v$.canino_det.id_cor.$error,
                                        }" :sel="canino_det.id_cor" />
                                        <span class="is-error" v-if="v$.canino_det.id_cor.$error">
                                            {{ v$.canino_det.id_cor.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-2">
                                    <label class="label">Peso</label>
                                    <div class="control">
                                        <input class="input" type="text" placeholder="Kg" v-model="canino_det.peso"
                                            :class="{ 'is-danger': v$.canino_det.peso.$error }"
                                            @blur="changeComma($event)" />
                                        <span class="is-error" v-if="v$.canino_det.peso.$error">
                                            {{ v$.canino_det.peso.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import caninoService from "@/services/canino.service";
import footerCard from "@/components/forms/FooterCard.vue";
import useValidate from "@vuelidate/core";
import { required$, combo$, decimal$, minLength$, maxLength$, integer$ } from "../../components/forms/validators.js";

export default {
    components: {
        Loader,
        Message,
        CmbAuxiliares,
        footerCard,
    },
    data() {
        return {
            master: {},
            raca: [],
            canino_det: {
                id_canino: 0,
                nome: "",
                id_especie: 0,
                ra: "",
                nascimento: "",
                id_sexo: 0,
                id_raca: 0,
                id_cor: 0,
                peso: 0,
            },
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            cFooter: {
                strSubmit: "Salvar",
                strCancel: "Cancelar",
                strAux: "Animais",
                aux: true,
            },
        };
    },
    validations() {
        return {
            canino_det: {
                nome: { maxLength: maxLength$(30) },
                ra: { maxLength: maxLength$(150) },
                id_especie: { required$ },
                nascimento: { maxLength: maxLength$(4), minLength: minLength$(4), integer$ },
                id_sexo: { minValue: combo$(1) },
                id_raca: { minValue: combo$(1) },
                id_cor: { minValue: combo$(1) },
                peso: { decimal$ },
            },
        };
    },
    methods: {
        details() {
            this.$router.push("/canino_dets/" + this.canino_det.id_canino);
        },
        prepare() {
            this.canino_det.peso = this.canino_det.peso == "" ? '0' : this.canino_det.peso;

            this.canino_det.peso.replace(',','.');
        },
        loadData() {
            this.isLoading = true;

            caninoService.getCaninoDet(this.canino_det.id_canino_det).then(
                async (response) => {
                    let data = response.data;
                    this.canino_det.id_canino = data.id_canino;
                    this.canino_det.nome = data.nome;
                    this.canino_det.nascimento = data.nascimento;
                    this.canino_det.id_sexo = data.id_sexo;
                    this.canino_det.id_cor = data.id_cor;
                    this.canino_det.id_especie = data.id_especie;
                    this.canino_det.id_raca = data.id_raca;
                    this.canino_det.ra = data.ra;
                    this.canino_det.peso = data.peso;
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
                document.getElementById("login").classList.add("is-loading");

                this.prepare();

                caninoService
                    .createDet(this.canino_det)
                    .then((response) => {
                        this.showMessage = true;
                        this.message = "Captura inserida com sucesso!";
                        this.type = "success";
                        this.caption = "Captura";
                        setTimeout(() => {
                            (this.showMessage = false);
                            location.reload();
                        }, 2000);
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Captura";
                            setTimeout(() => (this.showMessage = false), 3000);
                        };
                    })
                    .catch((err) => {
                        this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Captura";
                        setTimeout(() => (this.showMessage = false), 3000);
                    })
                    .finally(() => {
                        document.getElementById("login").classList.remove("is-loading");
                    });
            } else {
                this.message = "Corrija os erros para enviar as informações";
                this.showMessage = true;
                this.type = "alert";
                this.caption = "Captura";
                setTimeout(() => (this.showMessage = false), 3000);
            }
        },
        getRaca(tipo) {
            caninoService
                .getRaca(tipo)
                .then((res) => {
                    this.raca = res.data;
                })
                .catch((err) => {
                    this.raca = [];
                });
        },
        changeComma(e) {
            let str = e.target.value;
            e.target.value = str.replace(/,/g, ".")
        }
    },
    mounted() { },
    created() {
        this.canino_det.id_canino_det = this.$route.params.id;
        this.loadData();
    },
    watch: {
        'canino_det.id_especie'(value) {
            this.getRaca(value);
        },
    }
};
</script>

<style scoped>
.cabeca {
    /*padding: 0 !important;*/
    border-bottom: 1px solid;
    font-weight: bold;
}
</style>
