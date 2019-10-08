// pages/mycenter/mycenter.js
const {
  http
} = require("../../lib/http.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tapWord: "history",
    tomatoes: null,
    todos: null,
  },
  changeTab: function(e) {
    this.data.tapWord = e.currentTarget.dataset.tap;
    if (e.currentTarget.dataset.tap=="history"){
      this.getTomatoes()
    }else{
      this.getTodos()
    }
    this.setData({
      tapWord: e.currentTarget.dataset.tap
    })
  },

  onShow() {
    this.getTomatoes();
    this.getTodos();
  },
  getTomatoes() {
    http.get("/tomatoes", {
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
    http.get("/todos", {
        is_group: "yes"
      })
      .then(res => {
        if (res.statusCode == 200) {
          this.data.todos = res.data.resources
          this.setData({ "todos": res.data.resources})
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
})