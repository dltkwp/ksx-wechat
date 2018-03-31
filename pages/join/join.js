let util = require('../../utils/util')
Page({
  data: {
    list:[],
    levelId:0
  },
  agentList : function(){
    let _this = this;
    util.ajax({
      method: 'GET',
      url: 'v1/paypluses',
      success: function (res) {
          let data = res.data;
          _this.setData({
            list:data
          })
      }
    });
  },
  itemChange: function(event){
     let _this = this;
     let cur = _this.data.list[event.target.dataset.index];
     _this.setData({
      levelId : cur.id
     });
  },
  pageSubmit: function(){
    let _this = this;
    if(_this.data.levelId==0){
      util.message({
        content:'请选择一个加盟方案'
      })
    }
  },
  onLoad: function (options) {
     let _this = this;
     //_this.agentList();
    let data = [{"id":3,"levelName":"登记名称1","discount":6,"initialFee":205.00},{"id":7,"levelName":"qw1111","discount":4,"initialFee":87567.00}];
     
     _this.setData({
      list : data
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