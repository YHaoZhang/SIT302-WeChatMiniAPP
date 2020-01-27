wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();
var app = getApp();
// pages/events/events.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    activities:[{}],
    lectures: [{}],
    times: 0
  },
  moreClick: function(e){
    var idx = parseInt(e.currentTarget.id);
    wx.navigateTo({
      url: 'eventsDetails/eventsDetails?type=' + this.data.currentTab + "&idx=" + idx,
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var act = JSON.parse(JSON.stringify(app.globalData.activities));
    // var lec = JSON.parse(JSON.stringify(app.globalData.lectures));
    // this.setData({
    //   activities: act.reverse(),
    //   lectures: lec.reverse(),
    // })
    // var act = JSON.parse(JSON.stringify(app.globalData.activities));
    // var lec = JSON.parse(JSON.stringify(app.globalData.lectures));

      // this.setData({
      //   activities: app.globalData.activities.reverse(),
      //   lectures: app.globalData.lectures.reverse(),
      // })
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
    this.data.times++;
    if( this.data.times == 1 ) {
      this.setData({
        activities: app.globalData.activities.reverse(),
        lectures: app.globalData.lectures.reverse(),
      })
    }
    else {
      this.setData({
        activities: app.globalData.activities,
        lectures: app.globalData.lectures,
      })
    }
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