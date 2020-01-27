// pages/home/home.js
const app = getApp()
wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[
      "cloud://acic-environment-efubl.6163-acic-environment-efubl-1300760865/banner/FB Cover picture.png",
      "cloud://acic-environment-efubl.6163-acic-environment-efubl-1300760865/banner/QQ截图20200106172716.jpg",
      "cloud://acic-environment-efubl.6163-acic-environment-efubl-1300760865/banner/slider.png",
      "cloud://acic-environment-efubl.6163-acic-environment-efubl-1300760865/banner/sp160827_215638.png"
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 获取数据库中活动和学校数据
   */
  getData: function() {
    db.collection("events").where({
      type: "lecture"
    }).get({
      success: res => {
        app.globalData.lectures = res.data;
      }
    })
    db.collection("events").where({
      type: "activity"
    }).get({
      success: res => {
        app.globalData.activities = res.data;
      }
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