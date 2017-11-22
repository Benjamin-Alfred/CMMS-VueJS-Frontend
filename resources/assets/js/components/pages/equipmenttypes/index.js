module.exports = {

  data: function () {
    return {
      equipmentTypes: [],
      messages: []
    }
  },

  methods: {
    // Let's fetch some equipmentTypes
    fetch: function (successHandler) {
      var that = this
      client({ path: '/equipmenttypes' }).then(
        function (response) {
          that.$set('equipmentTypes', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status) {
          if (_.contains([401, 500], status)) {
            that.$dispatch('userHasLoggedOut')
          }
        }
      )
    },

    deleteEquipmentType: function (index) {
      var that = this
      client({ path: '/equipmenttypes/' + this.equipmentTypes[index].id, method: 'DELETE' }).then(
        function (response) {
          that.equipmentTypes.splice(index, 1)
          that.messages = [{type: 'success', message: 'Equipment type deleted.'}]
        },
        function (response) {
          that.messages.push({type: 'danger', message: 'There was a problem removing the equipment type'})
        }
      )
    }

  },

  route: {
    data: function (transition) {
      this.fetch(function (data) {
        transition.next({equipmentTypes: data})
      })
    }
  }

}
