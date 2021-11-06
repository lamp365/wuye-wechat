// pages/subjectInfo/subjectInfo.js
import {Config} from '../../utils/config.js';
import {Base} from '../../utils/base.js';
var util = require('../../utils/util.js');
var BaseObj = new Base();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: Config.baseUrl, //图片
    showLoading: true, //加载动画
    masktop: '', //是否显示商品分类
    currPage: 1, //当前页数
    totalPage: '', //总页数
    subjectData: [], //项目信息
    playerData: [], //选手数据
    contents:'', //活动内容
    isHideContent: true, //判断活动规则关闭 开关
   
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var subject_id = options.subject_id;
    this.getSubjectInfo(subject_id);
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
  getSubjectInfo:function(subject_id){
    var that = this;
    var parame = {
      url:Config.oneSubject,
      data:{subject_id:subject_id},
      type:'post',
      sCallback:function(res){
        that.setData({
          subjectData:res,
          playerData:res.playerList,
          showLoading:false,
          content:util.imageUrlReplace(res.content)
        });
      }
    }
    BaseObj.request(parame);
  },

  bindtapPlayerInfo:function(e){
    var player_id = e.currentTarget.dataset.playerid;
    wx.navigateTo({
      url: `../playerInfo/playerInfo?player_id=${player_id}`,
    })
  },
  catchtapStopMaopao:function(){
    return false;
  },

  bindtapSubmitVote:function(e){
    var that = this;
    var player_id = e.currentTarget.dataset.playerid;
    var subject_id = e.currentTarget.dataset.subjectid;
    var index = e.currentTarget.dataset.index;
    var parame = {
      url:Config.submitVote,
      data:{player_id:player_id,subject_id:subject_id},
      type:'post',
      needShowMessage:true,
      sCallback:function(res){
         //更新节点数据
         var player = that.data.playerData;
         for(let i in player){
             if(i == index){
               player[i].votes =  player[i].votes * 1+1;
             }
         }
         that.setData({
          playerData:player
         })
      }
    }; 
    BaseObj.request(parame);
  },

  bindtapSearch:function(){
    wx.navigateTo({
      url: '../search/search?type=1', //1是查询选手
    })
  },
  bindClose:function(){
    this.setData({
      isHideContent:true,
    });
  },
  //查看详情规则
  bindtapSubjectContent:function(){
    this.setData({
      showLoading: false,
      isHideContent:false,
    });    
  },
  bindtapAllSubject:function(){
    wx.navigateTo({
      url: '../subjectList/subjectList',
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