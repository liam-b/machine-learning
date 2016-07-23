var neural = require('./neural.json')
var colors = require('colors')
var log = require('./log.js')

var output = new log()

for (var layer of neural.net) {
  var newValues = [0]
  for (var neuron of layer) {
    var weightId = 0
    for (var weight of neuron.weights) {
      weightId += 1
      newValues[weightId] = weight
      output.log(weight)
    }
  }
}
