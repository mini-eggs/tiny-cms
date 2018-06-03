<template>
  <center>
    <main>
      <EmptyMessage v-if="loading" msg="Loading..." />
      <ul v-else-if="data.length > 0">
        <li v-for="(item, i) in data" :key="i">
          <v-layout align-center justify-center>
            <v-flex xs8>
              <h1>{{item.title}}</h1>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="editItem = item" color="primary">Edit</v-btn>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="removeItem(item)" color="error">Remove</v-btn>
            </v-flex>
          </v-layout>
        </li>
      </ul>
      <EmptyMessage v-else :msg="empty" />
    </main>
    <EditContent @complete="editItem = null" v-if="editItem" :i;tem="editItem" />
    <CreateContent @complete="createNew = false" v-if="createNew" />
    <Fab @click="createNew = true" />
  </center>
</template>

<style scoped>
main {
  max-width: 600px;
  margin: 15 auto;
  text-align: left;
}

ul,
li {
  list-style: none;
}
</style>

<script lang="ts">
import Vue from "vue";
import EditContent from "../components/EditContent.vue";
import CreateContent from "../components/CreateContent.vue";
import EmptyMessage from "../components/EmptyMessage.vue";
import Fab from "../components/Fab.vue";
import { EMPTY_CONTENTS_MESSAGE } from "../constants";
import { Content } from "../junk";

const initial = {
  createNew: false,
  offset: 0,
  limit: 10,
  data: [],
  loading: true,
  empty: EMPTY_CONTENTS_MESSAGE,
  editItem: null
};

export default Vue.extend({
  data: () => ({ ...initial }),

  components: { EditContent, CreateContent, Fab, EmptyMessage },

  mounted() {
    this.fetchContent();
  },

  methods: {
    async fetchContent() {
      this.loading = true;
      const url = `/api/content?offset=${this.offset}&limit=${this.limit}`;
      const data = await this.$request({ url });
      this.data = data.map(Content.format);
      this.loading = false;
    }
  }
});
</script>
