// pages/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    width:0,
    num:0.33,
    num1: 0.33,
    num2: 0.33,
    num3: 0.33,
    animationData2:{},
    scrollY:true,
    viewStyle:'',
    active:false,
    autoplay:false,
    majList:[
      {
        'pic':'../dist/images/icon_1.png',
        'title':'网站建设'
      },
      {
        'pic': '../dist/images/icon_2.png',
        'title': '微信公众号'
      },
      {
        'pic':'../dist/images/icon_3.png',
        'title':'微信小程序'
      },
      {
        'pic':'../dist/images/icon_4.png',
        'title':'H5页面'
      },
      {
        'pic': '../dist/images/icon_5.png',
        'title': 'APP/WebAPP'
      },
      {
        'pic': '../dist/images/icon_6.png',
        'title': '产品/UI设计'
      },
    ],
    hotList:[
      {
        'pic':'../dist/images/1.png',
        'title':'车源宝'
      },
      {
        'pic': '../dist/images/2.png',
        'title': '购物商城'
      },
      {
        'pic': '../dist/images/3.png',
        'title': '我的音乐'
      },
      {
        'pic': '../dist/images/4.png',
        'title': '会议精灵'
      },
      {
        'pic': '../dist/images/5.png',
        'title': '头条新闻'
      },
    ]
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
  /**
    * 获取手机屏幕高度
    * 
  */var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        that.setData({
          height:res.windowHeight,
          width: res.windowWidth
        })
      }
    })
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease',
    })

    this.animation = animation
    setTimeout(function () {
      animation.translateY(60).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)

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
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        this.setData({
          heigth: res.windowHeight,
          width: res.windowWidth
        })
      }
    })
  
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
  
  },

  /**
   * 语音
   */
  tapVoice: function () 
  {
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onResume(() => {
      console.log('recorder resume')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    const options = {
      duration: 600000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }

    recorderManager.start(options)
  },

  /**
   * 样式库
   */
  tapStyleCool: function () 
  {
    wx.navigateTo({
      url: "/example/index"
    })
  },

  /**
   * 长按说话
   */
  touchdown: function () 
  {
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStart(() => {
      console.log('recorder start')
    })

    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }

    recorderManager.start(options)
  },

  touchup: function () {
    var that = this
    const recorderManager = wx.getRecorderManager()

    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      const { tempFilePath } = res
      that.setData({
        voiceFilePath : res
      });
    })
    recorderManager.onFrameRecorded((res) => {
      const { frameBuffer } = res
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })

    recorderManager.stop()
  },

  /**
   * 播放音频
   */
  tapPlay: function () {
    var that = this;
    // if
    
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = that.data.voiceFilePath.tempFilePath;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  scrolltoupper: function(e) {
    
  },
/*
*   滚动事件,
*   当用户滑动到
    1、距离可视区底部50px时，执行操作：文字区域opacity：.99;
    2、距离可视区底部200px时，执行操作：文字区域opacity：.5;
    3、距离可视区顶部10px时，执行操作：文字区域opacity：.2;
   
*/
  bindscroll:function(event){
    console.log(event.detail)
    //获取用户手机信息
    var height;
    wx.getSystemInfo({
      success: function (res) {
      height = res.windowHeight;
      }
    })
    console.log(event.detail.scrollTop)

    if (event.detail.scrollTop <=100){
      this.setData({
        num:0.99
      })
    } else if (event.detail.scrollTop >= 100 && event.detail.scrollTop <= 200){
      this.setData({
        num: 0.55
      })
    }else{
      this.setData({
        num: 0.33
      })
    }

  },
  
  // 联系我们
  CallMe:function(event){
    wx.makePhoneCall({
      phoneNumber: '15730179295' //
    })
  },
  //触摸区域时，文字变亮
  touchStartCodeTwo:function(e){
    console.log(e)
    if (e.type == "touchstart"){
      // 延迟动画时间
      setTimeout(function () {
        this.setData({
          num: ".99"
        })
      }.bind(this), 200)
      
    }
  },
  bindTouchStartScond: function (e) {
    if (e.type == "touchstart") {
      // 延迟动画时间
      setTimeout(function () {
        this.setData({
          num1: ".99"
        })
      }.bind(this), 200)

    }
  },
  touchStartCodeActive: function (e) {
    if (e.type == "touchstart") {
      // 延迟动画时间
      setTimeout(function () {
        this.setData({
          num2: ".99",
          active:'true'
        })
      }.bind(this), 200)

    }
  },
  touchStartCodefour: function (e) {
    if (e.type == "touchstart") {
      // 延迟动画时间
      setTimeout(function () {
        this.setData({
          num3: ".99",
        })
      }.bind(this), 200)
    }
  },
  //客服会话
  CallMeWX:function(event){
    console.log(event);
  }
})