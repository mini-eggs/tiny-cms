<template>
  <div class="ListContainer" :class="{ 'with-background': background, 'with-min-height': minHeight }">
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    minHeight: {default:true},
    background: {default:true}
  }
})
</script>


<style scoped>
.ListContainer {
  position: relative;
}

.ListContainer.with-min-height {
  min-height: calc(100vh - 48px);
}

.ListContainer.with-background:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("../static/weave.png");
  background-size: center;
  background-position: top right;
  transform: scale(-1, -1);
  z-index: 0;
}

main {
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 15px 0;
}

ul,
li {
  list-style: none;
}
</style>