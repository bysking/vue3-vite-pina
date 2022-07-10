<template>
  <div>
    <div class="virtual-wrap">你好这是瀑布流组件</div>
    <div class="waterfull__item__wrap">
      <div
        class="waterfull__item"
        v-for="(recordItem, index) in records"
        :key="index + 'cpx'"
        :id="index + 'id_cpx'"
      >
        <img :key="index + 'bysking'" :src="recordItem.url" @load="imageLoad" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Watcher, getList } from "./tool";
import Card from "./CardWrap.vue";
export default {
  name: "VirtualList",
  components: {
    Card,
  },
  data() {
    return {
      records: [],
    };
  },

  mounted() {
    this.initData();

    this.$nextTick(() => {
      this.waterFllow = new Watcher({
        el: ".waterfull__item__wrap",
        column: 2,
        gap: 8,
        onscroll: () => {
          console.log("滚动中");
        },
        scrollTollow: () => {
          console.log("滚动到底部");
          this.records = [...this.records, ...getList(10)];
        },
      });
    });
  },

  methods: {
    initData() {
      this.records = getList(10);
    },
    imageLoad() {
      this.waterFllow.tap();
    },
  },

  computed: {},
};
</script>

<style lang="less">
.waterfull__item__wrap {
  width: 100%;
  height: 800px;
  border: 1px solid green;
  position: relative;
  overflow-y: scroll;

  .waterfull__item {
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.1s;

    img {
      width: 100%;
    }
  }
}
</style>
