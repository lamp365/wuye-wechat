import { Config } from "../../utils/config.js";
import {Base} from "../../utils/base.js";
var BaseObj = new Base();
 
// pages/community/community.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    community:'',
    showLoading:true,
    showKong:true,

    username:'',
    mobile:'',
    community_arr:[],
    c_index:0,
    building_arr:[],
    b_index:0,
    house_arr:[],
    h_index:0,
    owner_type:[{name:'请选择身份'},{name:'业主'},{name:'成员'},{name:'租客'}],
    owner_type_index:0 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCommunity();
  },

  getMyCommunity:function(){
    var that = this;
    var parame = {
      url:Config.myCommunity,
      needShowMessage:true,
      sCallback:function(res){
        that.setData({
          community:res, 
          showLoading:false
        })
      }
    };
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

  },

  bindtapAddCommunity:function(){
    this.setData({showKong:false})
    this.getCommunityData();
  }, 

  getCommunityData:function(){
    this.setData({showLoading:true});
    var that = this;
    var parame = {
      url:Config.getCommunity,
      sCallback:function(res){
        var community_arr = res;
        var building_arr = that.data.building_arr;
        var house_arr = that.data.house_arr;
        community_arr.unshift({code:-1,name:'请选择对应小区'});
        building_arr.unshift({code:-1,floor_num:'请选择对应楼栋'});
        house_arr.unshift({code:-1,name:'请选择对应房号'});
        that.setData({   
          community_arr: community_arr, 
          building_arr:building_arr,
          house_arr:house_arr,
          showLoading:false
        })
      }
    };
    BaseObj.request(parame);
  },

  bindChangeCommunity:function(e){
    var c_index = e.detail.value;
    var code = this.data.community_arr[c_index].code;
    this.setData({
      c_index: e.detail.value
    });
    if(code == -1){
      var building_arr = [];
      var house_arr = [];
      building_arr[0]= new Object;
      building_arr[0].code = -1;
      building_arr[0].floor_num = '请选择对应楼栋';
      house_arr[0] = new Object;
      house_arr[0].code = -1;
      house_arr[0].name = '请选择对应房号';
     this.setData({
        building_arr:building_arr,
        house_arr:house_arr,
        b_index:0,
        h_index:0
     });
      return '';
    }
    var that = this;
    var parame={
      url:Config.selectHouse,
      data:{code:code,act:'build'},
      type:'post',
      sCallback:function(res){
        res.unshift({code:-1,floor_num:'选择对应楼栋'});
        that.setData({
          building_arr:res,
          b_index:0
        })
      }
    }
    BaseObj.request(parame);
  },

  bindChangeBuilding:function(e){
    var b_index = e.detail.value;
    var code = this.data.building_arr[b_index].code;
    this.setData({
      b_index: e.detail.value
    });
    if(code == -1){
      var house_arr = [];
      house_arr[0] = new Object;
      house_arr[0].code = -1;
      house_arr[0].name = '请选择对应房号';
     this.setData({
        house_arr:house_arr,
        h_index:0
     });
      return '';
    }
    var that = this;
    var parame={
      url:Config.selectHouse,
      data:{code:code,act:'house'},
      type:'post',
      sCallback:function(res){
        res.unshift({code:-1,name:'选择对应房号'});
        that.setData({
          house_arr:res,
          h_index:0
        })
      }
    }
    BaseObj.request(parame);
  },

  bindChangeHouse:function(e){
    var h_index = e.detail.value;
    this.setData({
      h_index: e.detail.value
    });
  },
  bindChangeOwnertype:function(e){
    console.log(e.detail.value);
    this.setData({
      owner_type_index:e.detail.value
    })
  },
  bindUsername:function(e){
    this.setData({
      username: e.detail.value
    });
  },
  bindMobile:function(e){
    this.setData({
      mobile: e.detail.value
    });
  },

  bindtapAddMyCommunity:function(){
    var that = this;
    if(this.data.c_index == 0){ BaseObj._showMessageToast('请选择小区');return ''}
    if(this.data.b_index == 0){ BaseObj._showMessageToast('请选择楼栋');return '';}
    if(this.data.h_index == 0){ BaseObj._showMessageToast('请选择房号');return '';}
    if(this.data.username == ''){ BaseObj._showMessageToast('请填写名字');return '';}
    if(this.data.mobile == ''){ BaseObj._showMessageToast('请填写电话');return '';}
    if(!utils._isPhoneNumber(this.data.mobile)){BaseObj._showMessageToast('电话必须11位数字');return '';}
    if(this.data.owner_type_index == 0){BaseObj._showMessageToast('请选择身份！');return '';}


    this.setData({showLoading:true});
    var c_index = this.data.c_index;
    var h_index = this.data.h_index;
    var b_index = this.data.b_index;
    var add_data = { 
      community_code:this.data.community_arr[c_index].code,
      building_code:this.data.building_arr[b_index].code,
      house_code:this.data.house_arr[h_index].code,
      username:this.data.username,
      mobile:this.data.mobile,
      owner_type:this.data.owner_type_index
    }
    var parame = {
      url:Config.addCommunity,
      data:add_data,
      type:'post',
      needShowMessage:true,
      sCallback:function(res){
        that.setData({showLoading:false});
        setTimeout(result => {
          wx.navigateBack({
            delta: 1
          });  //返回上一页
        }, 1000);
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