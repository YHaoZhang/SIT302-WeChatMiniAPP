var app = getApp();
wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();
const _ = db.command;
// pages/events/eventsDetails/ComingEvents_choose/ComingEvents_more/CompleteDetails/CompleteDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eventID:"",
    studentID: "",
    name:"",
    phone:""
  },

  hasRegistered: function(){
    db.collection("events").where({
      _id: this.data.eventID,
      participants: _.exists(true),
    }).get({
      success: res => {
        console.log(res.data[0].participants);
        var parts = res.data[0].participants;
        console.log(this.data.name,this.data.phone,parts.length);
        for (var i = 0; i < parts.length; i++) { 
          console.log(parts[i].name,parts[i].phone);
          if( parts[i].name == this.data.name && parts[i].phone == this.data.phone){
            console.log("找到重复的");
            return true;
          }
        }
        console.log("未重复");
        return false;
      },
      fail: err => {
        console.log("未重复");
        return false;
      }
      
    })
  },

  formSubmit: function(){
    wx.showLoading({
      title: 'Registering...',
    })
    var res = this.hasRegistered();
    if(!res){
      console.log("正在注册");
      wx.cloud.callFunction({
        name: 'registerEvent',
        data: {
          eventID: this.data.eventID,
          name: this.data.name,
          phone: this.data.phone
        },
        success: function (res) {
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
      }),
      wx.cloud.callFunction({
        name: 'registerEventStudent',
        data: {
          eventID: this.data.eventID,
          studentID: this.data.studentID,
        },
        success: function (res) {
          db.collection('students').where({
            userID: app.globalData.openid
          }).get({
          success: res => {
            app.globalData.student = res.data[0];
          }
        })
        }
      }),
      console.log("注册完成");
      wx.hideLoading()
      wx.showToast({
        title: 'successful',
        icon: 'success',
        duration: 1000
      })
      setTimeout(function(){
        wx.navigateBack({})
      },2000)
    }
    else{
      console.log("无法注册");
      wx.hideLoading()
      wx.showToast({
        title: '重复注册',
        icon: 'false',
        duration: 2000
      })
      setTimeout(function(){
        wx.navigateBack({})
      },2000)
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == "0") {
      this.setData({
        eventID: app.globalData.activities[options.idx]._id
      })
    } else if (options.type == "1") {
      this.setData({
        eventID: app.globalData.lectures[options.idx]._id
      })
    }
    this.setData({
      studentID : app.globalData.student._id
    })
  },

  bindNameInput:function(e){
    this.setData({
      name: e.detail.value
    })
  },

  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
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