<!-- 

<template>
  <div>info page {{ msg }}</div>
</template>

// 选项式api
<script lang="ts">
export default {
  components: {},

  setup() {
    let msg = "3333";

    return {
      msg,
    };
  },
};
</script>

<style lang="less" scoped></style> -->

<!-- 纯vue3 -->

<template>
  <div>
    info page {{ msg }}
    <div @click="testClick">click</div>
    <br />
    <div @click="test2">
      {{ rc }}
    </div>
  </div>
</template>

<!-- 组合式api -->
<script setup>
import { ref, reactive } from "vue";
let msg = ref({ a: 1 }); // 普通类型 +
let rc = reactive({ a: 444 }); // 只能对象类型，数组

let testClick = () => {
  msg.value.b = Math.random();
};

let test2 = () => {
  rc.b = 3;
};
</script>

<style lang="less" scoped></style>
