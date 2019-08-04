// components/_comfirm/_comfirm.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    placeholder: {
      type: String,
      value: "placeholder"
    },
    value: {
      type: String,
      value: ""
    }
  },
  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    comfirm(e) {
      if (e.detail.value.textarea == "") {
        return this.cancel()
      }
      this.triggerEvent("openComfirm", e.detail.value.textarea)
    },
    cancel() {
      this.triggerEvent("closeComfirm")
    }
  }
})