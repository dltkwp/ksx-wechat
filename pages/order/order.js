let util = require('../../utils/util')

var app = getApp()
Page({
  data: {
    currentTab: 0,

    pageNo: 1,
    pageSize: 10,
    loadOver: false,
    isloading: true,
    status: '',
    payType: ''
  },
  list: function () {
    let _this = this;
    let param = {
      pageNum: _this.data.pageNo,
      pageSize: _this.data.pageSize,
      isSupplier: false
    }

    if(_this.data.status){
      param.status = _this.data.status;
    }
    if(_this.data.payType){
      param.payType = _this.data.payType;
    }

    console.log(param)

    return false;

    util.ajax({
      method: 'GET',
      url: 'orders',
      data: param,
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
  onReachBottom: function () {
    if (!this.data.loadOver) {
      this.setData({
        loadOver: false
      })
      this.list();
    }
  },
  onLoad: function () {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
     _this.list();
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

    switch (e.target.dataset.current){
      case '0': { 
        _this.setData({
          status:'',
          payType:'',
          pageNo:1
        })
      } break;
      case '1': { 
        _this.setData({
          status: '',
          payType: 'check',
          pageNo:1
        })
      } break;
      case '2': { 
        _this.setData({
          status: 'WAIT',
          payType: '',
          pageNo:1
        })
      } break;
      case '3': { 
        _this.setData({
          status: 'DELIVERY',
          payType: '',
          pageNo:1
        })
      } break;
    }
    _this.list();
  }
})  