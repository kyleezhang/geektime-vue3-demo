<template>
  <a :href="'#' + to">
    <slot></slot>
  </a>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const props = defineProps({
    to: {
        type: String,
        required: true
    }
})
</script>
