<!--  -->

<template>
  <div>
    <div v-for="(recordItem, index) in list" :key="index">
      <div class="card-item" :style="`height: ${recordItem.domHeight}px`">
        {{ recordItem }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardWrap",
  components: {},
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },

  watch: {},

  computed: {},

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.card-item {
  background: #eee;
  border: 1px solid red;
}
</style>
