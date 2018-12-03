//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    infoList:[
      { name: '我的订单', icon: '../../images/order_icon.png', url:'../myOrders/myOrders'},
      { name: '我的钱包', icon: '../../images/purse_icon.png', url: '../myPurse/myPurse'},
      { name: '客服与帮助', icon: '../../images/service_icon.png', url: '../questionAndAnswer/questionAndAnswer'},
      { name: '关于我们', icon: '../../images/aboutus_icon.png',url: '../aboutUs/aboutUs'},
    ],
    tokenFlag:false
  },
  goPage: function (event){
    var url = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    })
    
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
  },
  onShow: function(){
    var accessToken = wx.getStorageSync('access_token');
    if (!accessToken){
      this.setData({ tokenFlag: true})
    }
  },
  switchTab: function (e) {
    //   var value = e.currentTarget.dataset.name;
    //   if(value=='首页'){
    //     this.setData({
    //       tabHomeValue: '../../images/indexIconActive.png',
    //       tabUserValue: '../../images/userCenter.png',
    //       tabName:'首页'
    //     })
    //   }else if(value =='个人中心'){
    //     this.setData({
    //       tabHomeValue: '../../images/indexIcon.png',
    //       tabUserValue: '../../images/userCenterActive.png',
    //       tabName: '个人中心'
    //     })
    wx.navigateTo({
      url: "../index/index"
    })
    //   }
  },
})
