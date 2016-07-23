var fileIO = require('fs')
var colors = require('colors')

function getDate (input) {
  var currentdate = new Date()
  var output = ''
  for (var char of input) {
    switch (char) {
      case 'D':
        output += currentdate.getDate()
        break
      case 'M':
        output += (currentdate.getMonth() + 1)
        break
      case 'Y':
        output += currentdate.getFullYear()
        break
      case 'h':
        output += currentdate.getHours()
        break
      case 'm':
        output += currentdate.getMinutes()
        break
      case 's':
        output += currentdate.getSeconds()
        break
      default:
        output += char
    }
  }

  return output
}

function findCaller (func) {
  try {
    var callerData = func.caller.name.toString() + '()'
  }
  catch (error) {
    callerData = '__anonymous'
  }
  if (callerData == '()') {
    return '__file'
  }
  else {
    return callerData
  }
}

function _getCallerFile() {
    try {
        var err = new Error();
        var callerfile;
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack }

        currentfile = err.stack.shift().getFileName()

        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName()
            if (currentfile !== callerfile) return callerfile + ' '
        }
    } catch (err) {}
    return 'anonymous';
}

function Logger () {
  console.log('['.italic.grey + getDate('D/M/Y h:m:s').italic.grey + '] '.italic.grey + '[init] '.green + _getCallerFile().cyan + findCaller(this.log).cyan + ' ' + 'initialized new console')
  this.data = function (text) {
    console.log('['.italic.grey + getDate('D/M/Y h:m:s').italic.grey + '] '.italic.grey + '[data] '.blue + _getCallerFile().cyan + findCaller(this.log).cyan + ' ' + text)
  }
  this.log = function (text) {
    console.log('['.italic.grey + getDate('D/M/Y h:m:s').italic.grey + '] '.italic.grey + '[log] '.green + _getCallerFile().cyan + findCaller(this.log).cyan + ' ' + text)
  }
  this.warn = function (text) {
    console.log('['.italic.grey + getDate('D/M/Y h:m:s').italic.grey + '] '.italic.grey + '[warn] '.yellow + _getCallerFile().cyan + findCaller(this.warn).cyan + ' ' + text)
  }
  this.err = function (text) {
    console.log('['.italic.grey + getDate('D/M/Y h:m:s').italic.grey + '] '.italic.grey + '[err] '.red + _getCallerFile().cyan + findCaller(this.err).cyan + ' ' + text)
  }
}

module.exports = Logger
