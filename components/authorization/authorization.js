var lib = require('../../libs/lib.js');

Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {},
    flag:true
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    allow({detail}){
      console.log(detail);
      lib.init((user) => {
        this.setData({ flag: false })

      }, detail);

    },
    deny(){
      this.setData({ flag: false })

    }
  }
})