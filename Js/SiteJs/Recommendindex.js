
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
    var _TheCurrentIndex;
    AnimateFrame.IsLockScenes = true;

    $(".footer-box").css("display", "none");
    $(".header-box").css("display", "none");
    function IsAttention(uid) {
        //收藏判断
        _TheCurrentIndex = _Recommends.CurIndex;
        var _userID
        if (uid == ""|| uid==undefined) {
            _userID = $(".JscRecommendOne").eq(_TheCurrentIndex).attr("uid");
        }
        else {
            _userID = uid;
        }
        var _param = {
            "Type": "Get",
            "FollowID": _userID
        }
        CmnAjax.PostData("Itf/CSharp/ItfOther.aspx?method=FollowDetails", _param, function (dat) {
            if (dat.IsSuccess == 4) {
                $(".JscAttentionBtn").find(".btn-sprite").addClass("select");
            }
            else {
                $(".JscAttentionBtn").find(".btn-sprite").removeClass("select");
            }

        })
    }

    _Recommends = new Recommend(".JscRecommendOne", ".JscRecommendBox",
     function () {
         IsAttention();
         //值抛出
         var _num = (_Recommends.CurIndex + 1) % 10;
         if (_num == 2) {
             PhotoshowUserCollect();
         }
     },
     function () {
         IsAttention();
         //值抛出
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
                var _userID = $(".JscRecommendOne").eq(0).attr("uid");
                IsAttention(_userID);
            }
        });
    }

    PhotoshowUserCollect();

    ////////////////////关注///////////////////
    $(".JscAttentionBtn").on("click", function () {
        _TheCurrentIndex = _Recommends.CurIndex;
        if (!$(".JscAttentionBtn").find(".btn-sprite").hasClass("select")) {
            var _userID = $(".JscRecommendOne").eq(_TheCurrentIndex).attr("uid");
            var _param = {
                "Type": "Set",
                "FollowID": _userID
            }
            CmnAjax.PostData("Itf/CSharp/ItfOther.aspx?method=FollowDetails", _param, function (dat) {
                if (dat.IsSuccess == 1) {
                    $(".JscAttentionBtn").find(".btn-sprite").addClass("select");
                    Cmn.alert("关注成功！");
                }
            })
        }
    })

})

