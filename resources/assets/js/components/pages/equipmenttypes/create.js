module.exports = {
  data: function () {
    return {
      equipmentType: {
        name: '',
        description: ''
      },
      messages: [],
      creating: false
    }
  },

  methods: {
    createEquipmentType: function (e) {
      e.preventDefault()
      var that = this
      that.creating = true
      client({path: 'equipmenttypes', entity: this.equipmentType}).then(
        function (response, status) {
          that.equipmentType.name = ''
          that.equipmentType.description = ''
          that.messages = [ {type: 'success', message: 'A new equipment type was added'} ]
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
