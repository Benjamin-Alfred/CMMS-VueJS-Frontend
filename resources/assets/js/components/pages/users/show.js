module.exports = {

  data: function () {
    return {
      user: {
        id: null,
        first_name: '',
        middle_name: '',
        last_name: '',
        email_address: '',
        mobile_phone: '',
        organizational_affiliation: ''
      },
      messages: []
    }
  },

  methods: {
    // Let's fetch the user
    fetch: function (id, successHandler) {
      var that = this
      client({ path: '/users/' + id }).then(
        function (response) {
          that.$set('user', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status, request) {
          // Go tell your parents that you've messed up somehow
          if (status === 401) {
            self.$dispatch('userHasLoggedOut')
          } else {
            console.log(response)
          }
        }
      )
    },

    updateUser: function (e) {
      e.preventDefault()
      var self = this
      client({ path: '/users/' + this.user.id, entity: this.user, method: 'PUT'}).then(
        function (response) {
          self.messages = []
          self.messages.push({type: 'success', message: 'The user was successfully updated'})
        },
        function (response) {
          self.messages = []
          for (var key in response.entity) {
            self.messages.push({type: 'danger', message: response.entity[key]})
          }
        }
      )
    }

  },

  route: {
    data: function (transition) {
      this.fetch(this.$route.params.id, function (data) {
        transition.next({user: data})
      })
    }
  }
}
