<template>
  <v-snackbar :timeout="timeout" :bottom="true" :multi-line="true" v-model="display">
    {{ msg }}
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import Debounce from "lodash/debounce";

export default Vue.extend({
  data: () => ({ display: false, msg: "", timeout: 5 * 1000 }),

  mounted() {
    this.$bus.$on("alert", Debounce(this.handleAlert), 250);
  },

  methods: {
    handleAlert(msg: string) {
      this.msg = msg;
      this.display = true;
    }
  }
});
</script>
