var Router = require('../')
var Bus = require('events').EventEmitter
var bus = new Bus()

Router([
    ['/', function Root (bus) {
        return function onRoot (params) {
            console.log('params', params)
            return 'hello root'
        }
    }],
    ['/foo', function Foo (bus) {
        return function onFoo (params) {
            console.log('foo params', params)
            return 'hello foo'
        }
    }]
], bus, function onMatch (view) {
    console.log('match', view)
})

