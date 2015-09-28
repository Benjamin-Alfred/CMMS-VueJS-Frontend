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
      e.preventDefault()
      var that = this

      client({ path: '/register', entity: this.user }).then(
        function (response) {
          that.getUserData()
        },
        function (response, status) {
          that.messages = []
          if (response.status && response.status.code === 422) {
            that.messages = []
            for (var key in response.entity) {
              that.messages.push({type: 'danger', message: response.entity[key]})
            }
          }
        }
      )

    },

    getUserData: function () {
      var that = this
      client({ path: '/users/me' }).then(
        function (response) {
          that.$dispatch('userHasLoggedIn', response.entity.user)
          that.$route.router.go('/auth/profile')
        }
      )
    }
  }
}
