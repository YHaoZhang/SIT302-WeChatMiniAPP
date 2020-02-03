const app = getApp()
wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();
// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: {},

    hasUserInfo: false,
    openId: '',
    avatarUrl: './user-unlogin.png',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  manageActivities: function (e) {
    var idx = parseInt(e.currentTarget.id);
    wx.navigateTo({
      url: 'AdminSlider/AdminSlider' ,
    })
  },

  moreClick:function(e){
    var idx = parseInt(e.currentTarget.id);
    if(idx==0){
      wx.navigateTo({
        url: 'Account/Account'
      })
    }else if(idx==1){
      wx.navigateTo({
        url: 'Applications/Applications',
      })
    }else if(idx==2){
      wx.navigateTo({
        url: 'Notifications/Notifications',
      })
    }else if(idx==3){
      wx.navigateTo({
        url: 'Help/Help',
      })
    }else {
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取openid
    this.onGetOpenid();
  },
    
  /**
   * 调用云函数获取ID
   */
  onGetOpenid: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        // console.log('[云函数] [login] user info: ', res)
        app.globalData.openid = res.result.OPENID
        that.setData({
          openId: res.result.OPENID
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.showModal({
          title: 'Failed to get openid!',
          confirmText: 'Please reload',
          showCancel: false,
          content: e,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/profile/profile',
              })
            }
          }
        })
      }
    })
  },

  /**
   * 授权获取用户信息
   */
  bindGetUserInfo(e) {
    this.showLoading()
    let that = this
    wx.getSetting({
      success(suss) {
        if (suss.authSetting['scope.userInfo']) {
          // console.log("已授权=====")
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("获取用户信息成功", res)
              that.setData({
                hasUserInfo: true,
                nickName: res.userInfo.nickName,
                gender: res.userInfo.gender,
                avatarUrl: res.userInfo.avatarUrl
              })
              that.getDatabaseData()
              app.globalData.hasUserInfo = true
              wx.switchTab({
                url: '/pages/profile/profile',
              })
            },
            fail(err) {
              // console.log("获取用户信息失败", err)
            }
          })
        } else {
          // console.log("未授权=====")
          that.showSettingToast("Please authorize")
        }
      }
    })
    this.cancelLoading()
  },

  /**
  * shouw loading
  */
  showLoading: function () {
    wx.showToast({
      title: 'Logging in...',
      mask: true,
      icon: 'loading'
    });
  },

  /** 
   * cancel loadind
  */
  cancelLoading: function () {
    wx.hideToast();
  },

  showSettingToast: function (e) {
    wx.showModal({
      title: 'Authorization Required',
      confirmText: 'Setting',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/setting/setting',
          })
        }
      }
    })
  },

  /**
     * 往students中添加新用户
     * 从数据库中读取数据
     */
  getDatabaseData: function () {
    let that = this
    db.collection('students').where({
      userID: that.data.openId
    }).get({
      success: res => {
        // console.log('数据库students查询结果', res.data)
        if (res.data.length == 0) {
          db.collection('students').add({
            data: {
              userID: that.data.openId,
              age: 0,
              application: [],
              birthday: '',
              email_address: '',
              events: [],
              firstname: '',
              gender: that.data.gender,
              lastname: that.data.nickName,
              level: 0,
              phone_in_aus: '',
              phone_in_china: '',
              avatarUrl: that.data.avatarUrl,
            },
            success: ess => {
              // console.log("Success: add")
              db.collection('students').where({
                userID: that.data.openId
              }).get({
                success: res => {
                  app.globalData.student = res.data[0]
                  // console.log('globalData.student 再次获取完成')
                  this.setData({
                    student: app.globalData.student,
                    hasUserInfo: app.globalData.hasUserInfo
                  })
                },
                fail: err => {
                  // console.log('globalData.student 再次获取失败')
                }
              })
            },
            fail: err => {
              // console.log("Cannot add information to collection 'students'!!")
            }
          })
        } else if (app.globalData.openid === undefined) {
          console.log("OpenId undefined")
        } else {
          // console.log("information exit")
          app.globalData.student = res.data[0];
          this.setData({
            student: app.globalData.student,
            hasUserInfo: app.globalData.hasUserInfo
          })
        }
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
    this.setData({
      student: app.globalData.student,
      hasUserInfo: app.globalData.hasUserInfo
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