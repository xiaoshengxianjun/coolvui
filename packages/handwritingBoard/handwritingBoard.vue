<template>
  <div class="handwriting-board" :class="direction">
    <div class="handle-box">
      <div class="color-box" v-if="showColor">
        <div v-for="(item, index) in colors" :key="index" class="color-item" :class="{active:item.active}" :style="{background:item.color}" @click="clickColorItem(item)"></div>
      </div>
      <button @click="clickReset">重写</button>
      <button v-if="!filePath" @click="clickFinish">完成</button>
      <button v-if="mode === 'two'" @click="clickOrientation">{{direction === 'horizontal' ? '返回' : '横版'}}</button>
    </div>
    <div class="board-box">
      <img v-if="filePath" :src="filePath">
      <canvas v-else ref="boardCanvas" :width="canvasWidth" :height="canvasHeight" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"></canvas>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      direction: "", // 画板方向 vertical horizontal
      colors: [
        { color: "black", active: true },
        { color: "red", active: false },
        { color: "blue", active: false }
      ], // 可选颜色
      ctx: "", // canvas对象
      canvasWidth: "", // canvas宽度
      canvasHeight: "", // canvas高度
      lineColor: "black", // 线条的颜色
      lineWidth: 3, // 线条宽度
      filePath: "" // 生成的图片地址
    };
  },
  props: {
    showColor: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: "two" // 三种模式 缩小版mini,全屏版full,两种模式都有two
    }
  },
  mounted() {
    // 如果mode为全屏模式，设置direction为horizontal
    if (this.mode === "full") {
      this.direction = "horizontal";
    }
    this.initCanvas();
  },
  methods: {
    /**
     * 初始化画板，获取canvas节点对象，设置画板的宽高
     * 不能在此方法中设置线条宽度样式，否则无效
     */
    initCanvas() {
      // 获取到当前canvas节点的信息，包含宽，高，top，left等
      var boardCanvas = this.$refs.boardCanvas; // 获取canvas元素
      this.canvasWidth = boardCanvas.offsetWidth; // 设置画板宽度
      this.canvasHeight = boardCanvas.offsetHeight; // 设置画板高度

      // canvas基础设置，线条设置
      this.ctx = boardCanvas.getContext("2d");
      this.ctx.beginPath();
    },
    /**
     * 绘制笔触
     */
    handleDraw(targetX, targetY) {
      this.ctx.lineTo(targetX, targetY); // 将笔触移到当前点击点
      this.ctx.stroke();
    },
    /**
     * 触摸开始
     * 获取当前点击点的坐标
     * 设置线条颜色，宽度，样式等
     */
    onTouchStart(e) {
      let offsetLeft = e.target.offsetLeft; // 获取canvas距离页面左边的距离
      let offsetTop = e.target.offsetTop; // 获取canvas距离页面顶部的距离
      let targetX = e.touches[0].clientX - offsetLeft;
      let targetY = e.touches[0].clientY - offsetTop;
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.lineColor; // 设置线条颜色
      this.ctx.lineWidth = this.lineWidth; // 设置线条的宽度
      this.ctx.lineCap = "round"; // 设置线条的端点的样式，设为圆弧形
      this.ctx.lineJoin = "round"; // 设置线条的连接点的样式，设为弧形
      this.handleDraw(targetX, targetY);
    },
    /**
     * 触摸过程中
     * 获取并计算当前点击点的坐标，绘制线条
     */
    onTouchMove(e) {
      let offsetLeft = e.target.offsetLeft; // 获取canvas距离页面左边的距离
      let offsetTop = e.target.offsetTop; // 获取canvas距离页面顶部的距离
      let targetX = e.touches[0].clientX - offsetLeft;
      let targetY = e.touches[0].clientY - offsetTop;
      this.handleDraw(targetX, targetY);
    },
    /**
     * 触摸结束
     */
    onTouchEnd(e) {},
    /**
     * 颜色模块点击事件，切换点击的颜色状态
     */
    clickColorItem(e) {
      this.colors.forEach(item => {
        item.active = false;
      });
      e.active = true;
      this.lineColor = e.color; // 设置当前笔触颜色
    },
    /**
     * 重写按钮点击事件，清空画板内容
     */
    clickReset() {
      // 清空图片
      this.filePath = "";
      // 清空画板
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 重新设置canvas画板节点对象，否则绘画会出问题,这里异步操作，否则绘画有误
      setTimeout(() => {
        this.initCanvas();
      }, 100);
    },
    /**
     * 点击完成，生成画板图片，隐藏canvas画板区域，将生成的图片显示出来
     */
    clickFinish() {
      // 将canvas转成临时图片数据保存
      this.filePath = this.$refs.boardCanvas.toDataURL();
      this.$emit("onComplete", this.filePath); // 将生成的图片传给父组件
    },
    /**
     * 点击“横版”“返回”,如果当前是缩小版，改为横版，否则返回为缩小版
     * 清空画板内容
     */
    clickOrientation() {
      if (this.direction === "horizontal") {
        this.direction = "";
      } else {
        this.direction = "horizontal";
      }
      // 清空画板内容后后修改样式, 重置canvas
      this.clickReset();
    }
  }
};
</script>
<style lang="scss" scoped>
.board-box {
  width: 100%;
  height: 112px;
  border: 1px solid #fbd3de;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
  canvas,
  img {
    width: 100%;
    height: 100%;
  }
}

.handle-box {
  padding: 6px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .color-box {
    display: flex;
    .color-item {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      margin: 0px 5px;
      transition: 0.3s;
      &.active {
        position: relative;
        transform: scale(0.8);
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid #ccc;
          border-radius: 50%;
          transform: scale(1.25);
          box-sizing: border-box;
        }
      }
    }
  }
  button {
    font-size: 10px;
    width: 40px;
    height: 20px;
    padding: 0;
    border-radius: 3px;
    color: #666;
    margin-left: 10px;
    border: 1px solid #ececec;
    outline: none;
    background: #fff;
    &:active {
      background: #ececec;
    }
  }
}

// 水平状态样式
.horizontal {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  background: #ffffff;
  display: flex;
  align-items: center;
  flex-flow: row-reverse;
  .board-box {
    width: calc(~"100% - 100px");
    height: 90vh;
  }
  .handle-box {
    height: 90vh;
    width: 25px;
    flex-direction: column;
    padding: 0px 10px;
    .color-box {
      flex-direction: column;
      .color-item {
        margin: 10px 0px;
      }
    }
    button {
      transform: rotate(90deg);
      margin: 40px 0px 10px;
    }
  }
}
</style>
