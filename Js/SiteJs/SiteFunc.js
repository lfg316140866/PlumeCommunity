
/// <reference path="../CmnUI/CanvasTools/CanvasTools.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="Private.js" />
/// <reference path="SiteFunc.js" />
/// <reference path="Recommend.js" />

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
    ///场景操作方法     num 为1显示跳转 为2常规跳转后可以滑动  为3常规跳转后不可以滑动
    this.SceneJump = function (page, num) {
        if (num == 1) {
            AnimateFrame.IsLockScenes = false;
            AnimateFrame.SlideTo(page, SwitchMode.Fade);
            AnimateFrame.IsLockScenes = true;
        }
        else if (num == 2) {
            AnimateFrame.IsLockScenes = false;
            AnimateFrame.SlideTo(page);
        }
        else if (num == 3) {
            AnimateFrame.IsLockScenes = false;
            AnimateFrame.SlideTo(page);
            AnimateFrame.IsLockScenes = true;
        }
    }
    /// 浮层操作方法 showfloat为显示的浮层  hidefloat为隐藏的浮层   num为true只做隐藏浮层操作 num为fasle只做显示浮层操作
    this.FloatOperating = function (showfloat, hidefloat, num) {
        if (num == true) {
            $(hidefloat).hide();
        }
        else if (num == false) {
            $(showfloat).show();
        }
        else {
            $(hidefloat).hide();
            $(showfloat).show();
        }
    }
    ///页面跳转 url参数为页面
    this.JumpPage = function (url, returnUrl) {
        if (returnUrl == "" || returnUrl==undefined) {
            if (location.href.indexOf("returnurl") > 0) {
                returnUrl = (location.href).substring(0, (location.href).indexOf("returnurl"));
            }
            else {
                returnUrl = location.href;
            }
        }
        _url = "/" + url;
        if (returnUrl != "" && returnUrl !=undefined) {
            _url += "?returnurl=" + encodeURIComponent(returnUrl)
        }
        location.href = ((_url).replace(/\?/g, "&")).replace('&', '?');
    }
    ///点击用户头像跳转个人信息页面
    this.AvatarJump = function (uid) {
        var _url;
        if (location.href.indexOf("?") > 0) {
            _url = (location.href).substring(0, location.href.indexOf("?"));
            _url = "/Personal.html?uid=" + uid + "&returnurl=" + _url + ""
            location.href = ((_url).replace(/\?/g, "&")).replace('&', '?');
        }
        else {
            _url = "/Personal.html?uid=" + uid + "&returnurl=" + location.href + "";
            location.href = ((_url).replace(/\?/g, "&")).replace('&', '?');
        }
    }
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

    this.BackBtnBind= function (func) {
        /// <summary>设置返回按钮</summary>
        /// <param name="func" type="function">点击事件执行方法（不是function类型则按钮隐藏）</param>
        var _returnBtn = $(".return-btn");
        if (typeof func != "function") {
            _returnBtn.hide();
        } else {
            _returnBtn.show();
        }
        _returnBtn.off().on("touchend", function () {
            func && func();
        });
    }
});

