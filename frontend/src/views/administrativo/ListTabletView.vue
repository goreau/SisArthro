<template>
  <div class="main-container">
    <div class="columns is-centered">
      <div class="column is-10 offset-1">
        <Loader v-if="isLoading" />
        <Message
          v-if="showMessage"
          @do-close="closeMessage"
          :msg="message"
          :type="type"
          :caption="caption"
        />
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-centered">Sincronizações</p>
          </header>
          <div class="card-content">
            <div class="content">
              <div class="column">
                <pre v-if="content !=''" class="arquivo">{{ content }}</pre>
              </div>
              <div class="column">
                <li v-for="(file, index) in files" :key="index">
                  <a v-on:click.prevent="getFile($event)" href="/">{{  file.name }}</a>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import capturaService from "@/services/captura.service";

export default {
  data() {
    return {
      files: [],
      content: '',
    }
  },
  methods: {
    loadData() {
      capturaService
        .listFiles()
        .then((res) => {
          console.log(res);
          var ret = JSON.parse(res.data);
          ret.map((x) => {
            var partes = x.split("\\");
            var nome = partes.pop();
            this.files.push({ref: x, name: nome})
          })
        //  this.files = res.data;
        })
        .catch((err) => {
          this.files = [];
        });
    },
    getFile(ev){
      capturaService
        .getFile(ev.target.innerHTML)
        .then((res) => {
          this.content = res.data;
        })
        .catch((err) => {
          this.files = [];
        });
    }
  },
  created() {
    this.loadData();
  },
}
</script>

<style lang="scss" scoped>

.arquivo{
  overflow-y:scroll; 
  max-width:100%; 
  height:20rem; 
  border:0.5px solid lightgray; 
  padding:5px; 
  white-space:pre-wrap;
}
</style>