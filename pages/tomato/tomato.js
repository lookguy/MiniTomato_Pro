// pages/tomato/tomato.js
const {
  http
} = require("../../lib/http.js");
Page({

  /**
   * 页面的初始数据
   */
  clearTimeId: null,
  data: {
    count: 1500,
    id: "",
    time: null,
    isReady: true,
    visible: false,
    isAgain: false,
    target_value: ""
  },

  //  根据秒数格式化时间
  formatTime() {
    this.data.isReady = true
    let m = Math.floor(this.data.count / 60)
    let s = Math.floor(this.data.count % 60)
    this.data.time = `${(m + '').length > 1 ? m : '0' + m}:${(s + '').length > 1 ? s : '0' + s}`
    this.setData({
      'time': this.data.time,
      'isReady': this.data.isReady
    })
  },
  //开始时间
  start() {
    this.formatTime()
    this.clearTimeId = setInterval(() => {
        this.data.count--;
        this.formatTime()
        if (this.data.count == 0) {
          this.updateTmt("时间终止", false)
          this.clearTime()
          this.data.isAgain = true
          this.setData({
            'isAgain': true
          })
        }
      },
      1000)
  },
  //暂停时间
  clearTime() {
    if (this.clearTimeId) {
      clearInterval(this.clearTimeId)
      this.data.isReady = false
      this.setData({
        'isReady': this.data.isReady
      })
    }
  },
  //放弃任务
  abandon() {
    if (this.clearTimeId) {
      this.clearTime()
    }
    this.data.visible = true
    this.setData({
      'visible': this.data.visible
    })
  },
  //确定放弃
  send(e) {
    http.put(`/tomatoes/${this.data.id}`, {
        description: e.detail,
        aborted: false
      })
      .then(res => {
        if (res.statusCode == 200) {
          this.data.id = "";
          wx.navigateBack({
            delta: 1
          })
        }
      })
      .catch(err => {
        throw (err)
      })
  },
  //关闭
  close() {
    this.data.visible = false
    this.setData({
      'visible': this.data.visible
    })
    this.start()
    this.createTmt()
  },
  // 再来一组
  again() {
    this.data.count = 1500;
    this.data.isAgain = false;
    this.setData({
      isAgain: this.data.isAgain
    })
    this.start()
  },
  //创建番茄
  createTmt() {
    http.post("/tomatoes")
      .then(res => {
        console.log(res)
        this.data.id = res.data.resource.id
      })
      .catch(err => {
        throw (err)
      })
  },
  //更新番茄
  updateTmt(description, aborted) {
    http.put(`/tomatoes/${this.data.id}`, {
        description,
        aborted
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        throw (err)
      })
  },

  onShow: function() {
    this.start();
  },
  onReady() {
    this.createTmt()
  },
  onHide() {
    this.updateTmt("中途放弃", true)
  },
  onUnload() {
    if (!this.data.id) return;
    this.updateTmt("退出放弃", true)

  },
})