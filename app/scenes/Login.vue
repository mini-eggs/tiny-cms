<template>
  <v-content class="Login">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-1">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="form" action="/api/login" method="post">
                <v-text-field @keyup.enter="submit" label="Username" name="username" type="text" required></v-text-field>
                <v-text-field @keyup.enter="submit" label="Password" name="password" type="password" required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="submit" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <video autoplay muted loop>
        <source src="../static/login-background.mp4" type="video/mp4">
      </video>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    submit() {
      ((this.$refs.form as Vue).$el as HTMLFormElement).submit(); // lol
    }
  }
});
</script>


<style>
.Login video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  z-index: 1;
}

.Login .container {
  padding: 0;
}

.Login .layout {
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>