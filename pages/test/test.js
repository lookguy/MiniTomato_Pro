// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "招雄彬",
    type: "ready",
    arr: [{
        id: 1,
        text: "牛1"
      },
      {
        id: 2,
        text: "牛2"
      },
      {
        id: 3,
        text: "牛3"
      },
      {
        id: 4,
        text: "牛4"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  reverseArr() {
    this.setData({
      arr: this.data.arr.reverse()
    })
  },
  addArr() {
    let anotherArr = this.data.arr.splice(0);
    let index = Math.floor(Math.random() * 10)
    let item = {
      id: index,
      text: `牛${index}`
    };
    anotherArr.unshift(item)
    this.setData({
      arr: anotherArr
    })
  },
  changeArr() {
    this.data.arr[0].text = "你改变了我"
    this.setData({arr:this.data.arr})
  }
})