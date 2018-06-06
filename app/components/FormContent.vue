<template>
  <center>
    <main>
      <v-form ref="form">
        <v-layout row wrap v-if="!seed">
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

            <template v-if="input.type === 'Content(s)'">
              <v-subheader style="padding: 0;">{{input.title}}*</v-subheader>
              <span v-for="(x, i) in inputs[index]" :key="i">{{x.title}}{{i === inputs[index].length - 1 ? '' : ', '}}</span>
              <ContentPicker v-model="inputs[index]" />
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
import Day from "dayjs";
import ContentPicker from "./ContentPicker.vue";
import { Content } from "../junk";
import { CANT_CREATE_CONTENT_WITHOUT_MODELS } from "../constants";

const formatComplexModels = (i: { title: string }) => {
  return i.title;
};

const filerByTitle = (find: string) => (i: { title: string }) => {
  return find === i.title;
};

const formatDate = (d: string) => {
  return Day(new Date(d)).format("YYYY-MM-DD");
};

const formatConnections = ({ content }: { content: any }) => {
  return Content.format(content);
};

const formatSeedInputs = (val: any) => {
  const date = val.date ? formatDate(val.date) : val.date;
  const content = val.connection.map(formatConnections);
  return val.text_short || val.text_large || date || content;
};

const initial = {
  loading: false,
  title: "",
  model: undefined,
  fullModel: undefined,
  models: [],
  inputs: [],
  rules: [(x: string) => (x !== "" && x !== null) || "Invalid"]
};

export default Vue.extend({
  props: ["seed"],

  components: { ContentPicker },

  data() {
    const next = { ...initial };

    if (this.seed) {
      next.fullModel = this.seed.model;
      next.inputs = this.seed.values.map(formatSeedInputs);
    }

    return next;
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
    if (!this.seed) {
      this.fetchModals();
    }
  },

  methods: {
    async fetchModals() {
      const models = await this.$request({ url: "/api/models" });

      if (models.length < 1) {
        this.$alert(CANT_CREATE_CONTENT_WITHOUT_MODELS);
        this.$emit("closed");
      }

      this.models = models;
      this.inputs = [];
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

      const modelId = (this.fullModel as any).id;
      const fields = (this.fullModel as any).fields;

      const values = this.inputs.map((value, i) => ({
        type: fields[i].type,
        value: !Array.isArray(value) ? value : value.map(({ id }) => id)
      }));

      const method = this.seed ? "PATCH" : "POST";
      const url = "/api/content";

      const body = {
        model_id: modelId,
        values,
        content_id: this.seed ? this.seed.id : null
      };

      this.loading = true;
      const data = await this.$request({ method, body, url });
      this.loading = false;

      Object.assign(this.$data, { ...initial });
      this.$emit("complete");
    }
  }
});
</script>
