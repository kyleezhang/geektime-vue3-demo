import { LinkHTMLAttributes, ref, watch } from 'vue'

export const useFavicon = (newIcon: string) => {
    const favicon = ref(newIcon)
    
    const updateIcon = (newIcon: string) => {
        document.head.querySelectorAll(`link[rel*="icon"]`).forEach(el => (el as LinkHTMLAttributes).href = newIcon)
    }

    watch(favicon, (i) => {
        updateIcon(i)
    })
}