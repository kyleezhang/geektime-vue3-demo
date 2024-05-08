import { inject, ref, Ref, Component, App } from 'vue'
import RouterLink from './RouterLink.vue';
import RouterView from './RouterView.vue'

const ROUTER_KEY = '__router__'

interface RouterHistory {
    bindEvents: (fn: () => void) => void,
    url: string
}

type Lazy<T> = () => Promise<T>;

export interface RouterRote {
    path: string,
    name: string | symbol
    component: Component | Lazy<Component>,
}

/**
 * Options to initialize a {@link Router} instance.
 */
export interface RouterOptions {
    history: RouterHistory
    routes: RouterRote[]
}

export function createWebHashHistory(): RouterHistory {
    return {
        bindEvents: (fn) => {
            window.addEventListener('hashchange', fn)
        },
        url: window.location.hash.slice(1) || '/'
    }
}

class Router {
    history: RouterHistory
    routes: RouterRote[]
    current: Ref<string>
    constructor(options: RouterOptions) {
        this.history = options.history
        this.routes = options.routes
        this.current = ref(this.history.url)

        this.history.bindEvents(() => {
            this.current.value = window.location.hash.slice(1)
        })
    }

    install(app: App) {
        app.provide(ROUTER_KEY, this)
        app.component("router-link", RouterLink)
        app.component("router-view", RouterView)
    }
}

export function useRouter() {
    return inject<Router>(ROUTER_KEY)
}