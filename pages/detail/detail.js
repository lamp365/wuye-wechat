// pages/detail/detail.js
import { Config} from "../../utils/config.js";
import {Base} from "../../utils/base.js";
const utils = require('../../utils/util.js');
var BaseObj = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading:true,
    title:'',
    content:'',
    time:'',
    cat_name:'详情'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this._getDetail(id)
  },

  _getDetail:function(id){
    var that = this;
    var parame = {
      url : Config.articleDetail,
      data:{id:id},
      type:'post',
      sCallback:function(res){
        // console.log(res);
        var time = '';
        if(res)
          time = utils.formatTime(res.create_time,'Y-M-D');
        that.setData({
          showLoading:false,
          title:res.title,
          content:utils.imageToFull(res.content),
          time:time,
          cat_name:res.cat_name
        });
        wx.setNavigationBarTitle({
          title: res.cat_name
        })
      }
    }
    BaseObj.request(parame);
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