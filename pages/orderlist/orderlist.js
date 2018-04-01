let util = require('../../utils/util')
let app = getApp()
Page({
  data: {
    currentTab: 0,
    custormId: 0 ,

    pageNo:1,
    pageSize:10,
    loadOver: false,
    isloading: true
  },
  list: function(){
      let _this = this;
      let param = {
        pageNo: _this.data.pageNo,
        pageSize: _this.data.pageSize
      }

      util.ajax({
        method: 'GET',
        url: 'v1/orders',
        data: param ,
        success: function (res) {
          let data = res.data.list;
          let temp = [];
          if (_this.data.pageNo == 1) {
            temp = data;
          } else if (_this.data.pageNo > 1) {
            temp = _this.data.productList.concat(data);
          }
          if (data.length < _this.data.pageSize) {
            _this.setData({ loadOver: true });
          }
          _this.setData({ pageNo: _this.data.pageNo + 1 });
  
          _this.setData({
            productList: temp,
            isloading: false
          });
        }
      });
  },
  onLoad: function (option) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });

    _this.setData({
      customId: option.customId,
      pageNo: 1,
      loadOver: false,
      productList: [],
      pageSize: 10,
    })
    _this.list();
  },
  bindChange: function (e) {
    var _this = this;
    _this.setData({ currentTab: e.detail.current });
  },
  onReachBottom: function () {
    if (!this.data.loadOver) {
      this.setData({
        loadOver: false
      })
      this.list();
    }
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