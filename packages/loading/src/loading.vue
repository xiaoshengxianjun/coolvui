<template>
    <transition name="cool-loading">
        <div class="cool-loading" v-if="visible">
            <div class="cool-loading-main">

            </div>
        </div>
    </transition>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    };
  }
};
</script>
<style lang="scss" scoped>
.cool-loading {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: transparent;
  &-main {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    font-size: 14px;
    position: absolute;
    font-family: "微软雅黑";
    z-index: 1000;
  }
}
</style>
