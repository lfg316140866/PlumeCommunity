﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Release.aspx.cs" Inherits="Release" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width,user-scalable=no;" />
    <link href="css/load.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />
    <link href="css/reset.css" rel="stylesheet" />
    <link href="css/public.css" rel="stylesheet" />
    <link href="css/font-awesome.css" rel="stylesheet" />
    <script src="Js/ThirdLib/jquery.js"></script>
    <script src="Js/jquery.easing.min.js"></script>
    <script src="Js/Cmn.js"></script>
    <script src="Js/CmnAjax.js"></script>
    <script src="Js/animate/AnimateMan.js"></script>
    <script src="Js/animate/ScenesSwitch.js"></script>
    <script src="Js/animate/Scenes.js"></script>
    <script src="Js/animate/AnimateFrame.js"></script>
    <script src="Js/animate/BasAnimate.js"></script>
    <script src="Js/jquery.mCustomScrollbar.js"></script>
    <script src="Js/CmnFuncExd.js"></script>
    <script src="Js/ThirdLib/touch.mini.js"></script>
    <script src="Js/ThirdLib/exif.js"></script>
    <script src="Js/ThirdLib/mobileBUGFix.mini.js"></script>
    <script src="Js/CmnUI/CmnUI.js"></script>
    <script src="Js/CmnUI/CanvasTools/CanvasTools.js"></script>
    <script src="Js/jquery.cycle.all.js"></script>
    <script src="Js/CmnTools/WechatShare.js"></script>
    <script src="Js/Public.js"></script>
    <script src="Js/SiteJs/SiteFunc.js"></script>
    <script src="Js/SiteJs/Release.js"></script>
    <title>羽茜社区</title>
