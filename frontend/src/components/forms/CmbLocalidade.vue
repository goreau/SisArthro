<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input">
        <option value="0">-- Selecione --</option>
        <option
          v-for="loc in localidades"
          :key="loc.id_localidade"
          :value="loc.id_localidade"
          :selected="sel == loc.id_localidade"
        >
          {{ loc.nome }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import localidadeService from "@/services/localidade.service.js";

export default {
  name: "CmbLocalidade",
  data() {
    return {
      localidades: [],
    };
  },
  props: ['id_mun','sel'],
  methods: {
    onChange(event) {
      this.$emit('selLoc',event.target.value);
    },
    loadData() {
      localidadeService.getLocalidades(this.id_mun)
      .then((res) => {
        this.localidades = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.localidades = [];
      })
    }
  },
  watch: {
    id_mun(value) {
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  },
  
};
</script>

<style scoped></style>
