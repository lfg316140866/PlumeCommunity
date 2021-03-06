﻿/// <reference path="SiteFunc.js" />
/// <reference path="../jquery.cycle.all.js" />
/// <reference path="../ThirdLib/jquery.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="../unslider.js" />
/// <reference path="../animate/AnimateFrame.js" />


//首页业务逻辑 此处名称可以和页面对应起来 也可以和场景ID对应
$(document).ready(function () {
    $(".concern-btn").bind("touchend", function () {
        var _top = $(".Inner").eq(0).scrollTop();
        //$(".Inner").eq(0).css("visibility", "hidden").next().css("visibility", "visible");
        $(".Inner").eq(0).hide().next().show();
        $(".Inner").eq(1).scrollTop(_top);
    });
    $(".topics-btn").bind("touchend", function () {
        var _top = $(".Inner").eq(1).scrollTop();
        //$(".Inner").eq(0).css("visibility", "visible").next().css("visibility", "hidden");
        $(".Inner").eq(0).show().next().hide();
        $(".Inner").eq(0).scrollTop(_top);
    });

    $(".DescMain .icon-trash").on("touchend", function () {
        var _self = $(this);
        var _workID = _self.attr("workid");
        _param = {
            WorkID: _workID
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=DelWorkByID", _param, function (data) {
            if (YQFunc.EventIdle) {
                YQFunc.EventIdle = false;
            } else {
                return;
            }
            if (data.IsSuccess == 1) {
                $(".MainList .con-box[workid=" + _workID + "]").remove();
                $(".return-btn").trigger("touchend");
                YQFunc.EventIdle = true;
            } else {
                //登录判断
                YQFunc.BackLogin(data);
                YQFunc.EventIdle = true;

            }
        });
    });

    $(".reviews-btn").on("touchend", function () {
        var _comment = $(".comment-input input").val();
        if (_comment.trim() == "") {
            Cmn.alert("评论不可为空");
            return;
        }
        $(".comment-input input").val("");
        var _workID = $(this).parents(".desc-box").attr("workid");
        var _param = {
            WorkID: _workID,
            Comment: _comment
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=AddComment", _param, function (data) {
            if (data.IsSuccess == 1) {
                var _html = '<div class="list-desc">' +
                          '<span class="comment-face"><img src="' + $("#HeadImgUrl").html() + '"></span>' + '<em class="comment-name general-font center-vertical">' + $("#NickName").html() + ':</em>' +
                          '<strong class="comment-des general-font center-vertical">' + _comment + '</strong></div>';
                $(".con-box[workid=" + $(".DescMain .con-box").attr("workid") + "] .comment-list").append(_html);
            } else {
                //登录判断

                YQFunc.BackLogin(data);
            }
        });
    });

    //举报按钮
    $(".report").on("touchend", function () {
        if (YQFunc.EventIdle) {
            YQFunc.EventIdle = false;
        } else {
            return;
        }
        var _self = $(this);
        var _workID = $(this).parents(".desc-box").attr("workid");
        var _param = {
            WorkID: _workID
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=AddReport", _param, function (data) {
            if (data.IsSuccess == 1) {
                _self.attr("reportid", data.ReportID).css("visibility", "hidden");
                YQFunc.EventIdle = true;
            } else {
                //登录判断
                YQFunc.BackLogin(data);
                YQFunc.EventIdle = true;
            }
        });
    });

    //标签点击事件绑定
    $(".Inner1,Inner2").on("touchend", ".choose-desc-box", function () {
        location.href = "Search.aspx?lid=" + $(this).attr("labelid");
    });

    $(".DescMain").on("touchend", ".choose-desc-box", function () {
        SiteFunc.JumpPage("Search.aspx?lid=" + $(this).attr("labelid"), "Home.aspx?workid=" + $(this).parents(".con-box").attr("workid"));
    });


    YQFunc.DescCommentBtnBind();
    SiteFunc.BackBtnBind();

    YQFunc.CommentBtnBind();

    //收藏按钮绑定
    YQFunc.CollectBtnBind();

    //点赞按钮绑定
    YQFunc.PraiseBtnBind();

    //关注按钮绑定
    YQFunc.FollowBtnBind();
    if (Cmn.Func.GetParamFromUrl("returnurl") != "") {
        SiteFunc.BackBtnBind(function () {
            location.href = decodeURIComponent(Cmn.Func.GetParamFromUrl("returnurl"));
        });
    } else {
        SiteFunc.BackBtnBind();
    }
    if (Cmn.Func.GetParamFromUrl("WorkID") != "") {
        $(".DescMain").show();
        $(".DescMain").css({ left: "0px" });
        $(".DescMain .comment-input").css({ left: "0px" });
        $(".footer-box").css({ bottom: "-115px" })
        YQFunc.GetDesc(Cmn.Func.GetParamFromUrl("WorkID"), "self");
        return;
    }
    var _IsCycleChange = false;
    $('.Inner1 .carousel-nav').cycle({
        fx: 'scrollHorz',
        timeout: 0,
        pager: $(".Inner1 .carousel-click"),
        //prev: $(".Js_LeftBtn"),
        //next: $(".Js_RightBtn"),
        activePagerClass: 'select',
        speed: 800,
        pause: 0,
        pagerEvent: 'touchstart',
        before: function () {
            _IsCycleChange = true;
        },
        after: function () {
            _IsCycleChange = false;
        }
    });
    $('.Inner2 .carousel-nav').cycle({
        fx: 'scrollHorz',
        timeout: 0,
        pager: $(".Inner2 .carousel-click"),
        activePagerClass: 'select',
        speed: 800,
        pause: 0,
        prevNextEvent: 'touchstart',
        before: function () {
            _IsCycleChange = true;
        },
        after: function () {
            _IsCycleChange = false;
        }
    });
    $(".carousel-click a").on("touchstart", function () {
        var _index = $(this).index();
        $(this).parents(".Inner").siblings(".Inner").find(".carousel-nav").cycle(_index);
    });


    Cmn.Func.TouchSlide(".carousel-bar", 30, function (dir) {
        if (_IsCycleChange) { return false; }
        if (dir == "left") {
            $(".carousel-nav").cycle("next");
        }
        else if (dir = "right") {
            $(".carousel-nav").cycle("prev");
        }
    });

    var _NoLogin = false;
    var _workListHot = new CmnAjax.DataStepLoad(".hot_box .con-home-box", "/Itf/CSharp/Interface.aspx?method=GetWorkListOrderDateDesc", {}, '.hot_box', 1000, 2,
        function (data) {
            if (data.IsSuccess == 1) {
                var _dataLength = data.data.length;
                var _container = $(".hot_box .con-home-box");
                var _beginIndex = _container.length - _dataLength;
                for (var _i = 0; _i < _dataLength; _i++) {

                    //});
                    //关注收藏点赞图标状态
                    YQFunc.GetFollowPraiseCollectState(_container.eq(_beginIndex + _i), data.data[_i]["UserID"], data.data[_i]["WorkID"]);

                    //获取评论
                    YQFunc.GetCommentTop3(_container.eq(_beginIndex + _i), data.data[_i]["WorkID"]);
                    //获取标签
                    YQFunc.GetWorkLabel(_container.eq(_beginIndex + _i), data.data[_i]["WorkImgID"]);
                }
            } else {
               
                //登录判断
                if (data.ErrMsg == "用户未登录") {
                    _NoLogin = true;
                    Cmn.alert("用户未登录");
                    location.href = "index.html";
                }
                //YQFunc.BackLogin(data);
            }

        });
    _workListHot.BindScrollLoadData(".Inner1");
    if (_NoLogin) {
        return false;
    }
    var _workListFollow = new CmnAjax.DataStepLoad(".follow_box .con-home-box", "/Itf/CSharp/Interface.aspx?method=GetWorkListOrderDateDescByFollow", {}, '.follow_box', 1000, 2,
       function (data) {
           if (data.IsSuccess == 1) {
               var _dataLength = data.data.length;
               var _container = $(".follow_box .con-home-box");
               var _beginIndex = $(".follow_box .con-home-box").length - _dataLength;
               for (var _i = 0; _i < _dataLength; _i++) {

                   //关注图标
                   YQFunc.GetFollowPraiseCollectState(_container.eq(_beginIndex + _i), data.data[_i]["UserID"], data.data[_i]["WorkID"]);




                   //获取评论
                   YQFunc.GetCommentTop3(_container.eq(_beginIndex + _i), data.data[_i]["WorkID"]);

                   //获取标签
                   YQFunc.GetWorkLabel(_container.eq(_beginIndex + _i), data.data[_i]["WorkImgID"]);




               }
           } else {
               //登录判断
               YQFunc.BackLogin(data);
           }
       });
    _workListFollow.BindScrollLoadData(".Inner2");




});

