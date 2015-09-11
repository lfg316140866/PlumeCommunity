/// <reference path="../ThirdLib/jquery.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="../animate/AnimateFrame.js" />


//首页业务逻辑 此处名称可以和页面对应起来 也可以和场景ID对应
$(document).ready(function () {
    $(".concern-btn").bind("touchend", function () {
        var _top = $(".Inner").eq(0).scrollTop();
        $(".Inner").eq(0).hide().next().show();
        $(".Inner").eq(1).scrollTop(_top);
    });
    $(".topics-btn").bind("touchend", function () {
        var _top = $(".Inner").eq(1).scrollTop();
        $(".Inner").eq(0).show().next().hide();
        $(".Inner").eq(0).scrollTop(_top);
    });

    var _workListHot = new CmnAjax.DataStepLoad(".hot_box .con-home-box", "/Itf/CSharp/Interface.aspx?method=GetWorkListOrderDateDesc", {}, '.hot_box', 1000, 2,
        function (data) {
            var _dataLength = data.data.length;
            var _beginIndex = $(".hot_box .con-home-box").length - _dataLength;
            for (var _i = 0; _i < _dataLength; _i++) {
                
                //关注图标
                if (data.data[_i]["FollowState"] == 0) {
                    //$(".con-home-box").eq(_beginIndex + _i).find(".icons-attention").addClass("select");
                    $(".hot_box .con-home-box").eq(_beginIndex + _i).find(".icons-attention").SgShow().siblings().hide();
                }
                else if (data.data[_i]["FollowState"] == 1) {
                    $(".hot_box .con-home-box").eq(_beginIndex + _i).find(".icons-attention").remove();
                } else {
                    $(".hot_box .con-home-box").eq(_beginIndex + _i).find(".icons-attention").hide().siblings().SgShow();
                }

               

                //上传时间
                var _sendTime = data.data[_i]["SendTime"];
                _sendTimetext = "";
                if (_sendTime < 60) {
                    _sendTimetext = "刚刚";
                } else if (_sendTime<3600) {
                    _sendTimetext = (_sendTime / 60).toFixed(0) + "分钟前";
                } else if (_sendTime<3600*24) {
                    _sendTimetext = (_sendTime / 3600).toFixed(0) + "小时前";
                } else if (_sendTime < 3600 * 24*5) {
                    _sendTimetext = (_sendTime / 3600 / 24).toFixed(0) + "天前";
                } else {
                    _sendTimetext = data.data[_i]["cmn_CreateDate"];
                }
                $(".hot_box .con-home-box").eq(_beginIndex + _i).find(".release-time").html(_sendTimetext);

                //获取评论
                Cmn.Ajax.GetData("/Itf/CSharp/Interface.aspx?method=GetCommentTop3ByWorkID", { WorkID: data.data[_i]["WorkID"] }, "", function (data1) {
                    var _listHtml = "";
                    var _j;
                    for (_j = 0; _j < data1.data.length; _j++) {
                        _listHtml += '<div class="list-desc">' +
                                       '<span class="comment-face"><img src="' + data1.data[_j]["HeadImgUrl"] + '"></span>' +
                                       '<em class="comment-name general-font center-vertical">' + data1.data[_j]["UserName"] + ':</em>' +
                        '<strong class="comment-des general-font center-vertical">' + data1.data[_j]["Comment"] + '</strong>' +
                        '</div>';

                    }
                    if (_j > 3) {
                        _listHtml += '<div class="more-comment">' +
                                        '<a href="listdesc.html" class="general-font">查看全部评论</a>' +
                                     '</div>';
                    }
                    $(".hot_box .con-home-box").eq(_beginIndex + _i).find(".comment-list").append(_listHtml);


                });

                //获取标签
                Cmn.Ajax.GetData("/Itf/CSharp/Interface.aspx?method=GetWorkLabelByWorkID", { WorkID: data.data[_i]["WorkID"] }, "", function(data1) {
                    var _listHtml = "";
                    var _j;
                    for (_j = 0; _j < data1.data.length; _j++) {
                        _listHtml += '<div class="choose-desc" style="top:' + data1.data[_j]["LabelTop"] + ';left:' + data1.data[_j]["Labelleft"] + '">' +
                            '<div class="choose-desc-box' + (data1.data[_j]["Direction"] == "False" ? "" : " select") + '">' +
                            '<span class="attention-desc-text">' + data1.data[_j]["Contents"] + '</span>' +
                            '<b class="attention-arrow"></b>' +
                            '</div>' +
                            '<div class="choose-desc-round">' +
                            '<i class="round"></i>' +
                            '</div>' +
                            '</div>';


                    }

                    $(".hot_box .con-home-box").eq(_beginIndex + _i).find(".con-des").append(_listHtml);


                   
                    //关注按钮绑定
                    $(".icons-attention").unbind("touchend").bind("touchend", function () {
                        var _self = $(this);
                        //if ($(this).hasClass("select")) {
                        //    Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelFollowByID", { "FollowedUserID": _self.attr("userid") }, function (data) {
                        //        if (data.IsSuccess == 1) {
                        //            _self.removeClass("select");
                        //        }
                        //    });

                        //} else {
                        Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddFollow", { "FollowedUserID": _self.attr("userid") }, function(data) {
                            if (data.IsSuccess == 1) {
                                //_self.addClass("select");
                                _self.hide().siblings().SgShow();
                            }
                        });
                        //}
                    });


                    //点赞图标
                    if (data.data[_i]["PraiseID"] != "") {
                        $(".hot_box .con-home-box").eq(_beginIndex + _i).find(".PraiseBtn").addClass("select");
                    }

                    //点赞按钮绑定
                    $(".PraiseBtn").unbind("touchend").bind("touchend", function () {
                        var _self = $(this);
                        var _praiseID = _self.attr("praiseid");
                        var _workID = _self.attr("workid");
                        if (_praiseID == "") {
                            Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddPraise", { "WorkID": _workID }, function (data) {
                                if (data.IsSuccess == 1 && data.data[0]["PraiseID"]!="") {
                                    _self.attr("praiseid", data.data[0]["PraiseID"]);
                                    _self.addClass("select");
                                }
                            });
                        } else {
                            Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelPraiseByID", { "PraiseID": _praiseID }, function (data) {
                                if (data.IsSuccess == 1) {
                                    _self.attr("praiseid","");
                                    _self.removeClass("select");
                                }
                            });
                        }
                    })

                    //点赞图标
                    if (data.data[_i]["CollectID"] != "") {
                        $(".hot_box .con-home-box").eq(_beginIndex + _i).find(".CollectBtn").addClass("select");
                    }

                    //收藏按钮绑定
                    $(".CollectBtn").unbind("touchend").bind("touchend", function () {
                        var _self = $(this);
                        var _collectID = _self.attr("collectid");
                        var _workID = _self.attr("workid");
                        if (_collectID == "") {
                            Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddCollect", { "WorkID": _workID }, function (data) {
                                if (data.IsSuccess == 1 && data.data[0]["CollectID"] != "") {
                                    _self.attr("collectid", data.data[0]["CollectID"]);
                                    _self.addClass("select");
                                }
                            });
                        } else {
                            Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelCollectByID", { "CollectID": _collectID }, function (data) {
                                if (data.IsSuccess == 1) {
                                    _self.attr("collectid", "");
                                    _self.removeClass("select");
                                }
                            });
                        }
                    })

                });
            }

        });
    _workListHot.BindScrollLoadData(".Inner1");

    var _workListFollow = new CmnAjax.DataStepLoad(".follow_box .con-home-box", "/Itf/CSharp/Interface.aspx?method=GetWorkListOrderDateDescByFollow", {}, '.follow_box', 1000, 2,
       function (data) {
           var _dataLength = data.data.length;
           var _beginIndex = $(".follow_box .con-home-box").length - _dataLength;
           for (var _i = 0; _i < _dataLength; _i++) {

               //关注图标
               if (data.data[_i]["FollowState"] == 0) {
                   //$(".con-home-box").eq(_beginIndex + _i).find(".icons-attention").addClass("select");
                   $(".follow_box .con-home-box").eq(_beginIndex + _i).find(".icons-attention").SgShow().siblings().hide();
               }
               else if (data.data[_i]["FollowState"] == 1) {
                   $(".follow_box .con-home-box").eq(_beginIndex + _i).find(".icons-attention").remove();
               } else {
                   $(".follow_box .con-home-box").eq(_beginIndex + _i).find(".icons-attention").hide().siblings().SgShow();
               }



               //上传时间
               var _sendTime = data.data[_i]["SendTime"];
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
                   _sendTimetext = data.data[_i]["cmn_CreateDate"];
               }
               $(".follow_box .con-home-box").eq(_beginIndex + _i).find(".release-time").html(_sendTimetext);

               //获取评论
               Cmn.Ajax.GetData("/Itf/CSharp/Interface.aspx?method=GetCommentTop3ByWorkID", { WorkID: data.data[_i]["WorkID"] }, "", function (data1) {
                   var _listHtml = "";
                   var _j;
                   for (_j = 0; _j < data1.data.length; _j++) {
                       _listHtml += '<div class="list-desc">' +
                                      '<span class="comment-face"><img src="' + data1.data[_j]["HeadImgUrl"] + '"></span>' +
                                      '<em class="comment-name general-font center-vertical">' + data1.data[_j]["UserName"] + ':</em>' +
                       '<strong class="comment-des general-font center-vertical">' + data1.data[_j]["Comment"] + '</strong>' +
                       '</div>';

                   }
                   if (_j > 3) {
                       _listHtml += '<div class="more-comment">' +
                                       '<a href="listdesc.html" class="general-font">查看全部评论</a>' +
                                    '</div>';
                   }
                   $(".follow_box .con-home-box").eq(_beginIndex + _i).find(".comment-list").append(_listHtml);


               });

               //获取标签
               Cmn.Ajax.GetData("/Itf/CSharp/Interface.aspx?method=GetWorkLabelByWorkID", { WorkID: data.data[_i]["WorkID"] }, "", function (data1) {
                   var _listHtml = "";
                   var _j;
                   for (_j = 0; _j < data1.data.length; _j++) {
                       _listHtml += '<div class="choose-desc" style="top:' + data1.data[_j]["LabelTop"] + ';left:' + data1.data[_j]["Labelleft"] + '">' +
                           '<div class="choose-desc-box' + (data1.data[_j]["Direction"] == "False" ? "" : " select") + '">' +
                           '<span class="attention-desc-text">' + data1.data[_j]["Contents"] + '</span>' +
                           '<b class="attention-arrow"></b>' +
                           '</div>' +
                           '<div class="choose-desc-round">' +
                           '<i class="round"></i>' +
                           '</div>' +
                           '</div>';


                   }

                   $(".follow_box .con-home-box").eq(_beginIndex + _i).find(".con-des").append(_listHtml);



                   //关注按钮绑定
                   $(".icons-attention").unbind("touchend").bind("touchend", function () {
                       var _self = $(this);
                       //if ($(this).hasClass("select")) {
                       //    Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelFollowByID", { "FollowedUserID": _self.attr("userid") }, function (data) {
                       //        if (data.IsSuccess == 1) {
                       //            _self.removeClass("select");
                       //        }
                       //    });

                       //} else {
                       Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddFollow", { "FollowedUserID": _self.attr("userid") }, function (data) {
                           if (data.IsSuccess == 1) {
                               //_self.addClass("select");
                               _self.hide().siblings().SgShow();
                           }
                       });
                       //}
                   });


                   //点赞图标
                   if (data.data[_i]["PraiseID"] != "") {
                       $(".follow_box .con-home-box").eq(_beginIndex + _i).find(".PraiseBtn").addClass("select");
                   }

                   //点赞按钮绑定
                   $(".PraiseBtn").unbind("touchend").bind("touchend", function () {
                       var _self = $(this);
                       var _praiseID = _self.attr("praiseid");
                       var _workID = _self.attr("workid");
                       if (_praiseID == "") {
                           Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddPraise", { "WorkID": _workID }, function (data) {
                               if (data.IsSuccess == 1 && data.data[0]["PraiseID"] != "") {
                                   _self.attr("praiseid", data.data[0]["PraiseID"]);
                                   _self.addClass("select");
                               }
                           });
                       } else {
                           Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelPraiseByID", { "PraiseID": _praiseID }, function (data) {
                               if (data.IsSuccess == 1) {
                                   _self.attr("praiseid", "");
                                   _self.removeClass("select");
                               }
                           });
                       }
                   })

                   //点赞图标
                   if (data.data[_i]["CollectID"] != "") {
                       $(".follow_box .con-home-box").eq(_beginIndex + _i).find(".CollectBtn").addClass("select");
                   }

                   //收藏按钮绑定
                   $(".CollectBtn").unbind("touchend").bind("touchend", function () {
                       var _self = $(this);
                       var _collectID = _self.attr("collectid");
                       var _workID = _self.attr("workid");
                       if (_collectID == "") {
                           Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=AddCollect", { "WorkID": _workID }, function (data) {
                               if (data.IsSuccess == 1 && data.data[0]["CollectID"] != "") {
                                   _self.attr("collectid", data.data[0]["CollectID"]);
                                   _self.addClass("select");
                               }
                           });
                       } else {
                           Cmn.Ajax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=DelCollectByID", { "CollectID": _collectID }, function (data) {
                               if (data.IsSuccess == 1) {
                                   _self.attr("collectid", "");
                                   _self.removeClass("select");
                               }
                           });
                       }
                   })

               });
           }

       });
    _workListFollow.BindScrollLoadData(".Inner2");

    $.prototype.SgShow=function() {
        $(this).css("display", "block");
        return $(this);
    }
});