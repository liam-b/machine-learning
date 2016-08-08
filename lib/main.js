window.canvas = document.getElementById('simulation')
window.context = window.canvas.getContext('2d')
window.center = {
  x: window.canvas.width / 2,
  y: window.canvas.height / 2,
}

var net = [
  [
    [9, 2, 5, 2],
    [3, 8, 2, 1]
  ],
  [
    [3, 7, 5, 2],
    [8, 1, 4, 9],
    [2, 3, 5, 6],
    [4, 6, 6, 9]
  ],
  [
    [5],
    [2],
    [8],
    [9]
  ],
  [
    [1]
  ]
]

drawNeurons(net, 20)
console.log(parseColor(10))

function drawNeurons (array, radius) {
  var lastPositions2 = []
  var lastPositions1 = []
  for (var row = 0; row < array.length; row += 1) {
    lastPositions2 = lastPositions1
    let rowPosition = ((window.canvas.width / array.length) * row) + ((window.canvas.width / array.length) / 2) - (radius / 2)
    lastPositions1 = drawLines(array[row].length, radius, rowPosition + radius / 2, lastPositions2, array[row - 1])
  }
  for (var row = 0; row < array.length; row += 1) {
    let rowPosition = ((window.canvas.width / array.length) * row) + ((window.canvas.width / array.length) / 2) - (radius / 2)
    drawDots(array[row].length, radius, rowPosition + radius / 2, row, array.length)
  }
}

function drawDots (rows, radius, xPosition, num, total) {
  if (num == 0) {
    window.context.fillStyle = '#4faddb'
  }
  else if (num == total - 1) {
    window.context.fillStyle = '#db4f4f'
  }
  else {
    window.context.fillStyle = '#cccccc'
  }
  for (var row = 0; row < rows; row += 1) {
    let rowPosition = ((window.canvas.height / rows) * row) + ((window.canvas.height / rows) / 2) - (radius / 2)
    window.context.beginPath()
    window.context.arc(xPosition + radius / 2, rowPosition + radius / 2, radius, 0, Math.PI * 2, true)
    window.context.closePath()
    window.context.fill()
  }
}

function drawLines (rows, radius, xPosition, lastPosition, weights) {
  var output = []
  for (var row = 0; row < rows; row += 1) {
    let rowPosition = ((window.canvas.height / rows) * row) + ((window.canvas.height / rows) / 2) - (radius / 2)
    output.push([xPosition + radius / 2, rowPosition + radius / 2])
    for (var pos in lastPosition) {
      window.context.beginPath()
      window.context.strokeStyle = parseColor(weights[pos][row])
      window.context.moveTo(lastPosition[pos][0], lastPosition[pos][1])
      window.context.lineWidth = 3
      window.context.lineTo(xPosition + radius / 2, rowPosition + radius / 2)
      window.context.stroke()
    }
  }
  return output
}

function parseColor (input) {
  return '#' + input.toString(16) + input.toString(16) + input.toString(16) + input.toString(16) + input.toString(16) + input.toString(16)
}

function drawColumns (columns, radius, yPosition) {
  for (var column = 0; column < columns; column += 1) {
    let columnPosition = ((window.canvas.width / columns) * column) + ((window.canvas.width / columns) / 2) - (radius / 2)
    window.context.beginPath()
    window.context.arc(columnPosition + radius / 2, yPosition + radius / 2, radius, 0, Math.PI * 2, true)
    window.context.closePath()
    window.context.fill()
  }
}
