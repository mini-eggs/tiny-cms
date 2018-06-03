<template>
  <v-bottom-sheet v-model="display">
    <v-list>
      <ContentForm @complete="display = false" />
    </v-list>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import ContentForm from "./ContentForm.vue";

export default Vue.extend({
  props: ["item"],

  components: { ContentForm },

  data: () => ({ display: false }),

  watch: {
    display(val) {
      if (!val) setTimeout(() => this.$emit("complete"), 500);
    }
  },

  mounted() {
    this.display = true;
  }
});
</script>
