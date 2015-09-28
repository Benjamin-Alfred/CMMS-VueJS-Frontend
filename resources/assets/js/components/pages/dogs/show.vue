<template>
	<div class="panel-heading">
	    Edit dog
	</div>
	<div class="panel-body">
		<div id="alerts" v-if="messages.length > 0">
			<div v-repeat="message in messages" class="alert alert-{{ message.type }} alert-dismissible" role="alert">
				{{ message.message }}
			</div>
		</div>
	    <form class="form-horizontal" role="form" v-on="submit: updateDog">
	    <fieldset disabled>
	    	<div class="form-group">
			    <label for="name" class="col-sm-2 col-sm-offset-1 control-label">Dog ID</label>
			    <div class="col-sm-5">
			        <input class="form-control" required="required" name="name" type="text" v-model="dog.id">
			    </div>
			</div>
		</fieldset>
			<div class="form-group">
			    <label for="name" class="col-sm-2 col-sm-offset-1 control-label">Name your dog</label>
			    <div class="col-sm-5">
			        <input class="form-control" required="required" name="name" type="text" v-model="dog.name">
			    </div>
			</div>
			<div class="form-group">
			    <label for="age" class="col-sm-2 col-sm-offset-1 control-label">What's the age?</label>
			    <div class="col-sm-5">
			        <input class="form-control" required="required" name="age" type="text" v-model="dog.age">
			    </div>
			</div>
			<div class="form-group">
			    <div class="col-sm-4 col-sm-offset-3">
			        <button type="submit" class="btn btn-primary"><i class="fa fa-btn fa-save"></i>Update the dog!</button>
			    </div>
			</div>
	    </form>
	</div>
</template>

<script>
module.exports = {
	data: function () {
		return {
			dog: {
				id: null,
				name: null,
				age: null
			},
			messages: []
		}
	},

	methods: {
		// Let's fetch the dog
		fetch: function (id, successHandler) {
			client( { path: '/dogs/'+id }).then(
				function (response) {
					this.$add('dog', response.entity.data);
					successHandler(response.entity.data);
				},
				function (response, status, request) {
					// Go tell your parents that you've messed up somehow
					if ( status == 401 ) {
						this.$dispatch('userHasLoggedOut');
					} else {
						console.log(response);
					}
				}
			);
		}, 

		updateDog: function (e) {
			e.preventDefault();
			var that = this;
			client( { path: '/dogs/'+this.dog.id, entity: this.dog, method: 'PUT'}).then(
				function (response) {
					that.messages = [];
					that.messages.push({type: 'success', message: 'Woof woof! Your dog was updated'});
				},
				function (response) {
					that.messages = [];
					for (var key in response.entity) {
						that.messages.push({type: 'danger', message: response.entity[key]})	
					}
				}
			);
		}

	}, 

	route: {
		// Ooh, ooh, are there any new puppies yet?
		data: function(transition) {
			this.fetch(this.$route.params.id, function(data) {
				transition.next({dog: data})
			});
		}
	}

}
</script>