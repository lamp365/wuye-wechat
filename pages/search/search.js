// pages/search/search.js
import {Config} from "../../utils/config.js";
import {Base} from "../../utils/base.js";
var BaseObj = new Base();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: Config.baseUrl, //图片路径
    hotSeek: [], //热搜商品
    inputValue: '', //input的value值
    currPage: 1, //当前页数
    totalPage: '', //总页数
    shops: [], //商品列表
    showSearch: true, //判断否显示热搜和历史搜索
    shopTitle: '', //搜索的分类
    typeValue: 1, //搜索分类的下标   1选手  2投票项目  3新闻  
    id:'', //活动项目
    showLoading: true, //加载动画
    pastSeek: [], //历史搜索
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeValue = options.type*1;
    switch(typeValue){
      case 1:
        var shopTitle = '选手';break;
      case 2:
        var shopTitle = '投票活动';break;
      case 3:
        var shopTitle = '新闻';break;
      default: 
        var shopTitle = '';
 
    }
    this.setData({
      typeValue:typeValue,
      shopTitle:shopTitle
    }) 
    this._getSystemInfo();
  }, 
 
  _getSystemInfo:function(){
    var that = this;
    var parame = {
      url : Config.systemInfo,
      sCallback : function(info){
        var hotSeek = info.des;
        if(hotSeek) 
          hotSeek = hotSeek.split(',');  //逗号转为数组
        else 
          hotSeek = [];
        that.setData({
          hotSeek:hotSeek, 
          showLoading : false
        }) 
      }
    }
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
    let pastSeek = wx.getStorageSync('seek_storageHistory');
    this.setData({pastSeek:pastSeek});
  
  },
  //input输入框，输入的内容
  bindInput(e) {
    // console.log(e.detail.value);
    this.setData({
      inputValue: e.detail.value,
    });
    //删除输入框内容
    if (!this.data.inputValue) {
      this.setData({
        currPage: 1, //当前页数
        totalPage: '', //总页数
        shops: [], //商品列表
        showSearch: true
      });
    }
  },

  bindtapTosearch:function(){
    if (!this.data.inputValue) {
      BaseObj._showMessageToast('搜索内容不能为空');
    } else {
      this.setData({
        currPage: 1, //当前页数
        totalPage: '', //总页数
        shops: [], //商品列表
      });
      this.getLists(this.data.typeValue);
    }
  },

  getLists:function(typeValue){
    this.setData({
      showLoading: false
    });
    //存入缓存
    this._setHistoryCache();
    //获取数据
    var that = this;
    var parame = {
      url:Config.searchData,
      data:{typeValue:typeValue,key:this.data.inputValue},
      type:'post',
      sCallback:function(res){
          that.setData({
            shops:res,
            showLoading:false,
            showSearch:false
          })
      }
    };
    BaseObj.request(parame);
  },

  _setHistoryCache:function(){
    let input = this.data.inputValue;
    console.log(history);
    if(this.data.pastSeek.length != 0 ){
      var history = this.data.pastSeek;
      this.data.pastSeek.forEach(item=>{
        if(item == input){
          let itemNumber = history.indexOf(item);
          history.splice(itemNumber,1);  //函数是 去除或者添加
        }
      });
      history.unshift(input);
    }else{
      var history = [];
      history.unshift(input);
    }
    var historys = history.slice(0,8);//截取8个
    //存入缓存
    wx.setStorageSync('seek_storageHistory',historys);
    this.setData({
      pastSeek: historys
    });
  },

    //点击热搜
    bindtapHot(e) {
      let indexs = e.currentTarget.dataset.index;
      this.setData({
        inputValue: this.data.hotSeek[indexs],
      });
      this.getLists(3);  //查询文章
    },

    //点击删除历史搜素
    bindtapDelete:function() {
      var that = this;
      wx.showModal({
        title: '温馨提示',
        content: '您是否删除历史搜素',
        success:function(res){
          if(res.confirm){
            //移除
            wx.removeStorageSync('seek_storageHistory');
            setTimeout(res => {
              BaseObj._showMessageToast('删除成功！');
            }, 300);
            that.setData({
              pastSeek: ''
            });
          }else{
              console.log('用户点击取消');
          }
        }
      })
    },

      //历史搜索
  bindtapPast(e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      inputValue: item
    });
    this.getLists(this.data.typeValue);
  },

    //跳转到文章详情页面
    bindtapArticle:function(e){
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: `../detail/detail?id=${id}`
      });
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