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
    <EditModal @complete="editItem = null" v-if="editItem" :item="editItem" />
    <CreateModal @complete="handleCreated" v-if="createNew" />
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
import EditModal from "../components/EditModal.vue";
import CreateModal from "../components/CreateModal.vue";
import Fab from "../components/Fab.vue";
import EmptyMessage from "../components/EmptyMessage.vue";
import { EMPTY_MODELS_MESSAGE } from "../constants";

const initial = {
  createNew: false,
  offset: 0,
  limit: 10,
  loading: true,
  data: [],
  editItem: null,
  empty: EMPTY_MODELS_MESSAGE
};

export default Vue.extend({
  data: () => ({ ...initial }),

  components: { EditModal, CreateModal, Fab, EmptyMessage },

  mounted() {
    this.fetchModels();
  },

  methods: {
    handleCreated() {
      this.createNew = false;
      this.fetchModels();
    },

    async fetchModels() {
      this.loading = true;
      const url = `/api/models?offset=${this.offset}&limit=${this.limit}`;
      this.data = await this.$request({ url, method: "GET" });
      this.loading = false;
    },

    async removeItem(item: { id: number }) {
      try {
        const url = "/api/models";
        const body = { id: item.id };
        const method = "DELETE";
        await this.$request({ url, body, method });
        alert("Deleted!");
      } catch (e) {
        alert(e.toString());
      }

      this.fetchModels();
    }
  }
});
</script>
