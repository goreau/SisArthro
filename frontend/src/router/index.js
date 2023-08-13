import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: {
      breadcrumb: {
        name: 'Login',
        root: true,
      },
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    meta: {
      breadcrumb: {
        name: 'Início',
        root: true
      }
    }
  },
  {
    path: '/mycad',
    name: 'cadastro',
    component: () => import(/* webpackChunkName: "home" */ '../views/MyCadastroView.vue'),
    meta: {
      breadcrumb: {
        name: 'Meu Cadastro',
        root: true
      }
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: {
      breadcrumb: {
        name: 'Sobre',
        root: true
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UsuarioView.vue'),
    meta: {
      breadcrumb: {
        name: 'Usuário',
        root: true
      }
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListUsersView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Usuários',
        root: false
      }
    }
  },
  {
    path: '/localidade',
    name: 'localidade',
    component: () => import(/* webpackChunkName: "user" */ '../views/LocalidadeView.vue'),
    meta: {
      breadcrumb: {
        name: 'Localidade',
        root: true
      }
    }
  },
  {
    path: '/localidades',
    name: 'localidades',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListLocalidadeView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Localidades',
        root: false
      }
    }
  },
  {
    path: '/editLoc/:id',
    name: 'editloc',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditLocalidadeView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Localidade',
        root: false
      }
    }
  },
  {
    path: '/codend',
    name: 'codend',
    component: () => import(/* webpackChunkName: "user" */ '../views/CodendView.vue'),
    meta: {
      breadcrumb: {
        name: 'CodEnd',
        root: true
      }
    }
  },
  {
    path: '/codends',
    name: 'codends',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListCodendView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista CodEnds',
        root: false
      }
    }
  },
  {
    path: '/editCod/:id',
    name: 'editcod',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditCodendView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar CodEnd',
        root: false
      }
    }
  },
  {
    path: '/captura',
    name: 'captura',
    component: () => import(/* webpackChunkName: "user" */ '../views/CapturaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Captura',
        root: true,
      },
    }
  },
  {
    path: '/captura_det/:master',
    name: 'captura_det',
    component: () => import(/* webpackChunkName: "user" */ '../views/CapturaDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Captura - Item',
        root: false
      }
    }
  },
  {
    path: '/captura_dets/:master',
    name: 'captura_dets',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListCapturaDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Itens Captura',
        root: false
      }
    }
  },
  {
    path: '/capturas',
    name: 'capturas',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListCapturaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Capturas',
        root: false,
      },
    }
  },
  {
    path: '/editCapt/:id',
    name: 'editcapt',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditCapturaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Captura',
        root: false,
      },
    }
  },
  {
    path: '/editCaptDet/:id',
    name: 'editcaptdet',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditCapturaDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Captura Item',
        root: false
      }
    }
  },
  {
    path: '/identifica',
    name: 'identifica',
    component: () => import(/* webpackChunkName: "user" */ '../views/IdentificaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Identificação',
        root: true
      }
    }
  },
  {
    path: '/identificas',
    name: 'identificas',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListIdentificaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Amostra Identificação',
        root: false
      }
    }
  },
  {
    path: '/editIdent/:id',
    name: 'editident',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditIdentificaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Identificação',
        root: false
      }
    }
  },
  {
    path: '/editIdent/:id/:det',
    name: 'editident2',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditIdentificaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Amostra Identificação',
        root: false
      }
    }
  },
  {
    path: '/identifica_dets/:master',
    name: 'identifica_dets',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListIdentificaDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Amostras Identificação',
        root: true
      }
    }
  },
  {
    path: '/generos',
    name: 'generos',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListGeneroView.vue'),
    meta: {
      breadcrumb: {
        name: 'Adm - Genero',
        root: true
      }
    }
  },
  {
    path: '/especies',
    name: 'especies',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListEspecieView.vue'),
    meta: {
      breadcrumb: {
        name: 'Adm - Espécie',
        root: true
      }
    }
  },
  {
    path: '/auxiliares',
    name: 'auxiliares',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListAuxiliaresView.vue'),
    meta: {
      breadcrumb: {
        name: 'Adm - Auxiliares',
        root: true
      }
    }
  },
  {
    path: '/report/:id',
    name: 'report',
    component: () => import(/* webpackChunkName: "user" */ '../views/ReportView.vue'),
    meta: {
      breadcrumb: {
        name: 'Relatório',
        root: true
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
