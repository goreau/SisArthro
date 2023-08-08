<template>
  <div class="conteudo">
    <div class="tile is-ancestor">
      <div class="tile is-2">
        <nav>
          <router-link to="/home" id="logo_url">
            <img src="@/assets/micro_t.png" alt="img" id="logo" />
          </router-link>
        </nav>
      </div>
      <div class="tile">
        <p class="title">SisArtrho - fffffff</p>
      </div>
    </div>
    
  </div>
</template>

<script>
// import Name from '@/components/Name.vue';

export default {
  name: "Header",
  components: {},
};
</script>

<style scoped>
.conteudo {
  height: 4rem;
  background-color: #13156e;
  border-bottom: 4px solid #111;
  padding: 1rem;
}
nav {
  
  padding: 1px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

nav #logo_url {
  margin: auto;
  margin-left: 0;
}

#logo {
  width: 40px;
  height: 40px;
}

.title {
  color: darkgoldenrod;
}
</style>
