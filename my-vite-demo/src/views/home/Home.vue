<!--  -->

<template>
  <div>
    <div>home</div>
    <div>
      {{ doneTodosCount }}
    </div>
    <div @click="updateState()">updateState</div>
    <div @click="jumpInfo()">info</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },

  watch: {},

  computed: {
    doneTodosCount() {
      return this.$store.state;
    },
  },

  mounted() {},

  methods: {
    jumpInfo() {
      this.$router.push({
        path: "/info",
      });
    },
    updateState() {
      this.$store.dispatch("actionUpdateCount", 5);
    },
  },
};
</script>

<style lang="less" scoped></style>
