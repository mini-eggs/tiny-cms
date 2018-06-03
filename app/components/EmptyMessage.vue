<template>
  <v-jumbotron>
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3 text-xs-center">{{msg}}</h3>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    msg: { type: String }
  }
});
</script>