</head>
<body>

    <div class="Wrap cmn-AnimteFrameContainer">
        <div class="Main cmn-ScenesContainer">

            <!--发布(选择形式)-->
            <div class="cmn-Scenes PublicScenes release" id="release">
                <div class="Inner">
                    <div class="release-tip"><h2>选择你的发布形式</h2></div>
                    <div class="release-form">
                        <ul class="release-form-nav">
                            <li class="JscChooseFeatures"><a href="javascript:void(0)" class="btn-sprite"></a></li>
                            <li class="JscChooseFeatures"><a href="javascript:void(0)" class="btn-sprite"></a></li>
                            <li class="JscChooseFeatures"><a href="javascript:void(0)" class="btn-sprite"></a></li>
                            <li class="JscChooseFeatures"><a href="javascript:void(0)" class="btn-sprite"></a></li>
                        </ul>
                    </div>
                    <div class="release-button">
                        <div class="release-btn JscReleaseBtn">发布</div>
                    </div>
                </div>
            </div>

            <!--发布-->
            <div class="cmn-Scenes PublicScenes choice" id="choice">
                <div class="filter-des JscPhotoCanvas">
                                    <!--<div class="set-label">
                                                    <div class="choose-desc">
                                                        <div class="choose-desc-box">
                                                            <span class="attention-desc-text">辛MM的中国范</span>
                                                            <b class="attention-arrow"></b>
                                                        </div>
                                                    </div>
                                                    <div class="choose-desc-round">
                                                        <i class="round"></i>
                                                    </div>

                                                    <div class="choose-desc tags-set">
                                                        <div class="choose-desc-box choose-desc-fr">
                                                            <span class="attention-desc-text">辛MM的中国范</span>
                                                            <b class="attention-arrow"></b>
                                                        </div>
                                                    </div>
                                                </div>-->
                                </div>
                <div class="Inner">

                    <!--发布(选择)-->
                    <div class="choice JscOperatingPiece" style="display:none">
                        <div class="choice-btn ">
                            <a class="JscOperatingTemplate" href="javascript:void(0)"><i class="icons-sprite icons-template"></i><span>模板</span></a>
                            <a class="JscOperatingStickers" href="javascript:void(0)"><i class="icons-sprite icons-sticker"></i><span>贴纸</span></a>
                        </div>
                    </div>

                    <!--发布(滤镜选择)-->
                    <div class="release-filter JscTemplateDiv JscOperatingHide">
                        <div class="filter-bar">
                            <button class="icons-returns JscTemplateRevocationBtn">
                                <em><i class="icons-sprite"></i></em>
                                <span>返回</span>
                            </button>
                            <ul class="filter-nav tags-box">
                                <!--选中滤镜添加a标签select-->
                                <li fid="" furl="" class="JscFilterElements dat-FilterID-fid dat-BigPicPath-furl"  ><a href="javascript:void(0)" class="JscSelectFilter"><img class="dat-SmallPicPath-src" src="images/filter-color.png" /><span class="dat-FilterDesc">原图</span></a></li>
                            </ul>
                        </div>
                    </div>

                     <!--发布(相框选择)-->
                    <div class="release-filter JscPhotoFrameDiv JscOperatingHide">
                        <div class="filter-bar">
                            <button class="icons-returns JscPhotoFrameRevocationBtn">
                                <em><i class="icons-sprite"></i></em>
                                <span>返回</span>
                            </button>
                            <ul class="filter-nav tags-box">
                                <!--选中滤镜添加a标签select-->
                                <li frid="" frurl="" class="JscPhotoFrameElements dat-FrameID-frid dat-BigPicPath-frurl"><a href="javascript:void(0)" class="JscSelectPhotoFrame"><img class="dat-SmallPicPath-src" src="images/filter-color.png" /><span class="dat-FrameDesc">原图</span></a></li>
                            </ul>
                        </div>
                    </div>

                     <!--发布(剪纸选择)-->
                    <div class="release-filter JscStickersDiv JscOperatingHide">
                        <div class="filter-bar">
                            <button class="icons-returns JscStickersRevocationBtn">
                                <em><i class="icons-sprite"></i></em>
                                <span>返回</span>
                            </button>
                            <ul class="filter-nav tags-box">
                                <!--选中滤镜添加a标签select-->
                                <li class="JscStickersElements"><a href="javascript:void(0)" class="select"><img src="images/filter-color.png" /><span>原图</span></a></li>
                            </ul>
                        </div>
                    </div>

                    <!--发布(自定义标签)-->
                    <div class="release-tag JscLableDiv JscOperatingHide">
                        <div class="release-tag-box">
                            <div class="tag-des-1 tag-des JscPopularLable dat-ClassColor-class"><a class="JscLableTextPopular dat-Contents" href="javascript:void(0)">不旅行会死星人</a></div>
                        </div>
                        <div class="tag-btn JscLableAddBtn"><a href="javascript:void(0)">+自定义标签</a></div>
                    </div>
                </div>

                <!--发布(状态)-->
            <%--    <div class="update-load JscLayer" style="display:none">
                                <div class="update-push JscUploadLayer JscLayerHide" style="display:block">
                                    <i class="icons-load"></i>
                                    <span>正在上传...</span>
                                </div>
                                <div class="update-success JscUpdateLayer JscLayerHide" style="display:none">
                                    <i class="icons-right icons-sprite"></i>
                                    <span>更新成功</span>
                                </div>
                        </div>--%>
            </div>

            <!--发布(@了谁)-->
            <div class="cmn-Scenes PublicScenes release-who" id="release-who">
                <div class="Inner">
                    <div class="header-search">
                        <div class="search-input"><input type="text" class="JscAttentionText" placeholder="中国美女"/></div>
                        <div class="search-submit JscAttentionTextBtn"><a href="javascript:void(0)"><i class="icons-seach icons-sprite"></i></a></div>
                    </div>
                    <div class="release-whos pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                            <li uid="" class="JscPersonalInformation dat-UserID-uid">
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img class="JscUserHeadImg dat-HeadImgUrl-src" src="images/individual-box.png" />
                                        <strong class="JscUserName dat-NickName" >寻找你的存在</strong>
                                        <em style="display:none;" class="icons-tages JscUserIdentitys dat-IdentitysStyle-style">C</em>
                                    </div>
                                    <div class="praise-right">
                                        <!--@谁选中以后添加select，@标签p事件，i便签区域太小-->
                                        <p><i class="icons-sprite icons-who JscATAttention"></i></p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div><!--Main_end-->
    </div><!--Wrap_end-->
    <!---------------顶部菜单(在发布(@了谁这个场景时隐藏))-------------------->
    <div class="header-box JscHeadColumn" >
        <div class="return-btn JscHidePhotoBtn"><a href="javascript:void(0)"><i class="icons-return icons-sprite"></i></a></div>
        <div class="search-btn JscDetermineBtn" style="display:none">
                <a href="javascript:void(0)"><i class="icons-correct icons-sprite"></i></a>
        </div>
    </div>

    <!---------------浮层-------------------->
    <div style="display:none;position: fixed;width: 100%;top: 0;height: 100%;background-color: rgba(0,0,0,0.8);z-index:8888888888888" class="JscLayer">
                            <div class="update-load " style="/* display: block; */">
                                <div class="update-push JscUploadLayer JscLayerHide" style="display:block;">
                                    <i class="icons-load"></i>
                                    <span>正在上传...</span>
                                </div>
                                <div class="update-success JscUpdateLayer JscLayerHide" style="display:none;">
                                    <i class="icons-right icons-sprite"></i>
                                    <span>更新成功</span>
                                </div>
                        </div> </div>
    <div class="pop-float JscLableFloat">
        <!-----------发布弹出浮层---------->
        <div class="tag-float JscLableShowFloat">
            <div class="header-search">
                <div class="search-input"><input class="JscLableText" type="text" placeholder="中国美女"/></div>
                <div class="search-submit JscLableDetermineBtn"><a href="javascript:void(0)">确定</a></div>
            </div>
        </div>
        <!-----------发布成功浮层---------->
        <div class="success-float">
            <div class="success-arrow"><img  src="images/load.png" lazypath="images/success-arrow.png" /></div>
            <div class="success-tip"><img  src="images/load.png" lazypath="images/success-tip.png" /></div>
            <div class="success-text"><img  src="images/load.png" lazypath="images/success-text.png" /></div>
        </div>
    </div>

    <!-----------抛出来的滤镜---------->
     <div class="JscTemplatePhoto" style="display:none"><img  class="dat-BigPicPath-src" src="images/success-arrow.png" /></div>
    <!-----------抛出来的相框---------->
     <div class="JscPhotoFramePhoto" style="display:none"><img class="dat-BigPicPath-src" src="images/success-arrow.png" /></div>

    <!---------------剪纸选择浮层-------------------->
   <div class="papercut-float JscStickersShow JscOperatingHide">
       <div class="papercut-box">

       </div>
       <div class="papercut-bar">
           <button class="icons-returns JscRevocationBtn">
               <em><i class="icons-sprite"></i></em>
               <span>返回</span>
           </button>
           <ul class="papercut-nav tags-box">
               <li class="JscStickersElementsSon"><a href="javascript:void(0)" class="select"><img src="images/filter-color.png" /><span>的萨达粉丝</span></a></li>
               <li><a href="javascript:void(0)"><img src="images/filter-color.png" /><span>的萨达粉丝</span></a></li>
               <li><a href="javascript:void(0)"><img src="images/filter-color.png" /><span>的萨达粉丝</span></a></li>
               <li><a href="javascript:void(0)"><img src="images/filter-color.png" /><span>的萨达粉丝</span></a></li>
               <li><a href="javascript:void(0)"><img src="images/filter-color.png" /><span>的萨达粉丝</span></a></li>
               <li><a href="javascript:void(0)"><img src="images/filter-color.png" /><span>的萨达粉丝</span></a></li>
               <li><a href="javascript:void(0)"><img src="images/filter-color.png" /><span>的萨达粉丝</span></a></li>
               <li><a href="javascript:void(0)"><img src="images/filter-color.png" /><span>的萨达粉丝</span></a></li>
           </ul>
       </div>
   </div>
    <!---------------底部导航-------------------->
    <div class="footer-bar JscMaterialAll" style="display:none">
        <ul class="footer-item">
            <!-------选中添加select---------->
            <li class="JscMaterialSelection" ><a href="javascript:void(0)" class="icons-sprite select"></a></li>
            <li class="JscMaterialSelection"><a href="javascript:void(0)" class="icons-sprite"></a></li>
            <li class="JscMaterialSelection"><a href="javascript:void(0)" class="icons-sprite"></a></li>
            <li class="JscMaterialSelection"><a href="javascript:void(0)" class="icons-sprite"></a></li>
            <li class="JscMaterialSelection"><a href="javascript:void(0)" class="icons-sprite"></a></li>
        </ul>
    </div>
    <script>
        Cmn.Func.MobileAdaptive(640, 1008, "images/AdviseVertical.png", Cmn.Func.MobileAdaptiveMode.WidthHeight);
    </script>
</body>
</html>