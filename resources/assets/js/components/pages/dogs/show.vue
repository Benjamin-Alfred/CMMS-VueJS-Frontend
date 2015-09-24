<template>
	<div class="panel-heading">
	    Edit dog
	</div>
	<div class="panel-body">
	    <form class="form-horizontal" role="form">
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
			        <button class="btn btn-primary" v-on="click: updateDog"><i class="fa fa-btn fa-save"></i>Update the dog!</button>
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
			}
		}
	},

	methods: {
		// Let's fetch the dog
		fetch: function (id, successHandler) {
			this.$http.get('dogs/'+id, function (data) {
				this.$add('dog', data.data);
				successHandler(data);
			}).error(function (data, status, request) {
				// Go tell your parents that you've messed up somehow
				if ( status == 401 ) {
					this.$dispatch('userHasLoggedOut');
				} else {
					console.log(data);
				}
			})
		}, 

		updateDog: function (e) {
			e.preventDefault();
			this.$http.put('dogs/'+this.dog.id, this.dog, function (data) {
				console.log('successfully updated the dog')
			}).error( function (data, status, request) {
				console.log('error updating the dog');
				console.log(data);
			})
		}

	}, 

	route: {
		// Ooh, ooh, are there any new puppies yet?
		data: function(transition) {
			this.fetch(this.$route.params.id, function(data) {
				transition.next({dog: data.data})
			});
		}
	}

}
</script>