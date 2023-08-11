<template>
    <div>{{ counter.count }}</div>
    <button @click=countPlus>count++</button>
</template>
<script setup lang="ts">
// import { ref } from "vue";
import { useCounterStore } from "@/store/counter"

const counter = useCounterStore()
const countPlus = () => {
    counter.increment()
}

</script>
<style scoped></style>
