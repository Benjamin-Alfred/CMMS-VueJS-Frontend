module.exports = {

  data: function () {
    return {
      manufacturers: [],
      messages: []
    }
  },

  methods: {
    // Let's fetch some manufacturers
    fetch: function (successHandler) {
      var that = this
      client({ path: '/manufacturers' }).then(
        function (response) {
          that.$set('manufacturers', response.entity.data)
          successHandler(response.entity.data)
        },
        function (response, status) {
          if (_.contains([401, 500], status)) {
            that.$dispatch('userHasLoggedOut')
          }
        }
      )
    },

    deleteManufacturer: function (index) {
      var that = this
      client({ path: '/manufacturers/' + this.manufacturers[index].id, method: 'DELETE' }).then(
        function (response) {
          that.manufacturers.splice(index, 1)
          that.messages = [{type: 'success', message: 'Manufacturer deleted.'}]
        },
        function (response) {
          that.messages.push({type: 'danger', message: 'There was a problem removing the manufacturer'})
        }
      )
    }

  },

  route: {
    data: function (transition) {
      this.fetch(function (data) {
        transition.next({manufacturers: data})
      })
    }
  }

}
