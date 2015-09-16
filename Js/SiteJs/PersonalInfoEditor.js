/// <reference path="../CmnUI/CanvasTools/CanvasTools.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="Private.js" />
/// <reference path="SiteFunc.js" />

$(function () {
    var _HeadImgUrl;//用户头像
    var _NickName;//用户昵称
    var _Identitys;//用户身份
    var _Profession;//用户职业
    var _Sex;//用户性别
    var _Signature;//个性签名
    var _BackgroundImg;//背景图片
    var _ColloctCount;//收藏作品数量
    var _WorkCount;//发布作品数量
    var _FollowCount;//关注
    var _FollowedCount;//被关注（粉丝）
    var _IndexPhoto;//照片下标
    var _WorkID;//作品ID
    var _UserID = Cmn.Func.GetParamFromUrl("uid");
    var _IsUploadImgLK = false;
    var _Switching = false;//切换
    //////////////////////页面加载调用方法///////////////////////////
    if (_UserID != "") {
        $(".JscEditInformationBtn").hide();
    }

    ///页面数据填充
    function PersonalInformation() {
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=PersonalDetails", {"UserID":_UserID}, function (dat) {
            if (dat.IsSuccess == 1) {
                _HeadImgUrl = dat.HeadImgUrl;
                _NickName = dat.NickName;
                _Identitys = dat.Identitys;
                _Profession = dat.Profession;
                _Sex = dat.Sex;
                _Signature = dat.Signature;
                _BackgroundImg = dat.BackgroundImg;
                _ColloctCount = dat.ColloctCount;
                _WorkCount = dat.WorkCount;
                _FollowCount = dat.FollowCount;
                _FollowedCount = dat.FollowedCount;

                $(".JscProfession").html(_Profession);
                $(".JscWorkCount").html(_WorkCount);
                $(".JscColloctCount").html(_ColloctCount);
                $(".JscFollowedCount").html(_FollowedCount);
                $(".JscFollowCount").html(_FollowCount);
                $(".JscUserImg img").attr("src", _HeadImgUrl);
                $(".JscBgImg").attr("src", _BackgroundImg);
                $(".JscUserName").html(_NickName);
                $(".JscSignature").html(_Signature);
                $(".JscNameText").val(_NickName);
                $(".JscSignatureText").html(_Signature);
                $(".JscSexChange a").removeClass("select");
                if (_Identitys == 1) {
                    $(".JscTalentLable").show();
                }
                else {
                    $(".JscTalentLable").hide();
                }
                if (_Sex == "0") {
                    //男
                    $(".JscUserSexs").removeClass("select");
                    $(".JscUserSex").html("男");
                    $(".JscSexChange a").eq(0).addClass("select");
                }
                if (_Sex == "1") {
                    //女
                    $(".JscUserSexs").addClass("select");
                    $(".JscUserSex").html("女");
                    $(".JscSexChange a").eq(1).addClass("select");
                }
            }
            else {
                SiteFunc.JumpPage("index.html");
            }
        })
    }
    PersonalInformation();
 
    ///////////////////////图片切换///////////////////////////////

    //收藏作品
    $(".JscCollectBtn").on("touchend", function () {
        $(".Inner").hide();
        $(".JscInnerOne").show();
    })
    //发布作品
    $(".JscReleaseBtn").on("touchend", function () {
        $(".Inner").hide();
        $(".JscInnerTwo").show();
    })
    //跳转修改
    $(".JscEditInformationBtn").on("touchend", function () {
        SiteFunc.JumpPage("PersonalInfoEditor.aspx");
    })
    //跳转留言
    $(".JscHrefContact").on("touchend", function () {
        SiteFunc.JumpPage("ContactUs.html");
    })
    /////////////////////修改资料////////////////////////////
    //关闭浮层
    $(".JscCloseFloat").on("touchend", function () {
        SiteFunc.FloatOperating("", ".JscFloatAll,.JscInformationChangesFloat,.JscInformationHide", true);
        PersonalInformation();
    })
    //姓名修改
    $(".JscChangeDataName").on("touchend", function () {
        SiteFunc.FloatOperating(".JscFloatAll,.JscInformationChangesFloat,.JscNameFloat", "", false);
    })
    
    //性别修改
    $(".JscChangeDataSex").on("touchend", function () {
        SiteFunc.FloatOperating(".JscFloatAll,.JscInformationChangesFloat,.JscSexAllFloat", "", false);
    })
    //签名修改
    $(".JscChangeDataSigna").on("touchend", function () {
        SiteFunc.FloatOperating(".JscFloatAll,.JscInformationChangesFloat,.JscSignatureFloat ", "", false);
    })
    //性别切换
    $(".JscSexChange").on("touchend", function () {
        $(".JscSexChange a").removeClass("select");
        $(".JscSexChange a").eq($(this).index()).addClass("select");
    })

    /////////////////////////////背景图片修改/////////////////////////////////////
    //点击修改背景
    BindUpload(".JscFrontCoverHerf", ".JscCoverCanvas");
    //点击修改头像
    BindUpload(".JscHeadPortraitHerf", ".JscCoverCanvas");
    ///上传图片公用方法
    function UserUploadImg(_param){
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=SubmitPictureItf", _param, function (dat) {
            if (dat.IsSuccess == 0) {
                SiteFunc.JumpPage("index.html");
            }
            else if (dat.IsSuccess == 1) {
                //修改成功
                SiteFunc.FloatOperating(".JscContactBtn,.JscLayer,.JscUpdateLayer", ".JscFloatAll,.JscSubmitPicture,.JscUploadLayer");
                setTimeout(function () { $(".JscLayer").hide(); }, 1500);
                _IsUploadImgLK = false;
            }
            else {
                Cmn.alert("网络异常");
            }
        })
    }
    //点击
    //修改背景
    $(".JscFrontCoverHerf").on("touchend", function () {
        _Switching = false;
    })
    //修改头像
    $(".JscHeadPortraitHerf").on("touchend", function () {
        _Switching = true;
    })
    //选取图片
    function BindUpload(FileInput, ShowBox) {
        
        window._Stage = Cmn.UI.CanvasTools.ImageProcess(ShowBox, 640, 490);
        _Stage.BindSelectFileBtn(FileInput, 5);
        _Stage.OnSelectFile.Add(function (image) {
            //浮层显示出来
            SiteFunc.FloatOperating(".JscFloatAll,.JscCoverCanvas,.JscCoverFloat,.JscSubmitPicture", ".JscContactBtn");
        });
    }
    //背景图片修改
    $(".JscSubmitPicture").on("touchend", function () {
        SiteFunc.FloatOperating(".JscLayer,.JscUploadLayer", ".JscCoverCanvas,.JscCoverFloat,.JscUpdateLayer");
        if (_IsUploadImgLK) { return; }
        _IsUploadImgLK = true;
        CmnAjax.PostData("Itf/CSharp/Upload.aspx?method=SaveFile", {
            inputFileName: "ImageData",
            ImageData: window._Stage.GetBase64Image()
        }, function (dat) {
            _BackgroundImg = dat.path;
            var _param;
            if (!_Switching) {
                $(".JscBgImg").attr("src", dat.path);
                _param = {
                    "HeadImgUrl": "",
                    "BackgroundImg": dat.path,
                }
            }
            else {
                $(".JscUserImg img").attr("src", dat.path);
                _param = {
                    "HeadImgUrl": dat.path,
                    "BackgroundImg": ""
                }
            }
            UserUploadImg(_param);
        })
    })


    //提交资料
    $(".JscSubmitInformation").on("touchend", function () {
        //修改昵称
        _NickName = $(".JscNameText").val();
        //修改个性签名
        _Signature = $(".JscSignatureText").val();
        //修改性别
        if ($(".JscSexChange a").eq(0).hasClass("select")) {
            _Sex = 0;
        }
        else {
            _Sex = 1;
        }
        //身份获取
        if ($(".JscTalentLable").is(":visible")) {
            _Identitys = 1;
        }
        else {
            _Identitys = 0;
        }
        //背景头像
        //_BackgroundImg = $(".JscBgImg").attr("src");
        //用户头像
        //_HeadImgUrl = $(".JscUserImg img").attr("src");
        var _param = {
            //"HeadImgUrl": _HeadImgUrl,
            "NickName": _NickName,
            //"BackgroundImg": _BackgroundImg,
            "Sex": _Sex,
            "Identitys": _Identitys,
            "Signature": _Signature,
        }
        CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=InformationChanges", _param, function (dat) {
            if (dat.IsSuccess == 1) {
                PersonalInformation();
                SiteFunc.FloatOperating("", ".JscFloatAll,.JscInformationChangesFloat,.JscInformationHide");
            }
            else {
                Cmn.alert("网络异常！");
            }
        })
    })
    
})