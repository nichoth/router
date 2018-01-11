var Routes = require('routes')
var onRoute = require('route-event')
var Bus = require('nanobus')
var inherits = require('inherits')
var mxtend = require('xtend/mutable')

function Router (opts) {
    if (!(this instanceof Router)) return new Router(opts)
    mxtend(this, opts || {})
    var self = this
    this._routes = Routes()
    this._fns = []

    this.setRoute = onRoute(function (path) {
        var r = self._routes.match(path)
        if (!r) throw new Error('Unhandled route, ' + path)
        var val = r.fn(r.params)
        if (val) self._fns.forEach(fn => fn(val))
    })

    Bus.call(this)
}
inherits(Router, Bus)

Router.prototype.onRouteMatch = function (fn) {
    this._fns.push(fn)
}

Router.prototype.route = function (path, fn) {
    this._routes.addRoute(path, typeof fn === 'function' ?  fn :
        fn.onMatch.bind(fn))
}

module.exports = Router

