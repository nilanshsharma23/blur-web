<script lang="ts" setup>
import {
  RiAddBoxFill,
  RiAddBoxLine,
  RiCircleFill,
  RiCircleLine,
  RiHome4Fill,
  RiHome4Line,
  RiSettingsFill,
  RiSettingsLine,
  RiUser3Fill,
  RiUser3Line,
} from "@remixicon/vue";
import NavigationItem from "./NavigationItem.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="w-screen h-screen block lg:hidden">
    <slot></slot>
    <div
      class="bottom-0 left-0 w-full fixed flex flex-row items-center justify-around bg-background border-t-2"
    >
      <NavigationItem path="/">
        <RiHome4Fill v-if="route.path == '/'" />
        <RiHome4Line v-else />
        <div class="text-md">Home</div>
      </NavigationItem>
      <NavigationItem path="/add-blurt">
        <RiAddBoxFill v-if="route.path == '/add-blurt'" />
        <RiAddBoxLine v-else />
        <div class="text-md">Blurt</div>
      </NavigationItem>
      <NavigationItem path="/my-circles">
        <RiCircleFill v-if="route.path == '/my-circles'" />
        <RiCircleLine v-else />
        <div class="text-md">My Circles</div>
      </NavigationItem>
      <NavigationItem path="/profile">
        <RiUser3Fill v-if="route.path == '/profile'" />
        <RiUser3Line v-else />
        <div class="text-md">Profile</div>
      </NavigationItem>
      <NavigationItem path="/settings">
        <RiSettingsFill v-if="route.path == '/settings'" />
        <RiSettingsLine v-else />
        <div class="text-md">Settings</div>
      </NavigationItem>
    </div>
  </div>
</template>
