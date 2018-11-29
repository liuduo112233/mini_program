// pages/questionAndAnswer/questionAndAnswer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 展开折叠
    selectedFlag: [false, false, false, false],
  },
  changeToggle: function(e) {
    var index = e.currentTarget.dataset.index;
    var selectedFlag = this.data.selectedFlag
    if (selectedFlag[index]) {
      selectedFlag[index] = false;
    } else {
      selectedFlag = [false, false, false, false];
      selectedFlag[index] = true;
    }
    this.setData({
      selectedFlag
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})