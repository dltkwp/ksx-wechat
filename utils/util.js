let ksx = {}

// 全局变量处理
ksx.baseUrl = '';

ksx.pattern = {
  mobile: /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
};

//获取OpenId
ksx.getOpenId = function (callback) {
  wx.login({
    success: function (res) {
      let code = res.code;
      if (code) {
        ksx.ajax({
          method: 'GET',
          url: 'v1/oauth/session/' + code,
          success: function (data) {
            let openId = data.openId;
            wx.setStorageSync('ksx-wechat-openid', data.openId);
            callback && callback(openId);
          }
        });
      } else {
        ksx.showToast({
          icon: 'error',
          content: '获取用户登录态失败,' + res.errMsg
        })
      }
    }
  })
}

//提示框的封装
ksx.showToast = function (_opt) {
  let opt = {
    title: '提示',
    icon: 'success',
    duration: 2000,
  };
  Object.assign(opt, _opt);
  wx.showToast(opt)
}

//消息提示,带确认框
ksx.message = function (_opt) {
  let opt = {
    title: '提示',
    showCancel: false,
    content: ''
  };
  Object.assign(opt, _opt);
  wx.showModal(opt)
}


ksx.getLoginAuth = function () {
  return wx.getStorageSync('ksx-login-token')
}
//封装ajax
ksx.ajax = function (req) {
  let callback = function () {
    let auth = ksx.getLoginAuth()
    let rerSuccess = req.success;//临时存储
    if (auth && auth.accessToken) {
      req.header.Authorization = auth.accessToken
    }
    wx.showLoading({
      title: '加载中...',
    })
    req.success = function (res) {
      wx.hideLoading()
      if (res.statusCode == 401) {
        wx.setStorageSync('ksx-login-token', '')
        wx.navigateTo({
          url: '../login/login'
        })
        return false
      }
      if (res && res.data && res.data.errorCode) {
        ksx.message({
          content: res.data.errorMessage
        })
        _req.fail && _req.fail(res);
      } else {
        rerSuccess && rerSuccess(res);
      }
    }

    let httpIndex = req.url.indexOf('http://');
    let httpsIndex = req.url.indexOf('https://');

    if (httpIndex == -1 && httpsIndex == -1) {
      req.url = ksx.baseUrl + req.url;
    }
    wx.request(req);
  }
  callback();
}

module.exports = ksx
