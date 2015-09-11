


//公共方法库
(SiteFunc = new function () {
    this.Alert = function (message) {
        alert(message);
    };
    this.ProvinceCityStr = {
        "Province": "-省份-",
        "City": "-城市-",
        "County": "-区-"
    };

    //分享
    this.Share = function () {
        var _title = "C4L";
        var _sharePic = "http://" + Cmn.Func.GetMainDomain(location.href) + "/images/ShareImg.jpg";
        var _shareOnlyUrl = "http://" + Cmn.Func.GetMainDomain(location.href) + "/";
        var _SinaShare = 'http://service.weibo.com/share/share.php?title=' + encodeURIComponent(_title) + '&url=' + _shareOnlyUrl + '&source=&appkey=&pic=' + _sharePic;
        $("#sinaShare").attr("href", _SinaShare);
        var _renrenShare = 'http://s.jiathis.com/?webid=renren&title=&summary=' + encodeURIComponent(_title) + '&url=' + _shareOnlyUrl + '&pic=' + _sharePic;
        $("#renrenShare").attr("href", _renrenShare);
        var _tenxunShare = "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + encodeURIComponent(_title) + "&url=" + _shareOnlyUrl + "&site=&pic=" + _sharePic;
        $("#tenxunShare").attr("href", _tenxunShare);
        var _kaixinShare = 'http://www.kaixin001.com/rest/records.php?webid=kaixin&title=&content=' + encodeURIComponent(_title) + '&pic=' + _sharePic + '&starid=&aid=&style=11&t=10&url=' + _shareOnlyUrl;
        $("#kaixinShare").attr("href", _kaixinShare);
        var _souhuShare = 'http://t.sohu.com/third/post.jsp?title=' + encodeURIComponent(_title) + '&pic=' + _sharePic + '&url=' + _shareOnlyUrl;
        $("#souhuShare").attr("href", _souhuShare);
    }
});

