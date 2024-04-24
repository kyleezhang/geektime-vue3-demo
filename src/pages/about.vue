<template>
    <h1>这是关于页面</h1>
    <Rate v-model="score">评分</Rate>
    <Rate :model-value="4" theme="red"></Rate>
    <Rate :model-value="1" theme="green"></Rate>

    <Count />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Rate from '@/components/Rate.vue'
import Count from '@/components/Count.vue'

const score = ref(3.5)
</script>