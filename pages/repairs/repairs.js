// pages/repairs/repairs.js
import {Config} from "../../utils/config.js";
import {Base} from '../../utils/base.js';

var BaseObj = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [], //全部的类型数组
    flag: 0, //选中的下标
    index: 0, //选中的下标
    arrayName: [], //筛选出来的数组
    text: '', //输入的问题描述
    temp: [], //上传的图片
    address: '', //获取默认地址
    wuyeName: '', //物业名字
    showLoading: true,
    imgs: [], //评价上传后的图片
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