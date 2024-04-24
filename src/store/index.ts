import { createStore } from './gvuex'

export const store = createStore({
    state() {
        return {
            count: 666
        }
    },
    mutations: {
        add(state) {
            state.count++
        }
    }
})