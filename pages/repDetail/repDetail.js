// pages/repDetail/repDetail.js
import {Config} from "../../utils/config.js";
import {Base} from '../../utils/base.js';

var BaseObj = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas: '', //详情信息
    showLoading: true,
    baseUrl:Config.baseUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getRepairDetail(id);
  },

  getRepairDetail:function(id){
    var that = this;
    var parame = {
      url : Config.repDetail,
      data:{id:id},
      type:'post',
      sCallback:function(res){
        that.setData({
          datas:res,
          showLoading:false
        })
      }
    };
    BaseObj.request(parame);
  },

  bindStocks:function(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '温馨提示',
      content:'您的报修是否已经完成',
      success:function(res){
        if(res.confirm){
          that.setData({
            showLoading: true
          });
          that.finishRepair(id);
        }
      }
    })
  },

  finishRepair:function(id){
    var that = this;
    var parame = {
      url:Config.finishRepair,
      data:{id:id},
      type:'post',
      needShowMessage:true,
      sCallback:function(res){
        that.setData({
          showLoading: false
        });
        that.onShow();
      }
    };
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