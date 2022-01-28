import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _75f72cbe = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _39d7091a = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _7fb33b55 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _38f88a95 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _7758d8b7 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _6a285301 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _1fc2cde2 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _75f72cbe,
    children: [{
      path: "",
      component: _39d7091a,
      name: "home"
    }, {
      path: "/login",
      component: _7fb33b55,
      name: "login"
    }, {
      path: "/register",
      component: _7fb33b55,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _38f88a95,
      name: "profile"
    }, {
      path: "/settings",
      component: _7758d8b7,
      name: "settings"
    }, {
      path: "/editor",
      component: _6a285301,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _1fc2cde2,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
