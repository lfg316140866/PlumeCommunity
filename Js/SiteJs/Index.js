/// <reference path="../CmnUI/CanvasTools/CanvasTools.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="Private.js" />
/// <reference path="SiteFunc.js" />
/// <reference path="Recommend.js" />

//首页业务逻辑 此处名称可以和页面对应起来 也可以和场景ID对应
$(function () {
    var _IndexPhoto;//照片下标
    var _WorkID;//作品ID
    var _UrlPage=decodeURIComponent(Cmn.Func.GetParamFromUrl("returnurl"));//返回页面
    AnimateFrame.IsLockScenes = true;
    //////////////////////////返回/////////////////////////////////
    $(".JscHideAllHeader").on("click", function () {
        SiteFunc.FloatOperating(".JscHideMenu", ".JscFloatAll,.JscFloatAllHide,.JscHideAllHeader");
        $(".JscLogonPhoneText").val("");
        $(".JscLogonPassWordText").val("");

    })
    ///////////////////////////跳转模块///////////////////////////////////////
    //登录
    $(".JscHomeLogonBtn").on("click", function () {
        SiteFunc.FloatOperating(".JscHideAllHeader,.JscFloatAll,.JscLogonFloat", ".JscHideMenu");
    })
    //登录忘记密码
    $(".JscForgetHref").on("click", function () {
        SiteFunc.FloatOperating(".JscForgotPasswordFloat",".JscLogonFloat ");
    })
    
    
   

    /////////////////////////////登录模块////////////////////////////////////////
    //登录
    $(".JscLogonBtn").on("click", function () {
        var _phone = $(".JscLogonPhoneText").val();
        var _passWord = $(".JscLogonPassWordText").val();
        var _checkPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (_phone == "" || _phone == "请输入您的手机号") {
            Cmn.alert("手机号不能为空！");
            return;
        }
        if (!_checkPhone.test(_phone)) {
            SiteFunc.Alert("请输入正确的11位手机号码！");
            return;
        }
        if (_passWord == "" || _passWord == "请输入您的密码") {
            Cmn.alert("请输入您的密码！");
            return;
        }
        var _param = {
            "UserName":_phone,
            "PassWord":_passWord
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=PasswordJudgment", _param, function (dat) {
            if (dat.IsSuccess == 1) {
                
                if (_UrlPage == "") {
                    SiteFunc.JumpPage("Home.aspx");
                }
                else {
                    location.href = _UrlPage;
                }
            }
            else {
                Cmn.alert("账号密码不匹配!");
            }
        })
    })
    //找回获取验证码
    $(".JscGetVerification").on("click", function () {
        var _phone = $(".JscForgotPasswordText").val();
        $(".JscVerificationText").val("");
        var _checkPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (_phone == "" || _phone == "手机号 / 只适用中国大陆手机号") {
            Cmn.alert("手机号不能为空！");
            return;
        }
        if (!_checkPhone.test(_phone)) {
            SiteFunc.Alert("请输入正确的11位手机号码！");
            return;
        }
        var _param = {
            "Phone": _phone,
            "Num":"yy"
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=SMSInterface", _param, function (dat) {
            if (dat.IsSuccess == 2) {
                //验证成功
                var _time = 59;
                var _countdownTimer = setInterval(function () {
                    $(".JscForgotPasswordTime").html((--_time) + "S");
                    if (_time == 0) {
                        SiteFunc.FloatOperating( ".JscGetVerification",".JscForgotPasswordTime,.JscVerificationText");
                        clearInterval(_countdownTimer);
                        return;
                    }
                }, 1000);
                SiteFunc.FloatOperating(".JscForgotPasswordTime,.JscVerificationText", ".JscGetVerification");
            }
            else {
                Cmn.alert("此用户不存在！");
            }
        })
    })

    //找回密码下一步
    $(".JscNextBtn").on("click", function () {
        var _phone = $(".JscForgotPasswordText").val();
        var _code = $(".JscVerificationText").val();
        var _checkPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (_phone == "" || _phone == "手机号 / 只适用中国大陆手机号") {
            Cmn.alert("手机号不能为空！");
            return;
        }
        if (!_checkPhone.test(_phone)) {
            SiteFunc.Alert("请输入正确的11位手机号码！");
            return;
        }
        if (_code == "" || _code == "输入验证码") {
            Cmn.alert("请输入您的验证码！");
            return;
        }

        var _param = {
            "Phone": _phone,
            "Code": _code
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=SecurityCode", _param, function (dat) {
            if (dat.IsSuccess == 1) {
                //验证成功
                SiteFunc.FloatOperating(".JscResetPasswordFloat", ".JscForgotPasswordFloat");
            }
            else if (dat.IsSuccess == 0) {
                Cmn.alert("验证的手机号不匹配！");
            }
            else {
                Cmn.alert("验证码错误！");
            }
        })
    })

    //完成修改密码
    $(".JscResetPasswordBtn").on("click", function () {
        var _passWord = $(".JscPasswordText").val();
        var _passWord2 = $(".JscConfirmText").val();
        if (_passWord == "" || _passWord == "请输入您的新密码") {
            Cmn.alert("请输入您的新密码！");
            return;
        }
        if (_passWord.length < 6 || _passWord.length > 14) {
            Cmn.alert("密码长度不够！");
            return;
        }
        if (_passWord2 == "" || _passWord2 == "请确认您的新密码") {
            Cmn.alert("请再次输入你的密码！");
            return;
        }
        if (_passWord2.length < 6 || _passWord2.length >14) {
            Cmn.alert("密码长度不够！");
            return;
        }
        if (_passWord != _passWord2) {
            Cmn.alert("两次输入的密码不一样！");
            return;
        }
        var _param = {
            "PassWord": _passWord
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=ChangePassword", _param, function (dat) {
            if (dat.IsSuccess == 1) {
                Cmn.alert("修改成功！");
            }
            else {
                Cmn.alert("网络异常！");
            }
        })
    })
    /////////////////////////////////注册模块//////////////////////////////////////
    //注册
    $(".JscHomeRegisterBtn").on("click", function () {
        SiteFunc.FloatOperating(".JscHideAllHeader,.JscFloatAll,.JscRegisterFloat", ".JscHideMenu");
    })
    //注册短信验证
    $(".JscRegisterGetVerificationeHref").on("click", function () {
        var _phone = $(".JscRegisterPhoneText").val();
        var _passWord = $(".JscRegisterPassWordText").val();
        var _checkPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (_phone == "" || _phone == "手机号 / 只适用中国大陆手机号") {
            Cmn.alert("手机号不能为空！");
            return;
        }
        if (!_checkPhone.test(_phone)) {
            SiteFunc.Alert("请输入正确的11位手机号码！");
            return;
        }
        if (_passWord == "" || _passWord == "6-14位密码、建议数字、字母、符号") {
            Cmn.alert("请输入您的密码！");
            return;
        }
        if (_passWord.length < 6 || _passWord.length > 14) {
            Cmn.alert("密码长度不够！");
            return;
        }

        var _param = {
            "Phone": _phone,
            "Num": ""
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=SMSInterface", _param, function (dat) {
            if (dat.IsSuccess == 1) {
                //验证成功
                var _time = 59;
                var _countdownTimer = setInterval(function () {
                    $(".JscRegisterTimeText").html((--_time) + "S");
                    if (_time == 0) {
                        SiteFunc.FloatOperating(".JscRegisterGetVerificationeHref", ".JscRegisterVerificationText,.JscRegisterTimeText");
                        clearInterval(_countdownTimer);
                        return;
                    }
                }, 1000);
                SiteFunc.FloatOperating(".JscRegisterVerificationText,.JscRegisterTimeText", ".JscRegisterGetVerificationeHref");
            }
            else {
                Cmn.alert("该手机号已被注册");
            }
        })
    })
    //注册短信验证
    $(".JscRegisterBtn").on("click", function () {
        var _phone = $(".JscRegisterPhoneText").val();
        var _passWord = $(".JscRegisterPassWordText").val();
        var _code = $(".JscRegisterVerificationText").val();
        var _checkPhone = /^0?1[3|4|5|8][0-9]\d{8}$/;
        if (_phone == "" || _phone == "手机号 / 只适用中国大陆手机号") {
            Cmn.alert("手机号不能为空！");
            return;
        }
        if (!_checkPhone.test(_phone)) {
            SiteFunc.Alert("请输入正确的11位手机号码！");
            return;
        }
        if (_passWord == "" || _passWord == "6-14位密码、建议数字、字母、符号") {
            Cmn.alert("请输入您的密码！");
            return;
        }
        if (_passWord.length < 6 || _passWord.length > 14) {
            Cmn.alert("密码长度不够！");
            return;
        }
        if (_code == "" || _code == "输入验证码") {
            Cmn.alert("请输入您的验证码！");
            return;
        }
        var _param = {
            "Phone": _phone,
            "Code": _code
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=SecurityCode", _param, function (dat) {
            if (dat.IsSuccess == 1) {
                //验证成功
                SiteFunc.FloatOperating(".JscInformationFloat ", ".JscRegisterFloat");
            }
            else if (dat.IsSuccess == 0) {
                Cmn.alert("验证的手机号不匹配！");
            }
            else {
                Cmn.alert("验证码错误！");
            }
        })
    })
    //性别选择
    $(".JscSexSelect").on("click", function () {
        $(".JscSexSelect").removeClass("select");
        $(this).eq($(this).index(this)).addClass("select");
    })
 
    //完成注册
    $(".JscInformationBtn").on("click", function () {
        var _phone = $(".JscRegisterPhoneText").val();
        var _name = $(".JscInformationNameText").val();
        var _passWord = $(".JscRegisterPassWordText").val();
        var _userImg = "images/UserImg.png";
        var _userBgImg="images/individual-box.png";
        var _sex;
        if ($(".JscSexSelect").eq(0).hasClass("select")) {
            _sex = 0;
        }
        else if ($(".JscSexSelect").eq(1).hasClass("select")) {
            _sex = 1;
        }
        if (_name == ""||_name == "输入您的昵称") {
            Cmn.alert("请输入昵称！");
            return;
        }
        if (_sex === "") {
            Cmn.alert("请选择性别！");
            return;
        }
        var _param = {
            "Phone": _phone,
            "PassWord": _passWord,
            "UserName": _name,
            "UserSex": _sex,
            "UserImg": _userImg,
            "UserBgImg": _userBgImg
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=UserRegistration", _param, function (dat) {
            if (dat.IsSuccess == 1) {
                $(".JscFloatAllHide").hide();
                $(".JscFloatAll").hide();
                //推荐页面显示
                SiteFunc.JumpPage("Recommend.aspx");
            }
            else if (dat.IsSuccess == 0) {
                Cmn.alert("注册手机号不一致！");
            }
            else if(dat.IsSuccess==3){
                Cmn.alert("该手机号已被注册！");
            }
            else {
                Cmn.alert("网络异常！");
            }
        })
    })

});