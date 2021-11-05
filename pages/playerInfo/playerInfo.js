// pages/playerInfo/playerInfo.js
import {Config} from "../../utils/config.js";
import {Base} from '../../utils/base.js';
const utils = require('../../utils/util.js');

var BaseObj = new Base();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: Config.baseUrl, //图片路径
    showLoading: true,
    player_id:'', //选手ID
    subject_id:'', //项目ID
    player:[], //选手信息
    datasNumber: [], //数量接口
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var player_id = options.player_id;
    this.setData({
      player_id:player_id
    })

    this.getplayerInfo();
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
  
  getplayerInfo:function(){
    var that = this;
    var parame = {
      url:Config.playerInfo,
      data:{player_id:this.data.player_id},
      type:'post',
      sCallback:function(res){
        if(res.content){
          res.content = utils.imageUrlReplace(res.content);
        }
        that.setData({
          player: res, 
          showLoading: false
        });
      }
    };
    BaseObj.request(parame);
  },

  playerSetVotes:function(e){
    var that = this;
    var player_id = this.data.player_id;
    var subject_id = e.currentTarget.dataset.subjectid;
    var parame = {
      url:Config.submitVote,
      data:{player_id:player_id,subject_id:subject_id},
      type:'post',
      needShowMessage:true,
      sCallback:function(res){
         //更新节点数据
         var player = that.data.player;
        player.votes += 1;
         that.setData({
           player:player
         })
      }
    }; 
    BaseObj.request(parame);
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