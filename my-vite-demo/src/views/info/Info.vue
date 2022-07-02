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
    <div @click="testToRef">测试toRefs: {{ toRefObj }}</div>
    <div>
      测试state:
      {{ rr }}
    </div>
  </div>
</template>

<!-- 组合式api -->
<script setup>
import {
  ref,
  reactive,
  toRefs,
  computed,
  watch,
  watchEffect,
  onBeforeMount,
  onMounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
let msg = ref({ a: 1 }); // 普通类型 +
let rc = reactive({ a: 444 }); // 只能对象类型，数组

let testClick = () => {
  msg.value.b = Math.random();
};

let test2 = () => {
  rc.b = 3;
};

let toRefObj = reactive({ a: 1, b: 2 });

const { a, b } = toRefs(toRefObj);

let testToRef = () => {
  a.value = 3;
};

let testComputed = computed(() => {
  return 111;
});

let testComputed2 = computed({
  get() {},
  set() {},
});

// 监听多个值
watch([a, b], (newVal, oldVal) => {}, { immediate: true, deep: true });
// 监听单个值
watch(
  () => toRefObj.a,
  () => {}
);

// 执行首次，然后内部依赖的响应式变量变化会自动执行
watchEffect(() => {
  let aa = msg.value.b;
  console.log("111");
});

let routers = useRouter();
watch(
  () => routers.currentRoute,
  () => {
    console.log("路由变化");
  },
  {
    immediate: true,
  }
);

onBeforeMount(() => {
  // 获取接口
  console.log("即将挂载");
});

onMounted(() => {
  // 获取dom

  console.log("获取dom");
});

const store = useStore();
let rr = computed(() => {
  return store.state;
});
</script>

<style lang="less" scoped></style>
