<script lang="ts" setup>
import { RiAddBoxFill, RiAddBoxLine, RiHome4Fill, RiHome4Line, RiSettingsFill, RiSettingsLine, RiUser3Fill, RiUser3Line } from '@remixicon/vue';
import { useRoute } from 'vue-router';
import NavigationItem from './NavigationItem.vue';


const route = useRoute()
</script>

<template>
    <div class="lg:block hidden w-screen h-screen">
        <div class="flex flex-col items-center w-48 h-full p-4 gap-4 justify-between fixed left-0 top-0 border-r-2">
            <div class="text-4xl w-full visible font-bold">blur</div>
            <div class="flex flex-col w-full items-start gap-2">
                <NavigationItem path="/">
                    <RiHome4Fill v-if="route.path == '/'" />
                    <RiHome4Line v-else />
                    <div class="text-2xl">
                        Home
                    </div>
                </NavigationItem>
                <NavigationItem path="/add-blurt">
                    <RiAddBoxFill v-if="route.path == '/add-blurt'" />
                    <RiAddBoxLine v-else />
                    <div class="text-2xl">
                        Blurt
                    </div>
                </NavigationItem>
                <NavigationItem path="/profile">
                    <RiUser3Fill v-if="route.path == '/profile'" />
                    <RiUser3Line v-else />
                    <div class="text-2xl">
                        Profile
                    </div>
                </NavigationItem>
                <NavigationItem path="/settings">
                    <RiSettingsFill v-if="route.path == '/profile'" />
                    <RiSettingsLine v-else />
                    <div class="text-2xl">
                        Settings
                    </div>
                </NavigationItem>
            </div>
            <div class="text-xl text-center block">Made by Nilansh Sharma</div>
        </div>
        <slot></slot>
    </div>
</template>