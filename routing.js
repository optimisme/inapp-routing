class ObjRouting {

    constructor () {
        this.name = 'route'
        this.defaultRoute = '/home'
        this.route = this.defaultRoute
        this.args = []
        this.handler = this.init.bind(this)

        window.addEventListener('load', () => { this.init() })
        window.addEventListener('popstate', (e) => { this.changeTo(e.state.html, true); return false })
        document.addEventListener('click',  (e) => {
            let element = e.target || e.srcElement
            if (element.tagName == 'A') {
              e.preventDefault()
              e.stopPropagation()
              if (element.href.charAt(0) === '/') {
                this.changeTo(element.href.replace(document.location.origin, ''))
              } else {
                location.href = element.href
              }
              return false
            }
        })
    }

    // Change to route defined by 'url' (if necessary)
    init () {
        let path = document.URL.replace(document.location.origin, ''),
            cnt = 0,
            routes = document.querySelectorAll(this.name)

        window.removeEventListener('load', this.handler)

        this.defaultRoute = '/' + routes[0].getAttribute('id')
        for (cnt = 0; cnt < routes.length; cnt = cnt + 1) {
            routes[cnt].style.display = 'none'
        }

        this.changeTo(path)
    }

    // Change route
    async changeTo (path, fromNavigation) {
        let hashPos = path.indexOf('#'),
            cleanPath = path

        // Set navigator URL
        if (!fromNavigation) {
            window.history.pushState( { html:  path }, '', path)
        }
        
        // Get real route
        if (hashPos !== -1) {
            cleanPath = path.substr(0, hashPos)
        }

        // Get 'home' path if necessary
        if (cleanPath === '/') {
            cleanPath = this.defaultRoute
        }

        // Show route changes
        await this.showRoute(cleanPath)
    }

    // Hide old route and show the new one
    async showRoute (path) {
        let arr = path.split('/'),
            refRoute = undefined,
            position = 2

        // Hide old route
        refRoute = document.querySelector(this.name + '#' + this.route.substr(1))
        if (refRoute.getAttribute('onhide')) {
            await eval(refRoute.getAttribute('onhide'))
        }
        refRoute.style.display = 'none'
        await this.waitNone(refRoute, true)

        // Set scroll
        document.body.scrollTop = 0

        // Set and show new route
        this.route = '/' + arr[position]
        refRoute = document.querySelector(this.name + '#' + this.route.substr(1))
        refRoute.style.display = ''
        this.args = arr.splice(position + 1)
        await this.waitNone(refRoute, false)
        if (refRoute.getAttribute('onshow')) {
            await eval(refRoute.getAttribute('onshow'))
        }
    }

    waitNone (ref, type) {
        return new Promise(async (resolve, reject) => {
            let style = window.getComputedStyle(ref),
                now = style.getPropertyValue('display'),
                condition = type ? now === 'none' : now !== 'none'
            if (condition) {
                resolve()
            } else {
                await this.promiseWait(1)
                await this.waitNone(ref, type)
            }
        })
    } 

    promiseWait (time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve() }, time)
        })
    }
}

var routing = new ObjRouting()

