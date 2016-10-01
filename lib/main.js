var Net = require('./neural.js');

window.canvas = document.getElementById('simulation')
window.context = window.canvas.getContext('2d')
window.center = {
  x: window.canvas.width / 2,
  y: window.canvas.height / 2,
}

var net = new Net (20, [
  [
    [0.9, 0.2, 0.5, 0.2, 0.6],
    [0.3, 0.8, 0.2, 0.9, 1]
  ],
  [
    [0.3, 0.7, 0.5, 0.2],
    [0.6, 0.2, 1, 0.8],
    [0.8, 0.1, 0.4, 0.9],
    [0.2, 0.3, 0.5, 0.6],
    [0.4, 0.6, 0.6, 0.9]
  ],
  [
    [0.5, 0.6],
    [0.2, 0.1],
    [0.8, 1.0],
    [0.9, 0.3]
  ],
  [
    [1],
    [1]
  ]
])

// var net = new Net (20, [
//   [
//     [1.0]
//   ],
//   [
//     [1.0]
//   ],
//   [
//     [1.0]
//   ]
// ])

net.mutate({
  mutability: 100,
  difference: 0.2,
  jumpChance: 10
})

net.draw(20)
console.log('result: ' + net.propagate([1, 1]))
console.log(net.data)
