// pages/paymentResult/paymentResult.js
var lib = require('../../libs/lib.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{
      rentMoney: "10.00",//string 产生租金，

      turnBackMoney: 20,// 押金

      rentTime: "10",// string 单位小时 

      id: 12313
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    lib.http.post(lib.urls.getRecord, { id: options.id }, (res) => {
      if (res.result == 1) {
        this.setData({ data: res.data })

      }
    })

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
  backToIndex() {
    wx.navigateTo({
      url: "../orders/orders"
    })
  },
})