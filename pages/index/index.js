// index.js
import { Config } from '../../utils/config.js';
import { Base } from '../../utils/base.js';
const utils = require('../../utils/util.js');
//实例化对象
var BaseObj = new Base();
// 获取应用实例
const app = getApp()

Page({
  data: {
    baseUrl: Config.baseUrl, //图片路径
    notice: [], //公示公告
    activity: [], //社区活动
    news: [], //社区新闻
    bannerArr:[], //轮播图
    showLoading: true, //加载中动画

    wuyeName: '', //配置信息、小区物业名字
    story: [], //社区故事
    storeActivity: [], //店铺活动
    hotShop: [], //热销商品
    currPage: 1, //新品推荐分页页数
    totalPage: '', //新品推荐总页数
    newShop: [], //新品推荐商品
    repa: '', //正在维修的维修订单
   
    swiperCurrent:0,
    bannerName:Config.bannerName, //名称
    bannerDesc:Config.bannerDesc, //描述
  },

  
  onLoad() {
    this.getBannerList();
    this.indexArticle();

  },
  //获取bannerlist
  getBannerList:function(){
    var that = this;
    var parame ={
      url : Config.getBanner,
      sCallback:function(res){
        that.setData({
          bannerArr: res,
          baseUrl:Config.baseUrl,
          showLoading:false
        });  
      }
    }
    BaseObj.request(parame);
  },
  // 公告快讯 新闻 活动 
  indexArticle:function(){
    var that=this;
    var parame = {
      url: Config.getArticle,
      sCallback:function(res){
        let activeList = res.activeList.map(item=>{
          item.create_time = utils.formatTime(item.create_time,'Y-M-D');
          return item;
        });
        let newsList = res.newsList.map(item=>{
          item.create_time = utils.formatTime(item.create_time,'Y-M-D');
          return item;

        });     
        let noteList = res.noteList.map(item=>{
          item.create_time = utils.formatTime(item.create_time,'Y-M-D');
          return item;
        });
        that.setData({
          notice: noteList,
          news: newsList,
          activity: activeList
        });
      }
    };
    BaseObj.request(parame);
  },

   /** 轮播图的切换事件*/
   bannerChange: function (e) { 
    var index = e.detail.current;
    this.setData({
      swiperCurrent: e.detail.current,   //获取当前轮播图片的下标
      bannerName:this.data.bannerArr[index].name,
      bannerDesc:this.data.bannerArr[index].description,
    })
    
  },

  //查看公告列表
  bindtapMoreArticle:function(e){
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `../articlelist/articlelist?type=${type}`
    }) 
  },
  //跳转到详情页
  bindtapArticleDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    });
  },
  //分享
  onShareAppMessage:function(res){
    return{
      title: Config.applet,
      path:'pages/start/start'
    }
  }

})
