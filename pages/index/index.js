//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '../../images/banner.png',
      '../../images/banner.png',
      '../../images/banner.png',
      '../../images/banner.png'
    ],
    currentDot: 0,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    text: '陪护床收纳在床边柜里，自愿付费使用。租借后，打开柜门，拉出陪护床。归还时，将陪护床推进床边柜，自动上锁。',
    marqueePace: 1,//滚动速度
    marqueeDistance: 82,//初始滚动距离
    marqueecopy_status: false,
    marquee_margin: 10,
    size: 12,
    orientation: 'left',//滚动方向
    timeInterval: 40 // 时间间隔
  },
  goRequireRead:function(){
    wx.navigateTo({
      url: "../requiredRead/requiredRead"
    })
  },
  goOrder:function(){
    wx.navigateTo({
      url: "../orders/orders"
    })
  },

  onLoad: function () {
    // 页面显示
    var vm = this;
    var length = vm.data.text.length * vm.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    vm.setData({
      length: length,
      windowWidth: windowWidth,
      marquee_margin: length < windowWidth ? windowWidth - length : vm.data.marquee_margin//当文字长度小于屏幕长度时，需要增加补白
    });
    vm.run2();// 第一个字消失后立即从右边出现
   
  },
  swiperChange: function (e) {
    this.setData({ currentDot: e.detail.current})
  },
  onShow: function () {
  
  },

  run2: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        // 如果文字滚动到出现marquee_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
          marqueecopy_status: vm.data.length + vm.data.marqueeDistance <= vm.data.windowWidth + vm.data.marquee_margin,
        });
      } else {
       if (-vm.data.marqueeDistance >= vm.data.marquee_margin) { // 当第二条文字滚动到最左边时
          clearInterval(interval);
          vm.setData({
            marqueeDistance: vm.data.marquee_margin // 直接重新滚动
          });
         
          vm.run2();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance: -vm.data.windowWidth
          });
          vm.run2();
        }
      }
    }, vm.data.timeInterval);
  }
})
