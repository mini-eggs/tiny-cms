<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <center class="display-3">
          Create more.
        </center>
        <center class="display-3">
          Build cool shit.
        </center>
      </v-flex>
    </v-layout>
    <video autoplay muted loop>
      <source src="../static/dashboard-background.mp4" type="video/mp4">
    </video>
  </v-container>
</template>

<style scoped>
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  z-index: 1;
}

center {
  position: relative;
  z-index: 2;
  color: white;
  font-weight: 900;
  opacity: 0;
  animation-fill-mode: forwards;
  animation-name: FadeInUp;
  animation-duration: 1000ms;
}

center:first-of-type {
  animation-delay: 1000ms;
}

center:last-of-type {
  animation-delay: 2000ms;
}

@keyframes FadeInUp {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>