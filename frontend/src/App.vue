<template>
  <Header />
  <div class="cont_total">
    <div class="cont_menu" v-if="showMenu">
      <sidebar-menu
        :menu="menu"
        :relative="true"
        @update:collapsed="onToggleCollapse"
      />
    </div>
    <div class="main" id="main">
      <router-view />
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/general/Header.vue";
import Footer from "@/components/general/Footer.vue";
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";

export default {
  components: {
    Header,
    SidebarMenu,
    Footer,
  },
  methods: {
    onToggleCollapse(collapsed) {
      var dv = document.getElementById("main");
      if (collapsed) {
        dv.className = "main_colapsed";
      } else {
        dv.className = "main";
      }
    },
  },
  mounted() {
    if (this.hide) {
      this.onToggleCollapse(true);
    }
  },
  computed: {
    showMenu() {
      this.hide = this.$route.path === "/login";
      return !this.hide;
    },
  },
  data() {
    return {
      hide: false,
      menu: [
        {
          header: "Opções",
          hiddenOnCollapse: true,
        },
        {
          href: "/home",
          title: "Home",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-house",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/mycad",
              title: "Meu Cadastro",
            },
            {
              href: "/about",
              title: "Sobre",
            },
          ],
        },
        {
          href: "/users",
          title: "Usuarios",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-users",
              size: "lg",
              transform: "shrink-8",
            },
          },
          //text ou child
        },
        {
          href: "/localidade",
          title: "Localidade",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-tree-city",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/localidades",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "/codend",
          title: "CodEnd",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-location-pin",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/codends",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "/captura",
          title: "Captura",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-bugs",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/capturas",
              title: "Consultar",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-search",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "/report/0",
          title: "Relatórios",
          icon: {
            element: "font-awesome-icon",
            class: "small",
            attributes: {
              icon: "fa-solid fa-file-lines",
              transform: "shrink-10",
            },
            // text: ''
          },
          child: [
            {
              href: "/report/1",
              title: "Relatório 1",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/components/general/css/custom-var";
@import "vue-sidebar-menu/src/scss/vue-sidebar-menu.scss";

* {
  font-family: Helvetica;
  font-size: medium;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.main-container {
  margin: 5rem;
  min-height: 40rem;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
}
#app {
  height: 100%;
}
.main {
  margin-left: 290px;
  width: calc(100% - 290px);
  height: calc(100% - 7rem);
  // border:1px solid green;
}
.main_colapsed {
  margin-left: 65px;
  width: calc(100% - 65px);
  height: calc(100% - 7rem);
  //   border:1px solid green;
}
.cont_total {
  width: 100%;
  height: calc(100%);

  ///  border:1px solid red;
}
.cont_menu {
  position: fixed;
  height: calc(100% - 7rem);
  width: 290px;
  overflow: auto;
  top: 4rem;
  bottom: 1rem;
}

.card {
  border: 0.5px solid #ccc;
  padding-top: 1rem;
}

.select {
  width: 100%;
}

</style>

