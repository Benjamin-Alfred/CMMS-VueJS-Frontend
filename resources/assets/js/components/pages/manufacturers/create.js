module.exports = {
  data: function () {
    return {
      manufacturer: {
        name: '',
        address: ''
      },
      messages: [],
      creating: false
    }
  },

  methods: {
    createManufacturer: function (e) {
      e.preventDefault()
      var that = this
      that.creating = true
      client({path: 'manufacturers', entity: this.manufacturer}).then(
        function (response, status) {
          that.manufacturer.name = ''
          that.manufacturer.adress = ''
          that.messages = [ {type: 'success', message: 'A new manufacturer was added'} ]
          Vue.nextTick(function () {
            document.getElementById('nameInput').focus()
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
