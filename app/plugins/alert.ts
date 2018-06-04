export default Vue => {
  Vue.prototype.$alert = function (msg) {
    this.$bus.$emit("alert", msg)
  };
};
