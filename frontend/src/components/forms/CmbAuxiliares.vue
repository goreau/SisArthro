<template>
  <div class="control">
    <div class="select">
      <select @change="onChange($event)" class="input" :class="errclass">
        <option value="0">-- Selecione --</option>
        <option
          v-for="aux in auxiliares"
          :key="aux.id_auxiliares"
          :value="aux.id_auxiliares"
          :selected="sel == aux.id_auxiliares"
        >
          {{ aux.nome }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import capturaService from "@/services/captura.service.js";

export default {
  name: "CmbAuxiliares",
  data() {
    return {
      auxiliares: [],
    };
  },
  props: ['tipo', 'sel', 'errclass'],
  methods: {
    onChange(event) {
      this.$emit('selValue',event.target.value);
    },
    loadData() {
      capturaService.getAuxiliares(this.tipo)
      .then((res) => {
        this.auxiliares = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        this.auxiliares = [];
      })
    }
  },
  mounted() {
    this.loadData();
  },
  
};
</script>

<style scoped></style>
