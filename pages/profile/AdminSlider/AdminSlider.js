// pages/profile/AdminSlider/AdminSlider.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  signClick: function (e) {
    var idx = parseInt(e.currentTarget.id);
    if (idx == 0) {
      wx.navigateTo({
        url: 'Publish/Publish',
      })
    } else if (idx == 1) {
      wx.navigateTo({
        url: '../../events/eventsDetails/ComingEvents_choose/ComingEvents_choose',
      })
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