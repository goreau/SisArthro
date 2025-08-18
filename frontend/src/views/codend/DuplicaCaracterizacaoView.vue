<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-two-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Gerar novo ciclo de caracterização</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns">
                                <div class="field column is-10 is-offset-1">
                                    <label class="label">Município</label>
                                    <div class="control">
                                        <CmbMunicipio :id_prop="currentUser.id" @selMun="codend.id_municipio = $event"
                                            :errclass="{ 'is-danger': v$.codend.id_municipio.$error }" />
                                        <span class="is-error" v-if="v$.codend.id_municipio.$error">
                                            {{ v$.codend.id_municipio.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-10 is-offset-1">
                                    <label class="label">Localidade(ATL)</label>
                                    <div class="control">
                                        <CmbLocalidade :id_mun="codend.id_municipio"
                                            @selLoc="codend.id_localidade = $event"
                                            :errclass="{ 'is-danger': v$.codend.id_localidade.$error }" />
                                        <span class="is-error" v-if="v$.codend.id_localidade.$error">
                                            {{ v$.codend.id_localidade.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
                    </footer>
                </div>

            </div>
        </div>
    </div>
    <confirm-dialog ref="confirmDialog"></confirm-dialog>
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import ConfirmDialog from "@/components/forms/ConfirmDialog.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import CmbMunicipio from "@/components/forms/CmbMunicipio.vue";
import CmbLocalidade from "@/components/forms/CmbLocalidade.vue";
import caracterizaService from "@/services/caracteriza.service";
import useValidate from "@vuelidate/core";
import { combo$ } from "../../components/forms/validators.js";

export default {
    data() {
        return {
            codend: {
                id_municipio: 0,
                id_localidade: 0,
            },
            v$: useValidate(),
            isLoading: false,
            message: "",
            caption: "",
            type: "",
            showMessage: false,
            cFooter: {
                strSubmit: 'Gerar',
                strCancel: 'Cancelar',
                strAux: '',
                aux: false
            }
        }
    },
    components: {
        Message,
        Loader,
        CmbMunicipio,
        footerCard,
        CmbLocalidade,
        ConfirmDialog
    },
    validations() {
        return {
            codend: {
                id_municipio: {
                    minValue: combo$(1)
                },
                id_localidade: {
                    minValue: combo$(1)
                },
            },
        };
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    methods: {
        async create() {
            this.v$.$validate(); // checks all inputs
            if (!this.v$.$error) {
                document.getElementById('login').classList.add('is-loading');
                const ok = await this.$refs.confirmDialog.show({
                    title: 'Novo Ciclo',
                    message: 'Isso irá gerar um novo ciclo de caracterização de imóveis, com base no último registrado. Confirma?',
                    okButton: 'Confirmar',
                })
                if (ok) {
                    caracterizaService.duplicaCaracterizacao({id_localidade: this.codend.id_localidade}).then(
                        (response) => {
                            this.showMessage = true;
                            this.message = `Ciclo ${response.data.master} gerado com sucesso.`;
                            this.type = "success";
                            this.caption = "Caracterização";
                            setTimeout(() => (this.showMessage = false), 3000);
                        },
                        (error) => {
                            this.message = error;
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "CodEnd";
                            setTimeout(() => (this.showMessage = false), 3000);
                        }
                    )
                        .catch((err) => {
                            this.message = err.message;//"Erro inserindo o registro! Verifique o preenchimento e tente novamente!";
                            this.showMessage = true;
                            this.type = "alert";
                            this.caption = "Caracterização";
                            setTimeout(() => (this.showMessage = false), 3000);
                        })
                        .finally(() => {
                            document.getElementById('login').classList.remove('is-loading');
                        });
                } else {
                    this.message = "Corrija os erros para enviar as informações";
                    this.showMessage = true;
                    this.type = "alert";
                    this.caption = "Caracterização";
                    setTimeout(() => (this.showMessage = false), 3000);
                }
            }
        },
    }


}
</script>

<style></style>