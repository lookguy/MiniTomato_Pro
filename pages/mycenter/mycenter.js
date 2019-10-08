// pages/mycenter/mycenter.js
const {
  http
} = require('../../lib/http.js');
const {
  app_id,
  app_secret
} = getApp().globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tapWord: "history",
    dataStatus: 0,
    tomatoes: {},
    todos: {},
    swiper_current: 0,
  },
  changeTab: function(e) {
    this.data.tapWord = e.currentTarget.dataset.tap;
    if (e.currentTarget.dataset.tap=="history"){
      this.getTomatoes()
      this.data.swiper_current = 0
    }else{
      this.getTodos()
      this.data.swiper_current = 1
    }
    this.setData({
      tapWord: e.currentTarget.dataset.tap,
      swiper_current: this.data.swiper_current
    })
  },
  choseTab(e){
    switch(e.detail.current){
      case 0:
        this.data.tapWord = "history";
        break;
      case 1:
        this.data.tapWord = "compelete";
        break;
      default:
        return;
    }
    this.setData({ "tapWord": this.data.tapWord})
  },

  login(e) {
    const loginUrl = '/sign_in/mini_program_user'
    const homeUrl = '/pages/home/home'
    let encrypted_data = e.detail.encryptedData
    let iv = e.detail.iv
    let code
    wx.login({
      success(res) {
        code = res.code
        http.post(loginUrl, {
          code,
          iv,
          encrypted_data,
          app_id,
          app_secret
        })
          .then(res => {
            wx.setStorageSync('userInfo', res.data.resource)
            wx.setStorageSync('X-token', res.header['X-token'])
            wx.reLaunch({
              url: homeUrl,
            })
          })
          .catch(err => console.log(err))
      },
      fail(err) {
        throw (err, 2)
      }
    })
  },

  onShow() {
    this.getTomatoes();
    this.getTodos();
    if (wx.getStorageSync('userInfo') || wx.getStorageSync('X-token')){
      this.data.dataStatus = 1
      this.setData({ dataStatus: 1})
    }
  },
  getTomatoes() {
    return http.get("/tomatoes", {
        is_group: "yes"
      })
      .then(res => {
        if (res.statusCode == 200) {
          this.data.tomatoes = res.data.resources
          this.setData({ "tomatoes": res.data.resources })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  getTodos() {
    return http.get("/todos", {
        is_group: "yes"
      })
      .then(res => {
        if (res.statusCode == 200) {
          this.data.todos = res.data.resources
          this.setData({ "todos": res.data.resources })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
})