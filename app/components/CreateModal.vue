<template>
  <v-bottom-sheet v-model="display">
    <v-list>
      <ModalForm @complete="display = false" />
    </v-list>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import ModalForm from "./ModalForm.vue";

export default Vue.extend({
  props: ["item"],

  components: { ModalForm },

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
