<template>
	<div class="panel-heading">
	    Make a dog!
	</div>
	<div class="panel-body">
		<div id="alerts" v-if="messages.length > 0">
			<div v-repeat="message in messages" class="alert alert-{{ message.type }} alert-dismissible" role="alert">
				{{ message.message }}
			</div>
		</div>
	    <form class="form-horizontal" role="form">
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
			        <button class="btn btn-primary" v-on="click: createDog"><i class="fa fa-btn fa-save"></i>Make the dog!</button>
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
				name: null,
				age: null,
			},
			messages: []
		}
	},

	methods: {
		createDog: function (e) {
			e.preventDefault();
			this.$http.post('dogs', this.dog, function (data) {
				this.messages = [];
				this.messages.push({type: 'success', message: 'Woof woof! Your dog was created'});
			}).error( function (data, status, request) {
				this.messages = [];
				for (var key in data) {
					this.messages.push({type: 'danger', message: data[key]})	
				}
			})
		}
	}
}
</script>