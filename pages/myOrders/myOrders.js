// pages/myOrders/myOrders.js
var lib = require('../../libs/lib.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabName:'充值记录',
    list: [{

      returnTime: '2018-11-23 11:25:23',//string 归还时间

      rentMoney: 10,//int 产生租金，

      address: 'XX体育场', //string 租借地点

      terminal: '000060000172',// string 设备编号

      rentTime: "00:00:32",// string 租借时长 

      status: 1,//int租借状态   1 租借中  2已归还 3未知

      statusText: '租借中',// string 租借状态文字

    }],
    chargeList: [{

      chargeTime: '2018-11-23 11:25:23',//充值时间

      chargeMoney: "+100", //充值金额

      chargeText: "通过微信充值"



    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    lib.http.post(lib.urls.getChargeRecord,{},(res)=>{
      if(res.result==1){
        this.setData({ chargeList: res.chargeList})

      }
    })
    lib.http.post(lib.urls.getRecord, { isBorrow: 0}, (res) => {
      if (res.result == 1) {
        this.setData({ list: res.list })

      }
    })
    

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  switchTab:function(event){
   var value = event.currentTarget.dataset.value;
   this.setData({
     tabName:value 
   })
  }


})