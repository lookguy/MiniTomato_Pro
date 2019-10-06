// pages/mycenter/mycenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tapWord: "history",
    listData: [
      {
        id: 1,
        timeTitle: "本周一",
        content:[
          {
            time: "14:00",
            text: "完成了什么"
          },
          {
            time: "16:00",
            text: "又完成了什么"
          }
        ]
      },
      {
        id: 2,
        timeTitle: "本周二",
        content: [
          {
            time: "14:00",
            text: "完成了什么"
          },
          {
            time: "16:00",
            text: "又完成了什么"
          },
          {
            time: "17:00",
            text: "又完成了什么"
          }
        ]
      },
      {
        id: 3,
        timeTitle: "本周三",
        content: [
          {
            time: "11:00",
            text: "我试着把他编写完毕，希望赶得上"
          },
          {
            time: "16:00",
            text: "心里发慌，文中带皮"
          },
          {
            time: "17:00",
            text: "又完成了什么又完成了什么又完成了什么又完成了什么又完成了什么又完成了什么又完成了什么"
          }
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  changeTab: function(e) {
    this.data.tapWord = e.currentTarget.dataset.tap;
    this.setData({
      tapWord: e.currentTarget.dataset.tap
    })
  }
})