import Vue from "vue"

const bus = new Vue()

export default Vue => {
  Vue.mixin({
    computed: {
      $bus() {
        return bus
      }
    }
  })
};
