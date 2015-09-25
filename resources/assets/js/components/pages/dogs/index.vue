<template>
	<div class="panel-heading">
	    List of dogs
	</div>
	<div class="panel-body" v-if="$loadingRouteData">
	    Loading data {{ loadingRouteData }}
	</div>
	<div class="panel-body" v-if="messages.length > 0">
		<div v-repeat="message in messages" class="alert alert-{{ message.type }} alert-dismissible" role="alert">
			{{ message.message }}
		</div>
	</div>
	<table class="table" v-if=" ! $loadingRouteData">
	    <thead>
	    	<tr>
	    		<th>ID</th>
	    		<th>Name</th>
	    		<th>Age</th>
	    		<th width="120px">Actions</th>
	    	</tr>
	    </thead>
	    <tbody>
	    	<tr v-repeat="dog in dogs">
	    		<td>{{ dog.id }}</td>
	    		<td>{{ dog.name }}</td>
	    		<td>{{ dog.age }}</td>
	    		<td>
	    			<a class="btn btn-primary btn-xs" v-link="{ path: '/dogs/'+dog.id }">Edit</a>
	    			<a class="btn btn-primary btn-xs" v-on="click: deleteDog($index)">Delete</a>
	    		</td>
	    	</tr>
	    </tbody>
	</table>
</template>

<script>
module.exports = {

	data: function () {
		return {
			messages: []
		}
	},

	methods: {
		// Let's fetch some dogs
		fetch: function (successHandler) {
			this.$http.get('dogs', function (data) {
				// Look ma! Puppies!
				this.$add('dogs', data.data);
				successHandler(data);
			}).error(function (data, status, request) {
				// Go tell your parents that you've messed up somehow
				if ( _.contains([401, 500], status) ) {
					this.$dispatch('userHasLoggedOut');
				}
			})
		}, 

		deleteDog: function (index) {
			this.$http.delete('dogs/'+this.dogs[index].id, function (data) {
				this.dogs.splice(index,1);
				this.messages.push({type: 'success', message: 'Great, dog purged.'})
			}).error(function (data, status, request) {
				this.messages.push({type: 'danger', message: 'There was a problem removing the dog'})
			})
		}

	}, 

	route: {
		// Ooh, ooh, are there any new puppies yet?
		data: function(transition) {
			this.fetch(function(data) {
				transition.next({dogs: data.data})
			});
		}
	}

}
</script>