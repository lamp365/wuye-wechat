// pages/subjectList/subjectList.js
import {Config} from '../../utils/config.js';
import {Base} from '../../utils/base.js';
var BaseObj = new Base();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: Config.baseUrl, //图片路径
    allSubject: [], //项目数据
    number:0,
    totalPage: '', //总页数
    currPage: 1,  //当前页数
    showLoading: true, //是否显示加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllSubjectList();
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

  getAllSubjectList:function(){
    var that = this;
    var parame = {
      url:Config.subject,
      sCallback:function(res){
        that.setData({
          allSubject:res,
          showLoading: false
        });
      }
    }
    BaseObj.request(parame);
  },

  bindtapSubjectInfo:function(e){
    var subject_id =  e.currentTarget.dataset.subjectid;
    wx.navigateTo({
      url: '../subjectInfo/subjectInfo?subject_id='+subject_id,
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
    return {
      title: Config.applet,
      path: 'pages/start/start'
    };
  }
})