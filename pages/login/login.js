const {
  http
} = require('../../lib/http.js');
const {
  app_id,
  app_secret
} = getApp().globalData;
Page({
  data: {

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
        console.log(err, 2)
      }
    })
  }
})