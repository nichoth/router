var Router = require('../')
var opts = 'opts'

var router = Router([
    ['/', function Root (opts) {
        return function onRoot (params) {
            console.log('params', params)
            return 'hello root'
        }
    }],

    ['/foo', function Foo (opts) {
        return function onFoo (params) {
            console.log('foo params', params)
            return 'hello foo'
        }
    }],

    ['/bar', function Bar () {
        return function onBar () {
            return 'hello bar'
        }
    }]
], opts)  // opts gets passed to each route at instantiation


router.onMatch(function (view) {
    console.log('match', view)
})

var btn = document.createElement('button')
btn.innerHTML = 'go to /bar'
document.body.appendChild(btn)

// set the route programatically
btn.addEventListener('click', ev => router.go('/bar'))


