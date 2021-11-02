// pages/vote/vote.js
import {Config} from "../../utils/config.js";
import { Base } from '../../utils/base.js';
var BaseObj = new Base();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showLoading:true,
    baseUrl: Config.baseUrl, //图片路径
    imgUrls: [], //大轮播图
    images: [], //小轮播图
    currPage: 1, //选手列表分页页数
    totalPage: '', //新品推荐总页数
    subjectList: [], //活动
    player: [], //投票项目选手

    getSelfShopId: '', //自营店铺ID
    seckill: [], //投票项目
    times: [], //优惠秒杀倒计时
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSubjectList();  
    this.getPlayerList();
  },

  getSubjectList:function(){
    var that = this;
    var parame = {
      url : Config.subject,
      sCallback:function(res){
        that.setData({
          subjectList:res,
          showLoading:false
        })
      }
    };
    BaseObj.request(parame);
  },

  getPlayerList:function(){
    var that = this;
    var parame = {
      url:Config.player,
      data:{p:this.data.currPage,size:4},
      type:'post',
      sCallback:function(res){
          let player = that.data.player.concat(res.data);
          that.setData({
            player:player,
            totalPage:res.last_page,
            currPage:res.current_page,
            showLoading:false
          })
      }

    };
    BaseObj.request(parame);
  },
    //分享
    onShareAppMessage: function(res) {
      return {
        title: Config.applet,
        path: 'pages/start/start'
      };
    },

    //跳转到 项目列表
    bindtapSubjectMore:function(){
      wx.navigateTo({
        url: '../subjectList/subjectList',
      })
    },
    //跳转到项目详情页面
    bindtapSubjectOne:function(e){
      var subject_id = e.currentTarget.dataset.subjectid;
      wx.navigateTo({
        url: '../subjectInfo/subjectInfo?subject_id='+subject_id
      })
    },
    //跳转到选手 详情页面
    bindtapPlayerInfo:function(e){
      var player_id = e.currentTarget.dataset.playerid;
      wx.navigateTo({
        url: '../playerInfo/playerInfo?player_id='+player_id
      })
    },
    //阻止冒泡
    catchtapStopMaoPao:function(){
      return false; 
    },
    //投一票
    bindtapPlayerVote:function(e){
      var player_id = e.currentTarget.dataset.playerid;
      var subject_id = e.currentTarget.dataset.subjectid;
      var index = e.currentTarget.dataset.index;
      var parame = {
        url:Config.submitVote,
        data:{player_id:player_id,subject_id:subject_id},
        type:'post'
      }; 
      var data = BaseObj.request(parame);
      console.log(data);
      // BaseObj._showMessageToast(data.msg);
      if(data.code == 200){
        //更新节点数据
        var player = this.data.player;
        for(let i in player){
            if(i == index){
              player[i].votes =  player[i].votes * 1+1;
            }
        }
        this.setData({
          player:player
        })
      }
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.currPage*1 < this.data.totalPage*1){
      var page = this.data.currPage * 1 +1;
      this.setData({
        currPage:page,
        showLoading: true
      });
      this.getPlayerList();
    }
  },


})