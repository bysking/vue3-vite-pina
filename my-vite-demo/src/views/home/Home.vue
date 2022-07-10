<!--  -->

<template>
  <div>
    <!-- <div>home</div>
    <div>
      {{ doneTodosCount }}
    </div>
    <div @click="updateState()">updateState</div>
    <div @click="jumpInfo()">info</div> -->
    <VirtualList />
  </div>
</template>

<script lang="ts">
import VirtualList from "../virtual-list-js/index.vue";
export default {
  name: "Home",
  components: {
    VirtualList,
  },
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
