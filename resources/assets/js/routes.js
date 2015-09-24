module.exports = {
	configRouter: function (router) {
		router.map({
			'/auth': {
				component: require('./components/pages/auth.vue'),
				subRoutes: {
					'/login': { 
						component: require('./components/pages/auth/login.vue'),
						guest: true
					},
					'/register': {
						component: require('./components/pages/auth/register.vue'),
						guest: true
					},
					'/profile': {
						component: require('./components/pages/auth/profile.vue'),
						auth: true
					},
					'/logout': {
						component: require('./components/pages/auth/logout.vue'),
						auth: true
					}
				}
			},
			'/home': {
				component: require('./components/pages/home.vue'),
				subRoutes: {
					'/': {
						component: require('./components/pages/home/home.vue')
					},
					'/welcome': {
						component: require('./components/pages/home/welcome.vue')
					},
					'/about': {
						component: require('./components/pages/home/about.vue')
					}
				}
			},
			'/dogs': {
				component: require('./components/pages/dogs.vue'),
				auth: true,
				subRoutes: {
					'/': {
						component: require('./components/pages/dogs/index.vue')
					},
					'/:id': {
						component: require('./components/pages/dogs/show.vue')
					},
					'/create': {
						component: require('./components/pages/dogs/create.vue')
					}
				}
			},
			'/terms': {
				component: require('./components/pages/terms.vue')
			},
			'*': {
				component: require('./components/pages/404.vue')
			}
		})

		router.alias({
			'': '/home',
			'/auth': '/auth/login'
		})

		router.beforeEach(function (transition) {

			var token = localStorage.getItem('token');
			if (transition.to.auth) {
				if( ! token || token === null  ) {
					transition.redirect('/auth/login')
				}
			}
			if (transition.to.guest) {
				if (token) {
					transition.redirect('/')
				}
			}
			transition.next();
		})
	}
}