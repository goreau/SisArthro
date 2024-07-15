import { createRouter, createWebHashHistory } from 'vue-router';
import { publicPath } from '../../vue.config';
//https://github.com/vuejs/vue-router/issues/1735
const routes = [
  {
    path: '/',
    name: 'loginHome',
    component: () => import(/* webpackChunkName: "login" */ '../views/usuario/LoginView.vue'),
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
    component: () => import(/* webpackChunkName: "home" */ '../views/general/HomeView.vue'),
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
    component: () => import(/* webpackChunkName: "home" */ '../views/usuario/MyCadastroView.vue'),
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
    component: () => import(/* webpackChunkName: "about" */ '../views/general/AboutView.vue'),
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
    component: () => import(/* webpackChunkName: "login" */ '../views/usuario/LoginView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/usuario/UsuarioView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/usuario/ListUsersView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Usuários',
        root: false
      }
    }
  },
  {
    path: '/editUser/:id',
    name: 'editUser',
    component: () => import(/* webpackChunkName: "user" */ '../views/usuario/EditUsuarioView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Usuário',
        root: false
      }
    }
  },
  {
    path: '/localidade',
    name: 'localidade',
    component: () => import(/* webpackChunkName: "user" */ '../views/localidade/LocalidadeView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/localidade/ListLocalidadeView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/localidade/EditLocalidadeView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/codend/CodendView.vue'),
    meta: {
      breadcrumb: {
        name: 'CodEnd',
        root: true
      }
    }
  },
  {
    path: '/codends/:quart?',
    name: 'codends',
    component: () => import(/* webpackChunkName: "user" */ '../views/codend/ListCodendView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/codend/EditCodendView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar CodEnd',
        root: false
      }
    }
  },
  {
    path: '/caracteriza/:master/:id',
    name: 'caracteriza',
    component: () => import(/* webpackChunkName: "user" */ '../views/caracteriza/CaracterizaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Caracterização',
        root: false
      }
    }
  },
  {
    path: '/editCaracteriza/:id',
    name: 'editCaracteriza',
    component: () => import(/* webpackChunkName: "user" */ '../views/caracteriza/EditCaracterizaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Caracterização',
        root: false
      }
    }
  },
  {
    path: '/captura',
    name: 'captura',
    component: () => import(/* webpackChunkName: "user" */ '../views/captura/CapturaView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/captura/CapturaDetView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/captura/ListCapturaDetView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/captura/ListCapturaView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/captura/EditCapturaView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/captura/EditCapturaDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Captura Item',
        root: false
      }
    }
  },
  {
    path: '/canino',
    name: 'canino',
    component: () => import(/* webpackChunkName: "user" */ '../views/canino/CaninoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Animal - Endereço',
        root: true,
      },
    }
  },
  {
    path: '/canino_det/:master',
    name: 'canino_det',
    component: () => import(/* webpackChunkName: "user" */ '../views/canino/CaninoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Animal',
        root: false
      }
    }
  },
  {
    path: '/caninos',
    name: 'caninos',
    component: () => import(/* webpackChunkName: "user" */ '../views/canino/ListCaninoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Endereços',
        root: true,
      },
    }
  },
  {
    path: '/canino_dets/:master',
    name: 'canino_dets',
    component: () => import(/* webpackChunkName: "user" */ '../views/canino/ListCaninoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Animais',
        root: true,
      },
    }
  },
  {
    path: '/editCanino/:id',
    name: 'editcanino',
    component: () => import(/* webpackChunkName: "user" */ '../views/canino/EditCaninoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Endereço',
        root: true,
      },
    }
  },
  {
    path: '/editCaninoCodend/:codend',
    name: 'editcaninocodend',
    component: () => import(/* webpackChunkName: "user" */ '../views/canino/EditCaninoCodendView.vue'),
    meta: {
      breadcrumb: {
        name: 'Endereço',
        root: true,
      },
    }
  },
  {
    path: '/editCaninoDet/:id',
    name: 'editcaninodet',
    component: () => import(/* webpackChunkName: "user" */ '../views/canino/EditCaninoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Animal',
        root: true,
      },
    }
  },
  {
    path: '/inquerito',
    name: 'inquerito',
    component: () => import(/* webpackChunkName: "user" */ '../views/inquerito/InqueritoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Inquérito',
        root: true,
      },
    }
  },
  {
    path: '/inquerito_det/:master/:quart',
    name: 'inquerito_det',
    component: () => import(/* webpackChunkName: "user" */ '../views/inquerito/InqueritoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Coletas',
        root: false
      }
    }
  },
  {
    path: '/inqueritos',
    name: 'inqueritos',
    component: () => import(/* webpackChunkName: "user" */ '../views/inquerito/ListInqueritoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Inquéritos',
        root: true,
      },
    }
  },
  {
    path: '/inquerito_dets/:master',
    name: 'inquerito_dets',
    component: () => import(/* webpackChunkName: "user" */ '../views/inquerito/ListInqueritoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Coletas',
        root: true,
      },
    }
  },
  {
    path: '/editInquerito/:id',
    name: 'editinquerito',
    component: () => import(/* webpackChunkName: "user" */ '../views/inquerito/EditInqueritoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Inquérito',
        root: true,
      },
    }
  },
  {
    path: '/editInqueritoDet/:id',
    name: 'editinqueritodet',
    component: () => import(/* webpackChunkName: "user" */ '../views/inquerito/EditInqueritoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Animal',
        root: true,
      },
    }
  },
  {
    path: '/foco',
    name: 'foco',
    component: () => import(/* webpackChunkName: "user" */ '../views/foco/FocoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Inv. Foco',
        root: true,
      },
    }
  },
  {
    path: '/foco_det/:master/:quart',
    name: 'foco_det',
    component: () => import(/* webpackChunkName: "user" */ '../views/foco/FocoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Coletas',
        root: false
      }
    }
  },
  {
    path: '/focos',
    name: 'focos',
    component: () => import(/* webpackChunkName: "user" */ '../views/foco/ListFocoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Inquéritos',
        root: true,
      },
    }
  },
  {
    path: '/foco_dets/:master/:quart',
    name: 'foco_dets',
    component: () => import(/* webpackChunkName: "user" */ '../views/foco/ListFocoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Coletas',
        root: true,
      },
    }
  },
  {
    path: '/editFoco/:id',
    name: 'editfoco',
    component: () => import(/* webpackChunkName: "user" */ '../views/foco/EditFocoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Inquérito',
        root: true,
      },
    }
  },
  {
    path: '/editFocoDet/:id',
    name: 'editfocodet',
    component: () => import(/* webpackChunkName: "user" */ '../views/foco/EditFocoDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Animal',
        root: true,
      },
    }
  },
  {
    path: '/identifica',
    name: 'identifica',
    component: () => import(/* webpackChunkName: "user" */ '../views/identifica/IdentificaView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/identifica/ListIdentificaView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/identifica/EditIdentificaView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/identifica/EditIdentificaView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/identifica/ListIdentificaDetView.vue'),
    meta: {
      breadcrumb: {
        name: 'Lista Amostras Identificação',
        root: true
      }
    }
  },
  {
    path: '/notifica',
    name: 'notifica',
    component: () => import(/* webpackChunkName: "user" */ '../views/notifica/NotificacaoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Notificação',
        root: true,
      },
    }
  },
  {
    path: '/notificas',
    name: 'notificas',
    component: () => import(/* webpackChunkName: "user" */ '../views/notifica/ListNotificaView.vue'),
    meta: {
      breadcrumb: {
        name: 'Notificações',
        root: false
      }
    }
  },
  {
    path: '/editNotifica/:id',
    name: 'editNotifica',
    component: () => import(/* webpackChunkName: "user" */ '../views/notifica/EditNotificacaoView.vue'),
    meta: {
      breadcrumb: {
        name: 'Editar Notificação',
        root: true,
      },
    }
  },
  {
    path: '/notifica_exame/:master',
    name: 'notifica_exame',
    component: () => import(/* webpackChunkName: "user" */ '../views/notifica/NotificaExameView.vue'),
    meta: {
      breadcrumb: {
        name: 'Notificação - Exames',
        root: false
      }
    }
  },
  {
    path: '/generos',
    name: 'generos',
    component: () => import(/* webpackChunkName: "user" */ '../views/administrativo/ListGeneroView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/administrativo/ListEspecieView.vue'),
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
    component: () => import(/* webpackChunkName: "user" */ '../views/administrativo/ListAuxiliaresView.vue'),
    meta: {
      breadcrumb: {
        name: 'Adm - Auxiliares',
        root: true
      }
    }
  },
  {
    path: '/propmun',
    name: 'propmun',
    component: () => import(/* webpackChunkName: "user" */ '../views/administrativo/EditPropMunView.vue'),
    meta: {
      breadcrumb: {
        name: 'Adm - Usuário/Município',
        root: true
      }
    }
  },
  {
    path: '/listfiles',
    name: 'listfiles',
    component: () => import(/* webpackChunkName: "user" */ '../views/administrativo/ListTabletView.vue'),
    meta: {
      breadcrumb: {
        name: 'Adm - Arquivos Tablet',
        root: true
      }
    }
  },
  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "user" */ '../views/report/MainReportView.vue'),
    meta: {
      breadcrumb: {
        name: 'Relatório',
        root: true
      }
    }
  },
  {
    path: '/report/:id',
    name: 'report_id',
    component: () => import(/* webpackChunkName: "user" */ '../views/report/ReportView.vue'),
    meta: {
      breadcrumb: {
        name: 'Relatórios',
        root: true
      }
    }
  },
  {
    path: '/reportN/:id',
    name: 'reportN_id',
    component: () => import(/* webpackChunkName: "user" */ '../views/report/ReportNestedView.vue'),
    meta: {
      breadcrumb: {
        name: 'Relatórios',
        root: true
      }
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  base: publicPath
});

export default router
