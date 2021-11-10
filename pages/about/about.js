import { Config } from "../../utils/config.js";
import { Base } from "../../utils/base.js";
var BaseObj = new Base();
// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    address:'',
    email:'',
    showLoading:true,
    appName:Config.applet,
    appDesc:Config.bannerDesc,
    wuyeName:Config.bannerName
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
  },

  getSystemInfo:function(){
    var that = this;
    var parame = {
      url:Config.systemInfo,
      sCallback:function(res){
        that.setData({
          phone:res.tel,
          address:res.ads,
          email:res.email,
          showLoading:false
        })
      }
    }
    BaseObj.request(parame);
  },
  //打电话
  bindPhone:function(){
    wx.makePhoneCall({
      phoneNumber: this.data.phoneNo
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