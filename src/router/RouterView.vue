<template>
  <component :is="comp"></component>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useRouter } from './grouter'

const router = useRouter()

const comp = computed(() => {
    const route = router?.routes?.find(r => r.path === router?.current?.value)
    return route?.component
})
</script>