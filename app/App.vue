<template>
  <v-app>
    <Header></Header>
    <SnackBar/>
    <router-view></router-view>
  </v-app>
</template>

<script>
import "vuetify/dist/vuetify.css";
import Header from "./components/Header";
import SnackBar from "./components/SnackBar";

export default {
  components: { Header, SnackBar }
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
