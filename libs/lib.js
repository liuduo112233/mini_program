var  app = getApp(),
  host ='https://aliyun-mobile-api.imlaidian.com/cdt';
var lib = {
  urls: {
    host: host,
    authUser: host + '/wxXCXAuthCodeResource',
    getUserInfo: host + '/UserGet',
    getDeviceInfo: host + '/getDeviceInfo',
    borrowBed: host + '/taskAdd',
    createPayment: host + '/chargeCreate',
    withdraw: host + '/cashPickup',
    getRecord: host +"/getRecord",
    getChargeRecord: host + '/getChargeRecord',
    getCharge: host + '/getCharge',
    getChargeResult: host + '/getChargeResult'
  },
  init: function init(callback,e) {
    var accessToken = wx.getStorageSync('access_token');
    console.log(e);
    var paramsTest = Object.prototype.toString.call(e) == '[object Object]';
    if (!paramsTest&&!accessToken)return;   
    if(e&&~e.errMsg.indexOf('deny'))return;
    if (!accessToken) {
      let code = '';
      wx.login({
        success: function(res) {
          if (res.code) {
            code = res.code;
                lib.http.post(lib.urls.authUser, {
                  iv: e.iv,
                  encryptedData: e.encryptedData,
                  code: code
                }, function(res) {
                  wx.setStorageSync('access_token', res.data.user.accessToken);
                  lib.http.post(lib.urls.getUserInfo, {}, function(res) {
                    if (res.result !== 1) {
                      wx.showModal({
                        title: '无法获取用户信息',
                        content: res.msg,
                        showCancel: false
                      });
                      return;
                    }
                    callback(res.user);
                  });
                })
              
          } else {
            wx.showModal({
              title: '获取微信授权码失败',
              content: res.errMsg,
              showCancel: false
            });
          }
        },
        fail: function(err) {
          console.log(err);
        }
      });
    } else {
      lib.http.post(lib.urls.getUserInfo, {}, function(res) {
        if (res.result !== 1) {
          wx.showModal({
            title: '无法获取用户信息',
            content: res.msg,
            showCancel: false
          });
          return;
        }
        callback(res.user);
      });
    }
  },
  http: {
    post: function(url, data, callback, config) {
      // 所有请求先显示加载图标，请求完成后隐藏图标
      if (!data.noLoading) wx.showLoading({
        mask: true
      });
      data.access_token = wx.getStorageSync('access_token')||'';
      data.xcxFormIds = lib.getFormIds();
      let configs = config || {}
     
      if (data._needSign) {
        delete data._needSign
        data.sign = lib.doSign(data)
      }
      wx.request({
        url: url,
        data: configs.isStringify ? JSON.stringify(data) : data,
        method: 'POST',
        header: {
          'Content-Type': configs.contentType ? 'application/json' : 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          var errCode = res.statusCode,
            errMsg = '';
          if (res.statusCode !== 200) {
            switch (res.statusCode) {
              case 400:
                errMsg = '请求次数过多，请稍后再试';
                break;
              case 404:
                errMsg = '页面未找到'
                break;
              case 500:
                errMsg = '服务器内部错误';
                break;
              default:
                errMsg = '发生未知错误'
            }

            wx.showModal({
              title: '请求出错',
              content: errCode + ' - ' + errMsg,
              showCancel: false
            });
            return;
          }

          callback(res.data);
        },
        fail: function(err) {},
        complete: function(res) {
          console.log(res);
          lib.clearFormIds();
          if (!data.noLoading) wx.hideLoading();
        }
      });
    }
  },
  getQueryString: function(name, url) {
    var regex = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
      query = url.toString().split('?')[1];

    if (query) {
      var match = query.match(regex);
      return match && decodeURIComponent(match[2]);
    }
    return null;
  },
  formatDate: function(ms, symbol, fullFlag) {
    symbol = symbol || "/";
    var startDay = new Date(+ms)
    var startMonth = +startDay.getMonth() + 1;
    startMonth = startMonth < 10 ? "0" + startMonth : startMonth;
    var startDate = startDay.getDate();
    startDate = startDate < 10 ? "0" + startDate : startDate;
    var startHour = startDay.getHours();
    startHour = startHour < 10 ? "0" + startHour : startHour;
    var startMin = startDay.getMinutes();
    startMin = startMin < 10 ? "0" + startMin : startMin;
    var startSec = startDay.getSeconds();
    startSec = startSec < 10 ? "0" + startSec : startSec;
    if (fullFlag) {
      return startDay.getFullYear() + symbol + startMonth + symbol + startDate + " " + startHour + ":" + startMin + ":" + startSec

    } else {
      return startDay.getFullYear() + symbol + startMonth + symbol + startDate;

    }
  },
  createPayment: function(amount, data, callback) {
    data.amount = amount;
    data.channel = 'wx_lite';
    console.log(data);
    lib.http.post(lib.urls.createPayment, data, function(res) {
      if (res.result && res.result === -1) {
        wx.showModal({
          title: '无法生成订单信息',
          content: res.msg,
          showCancel: false
        });
        return;
      }
      console.log('createPayment');
      pingpp.createPayment(res, function(result, err) {
        if (result === 'success') {
          callback();
        } else {
          console.log(err);
          if (err.extra.errMsg.indexOf('cancel')) return;
          wx.showModal({
            title: '充值失败',
            content: JSON.stringify(err),
            showCancel: false
          });
          return;
        }
      });
    });
  },
  scanCode: callback => {
    wx.scanCode({
      success: res => {
        var terminal = lib.getQueryString('qrcode', res.result);
        if (!terminal) {
          wx.showModal({
            title: '扫错二维码了',
            content: '请点击设备屏幕“借”，再扫描相应二维码',
            success: res => {
              if (res.confirm) lib.scanCode(callback);
              else callback(null);
            }
          });
          return;
        }
        callback(terminal);
      }
    });
  },
  getFormIds: () => {
    var xcxFormIds = '',
      storage = JSON.stringify(wx.getStorageSync('xcxFormIds'));
    if (storage && storage !== '""') xcxFormIds = storage;
    return xcxFormIds;
  },
  storeFormIds: (action, formId) => {
    console.log(formId);
    var xcxFormIds = wx.getStorageSync('xcxFormIds') || [];
    wx.setStorageSync('xcxFormIds', xcxFormIds.concat({
      action: action,
      formId: formId
    }));

    

  },
  clearFormIds: () => {
    wx.setStorageSync('xcxFormIds', '');
  },
  formatAmount(amount) { // 格式化金额，当有两位小数时，保留两位小数，否则保留一位小数
    var result = /\d+\.\d[1-9]/.test(amount.toString());
    return result ? Number(amount).toFixed(2) : Number(amount).toFixed(1);
  },
  showError(res, title) {
    wx.showModal({
      title: title || '',
      content: res.msg,
      complete: function() {}
    });
  },
  doSign(params) {
    const str = Object.keys(params)
      .sort()
      .map(key => params[key])
      .join('+')
    return md5(str)
  }

}

module.exports = lib;