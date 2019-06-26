// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time_now: null,
    unitTime: null,
    showComfirm: false,
    target_value: "",
    planning: [{
      content: "今天要做什么，准备什么,及时完成！(*Φ皿Φ*)",
      id: 1,
      createDate: null,
      compelete: true
    }, {
      content: "今天要做什么，准备什么，玩下游戏",
      createDate: null,
      id: 2,
      compelete: false
    }, {
      content: "今天要做什么，准备什么，玩下游戏",
      createDate: null,
      id: 3,
      compelete: false
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    this.data.time_now = `${this.formatTime(hour)}:${this.formatTime(minute)}`;
    this.data.unitTime = hour < 12 ? "AM" : "PM";
    this.setData({
      time_now: this.data.time_now,
      unitTime: this.data.unitTime
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  /* 时间格式处理 */
  formatTime(time) {
    if (time > 10) return time;
    return `0${time}`
  },
  /* 自定义事件 */
  show_comfirm(opt){
    console.log(opt.detail)
    let id = this.data.planning.length
    this.data.showComfirm = false
    this.data.planning.push({
      content: opt.detail,
      createDate: null,
      id,
      compelete: false
    })
    this.setData({ 'showComfirm': this.data.showComfirm,planning:this.data.planning})
  },
  tap_button(){
    this.data.showComfirm = true
    this.setData({ 'showComfirm': this.data.showComfirm })
  },
  show_close(){
    this.data.showComfirm = false
    this.setData({ 'showComfirm': this.data.showComfirm })
  },
  show_action(event){
    console.log(event.currentTarget.dataset.index)
    this.data.target_value = this.data.planning[event.currentTarget.dataset.index].content
    this.data.showComfirm = true
    this.setData({ 'target_value': this.data.target_value, 'showComfirm': this.data.showComfirm })
  }
})