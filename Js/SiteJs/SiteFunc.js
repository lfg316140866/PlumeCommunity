
/// <reference path="../CmnUI/CanvasTools/CanvasTools.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="Private.js" />
/// <reference path="SiteFunc.js" />
/// <reference path="Recommend.js" />
CallJsApiWXConfigItf("JsApiWXConfig.aspx");

$(function() {
    SiteFunc.SetBottomNav();
});

$.prototype.SgVisible = function () {
    $(this).css("visibility", "visible");
    return $(this);
}

$.prototype.Sghidden = function () {
    $(this).css("visibility", "hidden");
    return $(this);
}

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
                returnUrl = (location.href).substring(0, (location.href).indexOf("returnurl")-1);
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
            _url = "/Personal.aspx?uid=" + uid + "&returnurl=" + _url + "";
            location.href = ((_url).replace(/\?/g, "&")).replace('&', '?');
        }
        else {
            _url = "/Personal.aspx?uid=" + uid + "&returnurl=" + location.href + "";
            location.href = ((_url).replace(/\?/g, "&")).replace('&', '?');
        }
    }
    //分享
    this.Share = function (url) {
        var _url = url;
        if (_url == "" || _url == undefined) {
            if (location.href.indexOf("returnurl") > 0) {
                _url = (location.href).substring(0, (location.href).indexOf("returnurl")-1);
            } else {
                _url = location.href;
            }
        }
        if (Cmn.Func.IsWeiXin()) {
            console.log("WXShare");
            $(".success-float .success-arrow2").show();
            $(".success-float .success-arrow").hide();
            SetWechatShare("羽西", "羽西", _url, "images/bg/land_bg.jpg", function () {
                $(".success-float,.pop-float").hide();
                console.log("WXShareSuccess");
            });
        } else {
            $(".success-float .success-arrow").show();
            $(".success-float .success-arrow2").hide();
            console.log("heheShare");
        }
        if (window.location.href.split("?")[0].indexOf("Release") >= 0) {
            $(".success-float .success-tip").show();
        } else {
            $(".success-float .success-tip").hide();
        }
        $(".success-float .success-text").show();
        $(".success-float,.pop-float").show();
        $(".success-float").off().on("click", function() {
            $(".success-float,.pop-float").hide();
        });
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
        _returnBtn.off().on("click", function () {
            func && func();
        });
    }

    this.SetBottomNav=function (ReturnUrl) {
        var _returnUrl = ReturnUrl || location.href.indexOf("returnurl") >= 0 ? location.href.substring(0, location.href.indexOf("returnurl") - 1) : location.href;
        $(".footer-nav a").each(function() {
            var _href = $(this).attr("href").toString().split("?")[0];
            if (location.host+"/"+_href != _returnUrl.split("?")[0]) {
                _href += "?returnurl=" + encodeURIComponent(_returnUrl);
            } else {
                _href = _returnUrl;
            }
            $(this).attr("href", _href);
        });

    }
});



