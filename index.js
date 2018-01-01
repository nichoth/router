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

    this.setRoute = onRoute(function (path) {
        var r = self._routes.match(path)
        if (!r) throw new Error('Unhandled route, ' + path)
        r.fn(r)
    })

    Bus.call(this)
}
inherits(Router, Bus)

Router.prototype.route = function (path, fn) {
    this._routes.addRoute(path, fn(this))
}

module.exports = Router

