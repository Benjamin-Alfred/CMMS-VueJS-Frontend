<template>
	<div class="panel-heading">
	    Register for an account
	</div>
	<div class="panel-body">
	    <form class="form-horizontal" role="form" v-on="submit: registerUser">

			<div id="alerts" v-if="messages.length > 0">
				<div v-repeat="message in messages" class="alert alert-{{ message.type }} alert-dismissible" role="alert">
					{{ message.message }}
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">Your name</label>
				<div class="col-md-6">
					<input type="name" class="form-control" v-model="user.name">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">E-Mail Address</label>
				<div class="col-md-6">
					<input type="email" class="form-control" v-model="user.email">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">Password</label>
				<div class="col-md-6">
					<input type="password" class="form-control" v-model="user.password">
				</div>
			</div>

			<div class="form-group">
				<label class="col-md-4 control-label">Confirm password</label>
				<div class="col-md-6">
					<input type="password" class="form-control" v-model="user.password_confirmation">
				</div>
			</div>

			<div class="form-group">
				<div class="col-md-6 col-md-offset-4">
					<button type="submit" class="btn btn-primary">
						<i class="fa fa-btn fa-sign-in"></i> Register
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
module.exports = {

	data: function () {
		return {
			user: {
				name: null,
				email: null,
				password: null,
				password_confirmation: null
			},
			messages: []
		}
	},

	methods: {
		registerUser: function (e) {
			e.preventDefault();
			var that = this;

			client( { path: '/register', entity: this.user } ).then(
				function (response) {
					that.getUserData();
				},
				function (response, status) {
					that.messages = [];
					if (response.status && response.status.code == 422) {
						that.messages = [];
						for (var key in response.entity) {
							that.messages.push({type: 'danger', message: response.entity[key]})	
						}
					}
				}
			);

		},

		getUserData: function () {
			var that = this;
			client( { path: '/users/me' } ).then(
				function (response) {
					that.$dispatch('userHasLoggedIn', response.entity.user)
					that.$route.router.go('/auth/profile')
				}
			);
		}
	}, 

}
</script>