<script lang="ts" setup>

import { RiAddBoxFill, RiAddBoxLine, RiHome4Fill, RiHome4Line, RiUser3Fill, RiUser3Line } from '@remixicon/vue';
import NavigationItem from './NavigationItem.vue';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
    <div class="w-screen h-screen block lg:hidden">
        <slot></slot>
        <div class="bottom-0 left-0 w-full fixed flex flex-col">
            <div class="w-full h-0.5 bg-black"></div>
            <div class="w-full  h-24 flex flex-row  justify-around items-center bg-background">
                <NavigationItem path="/">
                    <RiHome4Fill v-if="route.path == '/'" />
                    <RiHome4Line v-else />
                    <div class="text-md">
                        Home
                    </div>
                </NavigationItem>
                <NavigationItem path="/add-blurt">
                    <RiAddBoxFill v-if="route.path == '/add-blurt'" />
                    <RiAddBoxLine v-else />
                    <div class="text-md">
                        Blurt
                    </div>
                </NavigationItem>
                <NavigationItem path="/profile">
                    <RiUser3Fill v-if="route.path == '/profile'" />
                    <RiUser3Line v-else />
                    <div class="text-md">
                        Profile
                    </div>
                </NavigationItem>
            </div>
        </div>
    </div>
</template>