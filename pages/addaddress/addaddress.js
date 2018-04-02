let util = require('../../utils/util')

Page({
  data: {
    recipients: '',
    recipientsPhone: '',
    recipientsAddress: ''
  },
  addressSubmit: function (e){
      let _this = this;
      let page = e.detail.value;
      let recipients = page.recipients.trim();
      let recipientsPhone = page.recipientsPhone.trim();
      let recipientsAddress = page.recipientsAddress.trim();

      if(!recipients){
        util.message({content: '收货人姓名不可为空'})
        return false;
      }
      if(!util.pattern.mobile.test(recipientsPhone)){
        util.message({content: '联系电话格式不正确'})
        return false;
      }
      if(!recipientsAddress){
        util.message({content: '收货地址不可为空'})
        return false;
      }

      console.log(page);

  },
  onLoad: function (options) {
      let _this = this;
      _this.setData({
        recipients: '',
        recipientsPhone: '',
        recipientsAddress: ''
      })
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