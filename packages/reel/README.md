# CReel
自定义卷轴组件，打开方式：从中间向两边打开。  
读者可以直接复制上述资源到自己的项目中，按照正常的组件引入使用即可。为了方便读者查阅代码，笔者将代码中原有的rem单位改成了px，使用rem情况下可自动适配不同分辨率的设备，此处改成px单位后，笔者仅在750设计尺寸下进行了显示测试，如果读者使用中发现显示异常，请自行调整即可。

### 示例图片
![index](https://github.com/xiaoshengxianjun/coolvui/blob/master/demo/swiper.png)  

### 使用示例
```
<c-reel :start="start" :showAll="false" speed="fast">
  <!-- 此处可填充显示元素 -->
</c-reel>
```

### 参数说明
  参数  |  类型  |  说明  
  ----  |  -----  |  ----  
  start  |  Boolean  |  控制卷轴展开
  showAll  |  Boolean  |  目前卷轴有两种显示样式，展开后轴全部显示和轴部分显示
  speed  |  String  |  卷轴展开的速度，快：fast,慢：slow,默认slow
