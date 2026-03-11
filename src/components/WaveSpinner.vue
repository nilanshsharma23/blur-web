<script lang="ts" setup>
</script>

<template>
  <div class="wave">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped>
.wave {
  width:  60px;
  height: 40px;
  text-align: center;
  font-size: 10px;
}

.wave > div {
  background-color: black;
  height: 100%;
  width: 6px;
  margin: 0 3px 0 0;
  display: inline-block;

  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
  animation: stretchdelay 1.2s infinite ease-in-out;
}

.wave > div:nth-child(2) {
  -webkit-animation-delay: -1.1s;
  animation-delay: -1.1s;
}

.wave > div:nth-child(3) {
  -webkit-animation-delay: -1s;
  animation-delay: -1s;
}

.wave > div:nth-child(4) {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

.wave > div:nth-child(5) {
  -webkit-animation-delay: -0.8s;
  animation-delay: -0.8;
}

@-webkit-keyframes stretchdelay {
  0%,
  40%,
  100% {
    -webkit-transform: scaleY(0.4);
  }
  20% {
    -webkit-transform: scaleY(1);
  }
}

@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
    -webkit-transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
    -webkit-transform: scaleX(1);
  }
}
</style>
