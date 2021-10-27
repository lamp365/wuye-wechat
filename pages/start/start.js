// pages/start/start.js
import { Config } from '../../utils/config';
import { Base } from '../../utils/base';

//实例化对象
var BaseObj = new Base();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    datas : '',
    showLoading : true,
    time: 50,
    interval: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取token
    var token = wx.getStorageSync(Config.tokenName);
    if(token){
      setTimeout(function(){
        wx.switchTab({
          url: '../index/index',
        })
      },2000)
    }
   if(!token){
     BaseObj.getTokenFromServer()
   }

   this._getSystemInfo((info)=>{
      this.setData({
        datas:{'system_name':info.name,'system_desc':info.title},
        showLoading : false
      }) 
   });

  
  },
  
  _getSystemInfo: function(callback){
    var parame = {
      url : Config.systemInfo,
      sCallback : function(res){
        callback(res)
      }
    }
    BaseObj.request(parame);
  },

  //得到用户信息
  bindGetUserInfo: function(e){
    wx.getSetting({
      success: function(res){
        if(res.authSetting['scope.userInfo'] == true){
          var user = e.detail.userInfo;
          // console.log(user); 
          var parame = {
            url : Config.modifyUser,
            type: 'post',
            data : {nickname:user.nickName,avatar:user.avatarUrl,gender:user.gender},
            sCallback:function(resData){
                //结果更新失败或者成功不做处理
                // console.log(resData); 
            }
          }
          BaseObj.request(parame);
        }else{
          console.log('未授权');
        }
      }
    })
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