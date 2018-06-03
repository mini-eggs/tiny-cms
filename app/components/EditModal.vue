<template>
  <v-bottom-sheet v-model="display">
    <v-list>
      <ModalForm :seed="cloned" />
    </v-list>
  </v-bottom-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import ModalForm from "./ModalForm.vue";

export default Vue.extend({
  props: ["item"],

  components: { ModalForm },

  data() {
    // todo - types
    const cloned = {
      id: this.item.id,
      title: this.item.title,
      inputs: this.item.fields.map((data: any) => ({
        name: data.title,
        type: data.type
      }))
    };

    return { display: false, cloned };
  },

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
