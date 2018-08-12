<template>
    <div class="cool-toast-box" v-show="isShowToast">
        <div class="cool-toast-content">
            {{toastMsg}}
        </div>
    </div>
</template>
<script>
export default {
  name: "cool-toast",
  data() {
    return {};
  },
  props: {
    toastMsg: {
      default: "",
      type: String
    },
    isShowToast: {
      default: false,
      type: Boolean
    }
  },
  methods: {},
  mounted() {
    if (this.isShowToast) {
      setTimeout(() => {
        this.isSHowToast = false;
      }, 2000);
    }
  }
};
</script>
<style lang="scss" scoped>
.cool-toast-box {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: transparent;
  .cool-toast-content {
    max-width: 80%;
    border-radius: 5px;
    padding: 10px 20px;
    background: rgba($color: #333, $alpha: 0.6);
    color: #fff;
    font-size: 14px;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
}
</style>

