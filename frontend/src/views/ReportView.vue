<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-11">
        <Loader v-if="isLoading" />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">{{ title + id }}</p>
          </header>
          <div class="card-content">
            <MyTable :tableData="dataTable" :columns="columns" v-if="id > 0"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/general/Loader.vue";
import MyTable from "@/components/forms/MyTable.vue";

export default {
  name: "Relatórios",
  data() {
    return {
      id: 0,
      dataTable: [],
      isLoading: false,
      columns: [],
      title: 'Relatórios',
    };
  },
  components: {
    Loader,
    MyTable,
  },
  methods: {},
  mounted() {},
  created() {
    this.id = this.$route.params.id;
  },
};
</script>

<style scoped></style>
