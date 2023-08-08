import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/mycad',
    name: 'cadastro',
    component: () => import(/* webpackChunkName: "home" */ '../views/MyCadastroView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/UsuarioView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListUsersView.vue')
  },
  {
    path: '/localidade',
    name: 'localidade',
    component: () => import(/* webpackChunkName: "user" */ '../views/LocalidadeView.vue')
  },
  {
    path: '/localidades',
    name: 'localidades',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListLocalidadeView.vue')
  },
  {
    path: '/editLoc/:id',
    name: 'editloc',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditLocalidadeView.vue')
  },
  {
    path: '/codend',
    name: 'codend',
    component: () => import(/* webpackChunkName: "user" */ '../views/CodendView.vue')
  },
  {
    path: '/codends',
    name: 'codends',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListCodendView.vue')
  },
  {
    path: '/editCod/:id',
    name: 'editloc',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditCodendView.vue')
  },
  {
    path: '/captura',
    name: 'captura',
    component: () => import(/* webpackChunkName: "user" */ '../views/CapturaView.vue')
  },
  {
    path: '/captura_det/:master',
    name: 'captura_det',
    component: () => import(/* webpackChunkName: "user" */ '../views/CapturaDetView.vue')
  },
  {
    path: '/captura_dets/:master',
    name: 'captura_dets',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListCapturaDetView.vue')
  },
  {
    path: '/capturas',
    name: 'capturas',
    component: () => import(/* webpackChunkName: "user" */ '../views/ListCapturaView.vue')
  },
  {
    path: '/editCapt/:id',
    name: 'editcapt',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditCapturaView.vue')
  },
  {
    path: '/editCaptDet/:id',
    name: 'editcaptdet',
    component: () => import(/* webpackChunkName: "user" */ '../views/EditCapturaDetView.vue')
  },
  {
    path: '/report/:id',
    name: 'report',
    component: () => import(/* webpackChunkName: "user" */ '../views/ReportView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
