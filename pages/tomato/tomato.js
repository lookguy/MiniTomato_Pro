// pages/tomato/tomato.js
Page({

  /**
   * 页面的初始数据
   */
  clearTimeId: null,
  data: {
    count: 5,
    time: null,
    isReady: true,
    visible: false,
    isAgain: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  start(){
    this.formatTime()
    this.clearTimeId = setInterval(() => {
      this.data.count--;
      this.formatTime()
      if (this.data.count == 0) {
        this.clearTime()
        this.data.isAgain = true
        this.setData({'isAgain':true})
      }
    }, 1000)
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
    console.log(e.detail)
    this.close()
  },
  //关闭
  close() {
    this.data.visible = false
    this.setData({
      'visible': this.data.visible
    })
    this.start()
  },
  // 再来一组
  again(){
    this.data.count = 1500;
    this.data.isAgain =false;
    this.setData({isAgain:this.data.isAgain})
    this.start()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.start()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})