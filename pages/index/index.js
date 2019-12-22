//index.js
const app = getApp()
wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 获取openid
    this.onGetOpenid();

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.switchTab({
            url: '../home/home',
          })
        }
      }
    })
    db.collection('students').doc("c086ceb4-c6f7-41f5-bbf0-0ef4cb9284b7").get({
      success: res2 => {
        app.globalData.student=res2.data;
      }
    })
  },

  bindGetUserInfo (e) {
    if (e.detail.userInfo === undefined) {

    } else {
      console.log(e.detail.userInfo)
      wx.switchTab({
      url: '../home/home',
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user info: ', res)
        app.globalData.openid = res.result.openid
        // wx.switchTab({
        //   url: '../home/home',
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        // wx.navigateTo({
        //   url: '../deployFunctions/deployFunctions',
        // })
      }
    })
  },

  
})
