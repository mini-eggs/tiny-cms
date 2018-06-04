<template>
  <center>
    <ListContainer>
      <center v-if="loading" class="elevation-0">
        <v-btn class="elevation-0" flat :loading="true" />
      </center>
      <List v-else-if="data.length > 0" :data="data" @edit="item => editItem = item" @remove="item => removeItem(item)" />
      <EmptyMessage v-else :msg="empty" />
    </ListContainer>
    <Edit v-if="editItem" :form="form" :item="editItem" @complete="handleEdit" @closed="editItem = null" />
    <Create v-if="createNew" :form="form" @complete="handleCreated" @closed="createNew = false" />
    <Fab @click="createNew = true" />
  </center>
</template>

<script lang="ts">
import Vue from "vue";
import List from "../components/List.vue";
import ListContainer from "../components/ListContainer.vue";
import Edit from "../components/Edit.vue";
import Create from "../components/Create.vue";
import FormContent from "../components/FormContent.vue";
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
  editItem: null,
  form: FormContent
};

export default Vue.extend({
  data: () => ({ ...initial }),

  components: {
    List,
    ListContainer,
    Edit,
    Create,
    Fab,
    EmptyMessage
  },

  mounted() {
    this.fetchContents();
  },

  methods: {
    handleEdit() {
      this.editItem = null;
      this.fetchContents();
    },

    handleCreated() {
      this.createNew = false;
      this.fetchContents();
    },

    async fetchContents() {
      this.loading = true;
      const url = `/api/content?offset=${this.offset}&limit=${this.limit}`;
      const data = await this.$request({ url });
      this.data = data.map(Content.format);
      this.loading = false;
    },

    async removeItem({ id }: { id: number }) {
      this.loading = true;

      await this.$request({
        url: "/api/content",
        body: { id },
        method: "DELETE"
      });

      this.fetchContents();
    }
  }
});
</script>