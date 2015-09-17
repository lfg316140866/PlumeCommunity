/// <reference path="../CmnTools/WechatShare.js" />
/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="SiteFunc.js" />
/// <reference path="../CmnFuncExd.js" />
/// <reference path="../animate/AnimateFrame.js" />


$(function () {
    var _ChooseIndex;
    var _ModeUrlFilter = "";//滤镜路径
    var _ModeUrlFrame = ""//相框路径
    var _UserUploadImg;//用户上传作品
    var _LableText = "";//输入的标签内容
    var _LableDirection = 0;//标签方向 0右 1左
    var _LableLeft;//标签右坐标
    var _LableTop;//标签上标签
    var _LobaleIndex=0;//标签下标
    _IsUploadImgLK = false;
    AnimateFrame.IsLockScenes = true;
    /////////////////////////方法////////////////////////////
    function BindUpload(FileInput, ShowBox) {
        window._Stage = Cmn.UI.CanvasTools.ImageProcess(ShowBox, 640, 490);
        _Stage.BindSelectFileBtn(FileInput, 5);
        _Stage.OnSelectFile.Add(function (image) {
            //跳转场景
            SiteFunc.SceneJump("choice", 3);
            $(".JscHeadColumn").show();
            $(".JscMaterialAll").show();
        });
    }
    //滤镜填充
    function ModesTC(_modeUrlIndex) {
        _maskImage = new Image();
        _maskImage.src = _modeUrlIndex;
        _maskImage.onload = function () {
            _Stage.ReplaceChildByIndex(10, _maskImage, 0, 0);
        }
    }
    ///相框抛出
    function PhotoFrameThrown() {
        CmnAjax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=YQGetPhotoFrameDate", "", function (dat) {
            if (dat.IsSuccess == 1) {
                Cmn.FillData(".JscPhotoFrameElements,JscPhotoFramePhoto", dat.data, false);
                //相框选择
                $(".JscPhotoFrameElements").on("click", function () {
                    var _indexfr = $(this).index();
                    $(".JscPhotoFrameElements a").removeClass("select");
                    $(".JscPhotoFrameElements a").eq(_indexfr).addClass("select");
                    _ModeUrlFrame = $(this).attr("frurl");
                    ModesTC(_ModeUrlFrame);
                })
                //相框返回
                $(".JscPhotoFrameRevocationBtn").on("click", function () {
                    $(".JscPhotoFrameElements a").removeClass("select");
                    _ModeUrlFrame = "/";
                    ModesTC(_ModeUrlFrame);
                })
            }
        })
    }

    ///滤镜抛出
    function FilterThrown() {
        CmnAjax.PostData("/Itf/CSharp/CmnMisItf.aspx?method=GetSqlData&ItfName=YQGetFilterDate", "", function (dat) {
            if (dat.IsSuccess == 1) {
                Cmn.FillData(".JscFilterElements,JscTemplatePhoto", dat.data, false);
                //选取滤镜
                $(".JscFilterElements").on("click", function () {
                    var _indexf = $(this).index();
                    $(".JscFilterElements a").removeClass("select");
                    $(".JscFilterElements a").eq(_indexf).addClass("select");
                    _ModeUrlFilter = $(this).attr("furl");
                    ModesTC(_ModeUrlFilter);
                })
                //滤镜返回
                $(".JscTemplateRevocationBtn").on("click", function () {
                    $(".JscFilterElements a").removeClass("select");
                    _ModeUrlFilter = "/";
                    ModesTC(_ModeUrlFilter);
                })
            }
        })
    }


    ////////////////////////页面逻辑/////////////////////////////////
    
    //上传元素选择
    $(".JscChooseFeatures").on("click", function () {
        _ChooseIndex = $(this).index();
    })
    //绑定事件
    BindUpload(".JscReleaseBtn", ".JscPhotoCanvas");
    ////发布选项
    //$(".JscReleaseBtn").on("click", function () {

    //    if (_ChooseIndex!= 0) {
    //        _ChooseIndex = 0;
    //    }
    //    //上传图文
    //    else {
          
    //    }
    //})
    //点击保存照片
    $(".JscDetermineBtn").on("click", function () {
        //把所有标签添加成JOSN
        var _objectLable;
        var _lableCount=$(".JscLableShow").size();
        for (var _i=0; _i < _lableCount; _i++) {
            _LableLeft = $(".JscLableShow").eq(_i).css("left");
            _LableLeft =parseInt( _LableLeft.replace("px",""));
            _LableTop = $(".JscLableShow").eq(_i).css("top");
            _LableTop = parseInt(_LableTop.replace("px", ""));
            _LableText = $(".JscLableShow").eq(_i).find(".JscLableShowText").eq(0).text();
            if ($(".JscLableShow div").eq(_i).hasClass("select")) {
                _LableDirection = 0;
            }
            else {
                _LableDirection = 1;
            }
            _objectLable = _objectLable + ",{\"LableLeft\": \"" + _LableLeft + "\",\"LableTop\":\"" + _LableTop + "\",\"LableText\":\"" + _LableText + "\",\"LableDirection\":\"" + _LableDirection + "\"}";
        }
        if (_IsUploadImgLK) { return; }
        _IsUploadImgLK = true;
        CmnAjax.PostData("Itf/CSharp/Upload.aspx?method=SaveFile", {
            inputFileName: "ImageData",
            ImageData: window._Stage.GetBase64Image()
        }, function (dat) {
            _UserUploadImg = dat.path;
            _objectLable = _objectLable.substring(_objectLable.indexOf("{"),_objectLable.length);
            var _josnLable = "{\"IsSuccess\":0,\"ErrMsg\":\"网络异常\",\"RecCount\":" + _lableCount + ", data:[" + _objectLable + "]}";
            var _param = {
                "Work": _UserUploadImg,
                "JosnLable": _josnLable
                }
            CmnAjax.PostData("/Itf/CSharp/ItfOther.aspx?method=UserUploadWorks", _param, function (dat) {
                if (dat.IsSuccess == 1) {
                    //上传完成
                    _IsUploadImgLK = false;
                    Cmn.alert("上传完成！");
                }
                else if(dat.IsSuccess==0){
                    //用户未登录
                    //SiteFunc.JumpPage("index.html");
                    Cmn.alert("用户未登录！");
                }
                else if (dat.IsSuccess == 2) {
                    Cmn.alert("你还未上传照片！");
                }
                else {
                    Cmn.alert("网络异常！");
                }
            })
        })
    })

    ///////////////////////////////////////元素选择块//////////////////////////////////////
    $(".JscMaterialSelection").on("click", function () {
        SiteFunc.SceneJump("choice", 3);
        SiteFunc.FloatOperating(".JscHeadColumn", ".JscOperatingPiece,.JscLableFloat,.JscLableShowFloat");
        var _indexElements = $(this).index();
        $(".JscMaterialSelection a").removeClass("select");
        $(".JscMaterialSelection a").eq(_indexElements).addClass("select");
        //裁剪，旋转
        if (_indexElements == 0) {
            SiteFunc.FloatOperating("", ".JscOperatingHide", true);

        }
        //滤镜
        else if (_indexElements == 1) {
            SiteFunc.FloatOperating(".JscTemplateDiv", ".JscOperatingHide");

        }
        //贴纸，相框
        else if (_indexElements == 2) {
            SiteFunc.FloatOperating(".JscOperatingPiece", ".JscOperatingHide");

        }
        //标签
        else if (_indexElements == 3) {
            SiteFunc.FloatOperating(".JscLableDiv", ".JscOperatingHide");

        }
        //@人
        else if (_indexElements == 4) {
            SiteFunc.SceneJump("release-who", 3);
            SiteFunc.FloatOperating("", ".JscHeadColumn",true);
        }
    })
    /////////////////////////////////////////标签块////////////////////////////////////
    $(".JscLableAddBtn").on("click", function () {
        SiteFunc.FloatOperating(".JscLableFloat,.JscLableShowFloat", ".JscHeadColumn");
    })
    //标签数据填充
    $(".JscLableDetermineBtn").on("click", function () {
        _LableText = $(".JscLableText").val();
        if (_LableText != "") {
            $(".JscPhotoCanvas").append("<div class='set-label JscLableShow'><div class='choose-desc JscLeftLable'><div class='choose-desc-box'><span class='attention-desc-text JscLableShowText'>" + _LableText + "</span><b class='attention-arrow'></b></div></div><div class='choose-desc-round'><i class='round'></i></div><div class='choose-desc tags-set JscRightLable'><div class='choose-desc-box choose-desc-fr'><span class='attention-desc-text JscLableShowText'>" + _LableText + "</span><b class='attention-arrow'></b></div></div></div>")
            //$(".JscPhotoCanvas").append("<div class='choose-desc JscLableShow'><div class='choose-desc-box JscLableSelectChange select'><span class='attention-desc-text JscLableTextRight'>" + _LableText + "</span><b class='attention-arrow JscLableTextLeft'>" + _LableText + "</b></div><div class='choose-desc-round'><i class='round'></i></div></div>");
            //$(".JscLableTextRight,.JscLableTextLeft").html(_LableText);
            SiteFunc.FloatOperating(".JscLableShow,.JscHeadColumn", ".JscLableShowFloat,.JscLableFloat")
            $(".JscLableText").val("");
            _LobaleIndex++;
        }

    })
    //标签位置切换
    $(".JscLableShow").on("click", function () {
        //为右 换左
        if (_LableDirection == 0) {
            $(".JscLableSelectChange").removeClass("select");
            _LableDirection = 1;
        }
        //为左 换右
        else {
            $(".JscLableSelectChange").addClass("select");
            _LableDirection = 0;
        }
    })

    //标签拖拽
    Cmn.UI.Drag(".JscLableShow", {
        dragParent: $(".Inner"),   //拖动元素的父亲
        containment: $(".JscPhotoCanvas"),  //拖动对象的拖动区域对象
        axis: "x,y",                //拖动方向 x y 空
        onStart: function () {
            _Self = this;
        },//开始拖动
        onMove: function () {
            ////标签位置切换
            //var _widthWindow = $(window).width();
            //var _widthLable = $(".JscLableShow").width();


        }, //拖动
        onEnd: function () {
            
        }
    });

    ///////////////////////////////滤镜，贴纸操作////////////////////////////////////
    //相框
    $(".JscOperatingTemplate").on("click", function () {
        SiteFunc.FloatOperating(".JscPhotoFrameDiv", ".JscOperatingPiece,.JscOperatingHide");
    })

    $(".JscOperatingStickers").on("click", function () {
        SiteFunc.FloatOperating(".JscStickersDiv ", ".JscOperatingPiece,.JscOperatingHide");
    })


    /////////////////////////////////////页面数据抛出//////////////////////////////////////
    PhotoFrameThrown();//相框抛出
    FilterThrown();//滤镜抛出

})


