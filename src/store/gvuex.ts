import { inject, App } from 'vue'

const STORE_KEY = '__store__'
class Store {
    _state: Record<string | number | symbol, unknown>
    _mutations: Record<string, (val: Record<string | number | symbol, unknown>) => void>

    constructor(options: {
        state: () => Record<string | number | symbol, unknown>,
        mutations: Record<string, (val: Record<string | number | symbol, unknown>) => void>
    }) {
        this._state = options.state()
        this._mutations = options.mutations
    }

    install(app: App) {
        app.provide(STORE_KEY, this)
    }
}
export const useStore = () => {
    return inject(STORE_KEY)
}
export const createStore = (options: {
    state: () => Record<string | number | symbol, unknown>,
    mutations: Record<string, (val: Record<string | number | symbol, unknown>) => void>
}) => {
    return new Store(options)
}