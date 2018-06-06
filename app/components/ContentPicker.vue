<template>
  <div>
    <v-dialog v-model="open" width="600px">
      <v-btn slot="activator" color="primary">Search Content</v-btn>
      <v-card>
        <main>
          <ListContainer :minHeight="false" :background="false">
            <v-text-field v-model="term" :rules="rules" label="Content Name" />
            <center v-if="loading && term !== ''" class="elevation-0">
              <v-btn class="elevation-0" flat :loading="true" />
            </center>
            <List v-else :data="data" :checkbox="true" :actions="false" />
          </ListContainer>
        </main>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import List from "./List";
import ListContainer from "../components/ListContainer.vue";
import {Content} from "../junk"

const initial = {
  open: false,
  term: "",
  abort: () => {},
  data: [],
  loading: false,
  rules: [() => true]
};

export default Vue.extend({
  components: { List, ListContainer },

  props: ["value"],

  data: () => ({ ...initial }),

  watch: {
    term(val) {
      this.abort();
      this.search(val);
    },
    data: {
      handler(val){
        const next = val.filter(item => item.selected === true)
        this.$emit('input', next);
      },
      deep: true
    }
  },

  methods: {

    toggleModal() {
      this.open = !this.open;
    },

    search(val: string) {
      this.loading = true;
      this.data = [];

      const req = new XMLHttpRequest();
      req.open("GET", `/api/content/search?term=${encodeURIComponent(val)}`, true);

      this.abort = () => {
        req.abort();
      };

      req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
          this.searchComplete(req);
        }
      };

      req.send();
    },

    searchComplete(res: any) {
      this.data = JSON.parse(res.response).map(Content.format)
      this.loading = false;
    }
  }
});
</script>

<style scoped>
main {
  padding: 15px;
}
</style>
