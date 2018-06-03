<template>
  <v-btn @click="$emit('click')" fab color="primary" class="btn">
    <v-icon>add</v-icon>
  </v-btn>
</template>


<style scoped>
.btn {
  position: fixed;
  bottom: 50px;
  right: 50px;
}
</style>
