Component({
  properties: {
    title: {
      type: String,
      value: "点击按钮"
    }
  },
  methods:{
    click(){
      this.triggerEvent("tapButton")
    }
  }
})