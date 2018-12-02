// pages/questionAndAnswer/questionAndAnswer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 展开折叠
    selectedFlag: [false, false, false, false],
    arrow:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAWCAMAAACFUC6CAAAAOVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8dlA9AAAAE3RSTlMAZmIkNS8qHmA8GhYQXkhOQlsEL0YhBAAAAJpJREFUKM+N090ORTAQBOBtS1X/OOf9H9bGRuZCDXNVfBGmW7mnpF+VD8nJuVY/OO80rby5xbsz6UUGdRafqXOIX55dNNI3SOYmkd1kGLv5cprV1kM52bNZl5CRuOE1gjcQCReG34zgL0ctrLjT0RuTf7iHndrNbWRvgzcJlwqdpi6ijs5fvqS5yidec7bFz0hJ1nA0R1KbNnIAYKkELRg75lYAAAAASUVORK5CYII='
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
  call(){
    wx.makePhoneCall({
      phoneNumber: '1340000' //仅为示例，并非真实的电话号码
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