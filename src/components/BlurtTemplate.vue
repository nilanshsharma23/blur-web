<template>
  <div class="p-4 bg-container border flex flex-col gap-2">
    <div class="text-lg text-translucent flex flex-row items-center gap-2">
      <div>Nilansh Sharma</div>
      <div>•</div>
      <div>@pyscrap</div>
    </div>
    <div class="text-lg text-translucent">
      {{ Date.now() }}
    </div>
    <div class="text-lg">
      <slot></slot>
    </div>
  </div>
</template>
