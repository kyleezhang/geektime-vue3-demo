<!--  -->
<template>
  <div @click="add">{{ count }}</div>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from '@/store/gvuex'

const store = useStore()
const count = computed(() => store?.state?.count)

const add = () => {
    store?.commit('add')
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>