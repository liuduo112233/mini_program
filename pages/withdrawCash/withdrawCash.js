// pages/withdrawCash/withdrawCash.js
var lib = require('../../libs/lib.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    money:1213,
    money_value:''
  },
  getAllMoney:function(e){
    var money_value = e.currentTarget.dataset.money;
    this.setData({
      money_value
    })
  },
  getMoney:function(e){
    var money_value = e.detail.value;
    this.setData({
      money_value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    lib.init((user) => {
      this.setData({ money: user.money })
    });

  },
  withDraw(){
    lib.http.post(lib.urls.withdraw, { amount: money_value }, (res) => {
      setTimeout(() => {
        wx.showToast({
          icon: 'none',
          title: res.msg,
          duration: 5000
        })
      }, 0)
    if(res.result==1){
     wx.redirectTo({
       url: '../index/index',
     })
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

  }
})