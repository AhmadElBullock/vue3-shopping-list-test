import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import App from '../views/App/App.vue'
import Me from '../views/App/Me.vue'
import Wife from '../views/App/Wife.vue'
import About from '../views/About.vue'
import Page404 from '../views/Page404.vue'

import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/app',
    redirect: '/app/me',
    name: 'App',
    component: App,
    children : [
      {
        path: '/app/me',
        name: 'Me',
        component: Me,
        beforeEnter(to, from, next) {
          if(store.state.isAuthed == false) {
            next('/')
          } else {
            next()
          }
        },
      },
      {
        path: '/app/wife',
        name: 'Wife',
        component: Wife,
        beforeEnter(to, from, next) {
          if(store.state.isAuthed == false) {
            next('/')
          } else {
            next()
          }
        },
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  /* {
    path: '/all-jobs',
    redirect: 'jobs'
  }, */
  {
    path: '/:catchAll(.*)',
    name: 'Page404',
    component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
