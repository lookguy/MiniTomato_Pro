// pages/home/home.js
const {
  http
} = require("../../lib/http.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showComfirm_update: false,
    showComfirm: false,
    target_value: "",
    target_update: {},
    planning: [{
      description: "你可以通过点击下方的‘创建计划’来创建一个记录，通过点击记录里的圆圈来完成计划，但别忘了先点击闹钟开始行动"
    }]
  },
  onShow() {
    this.initData()
  },
  /* 自定义事件 */
  initData() {
    if (wx.getStorageSync('userInfo') || wx.getStorageSync('X-token')) {
      http.get("/todos?completed=false")
        .then(res => {
          if (res.statusCode == 200) {
            let resources = res.data.resources;
            this.data.planning = resources;
            this.setData({
              planning: resources
            });
          }
        })
        .catch(err => {
          throw (err)
        });
    }
  },
  addTodos(opt) {
    // console.log(opt.detail);
    let id = this.data.planning.length
    this.data.showComfirm = false;
    if (wx.getStorageSync('userInfo') || wx.getStorageSync('X-token')) {
      http.post("/todos", {
          description: opt.detail
        })
        .then(res => {
          wx.showToast({
            title: '创建完毕',
          })
          this.initData()
        })
        .catch(err => {
          throw (err)
        });
      this.setData({
        'showComfirm': this.data.showComfirm
      })
      this.initData();
    } else {
      this.data.planning.push({
        description: opt.detail,
        id
      })
      this.setData({ planning: this.data.planning, showComfirm:false})
    }
  },
  completion(e) {
    let recordID = e.currentTarget.dataset.target.id
    if (wx.getStorageSync('userInfo') || wx.getStorageSync('X-token')) {
      http.put(`/todos/${recordID}`, {
        completed: true
      })
        .then(res => {
          if (res.statusCode == 200) {
            this.initData();
            wx.showToast({
              title: '本条记录已完成',
            })
          };
        })
        .catch(err => {
          throw (err);
        });
    }else{
      let del_index = this.data.planning.findIndex(item=>{
        return item.id == recordID
      })
      this.data.planning.splice(del_index,1)
      this.setData({ planning: this.data.planning})
    }
  },
  update(e) {
    this.data.showComfirm_update = true
    this.data.target_update = e.currentTarget.dataset.target
    this.setData({
      'showComfirm_update': this.data.showComfirm_update,
      "target_update": this.data.target_update
    })
  },
  updateTodos(e) {
    if (wx.getStorageSync('userInfo') || wx.getStorageSync('X-token')) {
      http.put(`/todos/${this.data.target_update.id}`, {
        description: e.detail
      })
        .then(res => {
          console.log(res)
          if (res.statusCode == 200) {
            this.initData();
          };
          this.setData({
            "showComfirm_update": false
          });
        })
        .catch(err => {
          throw (err)
        })
    }else{
      wx.showToast({
        title: '需要你登陆,也可以再创建',icon: 'none',
      })
    }
  },
  tap_button() {
    this.data.showComfirm = true
    this.setData({
      'showComfirm': this.data.showComfirm
    })
  },
  show_close() {
    this.data.showComfirm = false
    this.data.showComfirm_update = false
    this.setData({
      'showComfirm': this.data.showComfirm,
      'showComfirm_update': this.data.showComfirm_update
    })
  },
  show_action(event) {
    console.log(event.currentTarget.dataset.index)
    this.data.target_value = this.data.planning[event.currentTarget.dataset.index].content
    this.data.showComfirm = true
    this.setData({
      'target_value': this.data.target_value,
      'showComfirm': this.data.showComfirm
    })
  },
  start() {
    wx.navigateTo({
      url: '/pages/tomato/tomato'
    })
  }
})