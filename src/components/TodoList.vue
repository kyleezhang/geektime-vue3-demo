<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <TransitionGroup name="flip-list" tag="ul">
        <li v-for="(todo, i) in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }"> {{ todo.title }}</span>
          <span class="remove-btn" @click="removeTodo($event, i)">❌</span>
        </li>
      </TransitionGroup>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }} </span>
    </div>
  </div>
  <div class="animate-wrap">
    <Transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="animate" v-show="animate.show">
            📋
        </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watchEffect } from "vue";
import { useStorage } from '@/hooks/storage'

let title = ref("");
let todos = useStorage<Array<{ done: boolean, title: string }>>('todos', [])

watchEffect(() => localStorage.setItem('todos', JSON.stringify(todos.value)))

function addTodo() {
  todos.value.push({
    title: title.value,
    done: false,
  });
  title.value = "";
}

function removeTodo(_el: MouseEvent, i: number) {
  animate.el = _el.target as Element
  animate.show = true
  todos.value.splice(i, 1)
}

function clear() {
  todos.value = todos.value.filter((v) => !v.done);
}
let active = computed(() => {
  return todos.value.filter((v) => !v.done).length; 
});
let all = computed(() => todos.value.length);

let allDone = computed({
  get: function () {
    return active.value === 0;
  },
  set: function (value) {
    todos.value.forEach((todo) => {
      todo.done = value;
    });
  }
});

const animate = reactive<{ show: boolean, el: Element | null }>({ show: false, el: null })

function beforeEnter(el: Element) {
  const dom = animate.el
  const rect = dom?.getBoundingClientRect()
  const x = window.innerWidth - (rect?.left ?? 0) - 60
  const y = (rect?.top || 0) - 10;
  (el as HTMLDivElement).style.transform = `translate(-${x}px, ${y}px)`
}

function enter(el: Element, done: () => void) {
  document.body.offsetHeight;
  (el as HTMLDivElement).style.transform = `translate(0, 0)`
  el.addEventListener('transitionend', done)
}

function afterEnter(el: Element) {
  animate.show = false;
  (el as HTMLDivElement).style.display = 'none'
}
</script>
<style>
.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}
.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.animate-wrap .animate {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 1s linear;
}
</style>
