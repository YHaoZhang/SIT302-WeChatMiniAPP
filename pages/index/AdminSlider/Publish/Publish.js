// pages/index/AdminSlider/Publish/Publish.js
wx.cloud.init({ env: 'acic-environment-efubl' });
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carWin_img_hidden: true, 
    carWin_img: "" ,
    title:"",
    address:"",
    brief:"",
    description:"",
    dH:0,
    dM:0,
    duration:0,
    time:"12:00",
    date:"2019-12-30",
    type: ['lecture', 'activity'],
    index:0
  },
  poster:function(){
    var that= this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        var filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.setData({
          carWin_img: filePath, //把照片路径存到变量中，
          carWin_img_hidden: false, //让展示照片的view显示
        });
      }
      
    })
  },
  publish:function(){
    var d = parseInt(this.data.dH) * 60 + parseInt(this.data.dM);
    this.setData({
      duration: d,
    })
    console.log(this.data.duration);
    console.log(this.data.startTime)
    db.collection('events').add({
      data:{
        title:this.data.title,
        address:this.data.address,
        brief:this.data.brief,
        description:this.data.description,
        duration: this.data.duration,
        startDate:this.data.date,
        startTime:this.data.time,
        type:this.data.type[this.data.index]
      },
      success:function(res){
        wx.showToast({
          title: 'successful',
          icon: 'success',
          duration: 1000
        });
      }
    })
    
  },
  bindTitleInput: function(e){
    this.setData({
      title:e.detail.value
    })
  },
  bindAddressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },
  bindBriefInput: function (e) {
    this.setData({
      brief: e.detail.value
    })
  },
  bindDescriptionInput: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  bindTimePicker: function(e){
    this.setData({
      time:e.detail.value
    })
  },
  bindDatePicker: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTypePicker: function(e){
    this.setData({
      index: e.detail.value
    })
  },
  bindDHInput: function (e) {
    this.setData({
      dH: e.detail.value
    })
  },
  bindDMInput: function (e) {
    this.setData({
      dM: e.detail.value
    })
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