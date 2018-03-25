var url = require('url')
var qs = require('query-string')
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

    this.stop = onRoute(function onChange (href) {
        var _href = url.parse(href)
        var r = self._routes.match(_href.pathname)
        if (!r) throw new Error('Unhandled route, ' + _href.pathname)
        var val = r.fn({
            params: r.params,
            pathname: r.pathname,
            query: qs.parse(_href.query)
        })
        if (val) self._fns.forEach(function (fn) {
            fn(val)
        })
    })

    this.bus = this
    this.setRoute = onRoute.setRoute

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
    return this

    // @TODO
    // return new Route(fn)
}

module.exports = Router

