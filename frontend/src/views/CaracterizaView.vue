<template>
    <div class="main-container">
        <div class="columns is-centered">
            <div class="column is-four-fifths">
                <Loader v-if="isLoading" />
                <Message v-if="showMessage" @do-close="closeMessage" :msg="message" :type="type" :caption="caption" />
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title is-centered">Caracterização do Imóvel</p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <div class="columns has-text-centered">
                                <div class="field column is-3">
                                    <label class="label">Situação do Imóvel</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="7" @selValue="caracteriza.situacao = $event"
                                            :sel="caracteriza.situacao"
                                            :errclass="{ 'is-danger': v$.caracteriza.situacao.$error }" />
                                        <span class="is-error" v-if="v$.caracteriza.situacao.$error">
                                            {{ v$.caracteriza.situacao.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Tipo do Imóvel</label>
                                    <div class="control">
                                        <CmbAuxiliares :tipo="8" @selValue="caracteriza.tipo_imovel = $event"
                                        :sel="caracteriza.tipo_imovel"
                                            :errclass="{ 'is-danger': v$.caracteriza.tipo_imovel.$error }" />
                                        <span class="is-error" v-if="v$.caracteriza.tipo_imovel.$error">
                                            {{ v$.caracteriza.tipo_imovel.$errors[0].$message }}
                                        </span>
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Vegetação</label>
                                    <div class="control">
                                        <input type="checkbox" true-value="1" v-model="caracteriza.vegetacao">
                                    </div>
                                </div>
                                <div class="field column is-3">
                                    <label class="label">Mat. Orgânica</label>
                                    <div class="control">
                                        <input type="checkbox" true-value="1" v-model="caracteriza.mat_organica">
                                    </div>
                                </div>
                            </div>
                            <div class="columns has-text-centered">
                                <div class="field column is-1 is-offset-1">
                                    <label class="label">Galinha</label>
                                    <div class="control is-centered">
                                        <input type="checkbox" true-value="1" v-cloakv-model="caracteriza.galinha">
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Cão</label>
                                    <div class="control has-icons">
                                        <input type="checkbox" true-value="1" v-model="caracteriza.cao">
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Porco</label>
                                    <div class="control has-icons">
                                        <input type="checkbox" true-value="1" v-model="caracteriza.porco">
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Cavalo</label>
                                    <div class="control has-icons">
                                        <input type="checkbox" true-value="1" v-model="caracteriza.cavalo">
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Coelho</label>
                                    <div class="control has-icons">
                                        <input type="checkbox" true-value="1" v-model="caracteriza.coelho">
                                    </div>
                                </div>
                                <div class="field column is-1">
                                    <label class="label">Outros</label>
                                    <div class="control has-icons">
                                        <input type="checkbox" true-value="1" v-model="caracteriza.outros">
                                    </div>
                                </div>
                                <div class="field column is-5">
                                    <label class="label">Descrever</label>
                                    <div class="control has-icons">
                                        <input type="text" name="" class="input" id="" placeholder="Descrever"
                                            v-model="caracteriza.ot_especifica"
                                            :class="{ 'is-danger': v$.caracteriza.ot_especifica.$error }">
                                    </div>
                                    <span class="is-error" v-if="v$.caracteriza.ot_especifica.$error">
                                        {{ v$.caracteriza.ot_especifica.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>
                            <div class="columns has-text-centered">
                                <div class="field column is-4">
                                    <label class="label">Nº Cães</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="" id="" v-model="caracteriza.num_cao">
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Nº Cães Positivos</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="" id="" v-model="caracteriza.num_cao_pos">
                                    </div>
                                </div>
                                <div class="field column is-4">
                                    <label class="label">Ano Detecção</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="ano_identifica" id="ano_identifica"
                                            v-model="caracteriza.ano_identifica">
                                    </div>

                                </div>
                            </div>
                            <div class="columns">
                                <div class="field column is-3 is-offset-2">
                                    <label class="label">Data</label>
                                    <div class="control">
                                        <input type="text" id="dtCaract">
                                    </div>
                                    <span class="is-error" v-if="v$.caracteriza.dt_caracterizacao.$error">
                                        {{ v$.caracteriza.dt_caracterizacao.$errors[0].$message }}
                                    </span>
                                </div>
                                <div class="field column is-5">
                                    <label class="label">Responsável</label>
                                    <div class="control has-icons">
                                        <input type="text" class="input" name="" id="" v-model="caracteriza.responsavel"
                                            :class="{ 'is-danger': v$.caracteriza.responsavel.$error }">
                                    </div>
                                    <span class="is-error" v-if="v$.caracteriza.responsavel.$error">
                                        {{ v$.caracteriza.responsavel.$errors[0].$message }}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <footer class="card-footer">
                        <footerCard @submit="create" @cancel="null" @aux="details" :cFooter="cFooter" />
                    </footer>
                    <hr>
                    <div class="card-content">

                        <MyTable :tableData="dataTable" :columns="columns" :is-filtered="true" :has-exports="false" />
                    </div>
                </div>

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
</template>

<script>
import Message from "@/components/general/Message.vue";
import Loader from "@/components/general/Loader.vue";
import footerCard from "@/components/forms/FooterCard.vue";
import CmbAuxiliares from "@/components/forms/CmbAuxiliares.vue";
import caracterizaService from "@/services/caracteriza.service";
import MyTable from "@/components/forms/MyTable.vue";
import moment from 'moment';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar.min.js';
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import useValidate from "@vuelidate/core";
import {
    maxValue$,
    minValue$,
    combo$,
    maxLength$,
    minLength$,
    requiredIf$,
    required$,
} from "../components/forms/validators.js";

export default {
    data() {
        return {
            dataTable: [],
            caracteriza: {
                id_caracterizacao: 0,
                id_codend: 0,
                situacao: 0,
                tipo_imovel: 0,
                vegetacao: 0,
                mat_organica: 0,
                galinha: 0,
                cao: 0,
                porco: 0,
                cavalo: 0,
                coelho: 0,
                outros: 0,
                ot_especifica: '',
                num_cao: 0,
                num_cao_pos: 0,
                ano_identifica: 0,
                dt_caracterizacao: '',
                responsavel: '',
                id_usuario: 0,
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
                strAux: '',
                aux: false
            },
            myspan: null,
            myspan2: null,
            id_user: 0,
        };
    },
    validations() {
        var valid = {
            caracteriza: {
                ot_especifica: {
                    maxLength: maxLength$(100),
                    requiredIf: requiredIf$(this.caracteriza.outros == 1),
                },
                responsavel: {
                    maxLength: maxLength$(100)
                },
                situacao: {
                    minValue: combo$(1)
                },
                tipo_imovel: {
                    minValue: combo$(1)
                },
                dt_caracterizacao: { required$, },
            },
        };
        if (this.caracteriza.num_cao_pos > 0){
            valid['ano_identifica']={
                required$,
                minValue: minValue$(2000),
                maxValue: maxValue$(new Date().getFullYear()),
                maxLength: maxLength$(4),
                minLength: minLength$(4)
            };
        };
        return valid;
    },
    computed: {
        currentUser() {
            return this.$store.getters["auth/loggedUser"];
        },
    },
    components: {
        Message,
        Loader,
        footerCard,
        CmbAuxiliares,
        MyTable,
    },
    methods: {
        setDate($event) {
            if ($event) {
                this.caracteriza.dt_caracterizacao = moment(String($event)).format('YYYY-MM-DD');
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
                document.getElementById('login').classList.add('is-loading');

                  caracterizaService.create(this.caracteriza).then(
                    (response) => {
                        this.showMessage = true;
                        this.message = "Informações cadastradas.";
                        this.type = "success";
                        this.caption = "Caracterização";
                        setTimeout(() => (this.showMessage = false), 3000);
                        location.reload();
                    },
                    (error) => {
                        this.message = error;
                        this.showMessage = true;
                        this.type = "alert";
                        this.caption = "Caracterização";
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
        },
    },
    mounted() {
        let cUser = this.currentUser;
        if (cUser) {
            this.caracteriza.id_usuario = cUser.id;
            this.id_user = this.currentUser.id;
        }

        this.myspan = document.getElementsByName("coisa")[0];
        this.myspan2 = document.getElementsByName("coisa2")[0];

        this.isLoading = true;
        caracterizaService.getCaracterizas(this.caracteriza.id_codend)
            .then((response) => {
                this.dataTable = response.data;
                this.isLoading = false;
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => (this.isLoading = false));

        this.columns = [
            { title: "CodEnd", field: "codigo", type: "string" },
            {
                title: "Data", field: "dt_caracterizacao", type: "string", sorter: "date", sorterParams: {
                    format: "dd/MM/yyyy",
                    alignEmptyValues: "top",
                }
            },
            { title: "Situação", field: "situacao", type: "string" },
            { title: "Tipo Imóvel", field: "tipo_imovel", type: "string" },
            { title: "Soma", field: "soma", type: "string" },
            {
                title: "Ações",
                formatter: (cell, formatterParams) => {
                    const row = cell.getRow().getData();

                    const btEdit = document.createElement("button");
                    btEdit.type = "button";
                    btEdit.title = "Editar" + this.id_user;
                    btEdit.disabled = this.id_user != row.id_usuario;
                    btEdit.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btEdit.classList.add("button", "is-primary", "is-outlined");
                    btEdit.innerHTML = this.myspan.innerHTML;
                    btEdit.addEventListener("click", () => {
                        this.$router.push(`/editCaracteriza/${row.id_caracterizacao}`);
                    });

                    const btDel = document.createElement("button");
                    btDel.type = "button";
                    btDel.title = "Excluir";
                    btDel.disabled = this.id_user != row.id_usuario;
                    btDel.style.cssText = "height: fit-content; margin-left: 1rem;";
                    btDel.classList.add("button", "is-danger", "is-outlined");
                    btDel.innerHTML = this.myspan2.innerHTML;
                    btDel.addEventListener("click", async () => {
                        const ok = await this.$refs.confirmDialog.show({
                            title: 'Excluir',
                            message: 'Deseja mesmo excluir esse endereço?',
                            okButton: 'Confirmar',
                        })
                        if (ok) {
                            caracterizaService.delete(row.id_codend);
                            location.reload();
                        }
                    });



                    const buttonHolder = document.createElement("span");
                    buttonHolder.appendChild(btEdit);
                    buttonHolder.appendChild(btDel);

                    return buttonHolder;
                },
            },
        ];

        const options = {
            type: "date",
            dateFormat: "dd/MM/yyyy",
            showHeader: false,
            color: "info",
            allowInput: true,
            cancelLabel: 'Cancelar',
            showClearButton: false,
            todayLabel: 'Hoje',
            maxDate: new Date(),
        };

        var calini = bulmaCalendar.attach('#dtCaract', options);

        const element = document.querySelector('#dtCaract');

        const input = document.querySelector('.datetimepicker-dummy-input');
        input.removeAttribute('readonly');
        input.setAttribute('value', "__/__/____");
        input.setAttribute('data-mask', "__/__/____");
        this.applyDataMask(input);

        input.addEventListener('blur', () => {
            this.caracteriza.dt_caracterizacao = moment(input.value).format('YYYY-MM-DD');
        })

        if (element) {
            // bulmaCalendar instance is available as element.bulmaCalendar
            element.bulmaCalendar.on('select', datepicker => {
                this.caracteriza.dt_caracterizacao = moment(datepicker.data.startDate).format('YYYY-MM-DD');
            });
        }
    },
    created() {
        this.caracteriza.id_codend = this.$route.params.master;
        this.caracteriza.id_caracteriza = this.$route.params.id;
    },
};
</script>

<style scoped></style>
