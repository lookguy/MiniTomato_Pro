Component({
  properties: {
    title: {
      type: String,
      value: "点击按钮"
    },
    size: {
      type: String,
      value: "default"
    }
  },
  methods:{
    click(){
      this.triggerEvent("tapButton")
    }
  }
})