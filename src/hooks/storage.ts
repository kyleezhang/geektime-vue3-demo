import { ref, watchEffect } from 'vue'

export const useStorage = <T>(name: string, value: T) => {
    const data = ref<T>(JSON.parse(localStorage.getItem(name) || JSON.stringify(value)) || value)

    watchEffect(() => localStorage.setItem(name, JSON.stringify(data.value)))

    return data
}