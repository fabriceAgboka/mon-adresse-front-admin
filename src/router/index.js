import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../helpers/auth'

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
  if (auth.getUser()) {
    next()
    return
  }
  next('/login')
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Tableau de board',
        breadcrumb: [{
          text: 'Tableau de board',
          active: true,
        }, ],
      },
      beforeEnter: ifAuthenticated
    },
    {
      path: '/adresses',
      name: 'adresses',
      component: () => import('@/views/pages/adresses/index.vue'),
      meta: {
        pageTitle: 'Adresses',
        breadcrumb: [{
          text: 'Adresses',
          active: true,
        }, ],
      },

      beforeEnter: ifAuthenticated,
    },
    {
      path: '/adresses/actif',
      name: 'adresses-actif',
      component: () => import('@/views/pages/adresses/actif.vue'),
      meta: {
        pageTitle: 'Adresses actif',
        breadcrumb: [{
          text: 'Adresses actif',
          active: true,
        }, ],
      },
    },
    {
      path: '/adresses/inactif',
      name: 'adresses-inactif',
      component: () => import('@/views/pages/adresses/inactif.vue'),
      meta: {
        pageTitle: 'Adresses inactif',
        breadcrumb: [{
          text: 'Adresses inactif',
          active: true,
        }, ],
      },
    },
    {
      path: '/adresses/encours',
      name: 'adresses-encours',
      component: () => import('@/views/pages/adresses/encours.vue'),
      meta: {
        pageTitle: 'Adresses encours',
        breadcrumb: [{
          text: 'Adresses encours',
          active: true,
        }, ],
      },
    },
    {
      path: '/adresses/suspendu',
      name: 'adresses-suspendu',
      component: () => import('@/views/pages/adresses/suspendu.vue'),
      meta: {
        pageTitle: 'Adresses suspendu',
        breadcrumb: [{
          text: 'Adresses suspendu',
          active: true,
        }, ],
      },
    },
    {
      path: '/adresses/traitement',
      name: 'adresses-traitement',
      component: () => import('@/views/pages/adresses/traitement.vue'),
      meta: {
        pageTitle: 'Adresses traitement',
        breadcrumb: [{
          text: 'Adresses traitement',
          active: true,
        }, ],
      },
    }, {
      path: '/administrateurs',
      name: 'administrateurs',
      component: () => import('@/views/pages/administrateurs/index.vue'),
      meta: {
        pageTitle: 'Administrateurs',
        breadcrumb: [{
          text: 'administrateurs',
          active: true,
        }, ],
      },
      beforeEnter: ifAuthenticated,
    }, {
      path: '/users',
      name: 'users',
      component: () => import('@/views/pages/users/index.vue'),
      meta: {
        pageTitle: 'Utilisateurs',
        breadcrumb: [{
          text: 'users',
          active: true,
        }, ],
      },
      beforeEnter: ifAuthenticated,
    }, {
      path: '/societes',
      name: 'societes',
      component: () => import('@/views/pages/societes/index.vue'),
      meta: {
        pageTitle: 'Societes',
        breadcrumb: [{
          text: 'societes',
          active: true,
        }, ],
      },
      beforeEnter: ifAuthenticated,
    }, {
      path: '/societes/details/:id',
      name: 'societe_details',
      component: () => import('@/views/pages/societes/details.vue'),
      meta: {
        pageTitle: 'Détails de la sociétés',
        breadcrumb: [{
          text: 'societes',
          active: false,
        }, {
          text: 'details',
          active: true,
        }],
      },
      beforeEnter: ifAuthenticated,
    }, {
      path: '/users/:id',
      name: 'users_adresses',
      component: () => import('@/views/pages/users/adresses.vue'),
      meta: {
        pageTitle: 'Utilisateur',
        breadcrumb: [{
          text: 'users',
          active: true,
        }, ],
      },
      beforeEnter: ifAuthenticated,
    }, {
      path: '/societes/:id',
      name: 'societes_adresses',
      component: () => import('@/views/pages/societes/adresses.vue'),
      meta: {
        pageTitle: 'Utilisateur',
        breadcrumb: [{
          text: 'societes',
          active: true,
        }, ],
      },
      beforeEnter: ifAuthenticated,
    }, {
      path: '/facturations',
      name: 'facturations_index',
      component: () => import('@/views/pages/facturations/index.vue'),
      meta: {
        pageTitle: 'Facturations',
        breadcrumb: [{
          text: 'facturations',
          active: true,
        }, ],
      },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        pageTitle: 'Second Page',
        breadcrumb: [{
          text: 'Second Page',
          active: true,
        }, ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router