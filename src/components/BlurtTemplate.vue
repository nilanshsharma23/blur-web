<script lang="ts" setup>
import { Timestamp } from "firebase/firestore";

const props = defineProps({
  name: String,
  handle: String,
  time: Timestamp,
  anonymous: Boolean,
});
</script>

<template>
  <div class="p-4 bg-container border flex flex-col w-full gap-2">
    <div v-if="anonymous" class="text-lg text-translucent">anonymous</div>
    <div
      v-else
      class="text-lg text-translucent flex flex-row items-center gap-2"
    >
      <div>{{ name }}</div>
      <div>•</div>
      <div>@{{ handle }}</div>
    </div>
    <div class="text-lg text-translucent">
      {{ time?.toDate().toLocaleDateString() }}
      {{ time?.toDate().getHours() }}:{{ time?.toDate().getMinutes() }}
    </div>
    <div class="text-lg">
      <slot></slot>
    </div>
  </div>
</template>
