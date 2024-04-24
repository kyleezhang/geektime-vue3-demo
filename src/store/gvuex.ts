import { inject, App, reactive, UnwrapNestedRefs, UnwrapRef } from 'vue'

const STORE_KEY = '__store__'
class Store<T extends Record<string | number | symbol, unknown>> {
    _state: UnwrapNestedRefs<{ data: T }>
    _mutations: Record<string, (val: UnwrapRef<T>) => void>

    constructor(options: {
        state: () => T,
        mutations: Record<string, (val: UnwrapRef<T>) => void>
    }) {
        this._state= reactive({
            data: options.state()
        })
        this._mutations = options.mutations
    }

    get state() {
        return this._state.data
    }

    install(app: App) {
        app.provide(STORE_KEY, this)
    }

    commit(name: string) {
        this._mutations[name]?.call(this, this.state)
    }
}
export const useStore = () => {
    return inject<Store<Record<string | number | symbol, unknown>>>(STORE_KEY)
}
export const createStore = <T extends Record<string | number | symbol, unknown>>(options: {
    state: () => T,
    mutations: Record<string, (val: UnwrapRef<T>) => void>
}) => {
    return new Store(options)
}