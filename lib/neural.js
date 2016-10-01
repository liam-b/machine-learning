// 1 / (1 + Math.exp(-x))

Math.sigmoid = function (t) {
  return 1 / (1 + Math.exp(-t))
}

Math.randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Math.randomChance = function (chance) {
  return Math.randomInt(0, 100) < chance
}

Math.clamp = function(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function randomMutate (min, max) {
  return Math.random() * (max - min + 1) + min;
}

module.exports = function Net (radius, data) {
  this.data = data
  this.radius = radius

  this.mutate = function (options) {
    for (var layer in this.data) {
      for (var neuron in this.data[layer]) {
        for (var weights in this.data[layer][neuron]) {
          if (Math.randomChance(options.mutability)) {
            this.data[layer][neuron][weights] = randomMutate(this.data[layer][neuron][weights] - options.difference, this.data[layer][neuron][weights] + options.difference - 1)
            this.data[layer][neuron][weights] = Math.clamp(this.data[layer][neuron][weights], 0, 1)
          }
          if (Math.randomChance(options.jumpChance)) {
            this.data[layer][neuron][weights] = randomMutate(0, 0)
          }
        }
      }
    }
  }

  this.propagate = function (inputs) {
    var last = inputs
    for (var layer in this.data) {
      if (layer == this.data.length - 1) {
        continue
      }
      var next = []
      for (var count in this.data[layer][0]) {
        next.push([])
      }
      for (var neuron in this.data[layer]) {
        for (var weights in this.data[layer][neuron]) {
          next[weights].push(this.data[layer][neuron][weights] * last[neuron])
          // console.log(this.data[layer][neuron][weights], last[neuron])
        }
      }
      for (var i in next) {
        next[i] = next[i].reduce(function (sum, a) { return sum + a }, 0) / (next.length || 1)
        next[i] = Math.sigmoid(next[i])
      }
      last = next
    }
    return next
  }

  this.draw = function () {
    var array = this.data
    var lastPositions2 = []
    var lastPositions1 = []
    var lastDots1 = []
    var lastDots2 = []
    var radius = this.radius
    for (var row = 0; row < array.length; row += 1) {
      lastPositions2 = lastPositions1
      let rowPosition = ((window.canvas.width / array.length) * row) + ((window.canvas.width / array.length) / 2) - (radius / 2)
      lastPositions1 = this.drawLines(array[row].length, radius, rowPosition + radius / 2, lastPositions2, array[row - 1])
    }
    for (var row = 0; row < array.length; row += 1) {
      lastDots2 = lastDots1
      let rowPosition = ((window.canvas.width / array.length) * row) + ((window.canvas.width / array.length) / 2) - (radius / 2)
      lastDots1 = this.drawDots(array[row].length, radius, rowPosition + radius / 2, row, array.length, lastDots2, array, row)
    }
  }

  this.drawDots = function (rows, radius, xPosition, num, total, lasts, arrays, current) {
    let output = this.parseWeights(lasts, arrays, current)
    for (var row = 0; row < rows; row += 1) {
      if (num == 0) {
        window.context.fillStyle = '#4faddb' // this.changeColor('#4faddb', lasts[row] - 0.5 * 60)
      }
      else if (num == total - 1) {
        window.context.fillStyle = '#db4f4f' // this.changeColor('#db4f4f', lasts[row] - 0.5 * 60)
      }
      else {
        window.context.fillStyle = '#656565' // this.changeColor('#555555', lasts[row] * 100)
      }
      let rowPosition = ((window.canvas.height / rows) * row) + ((window.canvas.height / rows) / 2) - (radius / 2)
      window.context.beginPath()
      window.context.arc(xPosition + radius / 2, rowPosition + radius / 2, radius, 0, Math.PI * 2, true)
      window.context.closePath()
      window.context.fill()
    }
    return output
  }

  this.parseWeights = function (lastValues, allWeights, currentRow) {
    for (theseWeights in allWeights[currentRow]) {
      for (thisWeight in allWeights[currentRow][theseWeights]) {
        // console.log(currentRow, allWeights[currentRow][theseWeights][thisWeight])
      }
    }
    return [0, 1, 0.3, 0.7]
  }

  this.drawLines = function (rows, radius, xPosition, lastPosition, weights) {
    var output = []
    for (var row = 0; row < rows; row += 1) {
      let rowPosition = ((window.canvas.height / rows) * row) + ((window.canvas.height / rows) / 2) - (radius / 2)
      output.push([xPosition + radius / 2, rowPosition + radius / 2])
      for (var pos in lastPosition) {
        window.context.beginPath()
        window.context.strokeStyle = this.parseColor(weights[pos][row])
        window.context.moveTo(lastPosition[pos][0], lastPosition[pos][1])
        window.context.lineWidth = 3
        window.context.lineTo(xPosition + radius / 2, rowPosition + radius / 2)
        window.context.stroke()
      }
    }
    return output
  }

  this.parseColor = function (input) {
    input = Math.round(10 * input) / 10
    input *= 10
    if (input > 16) {
      input = 16
    }
    return '#' + input.toString(16) + input.toString(16) + input.toString(16) + input.toString(16) + input.toString(16) + input.toString(16)
  }

  this.drawColumns = function(columns, radius, yPosition) {
    for (var column = 0; column < columns; column += 1) {
      let columnPosition = ((window.canvas.width / columns) * column) + ((window.canvas.width / columns) / 2) - (radius / 2)
      window.context.beginPath()
      window.context.arc(columnPosition + radius / 2, yPosition + radius / 2, radius, 0, Math.PI * 2, true)
      window.context.closePath()
      window.context.fill()
    }
  }
}
