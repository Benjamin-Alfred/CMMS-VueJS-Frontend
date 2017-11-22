module.exports = {

  data: function () {
    return {
      manufacturer: {
        id: null,
        name: null,
        address: null
      },
      messages: []
    }
  },

  methods: {
    // Let's fetch the manufacturer
    fetch: function (id, successHandler) {
      var that = this
      client({ path: '/manufacturers/' + id }).then(
        function (response) {
          that.$set('manufacturer', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status, request) {
          if (status === 401) {
            self.$dispatch('userHasLoggedOut')
          } else {
            console.log(response)
          }
        }
      )
    },

    updateManufacturer: function (e) {
      e.preventDefault()
      var self = this
      client({ path: '/manufacturers/' + this.manufacturer.id, entity: this.manufacturer, method: 'PUT'}).then(
        function (response) {
          self.messages = []
          self.messages.push({type: 'success', message: 'The manufacturer was updated'})
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
        transition.next({manufacturer: data})
      })
    }
  }
}
