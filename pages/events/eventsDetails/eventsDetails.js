var app = getApp();
// pages/events/eventsDetails/eventsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    event:{},
    duration: "",
    type: 0,
    idx: 0
  },
  moreClick: function (e) {
    var idx = parseInt(e.currentTarget.id);
    wx.navigateTo({
      url: 'ComingEvents_choose/ComingEvents_more/CompleteDetails/CompleteDetails?type=' + this.data.type + '&idx=' + this.data.idx,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type,
      idx: options.idx
    })
    if(options.type == "0"){
      this.setData({
        event: app.globalData.activities[options.idx]
      })
    }else if(options.type == "1"){
      this.setData({
        event: app.globalData.lectures[options.idx]
      })
    }
    var h = parseInt(this.data.event.duration / 60);
    var m = this.data.event.duration % 60;
    var d = h + "H " + m + " M ";
    this.setData({
      duration: d 
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})