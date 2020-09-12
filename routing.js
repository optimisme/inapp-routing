class ObjRouting {

    constructor () {
        this.tagName = 'x-route'
        this.defaultRoute = '/home'
        this.route = undefined
        this.args = []
        this.handler = this.init.bind(this)

        window.addEventListener('load', this.handler)
        window.addEventListener('popstate', (e) => { this.changeTo(e.state.html, true); return false })
        document.addEventListener('click',  (e) => { this.linkEvent(e) });
        document.addEventListener('tap', (e) => { this.linkEvent(e) });
    }

    linkEvent (e) {
        let element = e.target || e.srcElement,
            path = '',
            routes = [],
            cleanPath = ''

        if (element.tagName == 'A') {
          e.preventDefault()
          e.stopPropagation()
          path = element.href.replace(document.location.origin, '')
          if (path.charAt(0) === '/') {
            routes = (Array.from(document.querySelectorAll(this.tagName))).map((e) => { return this.getCleanPath(e.getAttribute('path')); })
            cleanPath = this.getCleanPath(path)
            if (routes.indexOf(cleanPath) !== -1) {
                this.changeTo(path)
            } else {
                location.href = element.href
            }
          } else {
            location.href = element.href
          }
          return false
        }
    }

    getCleanPath (path) {
            let queryPos = path.indexOf('?'),
            hashPos = 0,
            cleanPath = path

        // Get real route
        if (queryPos !== -1) {
            cleanPath = path.substr(0, queryPos)
        }
        hashPos = cleanPath.indexOf('#')
        if (hashPos !== -1) {
            cleanPath = cleanPath.substr(0, hashPos)
        }
        if (cleanPath === '/') {
            cleanPath = this.defaultRoute
        }

        return cleanPath
    }

    // Change to route defined by 'url' (if necessary)
    init () {
        let path = document.URL.replace(document.location.origin, ''),
            cnt = 0,
            routes = document.querySelectorAll(this.tagName)

        window.removeEventListener('load', this.handler)

        this.defaultRoute = routes[0].getAttribute('path')
        this.route = this.defaultRoute
        for (cnt = 0; cnt < routes.length; cnt = cnt + 1) {
            routes[cnt].style.display = 'none'
        }

        this.changeTo(path)
    }

    // Change route
    async changeTo (path, fromNavigation) {
        let cleanPath = path
        
        // Set navigator URL
        if (!fromNavigation) {
            window.history.pushState( { html:  path }, '', path)
        }
    
        // Remove '?' or '#' from path
        cleanPath = this.getCleanPath(path)

        // Show route changes
        await this.showRoute(cleanPath)
    }

    // Hide old route and show the new one
    async showRoute (path) {
        let refRoute = undefined

        // Hide old route
        refRoute = document.querySelector(this.tagName + '[path="' + this.route + '"]')
        if (refRoute.getAttribute('onhide')) {
            await eval(refRoute.getAttribute('onhide'))
        }
        refRoute.style.display = 'none'
        await this.waitNone(refRoute, true)

        // Set scroll
        document.body.scrollTop = 0

        // Set and show new route
        this.route = path
        refRoute = document.querySelector(this.tagName + '[path="' + path + '"]')
        refRoute.style.display = ''
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

            while (!condition) {
                await this.promiseWait(1)
                now = style.getPropertyValue('display')
                condition = type ? now === 'none' : now !== 'none'
            }

            resolve()
        })
    }

    promiseWait (time) {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve() }, time)
        })
    }
}

var routing = new ObjRouting()
a = []