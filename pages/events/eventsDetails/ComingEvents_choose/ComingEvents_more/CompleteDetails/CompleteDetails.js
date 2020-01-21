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

  // hasRegistered: function(){
  //   db.collection("events").where({
  //     _id: this.data.eventID,
  //     participants: _.exists(true),
  //   }).get({
  //     success: res => {
  //       console.log(res.data[0].participants);
  //       var parts = res.data[0].participants;
  //       console.log(this.data.name,this.data.phone,parts.length);
  //       for (var i = 0; i < parts.length; i++) { 
  //         console.log(parts[i].name,parts[i].phone);
  //         if( parts[i].name == this.data.name && parts[i].phone == this.data.phone){
  //           console.log("找到重复的");
  //           return true;
  //         }
  //       }
  //       console.log("未重复");
  //       return false;
  //     },
  //     fail: err => {
  //       console.log("未重复");
  //       return false;
  //     }
      
  //   })
  // },

  formSubmit: function(){
    //只是等待上一个完成后就进行下一个不关心上一个的状态,没有数据的交互
    this.test()
    .then(jj =>{
      //这里是将test方法中resolve返回值赋值给下一个方法,
      //在这里可以对数据进行判断是否继续进行
      return this.runAsync1(jj);
    })
 },

 test: function(){
  let that = this;
  var flag = false;
  var p = new Promise(function (resolve, reject) {
    db.collection("events").where({
      _id: that.data.eventID,
      participants: _.exists(true),
    }).get({
      success: res => {
        console.log(res.data[0].participants);
        var parts = res.data[0].participants;
        console.log(that.data.name,that.data.phone,parts.length);
        var i;
        for (i = 0; i < parts.length; i++) {
          if( parts[i].name == that.data.name && parts[i].phone == that.data.phone){
            console.log("找到重复的");
            flag = true;
            break;
          }
        }
        if( i == parts.length) {
          console.log("未重复");
          flag = false;
        }

      },
      fail: err => {
        console.log("未重复");
        flag = false;
      }
    })
    setTimeout(function () {
    //注意:一旦你把promise的状态定义了哪他的状态就不会再改变.
    //比如我这里先写的resolve下面又跟着写了reject,reject的代码会执行但是promise的状态是不会变的就是reject
      resolve(flag);
    }, 500);
  })
  return p;
},

runAsync1 :function(mm){
  let that = this;
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    wx.showLoading({
      title: 'Registering...',
    })
    if(!mm){
      console.log("正在注册");
      wx.cloud.callFunction({
        name: 'registerEvent',
        data: {
          eventID: that.data.eventID,
          name: that.data.name,
          phone: that.data.phone
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
          eventID: that.data.eventID,
          studentID: that.data.studentID,
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
        image: '/img/correct.png',
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
        title: 'repeated',
        icon: 'none',
        image: '/img/cross.png',
        duration: 3000
      })
      setTimeout(function(){
        wx.navigateBack({})
      },2000)
    }
    setTimeout(function () {
      resolve("完成插入");
    }, 3000);
  });
  return p;
},

  // formSubmit: function(){
  //   wx.showLoading({
  //     title: 'Registering...',
  //   })
  //   var res = this.hasRegistered();
  //   if(!res){
  //     console.log("正在注册");
  //     wx.cloud.callFunction({
  //       name: 'registerEvent',
  //       data: {
  //         eventID: this.data.eventID,
  //         name: this.data.name,
  //         phone: this.data.phone
  //       },
  //       success: function (res) {
  //         db.collection("events").where({
  //           type: "lecture"
  //         }).get({
  //           success: res => {
  //             app.globalData.lectures = res.data;
  //           }
  //         })
  //         db.collection("events").where({
  //           type: "activity"
  //         }).get({
  //           success: res => {
  //             app.globalData.activities = res.data;
  //           }
  //         })
  //       },
  //     }),
  //     wx.cloud.callFunction({
  //       name: 'registerEventStudent',
  //       data: {
  //         eventID: this.data.eventID,
  //         studentID: this.data.studentID,
  //       },
  //       success: function (res) {
  //         db.collection('students').where({
  //           userID: app.globalData.openid
  //         }).get({
  //         success: res => {
  //           app.globalData.student = res.data[0];
  //         }
  //       })
  //       }
  //     }),
  //     console.log("注册完成");
  //     wx.hideLoading()
  //     wx.showToast({
  //       title: 'successful',
  //       icon: 'success',
  //       duration: 1000
  //     })
  //     setTimeout(function(){
  //       wx.navigateBack({})
  //     },2000)
  //   }
  //   else{
  //     console.log("无法注册");
  //     wx.hideLoading()
  //     wx.showToast({
  //       title: '重复注册',
  //       icon: 'false',
  //       duration: 2000
  //     })
  //     setTimeout(function(){
  //       wx.navigateBack({})
  //     },2000)
  //   }
  // },

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