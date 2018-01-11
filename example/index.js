var App = require('../')

var app = App({ hello: 'world' })

app.onRouteMatch(function (view) {
    console.log('here', view)
})

app.route('/', function root (params) {
    console.log('hello', app.hello)
    console.log('params', params)
    return 'woo root view'
})

function FooRoute () {
    this.foo = 'woo'
    this.state = 'blar'
    this.view = 'ham crown'
    console.log('this.name', this.constructor.name)
}

FooRoute.prototype.onMatch = function (params) {
    console.log('foo route', this.foo)
    return 'barrrr foo view'
}

app.route('/foo', new FooRoute())





