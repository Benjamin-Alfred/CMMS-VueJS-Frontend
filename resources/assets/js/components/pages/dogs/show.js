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
      client({ path: '/dogs/' + id }).then(
        function (response) {
          this.$add('dog', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status, request) {
          // Go tell your parents that you've messed up somehow
          if (status === 401) {
            this.$dispatch('userHasLoggedOut')
          } else {
            console.log(response)
          }
        }
      )
    },

    updateDog: function (e) {
      e.preventDefault()
      var that = this
      client({ path: '/dogs/' + this.dog.id, entity: this.dog, method: 'PUT'}).then(
        function (response) {
          that.messages = []
          that.messages.push({type: 'success', message: 'Woof woof! Your dog was updated'})
        },
        function (response) {
          that.messages = []
          for (var key in response.entity) {
            that.messages.push({type: 'danger', message: response.entity[key]})
          }
        }
      )
    }

  },

  route: {
    // Ooh, ooh, are there any new puppies yet?
    data: function (transition) {
      this.fetch(this.$route.params.id, function (data) {
        transition.next({dog: data})
      })
    }
  }
}
