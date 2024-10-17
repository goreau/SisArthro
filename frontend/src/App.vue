<template>
  <Header />
  <div class="cont_total">
    <div class="cont_menu" v-if="showMenu">
      <sidebar-menu
        :menu="menu"
        :relative="true"
        @update:collapsed="onToggleCollapse"
        :showOneChild="true"
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
      this.hide = this.$route.path === "/"  || this.$route.path === "/login" || this.$route.path === "/forgot" || this.$route.path === "/reset";
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
            {
              href: "/",
              title: "Sair",
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
          href: "/canino",
          title: "Animais",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-dog",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/caninos",
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
          href: "/inquerito",
          title: "Inquerito",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-file-text",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/inqueritos",
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
          href: "/foco",
          title: "Invest. Foco",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-search-location",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/focos",
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
          href: "/notifica",
          title: "Notificação",
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
              href: "/notificas",
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
          href: "/identifica",
          title: "Identificação",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-vial-virus",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/identificas",
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
          href: "",
          title: "Administrativo",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-screwdriver-wrench",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
            {
              href: "/generos",
              title: "Gêneros",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-bugs",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/especies",
              title: "Espécies",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-bugs",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/auxiliares",
              title: "Auxiliares",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-info",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/propmun",
              title: "Usuário/Município",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-city",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/listfiles",
              title: "Arquivos Tablet",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-file-lines",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },

        {
          href: "/report",
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
iframe#webpack-dev-server-client-overlay{display:none!important}
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
  margin-top: 4rem;
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

.card-header p {
  color: rgb(23, 24, 102);
  font-size: larger;
}

.select {
  width: 100%;
}

.is-error {
  font-size: smaller;
  color: red;
  padding-left: 1rem;
}
.vsm--child {
  padding-left: 2rem;
  color:bisque;
}
.right-border {
    border-right: 2px solid black !important;
}

.tabulator-col-group{
  border-right: 2px solid black !important;
}
</style>
