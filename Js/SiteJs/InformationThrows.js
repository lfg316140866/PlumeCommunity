/// <reference path="../CmnTools/WechatShare.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="../animate/AnimateFrame.js" />
$(function () {
    var _UserID = Cmn.Func.GetParamFromUrl("uid");
    ///收藏展示
    function PhotoshowUserCollect(userid, setTable) {
        var _param = {
            "UserID": userid,
            "SetTable": setTable
        }
        _Y = new CmnAjax.DataStepLoad([".JscPhotoOne"], "/Itf/CSharp/ItfOther.aspx?method=WorkeShowcase", _param, [".JscPhotoBoxOne"], 4, 6, function (dat) {
            _Y.BindScrollLoadData(".JscPhotoBoxOne");
            //点击跳转详情页面
            $(".JscPhotoOne").on("click", function () {
                _IndexPhoto = $(this).index();
                _WorkID = $(".JscPhotoOne").eq(_IndexPhoto).attr("cid");
                SiteFunc.JumpPage("Home.aspx?WorkID=" + _WorkID + "");
            })
        });
    }
    ///发布展示
    function PhotoshowUserWork(userid, setTable) {
        var _param = {
            "UserID": userid,
            "SetTable": setTable
        }
        _X = new CmnAjax.DataStepLoad([".JscPhotoTwo"], "/Itf/CSharp/ItfOther.aspx?method=WorkeShowcase", _param, [".JscPhotoBoxTwo"], 4, 6, function (dat) {
            _X.BindScrollLoadData(".JscPhotoBoxTwo");
            //点击跳转详情页面
            $(".JscPhotoTwo").on("click", function () {
                _IndexPhoto = $(this).index();
                _WorkID = $(".JscPhotoTwo").eq(_IndexPhoto).attr("cid");
                SiteFunc.JumpPage("Home.aspx?WorkID=" + _WorkID + "");
            })
        });
    }
    PhotoshowUserCollect(_UserID, "usr_Collect");//收藏展示
    PhotoshowUserWork(_UserID, "usr_Works");//发布展示
})


