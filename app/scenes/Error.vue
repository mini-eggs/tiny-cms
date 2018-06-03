<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <center class="display-1">{{error}}</center>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from "vue";
import Cookie from "js-cookie";

const def = "Wow, we really messed up. We don't even have an error message.";

export default Vue.extend({
  data: () => ({ error: Cookie.get("error") || def })
});
</script>

<style scoped>
h1 {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  text-align: center;
}
</style>