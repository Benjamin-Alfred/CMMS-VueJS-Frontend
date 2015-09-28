module.exports = {

  data: function () {
    return {
      user: {
        email: null,
        password: null
      },
      messages: []
    }
  },

  methods: {
    attempt: function (e) {
      e.preventDefault()
      var that = this
      client({ path: 'login', entity: this.user }).then(
        function (response) {
          that.$dispatch('userHasFetchedToken', response.token)
          that.getUserData()
        },
        function (response) {
          that.messages = []
          if (response.status && response.status.code === 401) that.messages.push({type: 'danger', message: 'Sorry, you provided invalid credentials'})
        }
      )
    },

    getUserData: function () {
      var that = this
      client({ path: '/users/me' }).then(
        function (response) {
          that.$dispatch('userHasLoggedIn', response.entity.user)
          that.$route.router.go('/auth/profile')
        },
        function (response) {
          console.log(response)
        }
      )
    }
  },

  route: {
    activate: function (transition) {
      this.$dispatch('userHasLoggedOut')
      transition.next()
    }
  }
}
