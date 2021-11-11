// pages/wuye/wuye.js
import {Config} from "../../utils/config.js";
import { Base } from '../../utils/base.js';
var BaseObj = new Base();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    payMent:[],//存储账单记录
    showAdd:true,
    showAddForm:false,
    showTitle:'',
    needPay:0,
    payData:[]  //存储需要支付的那个记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyPayMent();
  },
  getMyPayMent:function(){
    var that = this;
    var parame = {
      url:Config.getPayMent,
      needShowMessage:true,
      sCallback:function(res){
        var payMent = res.payMent;
        var needPay = res.needPay;
        if(needPay == 0){
           //不需要缴纳，就不要有 添加按钮
          that.setData({showAdd:false});
          var showTitle = '本年度该物业已缴纳！'
        }else{
          var showTitle = '本年度该物业还未缴纳！'
        }
        that.setData({
          payMent:payMent,
          showTitle:showTitle,
          needPay:needPay
        })
      },
      eCallback:function(err){
        //non to do 
      }
     
    }
    BaseObj.request(parame);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  bindtapAddpayment:function(){
    var that = this;
    this.setData({showLoading:true});
    var parame = {
      url:Config.needPay,
      sCallback:function(res){
        that.setData({showAddForm:true,showLoading:false,payData:res});
      }
    }
    BaseObj.request(parame);
  },

  bindtapSurePay:function(){

  },
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