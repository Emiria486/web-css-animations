(function () {
  var barrageArray = [
    {
      url: "用户头像",
      text: "秋天爱美丽",
      level: 10,
    },
    {
      url: "用户头像",
      text: "今天很开心啊",
      level: 10,
    },
    {
      url: "用户头像",
      text: "winter has come",
      level: 10,
    },
    {
      url: "",
      text: "土耳其现在形势",
      level: 10,
    },
    {
      url: "",
      text: "没事早点回家吃饭啊",
      level: 10,
    },
    {
      url: "",
      text: "这主角真实醉了，不会回啊",
      level: 10,
    },
    {
      url: "",
      text: "背景音乐真好听啊",
      level: 10,
    },
    {
      url: "",
      text: "背景音乐是***",
      level: 10,
    },
    {
      url: "",
      text: "经费在燃烧啊",
      level: 10,
    },
    {
      url: "",
      text: "国产良心剧",
      level: 10,
    },
  ];
  var barrageColorArray = [
    "#0099CC",
    "#333333",
    "#009966",
    "#FFFF66",
    "#9933FF",
    "#FFFF99",
    "#CCCCFF",
    "#CC9933",
    "#FFFF66",
  ];
  var barrageTipWidth = 50; //提示语的长度
  var barrageBoxWrap = document.querySelector(".barrage-container-wrap");
  var barrageBox = document.querySelector(".barrage-container");
  var inputBox = document.querySelector(".input");
  var sendBtn = document.querySelector(".send-btn");

  //容器的宽高度,getComputedStyle返回一个网页元素的全部CSS 属性的值
  var barrageWidth = ~~window
    .getComputedStyle(barrageBoxWrap)
    .width.replace("px", "");
  var barrageHeight = window
    .getComputedStyle(barrageBoxWrap)
    .height.replace("px", "");

  // 下方输入框发送消息
  function sendMsg() {
    var inputValue = inputBox.value;
    // 正则替换+号
    inputValue.replace(/\ +/g, "");
    // 判断输入
    if (inputValue.length <= 0) {
      alert("请输入");
      return false;
    }

    //生成弹幕
    createBarrage(inputValue, true, true);
    inputBox.value = "";
  }

  //创建弹幕
  function createBarrage(msg, isSendMsg, my = false) {
    var divNode = document.createElement("div");
    var spanNode = document.createElement("span");
    // 为节点创建内容文本
    divNode.innerHTML = msg;
    // 为节点添加弹幕CSS类
    divNode.classList.add("barrage-item");
    if (my) {
      divNode.classList.add("my");
    }
    // 将弹幕div加入弹幕容器子节点
    barrageBox.appendChild(divNode);

    spanNode.innerHTML = "举报";
    spanNode.classList.add("barrage-tip");
    divNode.appendChild(spanNode);

    //弹幕的消失距离
    barrageOffsetLeft = getRandom(barrageWidth, barrageWidth * 2);
    // 根据是否为用户输入框的文字弹幕来设置弹幕出现的位置
    barrageOffsetLeft = isSendMsg ? barrageWidth : barrageOffsetLeft;
    // 弹幕距离顶部的距离
    barrageOffsetTop = getRandom(10, barrageHeight - 10);
    // 随机弹幕颜色
    barrageColor =
      barrageColorArray[Math.floor(Math.random() * barrageColorArray.length)];

    // 执行初始化滚动,this为弹幕div
    initBarrage.call(divNode, {
      left: barrageOffsetLeft,
      top: barrageOffsetTop,
      color: barrageColor,
    });
  }

  //初始化弹幕移动(速度，延迟)
  function initBarrage(obj) {
    //初始化
    obj.top = obj.top || 0;
    obj.class = obj.color || "#fff";
    this.style.left = obj.left + "px";
    this.style.top = obj.top + "px";
    this.style.color = obj.color;

    //添加属性
    this.distance = 0;
    this.width = ~~window.getComputedStyle(this).width.replace("px", "");
    this.offsetLeft = obj.left;
    this.timer = null;

    //弹幕子节点
    var barrageChileNode = this.children[0];
    barrageChileNode.style.left = (this.width - barrageTipWidth) / 2 + "px";

    //弹幕运动
    barrageAnimate(this);

    // 当鼠标移到弹幕上时，显示弹幕span子节点，停下弹幕移动
    this.onmouseenter = function () {
      barrageChileNode.style.display = "block";
      // 取消之前调用动画请求
      cancelAnimationFrame(this.timer);
    };
    // 当鼠标离开弹幕上时，弹幕span子节点消失，弹幕重新移动
    this.onmouseleave = function () {
      barrageChileNode.style.display = "none";
      barrageAnimate(this);
    };

    //举报点击事件
    barrageChileNode.onclick = function () {
      alert("举报成功");
    };
  }

  //弹幕动画
  function barrageAnimate(obj) {
    move(obj);
    // 假如弹幕没有超过当前页面就调用动画请求函数
    if (Math.abs(obj.distance) < obj.width + obj.offsetLeft) {
      obj.timer = requestAnimationFrame(function () {
        barrageAnimate(obj);
      });
    } else {
      // 停止动画
      cancelAnimationFrame(obj.timer);
      //删除节点
      obj.parentNode.removeChild(obj);
    }
  }

  //弹幕移动函数
  function move(obj) {
    obj.distance--;
    obj.style.transform = "translateX(" + obj.distance + "px)";
    obj.style.webkitTransform = "translateX(" + obj.distance + "px)";
  }

  //随机获取高度
  function getRandom(start, end) {
    return start + Math.random() * (end - start);
  }

  /*******初始化事件**********/
  //对弹幕数组数据进行弹幕化
  barrageArray.forEach(function (item, index) {
    createBarrage(item.text, false);
  });

  //点击发送按钮的点击事件
  sendBtn.onclick = sendMsg; //点击发送

  //回车发送消息
  inputBox.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == 13) {
      sendMsg();
    }
  };
})();
//兼容写法
(function () {
  var lastTime = 0;
  var vendors = ["webkit", "moz"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] || // Webkit中此取消方法的名字变了
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
})();
