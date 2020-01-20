// pages/profile/Account/Account.js
let app = getApp();
wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student: {},
    firstName: "",
    lastName: "",
    gender: 0,
    type: ['Female', 'Male'],
    birthday: "",
    phone_au: "",
    phone_ch: "",
    email: "",
    id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  dataSetting: function (e) {
    this.setData({
      gender: e.gender,
      firstName: e.firstname,
      lastName: e.lastname,
      birthday: e.birthday,
      phone_au: e.phone_in_aus,
      phone_ch: e.phone_in_china,
      email: e.email_address,
      id: e._id
    })
  },

  /**
   * Save function
   */
  save: function () {
    this.showLoading("Altering")
    wx.cloud.callFunction({
      name: 'update_students',
      data: {
        id: this.data.id,
        firstname: this.data.firstName,
        lastname: this.data.lastName,
        gender: this.data.gender,
        birthday: this.data.birthday,
        phone_in_aus: this.data.phone_au,
        phone_in_china: this.data.phone_ch,
        email_address: this.data.email
      },
      success: res => {
        wx.showToast({
          title: 'Succeed in altering',
          icon: 'success',
          duration: 1000
        });
        this.showLoading("Updating")
        db.collection('students').doc(this.data.id).get({
          success: res => {
            app.globalData.student = res.data
            wx.showToast({
              title: 'Succeed in updating',
              icon: 'success',
              duration: 1000
            });
            wx.navigateBack({})
          }
        })
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  //Loading function
  showLoading: function (e) {
    wx.showToast({
      title: e,
      mask: true,
      icon: 'loading'
    });
  },
  
  //cancel loading 
  cancelLoading: function () {
    wx.hideToast();
  },

  bindDatePicker: function (e) {
    this.setData({
      birthday: e.detail.value
    })
  },
  bindGenderPicker: function (e) {
    this.setData({
      gender: e.detail.value
    })
  },
  bindFirstNameInput: function (e) {
    this.setData({
      firstName: e.detail.value
    })
  },
  bindLastNameInput: function (e) {
    this.setData({
      lastName: e.detail.value
    })
  },
  bindPhoneAUInput: function (e) {
    this.setData({
      phone_au: e.detail.value
    })
  },
  bindPhoneCHInput: function (e) {
    this.setData({
      phone_ch: e.detail.value
    })
  },
  bindEmailInput: function (e) {
    this.setData({
      email: e.detail.value
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
      student: app.globalData.student
    })
    this.dataSetting(this.data.student)
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
    // let pages = getCurrentPages(); //页面栈
    // let beforePage = pages[pages.length - 2];//上一级页面
    // beforePage.onLoad()
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