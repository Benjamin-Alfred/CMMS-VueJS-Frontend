// Import requirements using browserify
window.Vue = require('vue')
window.VueRouter = require('vue-router')
window.VueResource = require('vue-resource')

// Insert vue-router and vue-resource into Vue

// Import the actual routes, aliases, ...
import { configRouter } from './routes'

// Create our router object and set options on it
const router = new VueRouter()

// Inject the routes into the VueRouter object
configRouter(router)

// Configure the application
var config = require('./config')
Vue.config.debug = true

// Bootstrap the app
const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')
window.router = router
