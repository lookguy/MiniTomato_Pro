// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  /* 自定义事件 */
  addTodos(opt){
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
  },
  start(){
    wx.navigateTo({
      url: '/pages/tomato/tomato'
    })
  }
})