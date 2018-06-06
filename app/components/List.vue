<template>
  <transition name="fade">
    <ul class="List">
      <li v-for="(item, i) in data" :key="i" class="elevation-1">
        <v-layout align-center justify-center>
          <template v-if="checkbox">
            <v-flex class="checkbox-container" xs2 justify-center align-center align-content-center>
              <v-switch v-model="item.selected" />
            </v-flex>
            <v-flex xs10>
              <h1>{{item.title}}</h1>
            </v-flex>
          </template>
          <template v-if="actions">
            <v-flex xs8>
              <h1>{{item.title}}</h1>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="$emit('edit', item)" color="primary">Edit</v-btn>
            </v-flex>
            <v-flex xs2>
              <v-btn @click="$emit('remove', item)" color="error">Remove</v-btn>
            </v-flex>
          </template>
        </v-layout>
      </li>
    </ul>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    data: {},
    checkbox: {default:false},
    actions: {default:true}
  }
});
</script>


<style >
.List li {
  background-color: white;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 15px;
}

.List .checkbox-container .input-group__details {
    display: none;
}
</style>
