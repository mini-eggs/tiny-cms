<template>
  <v-bottom-sheet v-model="display">
    <v-list>
      <component :is="form" @complete="handleComplete" :seed="item" />
    </v-list>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: ["item", "form"],

  data: () => ({ display: false }),

  watch: {
    display(val) {
      if (!val) setTimeout(() => this.$emit("closed"), 500);
    }
  },

  mounted() {
    this.display = true;
  },

  methods: {
    handleComplete() {
      this.display = false;
      setTimeout(() => this.$emit("complete"), 500);
    }
  }
});
</script>
