<script lang="ts" setup>
import MainNavigationBar from './navigation/MainNavigationBar.vue';
import MainNavigationRail from './navigation/MainNavigationRail.vue';

</script>

<template>
    <MainNavigationRail>
        <slot></slot>
    </MainNavigationRail>
    <MainNavigationBar>
        <slot></slot>
    </MainNavigationBar>
</template>