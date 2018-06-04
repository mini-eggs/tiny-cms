<template>
  <center>
    <ListContainer>
      <center v-if="loading" class="elevation-0">
        <v-btn class="elevation-0" flat :loading="true" />
      </center>
      <List v-else-if="data.length > 0" :data="data" @edit="item => editItem = item" @remove="item => removeItem(item)" />
      <EmptyMessage v-else :msg="empty" />
    </ListContainer>
    <!-- edit -->
    <ActionSheetForm v-if="editItem" :form="form" :item="editItem" @complete="handleEdit" @closed="editItem = null" />
    <!-- create -->
    <ActionSheetForm v-if="createNew" :form="form" @complete="handleCreated" @closed="createNew = false" />
    <Fab @click="createNew = true" />
  </center>
</template>

<script lang="ts">
import Vue from "vue";
import List from "../components/List.vue";
import ListContainer from "../components/ListContainer.vue";
import ActionSheetForm from "../components/ActionSheetForm.vue";
import FormModel from "../components/FormModel.vue";
import Fab from "../components/Fab.vue";
import EmptyMessage from "../components/EmptyMessage.vue";
import { EMPTY_MODELS_MESSAGE } from "../constants";
import { Model } from "../junk";

const initial = {
  createNew: false,
  offset: 0,
  limit: 10,
  loading: true,
  data: [],
  editItem: null,
  empty: EMPTY_MODELS_MESSAGE,
  form: FormModel
};

export default Vue.extend({
  data: () => ({ ...initial }),

  components: {
    List,
    ListContainer,
    ActionSheetForm,
    Fab,
    EmptyMessage
  },

  mounted() {
    this.fetchModels();
  },

  methods: {
    handleCreated() {
      this.createNew = false;
      this.fetchModels();
    },

    handleEdit() {
      this.editItem = null;
      this.fetchModels();
    },

    async fetchModels() {
      this.loading = true;

      const url = `/api/models?offset=${this.offset}&limit=${this.limit}`;
      const data = await this.$request({ url, method: "GET" });
      this.data = data.map(Model.format);

      this.loading = false;
    },

    async removeItem(item: { id: number }) {
      this.loading = true;

      const url = "/api/models";
      const body = { id: item.id };
      const method = "DELETE";
      await this.$request({ url, body, method });

      this.fetchModels();
    }
  }
});
</script>
