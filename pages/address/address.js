let util = require('../../utils/util')

Page({
  data: {
    addressList: [{
      recipients: '收货人',
      recipientsPhone: "13478659803",
      recipientsAddress: "收货人的地址",
      isDefaultAddress: false
    }]
  },
  getAddressList: function () {
    let _this = this;
    return false;
    util.ajax({
      method: 'GET',
      url: 'address',
      success: function (res) {
        let data = res.data.list;
        _this.setData({
          addressList: data
        });
      }
    });
  },
  setDefaultAddress: function (e){
    let _this = this;
    let index = e.currentTarget.dataset.index;
    let tmpArr = _this.data.addressList;
    let cur = tmpArr[index];
    cur.isDefaultAddress = !cur.isDefaultAddress;
    _this.setData({
      addressList: tmpArr
    })
  },
  deleteConfirm: function (e){
    let _this = this
   
    wx.showModal({
      title: '提示',
      content: '确定是否删除该地址',
      success: function (res) {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          let address = _this.data.addressList[index]
          console.log(address);
          return false
          let id = address.id
          util.ajax({
            method: 'PUT',
            url: 'v1/orders/' + _this.data.orderId,
            success: function (res) {
              util.message({ content: '操作成功' })
              wx.navigateBack({ delta: 1 })
            }
          });
        }
      }
    })
  },
  onLoad: function (options) {
    let _this = this;
    _this.getAddressList();
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