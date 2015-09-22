var Vue = require('vue')
var router = require('vue-router')
var appView = require('./app.vue')
var app = Vue.extend(appView)
Vue.use(router)
var routes = new router()

routes.map({
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
	'/terms': {
		component: require('./components/pages/terms.vue')
	},
	'*': {
		component: require('./components/pages/404.vue')
	}
})

routes.alias({
	'': '/home'
})

routes.start(app, '#app')