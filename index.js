var Routes = require('routes')
var OnRoute = require('route-event')
var Bus = require('@nichoth/events')
var inherits = require('inherits')
var mxtend = require('xtend/mutable')

function Router (opts) {
    if (!(this instanceof Router)) return new Router(opts)
    var onRoute = OnRoute()
    mxtend(this, opts || {})
    var self = this
    this._routes = Routes()
    this._fns = []

    this.setRoute = onRoute(function onChange (path) {
        console.log('in here', path)
        var r = self._routes.match(path)
        if (!r) throw new Error('Unhandled route, ' + path)
        var val = r.fn(r.params)
        if (val) self._fns.forEach(function (fn) {
            return fn(val)
        })
    })

    Bus.call(this)
}
inherits(Router, Bus)

Router.prototype.onRouteMatch = function (fn) {
    this._fns.push(fn)
}

Router.prototype.route = function (path, fn) {
    this._routes.addRoute(path, typeof fn === 'function' ?
        fn :
        function () { return fn.onMatch.apply(fn, arguments) })
}

module.exports = Router

