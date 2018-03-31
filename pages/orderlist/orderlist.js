var app = getApp()
Page({
  data: {
    currentTab: 0,
    custormId: 0
  },
  list: function(){
    
  },
  onLoad: function (option) {
    var _this = this;
    _this.setData({
      customId: option.customId
    })
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  bindChange: function (e) {
    var _this = this;
    _this.setData({ currentTab: e.detail.current });
  },
  swichNav: function (e) {
    var _this = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      _this.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})  