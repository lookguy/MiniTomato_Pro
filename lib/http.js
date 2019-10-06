const {
  host,
  t_app_id,
  t_app_secret
} = getApp().globalData;

const _http = (method, url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${host}${url}`,
      data,
      method,
      dataType: 'json',
      header: {
        "t-app-id":t_app_id,
        "t-app-secret":t_app_secret,
        Authorization: `Bearer ${wx.getStorageSync('X-token')}`
      },
      success(response) {
        let statusCode = response.statusCode;
        // 未登录401 无权限403 notFound404 其它500
        if (statusCode >= 400) {
          if(statusCode === 401){
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }
          reject({
            statusCode,
            ...response
          })
        } else {
          resolve({
            statusCode,
            ...response
          })
        }
      },
      fail(errors){
        wx.showToast({
          title: '请求失败',
          icon: 'none'
        });
        reject(errors)
      }
    })
  })
}

const http = {
  get(url, params) {
    return _http('GET', url, params)
  },
  post(url, data) {
    return _http('POST', url, data)
  },
  put(url, data) {
    return _http('PUT', url, data)
  },
  delete(url, data) {
    return _http('DELETE', url, data)
  }
}

module.exports = {http}
