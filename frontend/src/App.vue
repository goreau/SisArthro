<template>
  <Header />
  <div class="cont_total">
    <div class="cont_menu" v-if="showMenu">
      <sidebar-menu :menu="menu" :relative="true" @update:collapsed="onToggleCollapse" :showOneChild="true" />
    </div>
    <div class="main" id="main">

      <router-view />
      <br>
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
    updateMenuAccess() {
      if (!this.currentUser) return;
      this.menu = this.menu.map((item) => {
        if (item.child) {
          // Percorre os subitens (child) e aplica a lógica
          // Desabilita os subitens  se o nível de acesso for maior que 1, ou seja, só habilita para administrador
          item.child = item.child.map((subItem) => {
            if (subItem.href === '/refactor') {
              subItem.disabled = this.currentUser.role > 1;
            } else if (subItem.href === '/estratos') {
              subItem.hidden = this.currentUser.role > 1;
            } else if (subItem.href === '/deluser') {
              subItem.hidden = this.currentUser.role > 1;
            }
            return subItem;
          });
        }
        // Se não for um item com subitens, mantém o item original
        return item;
      });
    }
  },
  mounted() {
    /*if (this.hide) {
      this.onToggleCollapse(true);
      console.log('toglou')
    }*/
  },
  created() {
    this.updateMenuAccess();
  },
  computed: {
    showMenu() {
      this.hide = this.$route.path === "/" || this.$route.path === "/login" || this.$route.path === "/forgot" || this.$route.path === "/reset";
      return !this.hide;
    },
    currentUser() {
      return this.$store.getters["auth/loggedUser"];
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
            /*   {
                 href: "/downloads",
                 title: "Material de Apoio",
               },*/
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
          title: "Cadastro de Endereços",
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
            {
              href: "/duplicaCaracterizacao",
              title: "Gerar Ciclo Caracterização",
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
          title: "Inquerito Canino",
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
          title: "Invest. Foco Canino",
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
          title: "Notificação de Cães",
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
          href: "/suspeito",
          title: "Notificação de Artrópodes",
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
              href: "/suspeitos",
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
              href: "/deluser",
              title: "Remover Usuário",
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
            {
              href: "/refactor",
              title: "Refatorar Codend",
              disabled: true,
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-repeat",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
            {
              href: "/coords",
              title: "Conferir Coordenadas",
              disabled: false,
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-map-marker",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ],
        },
        {
          href: "",
          title: "Gerenciais",
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
              href: "/pendlistcaracteriza/1",
              title: "Caracterização - Pendência",
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
              href: "/pendlistcaracteriza/2",
              title: "Caracterização - Risco",
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
              href: "/pendlistcanino/1",
              title: "Canino - Pendência",
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
              href: "/pendlistcanino/2",
              title: "Canino - Inquérito",
              icon: {
                element: "font-awesome-icon",
                attributes: {
                  icon: "fa-solid fa-bugs",
                  size: "lg",
                  transform: "shrink-8",
                },
              },
            },
          ]
        },
        {
          href: "",
          title: "Consultas",
          icon: {
            element: "font-awesome-icon",
            attributes: {
              icon: "fa-solid fa-file-lines",
              size: "lg",
              transform: "shrink-8",
            },
          },
          child: [
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
              },
            },
            {
              href: "/indicadores",
              title: "Indicadores",
              icon: {
                element: "font-awesome-icon",
                class: "small",
                attributes: {
                  icon: "fa-solid fa-hand-point-up",
                  transform: "shrink-10",
                },
              },
            },
            {
              href: "/estratos",
              title: "Estratos",
              icon: {
                element: "font-awesome-icon",
                class: "small",
                attributes: {
                  icon: "fa-solid fa-file-lines",
                  transform: "shrink-10",
                },
              },
            },
            {
              href: "/mapas",
              title: "Mapas",
              icon: {
                element: "font-awesome-icon",
                class: "small",
                attributes: {
                  icon: "fa-solid fa-map-location-dot",
                  transform: "shrink-10",
                },
              },
            },
          ]
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
  margin: 2rem;
  min-height: 40rem;
  margin-top: 4rem;
}

iframe#webpack-dev-server-client-overlay {
  display: none !important
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
  margin-top: 6rem;
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

.datetimepicker-dummy,
.datetimepicker {
  z-index: 9999 !important;
}

.is-error {
  font-size: smaller;
  color: red;
  padding-left: 1rem;
}

.vsm--child {
  padding-left: 2rem;
  color: bisque;
}

.right-border {
  border-right: 2px solid black !important;
}

.tabulator-col-group {
  border-right: 2px solid black !important;
}
</style>
