var App = require('../')

var app = App({ hello: 'world' })

app.route('/', function root (app) {
    return function onMatch (params) {
        console.log('hello', app.hello)
        console.log('params', params)
    }
})

app.route('/foo', function foo (app) {
    return function onMatch (params) {
        console.log('foo match', params)
    }
})



