<template>
    <router-view></router-view>
</template>

<script>
	module.exports = {

		created: function () {
			Vue.http.options.root = config.api.base_url;
			if (localStorage.getItem('token') !== null) {
				Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
			}
		},

		ready: function () {
			
			this.$on('userHasLoggedOut', function () {
				this.destroyLogin();
			})
			
			this.$on('userHasLoggedIn', function (user) {
				this.setLogin(user);
			})

			this.$on('userHasFetchedToken', function (token) {
				this.setToken(token)
			})

			// The app has just been initialized, but if we find Auth data, let's check it for validity (also see created)
			if( ! this.authenticated && Vue.http.headers.common.hasOwnProperty('Authorization')) {
				this.$http.get('users/me', function (data) {

					// User has successfully logged in using the token from storage
					this.setLogin(data.user);
					// broadcast an event telling our children that the data is ready and views can be rendered
					this.$broadcast('data-loaded');
				
				}).error(function () {
					// Login with our token failed, do some cleanup and redirect if we're on an authenticated route
					this.destroyLogin();
				})
			}
		},

		data: function () {
			return {
				user: null,
				token: null,
				http_options: {},
				authenticated: false,
			}
		}, 

		methods: {

			setToken: function (token) {
				// Save token in storage and on the vue-resource headers
				localStorage.setItem('token', token);
				Vue.http.headers.common['Authorization'] = 'Bearer ' + token;
			},

			setLogin: function(user) {
				// Save login info in our data and set header in case it's not set already
				this.user = user;
				this.authenticated = true;
				this.token = localStorage.getItem('token');
				Vue.http.headers.common['Authorization'] = 'Bearer ' + this.token;
			},

			destroyLogin: function (user) {
				// Cleanup when token was invalid our user has logged out
				this.user = null;
				this.token = null;
				this.authenticated = false;
				localStorage.removeItem('token');
				if (this.$route.auth) this.$route.router.go('/auth/login');
			},
		},

		components: {
		    navComponent: 		require('./components/nav.vue'),
		    footerComponent: 	require('./components/footer.vue')
		}
	}
</script>