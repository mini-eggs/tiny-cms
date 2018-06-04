<template>
  <div class="ListContainer">
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.ListContainer {
  min-height: calc(100vh - 48px);
  position: relative;
}

.ListContainer:before {
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