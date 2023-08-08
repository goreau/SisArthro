<template>
    <div>
        <div class="columns">
            <div class="column is-offset-1 is-3">
                <div class="field is-horizontal">
                    <label class="label">Filtrar:  </label>
                    <div class="select">
                        <select v-model="form.column">
                            <option value="0">-- Selecione uma Coluna --</option>
                            <option v-for="(item, index) in columns" :key="index" :value="item.field">{{item.title}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="field">
                    <div class="select">
                        <select v-model="form.operator">
                            <option value="0">-- Selecione um Comparador --</option>
                            <option value="=">igual a</option>
                            <option value=">">maior que</option>
                            <option value="<">menor que</option>
                            <option value="!=">diferente de</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="column is-3">
                <div class="field has-addons">
                    <input type="text" class="input" v-model="form.value" placeholder="Valor a filtrar">
                    <div class="control">
                        <a class="button is-info" @click="setFilter">
                            <span class="icon is-small">
                                <font-awesome-icon icon="fa-solid fa-search" />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="column has-text-right">
                <button class="button is-outlined is-link" @click="newProduct">Novo Produto</button>
            </div>
        </div>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th v-for="(item, index) in columns" :key="index">{{ item.title }}</th>
                    <th v-if=" Object.keys(buttons).length > 0 ">Ações</th>       
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in records[page-1]" :key="index">
                    <td v-for="(item, index) in columns" :key="index">{{ row[item.field] }}</td> 
                    <td v-if="Object.keys(buttons).length > 0">
                        <button v-if="buttons.edit" class="button is-success is-small is-outlined"
                            @click="editProduct(row.referencia)">
                            <span class="icon is-small">
                                <font-awesome-icon icon="fa-solid fa-edit" />
                            </span>
                        </button>
                    </td>                           
                </tr>
            </tbody>
        </table>
        <NavigationButtons 
            :focused="page" 
            :pages="pages" 
            :perPage="perPage"
            :total="total"
            @toPage="changePage" 
            @pageSize="changeSize"/>
    </div>
</template>

<script>
import NavigationButtons from './NavigationButtons.vue';

export default {
    name: 'FancyTable',
    data() {
        return {
            page: 1,
            perPage: 10,
            records: [],
            internalData: [],
            pages: [],
            total: 1,
            form: {
                column: '0',
                operator: '0',
                value: '',
                type: 'string'
            }
        }
    },
    components: {
        NavigationButtons
    },
    watch: {
        dataTable(newData) {
            this.internalData = newData;
            this.total = this.dataTable.length;
            this.sliceData();
        }
  },
    computed: {
       
    },
    methods: {
        newProduct() {
            this.$router.push({ name: 'cadastroproduto' });
        },
        editProduct(id) {
            this.$router.push({ name: 'editproduto', params: {id: id} });
        },
        setFilter() {
            let obj = this.form;
            
            const col = this.columns.filter(v => v.field === obj.column,obj);
            obj.type = col[0].type;

            const orig = this.dataTable;
            this.internalData = orig.filter(function(orig) {
                if (obj.operator == '>') {
                    return obj.type == 'float' ? parseFloat(orig[obj.column]) > parseFloat(obj.value) : (obj.type == 'int' ? parseInt(orig[obj.column]) > parseInt(obj.value) : orig[obj.column] > obj.value);
                } else if (obj.operator == '<') {
                    return obj.type == 'float' ? parseFloat(orig[obj.column]) < parseFloat(obj.value) : (obj.type == 'int' ? parseInt(orig[obj.column]) < parseInt(obj.value) : orig[obj.column] < obj.value);
                } else if (obj.operator == '!=') {
                    return obj.type == 'float' ? parseFloat(orig[obj.column]) != parseFloat(obj.value) : (obj.type == 'int' ? parseInt(orig[obj.column]) != parseInt(obj.value) : orig[obj.column] != obj.value);
                } else if (obj.operator == '=') {
                    return obj.type == 'float' ? parseFloat(orig[obj.column]) == parseFloat(obj.value) : (obj.type == 'int' ? parseInt(orig[obj.column]) == parseInt(obj.value) : orig[obj.column] == obj.value);
                }
            },obj);
            this.sliceData();
        },
        changePage(page) {
            this.page = page;
        },
        changeSize(size) {
            this.perPage = parseInt(size);
            this.page = 1;
            this.sliceData();
        },
        sliceData() {
            this.total = this.internalData.length;
            this.records = [];
            for (let i = 0; i < this.internalData.length; i += this.perPage) {
                const chunk = this.internalData.slice(i, i + this.perPage);
                this.records.push(chunk);// do whatever  
            }
            this.pages = [];
            for (let i = 1; i <= this.records.length; i++) {
                this.pages.push(i);
            }
        }
    },
    mounted() {
        this.sliceData();
    },
    props: {
        dataTable: {
                type: Array
            },
        columns: {
                type: Array
            },
        buttons: {},
    }
}
</script>

<style scoped>
label {
    padding-top: .5rem;
    margin-right: 2rem;
    text-align: center;
}

table,
th {
    border: 1px solid #DDD;
    text-align: center;
    width: 14.2%;
    padding: 5px;
}

th {
    background: #DDEEEE;
}

th.status {
    width: 20%;
}

table {
    width: 400px;
    border-collapse: collapse;
}
</style>