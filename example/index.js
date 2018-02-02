var App = require('../')
var app = App({ hello: 'world' })
app.on('test', console.log.bind('in here'))

app.onRouteMatch(function (view) {
    // this gets called with the return value from the route function
    console.log('on match --', view)
})

app.route('/', function root (params) {
    console.log('in root --', app.hello, params)
    return 'root view'
})

app.route('/bar', BarRoute(app))

app.route('/foo', FooRoute())

function BarRoute (app) {
    return function (params) {
        app.emit('test', 'aaaa')
        return 'bar view'
    }
}

function FooRoute () {
    if (!(this instanceof FooRoute)) return new FooRoute()
    this.foo = 'woo'
    this.state = 'foo state'
    this.view = 'foo view'
    // console.log('this.name', this.constructor.name)
}

FooRoute.prototype.onMatch = function (params) {
    console.log('foo route', this.foo)
    return 'foo view'
}






