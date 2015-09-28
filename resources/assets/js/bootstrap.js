// Import requirements using browserify
window.Vue = require('vue')
window.VueRouter = require('vue-router')

// Insert vue-router and vue-resource into Vue

// Import the actual routes, aliases, ...
import { configRouter } from './routes'

// Create our router object and set options on it
const router = new VueRouter()

// Inject the routes into the VueRouter object
configRouter(router)

// Configure the application
window.config = require('./config')
Vue.config.debug = true

// Configure our HTTP client
var rest 			= require('rest')
var pathPrefix 		= require('rest/interceptor/pathPrefix')
var mime 			= require('rest/interceptor/mime')
var defaultRequest 	= require('rest/interceptor/defaultRequest')
var errorCode 		= require('rest/interceptor/errorCode')
var interceptor     = require('rest/interceptor');
var jwtAuth 		= require('./interceptors/jwtAuth')

window.client = rest.wrap(mime)
             		.wrap(pathPrefix, { prefix: config.api.base_url })
             		.wrap(defaultRequest, config.api.defaultRequest)
             		.wrap(errorCode, { code: 400 })
             		.wrap(jwtAuth);

// Bootstrap the app
const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')
window.router = router
