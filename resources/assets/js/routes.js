module.exports = {

  configRouter: function (router) {

    router.map({
      '/auth': {
        component: require('./compiled/pages/auth.vue'),
        subRoutes: {
          '/login': {
            component: require('./compiled/pages/auth/login.vue'),
            guest: true
          },
          '/register': {
            component: require('./compiled/pages/auth/register.vue'),
            guest: true
          },
          '/profile': {
            component: require('./compiled/pages/auth/profile.vue'),
            auth: true
          },
          '/logout': {
            component: require('./compiled/pages/auth/logout.vue'),
            auth: true
          }
        }
      },
      '/home': {
        component: require('./compiled/pages/home.vue'),
        subRoutes: {
          '/': {
            component: require('./compiled/pages/home/home.vue')
          },
          '/welcome': {
            component: require('./compiled/pages/home/welcome.vue')
          },
          '/about': {
            component: require('./compiled/pages/home/about.vue')
          }
        }
      },
      '/equipmenttypes': {
        component: require('./compiled/pages/equipmenttypes.vue'),
        auth: true,
        subRoutes: {
          '/': {
            component: require('./compiled/pages/equipmenttypes/index.vue')
          },
          '/:id': {
            component: require('./compiled/pages/equipmenttypes/show.vue')
          },
          '/create': {
            component: require('./compiled/pages/equipmenttypes/create.vue')
          }
        }
      },
      '/manufacturers': {
        component: require('./compiled/pages/manufacturers.vue'),
        auth: true,
        subRoutes: {
          '/': {
            component: require('./compiled/pages/manufacturers/index.vue')
          },
          '/:id': {
            component: require('./compiled/pages/manufacturers/show.vue')
          },
          '/create': {
            component: require('./compiled/pages/manufacturers/create.vue')
          }
        }
      },
      '/users': {
        component: require('./compiled/pages/users.vue'),
        auth: true,
        subRoutes: {
          '/': {
            component: require('./compiled/pages/users/index.vue')
          },
          '/:id': {
            component: require('./compiled/pages/users/show.vue')
          },
          '/create': {
            component: require('./compiled/pages/users/create.vue')
          }
        }
      },
      '/terms': {
        component: require('./compiled/pages/terms.vue')
      },
      '*': {
        component: require('./compiled/pages/404.vue')
      }
    })

    router.alias({
      '': '/home',
      '/auth': '/auth/login'
    })

    router.beforeEach(function (transition) {

      var token = localStorage.getItem('jwt-token')
      if (transition.to.auth) {
        if (!token || token === null) {
          transition.redirect('/auth/login')
        }
      }
      if (transition.to.guest) {
        if (token) {
          transition.redirect('/')
        }
      }
      transition.next()
    })
  }
}
