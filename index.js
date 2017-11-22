var onRoute = require('route-event')
var Routes = require('routes')

function Router (paths, args, onMatch) {
    var routes = Routes()

    paths.forEach(function (p) {
        var _args = typeof args === 'function' ? args() : args
        routes.addRoute(p[0], p[1](_args))
    })

    onRoute(function (path) {
        var r = routes.match(path)
        var _r = r.fn(r)
        onMatch(_r)
    })

    return routes
}

module.exports = Router

