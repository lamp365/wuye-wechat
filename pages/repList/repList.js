// pages/repList/repList.js
import {Config} from "../../utils/config.js";
import {Base} from '../../utils/base.js';
var utils = require('../../utils/util.js');
var BaseObj = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    being: [], //正在维修
    showLoading: true, 
    baseUrl:Config.baseUrl,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  }, 

  getRepairList:function(){
    var that = this;
    var parame = {
      url:Config.repairList,
      sCallback:function(res){
        that.setData({
          being:res,
          showLoading:false
        })
      }
    }
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRepairList(); 
  },

  bindDetails:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../repDetail/repDetail?id='+id,
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
    this.onShow();
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