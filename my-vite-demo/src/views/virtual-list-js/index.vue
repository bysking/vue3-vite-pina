<template>
  <div>
    <div class="virtual-wrap">你好这是瀑布流组件</div>
    <div class="waterfull__item__wrap">
      <div
        class="waterfull__item"
        v-for="(recordItem, index) in records"
        :key="index"
      >
        <img :src="recordItem.url" @load="imageLoad" />
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

    // this.$nextTick(() => {
    //   this.waterFllow = new Watcher({
    //     el: ".waterfull__item__wrap",
    //     column: 5,
    //     gap: 8,
    //     onscroll: () => {
    //       console.log("滚动中");
    //     },
    //     scrollTollow: () => {
    //       console.log("滚动到底部");
    //     },
    //   });
    // });
  },

  methods: {
    initData() {
      this.records = getList(16);
    },
    imageLoad() {
      // this.waterFllow.tap();
      this.waterFllow = new Watcher({
        el: ".waterfull__item__wrap",
        column: 5,
        gap: 8,
        onscroll: () => {
          console.log("滚动中");
        },
        scrollTollow: () => {
          console.log("滚动到底部");
        },
      });
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
  overflow: auto;

  .waterfull__item {
    position: absolute;
    transition: all;

    img {
      width: 100%;
    }
  }
}
</style>
