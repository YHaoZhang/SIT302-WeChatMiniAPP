//index.js
const app = getApp()
wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();

Page({
  data: {
    hasUserInfo: false,
    openId: '',
    avatarUrl: './user-unlogin.png',
    userInfo: null,
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
  },

  /**
   * 获取用户信息
   */
  bindGetUserInfo (e) {
    this.showLoading()
    let that = this
    wx.getSetting({
      success(suss) {
        if (suss.authSetting['scope.userInfo']) {
          console.log("已授权=====")
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
              wx.switchTab({
                url: '../home/home',
              })
              // that.setData({
              //   name: res.userInfo.nickName
              // })
            },
            fail(err) {
              console.log("获取用户信息失败", err)
            }
          })
        } else {
          console.log("未授权=====")
          that.showSettingToast("请授权")
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
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
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
        console.log('数据库students查询结果', res.data)
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
              console.log("Success: add")
              db.collection('students').where({
                userID: that.data.openId
              }).get({
                success: res =>{
                  app.globalData.student = res.data[0]
                  console.log('globalData.student 再次获取完成')
                },
                fail: err => {
                  console.log('globalData.student 再次获取失败')
                }
              })
            },
            fail: err => {
              console.log("Cannot add information to collection 'students'!!")
            }
          })
        } else if (app.globalData.openid === undefined) {
          console.log("OpenId undefined")
        } else {
          console.log("information exit")
          app.globalData.student = res.data[0]
        }
      }
    })
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
   * 调用云函数获取ID
   */
  onGetOpenid: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user info: ', res)
        app.globalData.openid = res.result.OPENID
        that.setData({
          openId: res.result.OPENID
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.showModal({
          title: '获取openid失败！',
          confirmText: '请重新加载',
          showCancel: false,
          content: e,
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../index/index',
              })
            }
          }
        })
      }
    })
  },
})
