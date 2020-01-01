var app=getApp();
// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: {}
  },
  manageActivities: function (e) {
    var idx = parseInt(e.currentTarget.id);
    wx.navigateTo({
      url: '../index/AdminSlider/AdminSlider' ,
    })
  },
  moreClick:function(e){
    var idx = parseInt(e.currentTarget.id);
    if(idx==0){
      wx.navigateTo({
        url: 'Notifications/Notifications',
      })
    }else if(idx==1){
      let array = JSON.stringify(this.data.student)
      wx.navigateTo({
        url: 'Account/Account?array=' + array,
      })
    }else if(idx==2){
      wx.navigateTo({
        url: 'Help/Help',
      })
    }else if(idx==3){
      wx.navigateTo({
        url: 'progress/progress',
      })
    }else {
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({
      student: app.globalData.student
    })
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