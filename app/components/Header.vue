<template>
    <v-tabs class="elevation-1" style="z-index: 10;" v-if="$route.path !== '/' && $route.path !== '/error'">
        <v-tab exact :to="item.to" v-for="(item, index) in $store.state.tabs" :key="index" ripple>
            {{item.text}}
        </v-tab>
    </v-tabs>
</template>

