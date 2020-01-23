// pages/events/eventsDetails/ComingEvents_choose/ComingEvents_more/CustomerDetails/CustomerDetails.js
wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    participants: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     //将字符串转换成对象
     var bean = JSON.parse(options.par);
     if(options.par == null){
       wx.showToast({
         title: 'Null data',
       })
       return;
     }
       this.setData({
        participants:bean
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