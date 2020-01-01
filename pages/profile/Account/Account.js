// pages/profile/Account/Account.js
var app = getApp();
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
    type: ['Male', 'Female'],
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
    this.setData({
      student: app.globalData.student
    })
  },
  dataSetting:function (){
    this.setData({
      gender: this.data.student.gender,
      firstName: this.data.student.firstname,
      lastName: this.data.student.lastname,
      birthday: this.data.student.birthday,
      phone_au: this.data.student.phone_in_aus,
      phone_ch: this.data.student.phone_in_china,
      email: this.data.student.email_address,
      id: this.data.student._id
    })
  },
  save: function () {
    console.log(this.data.gender)
    db.collection('students').doc(this.data.id).update({
      data: {
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
          title: 'successful',
          icon: 'success',
          duration: 1000
        });
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
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
    this.dataSetting()
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