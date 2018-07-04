wx.ready(function () {  

    var title = '前沿科技！探索直播无限可能，深圳腾讯2018TLC直播大会再度来袭';
    var desc = '前沿科技！探索直播无限可能，深圳腾讯2018TLC直播大会再度来袭';
    var link = 'http://2018.tlc.ivweb.io/';
    var imgUrl = 'http://2018.tlc.ivweb.io/mlogo.png';

    var shareData = {  
        title: title,  
        desc: desc,  
        link: link,  
        imgUrl: imgUrl,  
        success: function (res) {  
            //alert('已分享');  
        },  
        cancel: function (res) {  
        }  
    };  

    wx.onMenuShareAppMessage({  
        title: title,  
        desc: desc,  
        link: link,  
        imgUrl: imgUrl,  
        trigger: function (res) {  
                //  alert('用户点击发送给朋友');  
        },  
        success: function (res) {  
            //alert('已分享');  
        },  
        cancel: function (res) {  
            //alert('已取消');  
        },  
        fail: function (res) {  
            alert(JSON.stringify(res));  
        }  
    });  

    wx.onMenuShareTimeline(shareData);  
});  

wx.error(function (res) {  
    alert("error: " + res.errMsg);  
}); 