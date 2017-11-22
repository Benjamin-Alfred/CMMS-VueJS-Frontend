module.exports = {

  data: function () {
    return {
      equipmentType: {
        id: null,
        name: null,
        description: null
      },
      messages: []
    }
  },

  methods: {
    // Let's fetch the equipmentType
    fetch: function (id, successHandler) {
      var that = this
      client({ path: '/equipmenttypes/' + id }).then(
        function (response) {
          that.$set('equipmentType', response.entity.data)
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

    updateEquipmentType: function (e) {
      e.preventDefault()
      var self = this
      client({ path: '/equipmenttypes/' + this.equipmentType.id, entity: this.equipmentType, method: 'PUT'}).then(
        function (response) {
          self.messages = []
          self.messages.push({type: 'success', message: 'The equipment type was updated'})
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
        transition.next({equipmentType: data})
      })
    }
  }
}
