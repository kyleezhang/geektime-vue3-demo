<template>
    <h1>这是首页</h1>
    <TodoList />

    <button @click="toggle">点击</button>
    <Transition name="fade">
        <h1 v-if="showTitle">Hello Vue3</h1>
    </Transition>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import TodoList from '../components/TodoList.vue'

const showTitle = ref(true)
const toggle = () => {
    showTitle.value = !showTitle.value
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s linear;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>