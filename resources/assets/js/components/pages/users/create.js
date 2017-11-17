module.exports = {
  data: function () {
    return {
      user: {
        first_name: '',
        middle_name: '',
        last_name: '',
        email_address: '',
        mobile_phone: '',
        organizational_affiliation: ''
      },
      messages: [],
      creating: false
    }
  },

  methods: {
    createUser: function (e) {
      e.preventDefault()
      var that = this
      that.creating = true
      client({path: 'users', entity: this.user}).then(
        function (response, status) {
          that.user.first_name = ''
          that.user.middle_name = ''
          that.user.last_name = ''
          that.user.email_address = ''
          that.user.mobile_phone = ''
          that.user.organizational_affiliation = ''
          that.messages = [ {type: 'success', message: 'Your user was successfully created'} ]
          Vue.nextTick(function () {
            document.getElementById('firstNameInput').focus()
          })
          that.creating = false
        },
        function (response, status) {
          that.messages = []
          for (var key in response.entity) {
            that.messages.push({type: 'danger', message: response.entity[key]})
            that.creating = false
          }
        }
      )
    }
  }
}
