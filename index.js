var onRoute = require('route-event')
var Routes = require('routes')

function Router (paths, args) {
    var routes = Routes()
    var onMatch

    paths.forEach(function (p) {
        var _args = typeof args === 'function' ? args() : args
        routes.addRoute(p[0], p[1](_args))
    })

    var setRoute = onRoute(function (path) {
        if (!onMatch) return
        var r = routes.match(path)
        var _r = r.fn(r)
        onMatch(_r)
    })

    return {
        go: setRoute,
        addRoute: routes.addRoute.bind(routes),
        onMatch: function (cb) {
            onMatch = cb
        }
    }
}

module.exports = Router

