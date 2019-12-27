// pages/search/search.js

const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input:'',
    searchList: [],
  },
  searchInput:function(e){
    this.setData({
      input: e.detail.value
    })
  },
  searchSubmit: function () {
    console.log(this.data.input)
    //Search in the database
    let that = this
    if (that.data.input!='')
    {
      //Loading
      this.showLoading()
      db.collection('schools').where({
        //使用正则查询，实现对搜索的模糊查询
        //name: that.data.input
        //"The University of Melbourne"
        name: db.RegExp({
          regexp: that.data.input,
          //从搜索栏中获取的value作为规则进行匹配。
          options: 'i',
          //大小写不区分
        })
      }).get({
        success: res => {
          console.log(res)
          that.setData({
            searchList: res.data
          })
        },
        fail: err => {
          console.log("************fail*************")
        }
      })
      //this.cancelLoading()
    }
    //hide the loading

    // var idx = parseInt(e.currentTarget.id);
    // wx.navigateTo({
    //   url: 'searchResults/searchResults?str=' + idx,
    // })
  },
  //Loading function
  showLoading: function () {
    wx.showToast({
      title: 'Loading',
      mask: true,
      icon: 'loading'
    });
  },
  //cancel loading 
  cancelLoading: function () {
    wx.hideToast();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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