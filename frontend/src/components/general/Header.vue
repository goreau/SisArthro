<template>
  <div class="conteudo">
    <div class="tile is-ancestor">
      <div class="tile is-3">
        <nav>
          <router-link to="/home" id="logo_url">
            <img src="@/assets/micro_t.png" alt="img" id="logo" />
          </router-link>
        </nav>
        <p class="title">SisArtrho</p>
      </div>
      <div class="tile">
        
        <Breadcrumb />
      </div>
      
    </div>
    
  </div>
</template>

<script>
// import Name from '@/components/Name.vue';
import Breadcrumb from '@/components/general/Breadcrumb.vue';

export default {
  name: "Header",
  components: {
    Breadcrumb
  },
};
</script>

<style scoped>
.conteudo {
  height: 4rem;
  background-color: #2B3856;
  border-bottom: 4px solid #121f3d;
  padding: 1rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
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
