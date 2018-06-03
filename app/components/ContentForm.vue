<template>
  <center>
    <main>
      <v-form ref="form">
        <v-layout row wrap>
          <v-flex xs12>
            <v-select v-model="model" :rules="rules" :items="modelTypes" label="Model" required></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="fullModel">
          <v-flex xs12 v-for="(input, index) in fullModel.fields" :key="index">
            <v-text-field v-if="input.type === 'Text Short'" v-model="inputs[index]" :rules="rules" :label="input.title" required />
            <v-text-field v-if="input.type === 'Text Large'" v-model="inputs[index]" :rules="rules" :label="input.title" required :auto-grow="true" :multi-line="true" />
            <template v-if="input.type === 'Date'">
              <v-subheader style="padding: 0;">{{input.title}}*</v-subheader>
              <v-date-picker v-if="input.type === 'Date'" :landscape="true" :rules="rules" v-model="inputs[index]" />
            </template>
          </v-flex>
        </v-layout>
      </v-form>
      <div>
        <v-layout row wrap>
          <v-flex xs6>
            <!-- =D -->
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

const initial = {
  loading: false,
  title: "",
  model: undefined,
  fullModel: undefined,
  models: [],
  inputs: [],
  rules: [(x: string) => (x !== "" && x !== null) || "Invalid"]
};

const formatComplexModels = (i: { title: string }) => i.title;
const filerByTitle = (find: string) => (i: { title: string }) =>
  find === i.title;

export default Vue.extend({
  data() {
    return { ...initial };
  },

  computed: {
    modelTypes(): Array<string> {
      return this.models.map(formatComplexModels);
    }
  },

  watch: {
    model(val) {
      if (val) {
        const fullModel = this.models.filter(filerByTitle(val));
        if (fullModel.length > 0) {
          this.fullModel = fullModel.pop();
        }
      }
    }
  },

  mounted() {
    this.fetchModals();
  },

  methods: {
    async fetchModals() {
      this.models = await this.$request({ url: "/api/models" });
    },

    submitForm() {
      if ((this.$refs.form as any).validate()) {
        this.onComplete();
      }
    },

    async onComplete() {
      if (this.inputs.length < 1 || typeof this.fullModel === "undefined") {
        return;
      }

      // todo ?
      const modelId = (this.fullModel as any).id;
      const fields = (this.fullModel as any).fields;
      const values = this.inputs.map((value, i) => ({
        type: fields[i].type,
        value
      }));

      const method = "POST";
      const body = { model_id: modelId, values };
      const url = "/api/content";

      this.loading = true;
      const data = await this.$request({ method, body, url });
      this.$emit("complete");
      this.loading = false;
      Object.assign(this.$data, { ...initial });
    }
  }
});
</script>
