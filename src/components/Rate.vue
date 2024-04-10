<template>
    <div :style="fontstyle">
        <slot></slot>
        <div class='rate' @mouseout="mouseOut">
            <span @mouseover="mouseOver(num)" v-for='num in 5' :key="num">☆</span>
            <span class='hollow' :style="fontwidth">
                <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for='num in 5' :key="num">★</span>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, PropType } from 'vue'

const ThemeObj = { 'black': '#00', 'white': '#fff', 'red': '#f5222d', 'orange': '#fa541c', 'yellow': '#fadb14', 'green': '#73d13d', 'blue': '#40a9ff' } as const

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    theme: {
        type: String as PropType<keyof typeof ThemeObj>,
        default: 'orange'
    }
})
const emits = defineEmits<{
    (e: 'update:modelValue', val: number): void
}>()
const fontstyle = computed(() => { return `color:${ThemeObj[props.theme]};` })
// 评分宽度
const width = ref(props.modelValue)
function mouseOver(i: number) {
    width.value = i
}
function mouseOut() {
    width.value = props.modelValue
}
const fontwidth = computed(() => `width:${width.value}em;`)

const onRate = (val: number) => emits('update:modelValue', val)
</script>

<style scoped>
.rate {
    position: relative;
    display: inline-block;
}

.rate>span.hollow {
    position: absolute;
    display: inline-block;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
}
</style>