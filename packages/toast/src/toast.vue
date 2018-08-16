<template>
  <transition name="cool-toast">
    <div class="cool-toast-box" v-show="visible">
      <div class="cool-toast-content" :class="customClass">
        {{message}}
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "cool-toast",
  data() {
    return {
      visible: false
    };
  },
  props: {
    message: {
      default: "",
      type: String
    },
    position: {
      default: "middle",
      type: String
    },
    type: {
      default: "default",
      type: String
    }
  },
  computed: {
    customClass() {
      var classes = [];

      switch (this.position) {
        case "top":
          classes.push("place-top ");
          break;
        case "bottom":
          classes.push("place-bottom ");
          break;
        default:
          classes.push("place-middle ");
      }
      switch (this.type) {
        case "success":
          classes.push("type-success ");
          break;
        case "warning":
          classes.push("type-warning ");
          break;
        case "error":
          classes.push("type-error ");
          break;
        default:
          classes.push("type-default ");
      }

      return classes.join("");
    }
  },
  methods: {},
  mounted() {}
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
    padding: 8px 16px;

    font-size: 14px;
    position: absolute;
    z-index: 1000;
  }
  .place-top {
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .place-middle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .place-bottom {
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .type-default {
    background: rgba($color: #000, $alpha: 0.6);
    color: #fff;
  }
  .type-success {
    background: rgba($color: #caf7b4, $alpha: 0.8);
    color: #67c23a;
  }
  .type-warning {
    background: rgba($color: #fadaad, $alpha: 0.8);
    color: #cf9338;
  }
  .type-error {
    background: rgba($color: #faa5a5, $alpha: 0.8);
    color: #e72525;
  }
}
.cool-toast-enter-active {
  animation: bounce-in 0.3s;
}
.cool-toast-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>


