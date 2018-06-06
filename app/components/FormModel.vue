<template>
  <center>
    <main>
      <v-form ref="form">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field v-model="title" :rules="rules" label="Model Name" required></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-for="(set, index) in inputs" :key="index">
          <v-flex xs5>
            <v-text-field v-model="set.title" :rules="rules" label="Field Name" required></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-select v-model="set.type" :rules="rules" :items="fieldTypes" label="Field Type" required></v-select>
          </v-flex>
          <v-flex xs2>
            <center>
              <v-btn @click="removeItem(index)" color="error">Remove</v-btn>
            </center>
          </v-flex>
        </v-layout>
      </v-form>

      <div>
        <v-layout row wrap>
          <v-flex xs6>
            <v-btn @click="addField" color="primary">Add Field</v-btn>
          </v-flex>
          <v-flex xs6 style="text-align: right;">
            <v-btn @click="submitForm" color="primary">Complete</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </main>
  </center>
</template>

<style scoped>
main {
  max-width: 600px;
  margin: 15 auto;
  text-align: left;
}
</style>


<script lang="ts">
import Vue from "vue";

const inputSeed = () => ({ title: "", type: "" });

const initial = {
  title: "",
  rules: [(x: string) => x !== "" || "Invalid"],
  inputs: [inputSeed(), inputSeed(), inputSeed(), inputSeed()],
  fieldTypes: ["Text Short", "Text Large", "Date", "Content(s)"],
  name,
  loading: false
};

export default Vue.extend({
  props: ["seed"],

  data() {
    return {
      ...initial,
      ...(this.seed || {})
    };
  },

  mounted() {
    if (!this.seed) {
      // bugs - todo
      this.inputs = [inputSeed(), inputSeed(), inputSeed(), inputSeed()];
    }
  },

  methods: {
    addField() {
      this.inputs = [...this.inputs, inputSeed()];
    },

    submitForm() {
      if ((this.$refs.form as any).validate()) {
        this.onComplete();
      }
    },

    async onComplete() {
      if (this.inputs.length < 1) {
        return;
      }

      const url = "/api/models";
      const method = this.seed ? "PATCH" : "POST";

      const body = {
        ...(this.seed || {}),
        inputs: this.inputs,
        title: this.title
      };

      this.loading = true;
      await this.$request({ url, method, body });
      this.loading = false;

      Object.assign(this.$data, { ...initial });
      this.$emit("complete");
    },

    removeItem(index: number) {
      this.inputs = this.inputs.filter((x: any, i: number) => i !== index);
    }
  }
});
</script>