$.prototype.SgShow = function () {
    $(this).css("display", "block");
    return $(this);
}

var YQFunc = {
    EventIdle: true,
    PraiseBtnBind: function () {
        $(".Inner").on("touchend", ".PraiseBtn", function () {

            if (YQFunc.EventIdle) {
                YQFunc.EventIdle = false;
            } else {
                return;
            }
            //$(".PraiseBtn").unbind("touchend").bind("touchend", function () {
            var _self = $(this);
            var _praiseID = _self.attr("praiseid");
            var _workID = _self.attr("workid");
            if (_praiseID == "" || _praiseID == undefined) {
                Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddPraise", { "WorkID": _workID }, function (data) {
                    if (data.IsSuccess == 1 && data.data[0]["PraiseID"] != "") {
                        $(".PraiseBtn[workid=" + _workID + "]").attr("praiseid", data.data[0]["PraiseID"]).addClass("select");
                        YQFunc.EventIdle = true;
                        Cmn.alert("点赞成功");
                    } else {
                        //登录判断
                        YQFunc.BackLogin(data);
                        YQFunc.EventIdle = true;
                    }

                });
            } else {
                Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelPraiseByID", { "PraiseID": _praiseID }, function (data) {
                    if (data.IsSuccess == 1) {
                        $(".PraiseBtn[workid=" + _workID + "]").attr("praiseid", "").removeClass("select");
                        YQFunc.EventIdle = true;
                        Cmn.alert("取消点赞成功");

                    } else {
                        //登录判断
                        YQFunc.BackLogin(data);
                        YQFunc.EventIdle = true;
                    }

                });
            }
        });
    },
    CollectBtnBind: function () {
        $(".Inner").on("touchend", ".CollectBtn", function () {
            if (YQFunc.EventIdle) {
                YQFunc.EventIdle = false;
            } else {
                return;
            }
            //$(".CollectBtn").unbind("touchend").bind("touchend", function () {
            var _self = $(this);
            var _collectID = _self.attr("collectid");
            var _workID = _self.attr("workid");
            if (_collectID == "" || _collectID == undefined) {
                Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddCollect", { "WorkID": _workID }, function (data) {
                    if (data.IsSuccess == 1 && data.data[0]["CollectID"] != "") {
                        $(".CollectBtn[workid=" + _workID + "]").attr("collectid", data.data[0]["CollectID"]).addClass("select");
                        YQFunc.EventIdle = true;
                        Cmn.alert("收藏成功");
                    } else {
                        //登录判断
                        YQFunc.BackLogin(data);
                        YQFunc.EventIdle = true;
                    }

                });
            } else {
                Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelCollectByID", { "CollectID": _collectID }, function (data) {
                    if (data.IsSuccess == 1) {
                        $(".CollectBtn[workid=" + _workID + "]").attr("collectid", "").removeClass("select");
                        YQFunc.EventIdle = true;
                        Cmn.alert("取消收藏成功");
                    } else {
                        //登录判断
                        YQFunc.BackLogin(data);
                        YQFunc.EventIdle = true;
                    }

                });
            }
        });
    },
    FollowBtnBind: function () {
        $(".Inner1,.Inner3").on("touchend", ".icons-attention", function () {
            if (YQFunc.EventIdle) {
                YQFunc.EventIdle = false;
            } else {
                return;
            }
            //$(".icons-attention").unbind("touchend").bind("touchend", function () {
            var _self = $(this);
            //if ($(this).hasClass("select")) {
            //    Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelFollowByID", { "FollowedUserID": _self.attr("userid") }, function (data) {
            //        if (data.IsSuccess == 1) {
            //            _self.removeClass("select");
            //        }
            //    });

            //} else {
            Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=AddFollow", { "FollowedUserID": _self.attr("userid") }, function (data) {
                if (data.IsSuccess == 1) {
                    //_self.addClass("select");
                    $(".icons-attention[userid=" + _self.attr("userid") + "]").hide().siblings().SgShow().attr("followid", data["FollowID"]);
                    //_self.hide().siblings().SgShow();
                    YQFunc.EventIdle = true;
                } else {
                    //登录判断
                    YQFunc.BackLogin(data);
                    YQFunc.EventIdle = true;
                }

            });
            //}
        });
    },
    GetFollowPraiseCollectState: function (Container, FollowedUserID, WorkID) {
        var _param = { FollowedUserID: FollowedUserID, WorkID: WorkID }
        Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=GetFollowPraiseCollectState", _param, function (Statedata) {
            if (Statedata.IsSuccess == 1) {
                if (Statedata.data[0]["IsSelf"] == 0) {
                    if (Statedata.data[0]["FollowID"] == "") {
                        Container.find(".icons-attention").SgShow().siblings().hide();
                        Container.find(".contract-right").SgShow();
                    } else {
                        Container.find(".icons-attention").hide().next().SgShow().attr("followid", Statedata.data[0]["FollowID"]);
                        Container.find(".contract-right").SgShow();
                    }
                    Container.find(".contract-right .icon-trash").hide();
                } else {
                    Container.find(".contract-right .icons-sprite").hide();
                    Container.find(".contract-right .icon-trash").SgShow();
                }
                Container.find(".contract-right i").attr("workid", WorkID);


                if (Statedata.data[0]["PraiseID"] != "") {
                    Container.find(".PraiseBtn").attr({ "praiseid": Statedata.data[0]["PraiseID"], "workid": WorkID, "praisecount": Statedata.data[0]["PraiseCount"] }).addClass("select");
                }

                if (Statedata.data[0]["CollectID"] != "") {
                    Container.find(".CollectBtn").attr({ "collectid": Statedata.data[0]["CollectID"], "workid": WorkID, "colloctcount": Statedata.data[0]["ColloctCount"] }).addClass("select");
                }
                if (Statedata.data[0]["ReportID"] != "") {
                    Container.find(".report").attr("reportid", Statedata.data[0]["ReportID"]).css("visibility", "hidden");
                } else {
                    Container.find(".report").attr("reportid", Statedata.data[0]["ReportID"]).css("visibility", "visible");
                }

                Container.find(".PraiseBtn").attr({ "workid": WorkID, "praisecount": Statedata.data[0]["PraiseCount"] })
                Container.find(".CollectBtn").attr({ "workid": WorkID, "colloctcount": Statedata.data[0]["ColloctCount"] });
                Container.find(".ShareBtn").attr({ "workid": WorkID });

                Container.find(".avatar-left img").attr("src", Statedata.data[0]["HeadImgUrl"]);
                Container.find(".avatar-left span").html(Statedata.data[0]["NickName"]);
                YQFunc.GetSendTime(Container, Statedata.data[0]["SendTime"], Statedata.data[0]["cmn_CreateDate"]);


            } else {
                //登录判断
                YQFunc.BackLogin(Statedata);
            }

        });
    },
    GetCommentTop3: function (Container, WorkID) {
        Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=GetCommentTop3ByWorkID", { WorkID: WorkID }, function (data1) {
            if (data1.IsSuccess == 1) {
                var _listHtml = "";
                for (var _j = 0; _j < data1.data.length; _j++) {
                    if (_j == 3) {
                         _listHtml += '<div class="more-comment CommentBtn" workid="' + WorkID + '">' +
                                    '<a href="javascript:void(0)" class="general-font">查看全部评论</a>' +
                                 '</div>';
                        break;
                    }
                    _listHtml += '<div class="list-desc">' +
                                   '<span class="comment-face"><img src="' + data1.data[_j]["HeadImgUrl"] + '"></span>' +
                                   '<em class="comment-name general-font center-vertical">' + data1.data[_j]["NickName"] + ':</em>' +
                    '<strong class="comment-des general-font center-vertical">' + data1.data[_j]["Comment"] + '</strong>' +
                    '</div>';

                }
                Container.find(".comment-list").append(_listHtml);
            } else {
                //登录判断
                YQFunc.BackLogin(data1);
            }

        });
    },
    GetComment: function (Container, WorkID) {
        Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=GetCommentByWorkID", { WorkID: WorkID }, function (data1) {
            if (data1.IsSuccess == 1) {
                var _listHtml = "";
                var _j;
                for (_j = 0; _j < data1.data.length; _j++) {
                    _listHtml += '<div class="list-desc">' +
                                   '<span class="comment-face"><img src="' + data1.data[_j]["HeadImgUrl"] + '"></span>' +
                                   '<em class="comment-name general-font center-vertical">' + data1.data[_j]["NickName"] + ':</em>' +
                    '<strong class="comment-des general-font center-vertical">' + data1.data[_j]["Comment"] + '</strong>' +
                    '</div>';

                }
                Container.find(".comment-list").append(_listHtml);
            } else {
                //登录判断
                YQFunc.BackLogin(data1);
            }
        });
    },

    GetWorkLabel: function (Container, WorkImgID) {
        Cmn.Ajax.PostData("/Itf/CSharp/Interface.aspx?method=GetWorkImgLabelByWorkImgID", { WorkImgID: WorkImgID }, function (data1) {
            if (data1.IsSuccess == 1) {
                var _listHtml = "";
                for (var _j = 0; _j < data1.data.length; _j++) {
                    _listHtml += '<div class="choose-desc" style="top:' + data1.data[_j]["LabelTop"] + 'px;left:' + data1.data[_j]["LabelLeft"] + 'px">' +
                        '<div labelid="' + data1.data[_j]["LabelID"] + '" class="choose-desc-box' + (data1.data[_j]["Direction"] == "False" ? "" : " select") + '">' +
                        '<span class="attention-desc-text">' + data1.data[_j]["Contents"] + '</span>' +
                        '<b class="attention-arrow"></b>' +
                        '</div>' +
                        '<div class="choose-desc-round">' +
                        '<i class="round"></i>' +
                        '</div>' +
                        '</div>';
                }
                Container.find(".con-des").append(_listHtml);
            } else {
                //登录判断
                YQFunc.BackLogin(data1);
            }
        });
    },
    GetSendTime: function (Container, SendTime, CreateDate) {
        var _sendTime = SendTime;
        _sendTimetext = "";
        if (_sendTime < 60) {
            _sendTimetext = "刚刚";
        } else if (_sendTime < 3600) {
            _sendTimetext = (_sendTime / 60).toFixed(0) + "分钟前";
        } else if (_sendTime < 3600 * 24) {
            _sendTimetext = (_sendTime / 3600).toFixed(0) + "小时前";
        } else if (_sendTime < 3600 * 24 * 5) {
            _sendTimetext = (_sendTime / 3600 / 24).toFixed(0) + "天前";
        } else {
            _sendTimetext = CreateDate;
        }
        Container.find(".release-time").html(_sendTimetext);
    },
    CommentBtnBind: function () {
        $(".Inner1,.Inner2").on("touchend", ".CommentBtn", function () {
            _self = $(this);
            _workID = _self.parents(".con-box").attr("workid");

            //YQFunc.GetComment($(".DescMain"), _workID);
            //YQFunc.GetWorkImgAndLabelByWorkID(_workID);
            //YQFunc.GetFollowPraiseCollectState($(".DescMain"), _self.parents(".con-box").attr("userid"), _workID);
            //$(".DescMain .PraiseBtn").attr({ "praiseid": _self.parents(".con-nav").find(".PraiseBtn").attr("praiseid"), "workid": _self.attr("workid") });
            //$(".DescMain .CollectBtn").attr({ "praiseid": _self.parents(".con-nav").find(".CollectBtn").attr("collectid"), "workid": _self.attr("workid") });

            //$(".DescMain .con-tip").html(_self.parents(".con-box").find(".con-tip").html());
            //$(".DescMain .contract-right").show();
            //$(".DescMain .con-des").html(_self.parents(".con-box").find(".con-des").html());
            YQFunc.GetDesc(_workID, _self.parents(".con-box").attr("userid"));
            $(".DescMain").show();
            $(".DescMain").animate({ left: "0px" }, 500);
            $(".DescMain .comment-input").animate({ left: "0px" }, 500);
            $(".footer-box").animate({ bottom: "-115px" }, 100);
            SiteFunc.BackBtnBind(function () {
                $(".DescMain").animate({ left: "640px" }, 500);
                $(".DescMain .comment-input").animate({ left: "640px" }, 500, function () {
                    $(".DescMain .con-des").remove();
                    $(".DescMain .comment-list").html("");
                    $(".DescMain").hide();
                });
                $(".footer-box").animate({ bottom: "0px" }, 100);
                SiteFunc.BackBtnBind();
            });
        });
    },
    DescCommentBtnBind: function () {
        $(".DescMain .CommentBtn").on("touchend", function () {
            setTimeout(function () {
                $(".comment-input input").focus().Select();
            }, 100);

        });
    },
    GetWorkImgAndLabelByWorkID: function (WorkID) {
        var _param = {
            WorkID: WorkID
        }
        CmnAjax.PostData("/Itf/CSharp/Interface.aspx?method=GetWorkImgAndLabelByWorkID", _param, function (data) {
            if (data.IsSuccess == 1) {

                for (var _i = 0; _i < data.data.length; _i++) {
                    var _html;
                    if ($(".DescMain .con-des[worlimgid=" + data.data[_i]["WorkImgID"] + "]").length == 0) {
                        _html = '<div class="con-des" worlimgid="' + data.data[_i]["WorkImgID"] + '">' +
                            '<img class="dat-PicPath-src" src="' + data.data[_i]["PicPath"] + '">' +
                            '</div>';
                        $(".DescMain .con-features").before(_html);
                    }
                    if (data.data[_i]["LabelID"] != "") {
                        _html = '<div class="choose-desc"  workid="' + data.data[_i]["WorkID"] + '" style="top:' + data.data[_i]["LabelTop"] + 'px;left:' + data.data[_i]["LabelLeft"] + 'px">' +
                            '<div labelid="' + data.data[_i]["LabelID"] + '" class="choose-desc-box' + (data.data[_i]["Direction"] == "False" ? "" : " select") + '">' +
                            '<span class="attention-desc-text">' + data.data[_i]["Contents"] + '</span>' +
                            '<b class="attention-arrow"></b>' +
                            '</div>' +
                            '<div class="choose-desc-round">' +
                            '<i class="round"></i>' +
                            '</div>' +
                            '</div>';
                        $(".DescMain .con-des[worlimgid=" + data.data[_i]["WorkImgID"] + "]").append(_html);
                    }


                }
            } else {
                //登录判断
                YQFunc.BackLogin(data);
            }
        });
    },
    GetDesc: function (WorkID, UserID) {
        $(".DescMain .desc-box").attr("workid", WorkID);
        $(".DescMain .con-box").attr("workid", WorkID);
        YQFunc.GetComment($(".DescMain"), WorkID);
        YQFunc.GetWorkImgAndLabelByWorkID(WorkID);
        YQFunc.GetFollowPraiseCollectState($(".DescMain"), UserID, WorkID);
    },
    BackLogin: function (data) {
        if (data.ErrMsg == "用户未登录") {
            
            Cmn.alert("用户未登录");
            location.href = "index.html";
        }
    }


}