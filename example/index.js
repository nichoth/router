var App = require('../')
var app = App({
    hello: 'world'
})
app.on('test', console.log.bind(console, 'in here'))

app.onRouteMatch(function (view) {
    // this gets called with the return value from the route function
    // preact.render(view, ...)
    console.log('on match --', view)
})

app.route('/', function root (params) {
    console.log('in root --', app.hello, params)
    return 'root view'
})

app.route('/bar', BarRoute(app))

function BarRoute (app) {
    // need to curry the view with the app bus in here
    return function onBarMatch (params) {
        app.emit('test', 'aaaa')
        return 'bar view'
        // just trigger events in here, don't return the view?
        // that way you decouple logic from the view code
    }
}

function FooRoute (app) {
    if (!(this instanceof FooRoute)) return new FooRoute(app)
    this.app = app
    this.foo = 'woo'
    this.state = 'foo state'
    this._view = 'foo view'
}

FooRoute.prototype.onMatch = function (params) {
    console.log('foo route', this.foo)
    console.log('this.name', this.constructor.name)
    app.emit('test', 'hey foo')
    return this._view
}

FooRoute.prototype.view = function (view) {
    this._view = view
    return this
}

app.route('/foo', FooRoute(app).view('this is the foo view'))
app.route('/button', function () {
    return 'this route was set by the button'
})

document.getElementById('route-setter').addEventListener('click', ev => {
    ev.preventDefault()
    app.setRoute('/button')
})






