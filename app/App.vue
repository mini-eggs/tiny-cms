<template>
  <v-app>
    <Header></Header>
    <router-view></router-view>
  </v-app>
</template>

<script>
import "vuetify/dist/vuetify.css";
import Header from "./components/Header";

export default {
  components: { Header }
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
}

body .bottom-sheet.dialog {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.picker {
  width: 100%;
}

.picker__body {
  width: auto !important; /* override inline style */
}
</style>
