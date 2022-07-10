<template>
  <div>
    <div class="virtual-wrap">你好这是瀑布流组件</div>
    <div class="waterfull__item__wrap" @scroll="onscroll">
      <div
        class="waterfull__item"
        v-for="(recordItem, index) in records"
        :key="index"
      >
        <template v-if="isInSight(visiableIndexs, index)">
          <div
            class="waterfull__item_left"
            :style="getOffsetTop(recordItem.leftOffset)"
          >
            {{ recordItem.leftOffset }}
            <Card :list="recordItem.leftData" />
          </div>
          <div
            class="waterfull__item_right"
            :style="getOffsetTop(recordItem.rightOffset)"
          >
            {{ recordItem.rightOffset }}
            <Card :list="recordItem.rightData" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isTemplateNode } from "@vue/compiler-core";
import { isInSight, getOffsetTop, getList } from "./tool";
import Card from "./CardWrap.vue";
export default {
  name: "VirtualList",
  components: {
    Card,
  },
  data() {
    return {
      ob: null,
      records: [], // 分屏后的数据集合
      visiableIndexs: [],
    };
  },

  mounted() {
    this.createObserver();
    console.log(getList());
    this.records = getList();
    this.handleListSplit(this.records);
  },

  methods: {
    isInSight,
    getOffsetTop,
    onscroll(e) {
      // console.log(e.target.scrollTop);
    },
    createObserver() {
      console.log("hahahhaha");
      if (this.ob) {
        return;
      }

      this.ob = new IntersectionObserver(function (entries) {
        // 如果不可见，就返回
        if (entries[0].intersectionRatio <= 0) return;

        console.log(entries);
      });

      this.$nextTick(() => {
        let nodeList = document.querySelectorAll(".waterfull__item");
        Array.from(nodeList).forEach((node) => {
          this.ob.observe(document.querySelector(".waterfull__item"));
        });
      });

      // 创建监听
      // waterfull_item
      // visiableIndexs
      this.visiableIndexs = [0, 1, 2, 3, 4, 5];
    },

    handleListSplit(list: any[]) {
      const _list = [...list];
      const allList = [];
      const len = 10; // cpx: todo

      // 数据裁剪分屏
      while (_list.length) {
        let tempList = _list.splice(0, len);
        allList.push({
          data: tempList,
          leftOffset: 0,
          rightOffset: 0,
          leftData: [],
          rightData: [],
        });
      }

      this.handleWaterFlowList(allList);
    },

    getDomHeight() {
      // return 节点真实高度
      return Math.floor(Math.random() * 100) + 80;
    },

    handleRtoP(height) {
      return height;
    },

    handleWaterFlowList(
      allList: { data: any[]; leftData: any[]; rightData: any[] }[]
    ) {
      let defaultHeight = 0; // 默认占位10px;
      let preHeight = [defaultHeight];
      allList.forEach((listItem, index) => {
        const isLast = index + 1 === allList.length;

        if (index === 0) {
          listItem.leftHeight = 0;
          listItem.rightHeight = 0;
        }

        let leftHeight = 0 - listItem.leftOffset || 0;
        let rightHeight = 0 - listItem.rightOffset || 0;

        const leftData: any[] = [];
        const rightData: any[] = [];

        listItem.data.forEach((nodeItem) => {
          nodeItem.domHeight = this.getDomHeight(nodeItem);
          const heights = [...preHeight, nodeItem.domHeight];

          const cardHeight = heights.reduce((res, cur) => {
            return res + this.handleRtoP(cur);
          }, 0);

          if (leftHeight <= rightHeight) {
            leftHeight += cardHeight;
            leftData.push(nodeItem);
          } else {
            rightHeight += cardHeight;
            rightData.push(nodeItem);
          }
        });

        listItem.leftData = leftData;
        listItem.rightData = rightData;

        if (index >= 1) {
          let preItem = allList[index - 1];
          listItem.leftHeight = leftHeight + preItem.leftHeight || 0;
          listItem.rightHeight = rightHeight + preItem.rightHeight || 0;
        }

        if (!isLast) {
          const ofsset = Math.abs(listItem.leftHeight - listItem.rightHeight);
          let newIndex = index + 1;

          if (listItem.leftHeight > listItem.rightHeight) {
            allList[newIndex].rightOffset = ofsset;
            allList[newIndex].leftOffset = 0;
          } else {
            allList[newIndex].rightOffset = 0;
            allList[newIndex].leftOffset = ofsset;
          }
        }
      });

      this.records = allList;
      console.log("分片", allList);
      this.reconnect();
      // cpx:todo 重新计算re
    },

    reconnect() {},
  },

  computed: {},
};
</script>

<style lang="less">
.virtual-wrap {
  border: 1px solid red;
}

.waterfull__item__wrap {
  height: 800px;
  overflow: auto;
  position: absolute;
}

.waterfull__item {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.waterfull__item_left,
.waterfull__item_right {
  position: relative;
  top: 0;
  width: 50%;
}

.waterfull__item_left {
  left: 0;
}

.waterfull__item_right {
  right: 0;
}
</style>
