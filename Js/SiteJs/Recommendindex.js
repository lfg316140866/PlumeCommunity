
/// <reference path="../CmnUI/CanvasTools/CanvasTools.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="Private.js" />
/// <reference path="SiteFunc.js" />
/// <reference path="Recommend.js" />

$(function () {
    var _Recommends;
    var _CurPage = 1;
    var _PageSize = 10;
    AnimateFrame.IsLockScenes = true;

    _Recommends = new Recommend(".JscRecommendOne", ".JscRecommendBox",
     function () {
         var _num = (_Recommends.CurIndex + 1) % 10;
         if (_num == 2) {
             PhotoshowUserCollect();
         }
     },
     function () {
         var _num = (_Recommends.CurIndex + 1) % 10;
         if (_num == 8) {
             PhotoshowUserCollect();
         }
     }
     );
    _Recommends.Init();
    ///数据抛出
    function PhotoshowUserCollect() {
        var _param = {
            "CurPage": _CurPage,
            "PageSize": _PageSize
        }
        CmnAjax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=YQGetRecommend", _param, function (dat) {
            if (dat.data.length > 0) {
                Cmn.FillData(".JscRecommendOne", dat.data, true);
                var _nwid = $(".JscRecommendOne").eq(0).attr("wid");
                if (_nwid == "") {
                    $(".JscRecommendOne").eq(0).remove();
                }
                _CurPage = _CurPage + 1;
                _Recommends.RefreshObj();
                //点击跳转详情页面
                $(".JscRecommendOne").off("click").on("click", function () {
                    _WorkID = $(this).attr("wid");
                    SiteFunc.JumpPage("Home.aspx?WorkID=" + _WorkID + "");
                })
                $(".JscUidJump").off("click").on("click", function (e) {
                    e.stopPropagation();
                    var _uid = $(this).attr("usid")
                    SiteFunc.AvatarJump(_uid);
                })
            }
        });
    }

    PhotoshowUserCollect();

    ////////////////////点击头像跳转///////////////////
})

