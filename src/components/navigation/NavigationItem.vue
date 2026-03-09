<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router';

const props = defineProps({
    path: String
})

const route = useRoute()

</script>

<template>
    <RouterLink :to="props.path!" class="lg:w-full flex flex-col lg:flex-row items-center lg:gap-2 p-2 cursor-pointer"
        :class="{ 'font-bold': route.path == props.path! }">
        <slot></slot>
    </RouterLink>
</template>