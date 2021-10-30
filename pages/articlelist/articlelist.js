// pages/articlelist/articlelist.js
import { Config } from "../../utils/config.js";
import { Base } from "../../utils/base.js";
const utils = require('../../utils/util.js');
var BaseObj = new Base();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:[],  //请求的数据
    currPage:1,
    totalPage: '', //总页数
    showLoading:true,//加载动画
    articleType:'', //文章类型,
    pageTitle:'列表', //文章类型
    isShowNews:false,
    isShowNote:false,
    baseUrl:Config.baseUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isShowNews = false;
    var isShowNote = false;
      var type = options.type;
      switch(type){
        case 'active':
          var pageTitle = '活动列表';
          isShowNews = true;
          break;
        case 'news':
          var pageTitle = '新闻列表';
          isShowNews = true;
          break;
        case 'note':
          var pageTitle = '公告列表';
          isShowNote = true;
          break;  
      };
      this.setData({
        articleType : options.type,
        pageTitle : pageTitle,
        isShowNews:isShowNews,
        isShowNote:isShowNote
      });

      //设置标题
      this.setPageTitle();
      //请求数据
      this._getArticleList();
  },
  setPageTitle:function(){
    wx.setNavigationBarTitle({
      title: this.data.pageTitle
    })
  },

  _getArticleList:function(){
    var that= this;
    var parame = {
      page:this.data.currPage,
      url:Config.getArticleList,
      type:'post',
      data:{type:this.data.articleType},
      sCallback:function(res){
        var article_data = res.map(item=>{
          item.create_time = utils.formatTime(item.create_time,'Y-M-D');
          return item;
        });
        that.setData({
          article : article_data,
          showLoading:false 
        }) 
      }
    }
    BaseObj.request(parame);
  },

  //跳转到详情页
  bindtapArticleDetail:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`
    });
  },
  //分享
  onShareAppMessage: function (res) {
    return {
      title: Config.applet,
      path: 'pages/start/start'
    };
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