<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="mun in municipios"
          :key="mun.id_municipio"
          :value="mun.id_municipio"
          :selected="mun.id_municipio == sel"
        >
          {{ mun.nome }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import TerritorioService from "@/services/territorio.service.js";

export default {
  name: "CmbMunicipio",
  data() {
    return {
      municipios: [],
    };
  },
  props: ['id_prop', 'sel', 'errclass'],
  methods: {
    onChange(event) {
      this.$emit('selMun',event.target.value);
    },
    loadData() {
      TerritorioService.getCodSis(this.id_prop)
      .then((res) => {
        this.municipios = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.municipios = [];
      })
    }
  },
  watch: {
    id_prop(value) {
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  
};
</script>

<style scoped>
  
</style>
