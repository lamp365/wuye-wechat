// index.js
import { Config } from '../../utils/config.js';
import { Base } from '../../utils/base';
//实例化对象
var BaseObj = new Base();
// 获取应用实例
const app = getApp()

Page({
  data: {
    baseUrl: Config.baseUrl, //图片路径
    notice: [], //公示公告
    showLoading: true, //加载中动画
    wuyeName: '', //配置信息、小区物业名字
    activity: [], //社区活动
    story: [], //社区故事
    storeActivity: [], //店铺活动
    news: [], //社区新闻
    hotShop: [], //热销商品
    currPage: 1, //新品推荐分页页数
    totalPage: '', //新品推荐总页数
    newShop: [], //新品推荐商品
    repa: '', //正在维修的维修订单
    bannerArr:[], //轮播图
    swiperCurrent:0,
    bannerName:Config.bannerName, //名称
    bannerDescription:Config.bannerDescription, //描述
  },

  
  onLoad() {
    this.getBannerList();

  },
  //获取bannerlist
  getBannerList:function(){
    var that = this;
    var parame ={
      url : Config.getBanner,
      sCallback:function(res){
        bannerArr: res;
        baseUrl:Config.baseUrl
      }
    }
    BaseObj.request(parame);
  },
  // 公告快讯
  indexArticle:function(){
    var parame = {
      url: Config.indexArticle,
      data: {pageNo:1,pageSize:6},
      type: 'post',
      sCallback:function(res){
        console(res);
      }
    };
    BaseObj.request(parame);
  }
})
