let util = require('../../utils/util')

Page({
  data: {
    list: []
  },
  normalList: function(){
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
  onLoad: function (options) {
    let _this = this;
    let list = { "pageNum": 1, "pageSize": 15, "size": 2, "startRow": 1, "endRow": 2, "total": 2, "pages": 1, "list": [{ "id": 3, "username": "13478659803", "realname": "顾客1", "recipientsPhone": "13478659803", "recipientsAddress": "我的地址新", "comment": "备注程度啊", "sumOrder": 0, "sumPay": null }, { "id": 4, "username": "13478659804", "realname": "顾客2", "recipientsPhone": "13478659804", "recipientsAddress": "我的地址得治大劳动节阿莱克斯的放假啦开始的分类考试的", "comment": "史蒂夫哇额玩儿为玩儿为", "sumOrder": 0, "sumPay": null }], "prePage": 0, "nextPage": 0, "isFirstPage": true, "isLastPage": true, "hasPreviousPage": false, "hasNextPage": false, "navigatePages": 8, "navigatepageNums": [1], "navigateFirstPage": 1, "navigateLastPage": 1, "firstPage": 1, "lastPage": 1 };
    _this.setData({
      list:list.list
    })
    //_this.normalList();
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