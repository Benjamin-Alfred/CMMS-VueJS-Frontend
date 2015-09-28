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

	<div class="panel-body" v-if="dogs.length == 0">
		You have no dogs!
	</div>

	<table class="table" v-if=" ! $loadingRouteData && dogs.length > 0">
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
			dogs: [],
			messages: []
		}
	},

	methods: {
		// Let's fetch some dogs
		fetch: function (successHandler) {
			var that = this;
			client( { path: '/dogs' } ).then(
				function (response) {
					// Look ma! Puppies!
					that.$add('dogs', response.entity.data)
					successHandler(response.entity.data)
				},
				function (response, status) {
					if ( _.contains([401, 500], status) ) {
						that.$dispatch('userHasLoggedOut')
					}
				}
			);
		}, 

		deleteDog: function (index) {
			var that = this;
			client( { path: '/dogs/'+this.dogs[index].id, method: 'DELETE' } ).then(
				function (response) {
					that.dogs.splice(index,1)
					that.messages = [{type: 'success', message: 'Great, dog purged.'}]
				},
				function (response) {
					that.messages.push({type: 'danger', message: 'There was a problem removing the dog'})
				}
			);
		}

	}, 

	route: {
		// Ooh, ooh, are there any new puppies yet?
		data: function(transition) {
			this.fetch(function(data) {
				transition.next({dogs: data})
			});
		}
	}

}
</script>