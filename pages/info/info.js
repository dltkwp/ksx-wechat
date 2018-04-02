let util = require('../../utils/util')

Page({
  data: {
    userInfo: {
      realname: '', // 姓名
      username: '', // 手机号
      wechat: '',   // 微信
      alipay: ''    // 支付宝
    }
  },
  getUserInfo: function(){
    let _this = this;
    util.ajax({
      method: 'GET',
      url: 'v1/paypluses',
      success: function (res) {
        let data = res.data;
        _this.setData({
          list: data           
        })
      }
    });
  },
  userInfoSubmit: function(e){
    let page = e.detail.value;
    let realname = page.realname.trim();
    let username = page.username.trim();
    let wechat = page.wechat.trim();
    let alipay = page.alipay.trim();

    if(!realname){
      util.message({
        content: '姓名不可为空'
      })
      return false;
    }

    if(!util.pattern.mobile.test(username)){
      util.message({
        content: '手机号格式不正确'
      })
      return false;
    }

    console.warn(page);

  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})