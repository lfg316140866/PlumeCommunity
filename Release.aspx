<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Release.aspx.cs" Inherits="Release" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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
    <script src="Js/CmnFuncExd.js"></script>
    <script src="Js/ThirdLib/touch.mini.js"></script>
    <script src="Js/CmnUI/Upload/Upload.js"></script>
    <script src="Js/CmnUI/CmnUI.js"></script>
    <script src="Js/easeljs-0.6.0.min.js"></script>
    <script src="Js/ImageEditing.js"></script>
    <script src="Js/dat.gui.min.js"></script>
    <script src="Js/CmnTools/WechatShare.js"></script>
    <script src="Js/CmnTools/FilterEffects.js"></script>
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
                    <div class="release-tip">
                        <h2>选择你的发布形式</h2>
                    </div>
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
                    <a href="javascript:void(0)" class="btn-sprite JscChoice" style="width: 34px; height: 34px; background-position: -1002px 0px; position: absolute; top: 0px; left: 0px; display: none;"></a>
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
                    <div class="choice JscOperatingPiece" style="display: none">
                        <div class="choice-btn ">
                            <a class="JscOperatingTemplate" href="javascript:void(0)"><i class="icons-sprite icons-template"></i><span>模板</span></a>
                            <a class="JscOperatingStickers" href="javascript:void(0)"><i class="icons-sprite icons-sticker"></i><span>贴纸</span></a>
                        </div>
                    </div>

                    <!--发布(滤镜选择)-->
                    <div class="release-filter JscTemplateDiv JscOperatingHide" style="display: none">
                        <div class="filter-bar JscTochmoveStop">
                            <%--<button class="icons-returns ">
                                <img style="width: 130px" src="images/FilterEffects/yuantu.jpg" />
                                <span>原图</span>
                            </button>--%>
                            <ul style="width:1120px;margin-left: 0;" class="filter-nav tags-box">
                                <!--选中滤镜添加a标签select-->
                                <li furl="" class="JscFilterElements JscTemplateRevocationBtn"><a href="javascript:void(0)" class="JscSelectFilter">
                                    <img class="" src="images/FilterEffects/yuantu.jpg" /><span>原图</span></a></li>
                                <li furl="泛黄记忆" class="JscFilterElements"><a href="javascript:void(0)" class="JscSelectFilter">
                                    <img class="" src="images/FilterEffects/Yellowing.jpg" /><span>泛黄记忆</span></a></li>
                                <li furl="黑白" class="JscFilterElements"><a href="javascript:void(0)" class="JscSelectFilter">
                                    <img class="" src="images/FilterEffects/heibai.jpg" /><span>黑白</span></a></li>
                                <li furl="光源" class="JscFilterElements"><a href="javascript:void(0)" class="JscSelectFilter">
                                    <img class="" src="images/FilterEffects/guanyuan.jpg" /><span>光源</span></a></li>
                                <li furl="老照片" class="JscFilterElements"><a href="javascript:void(0)" class="JscSelectFilter">
                                    <img class="" src="images/FilterEffects/oldpic.jpg" /><span>老照片</span></a></li>
                                <li furl="昨日旧梦" class="JscFilterElements"><a href="javascript:void(0)" class="JscSelectFilter">
                                    <img class="" src="images/FilterEffects/zuorijiumeng.jpg" /><span>昨日旧梦</span></a></li>
                                <li furl="电影印象" class="JscFilterElements"><a href="javascript:void(0)" class="JscSelectFilter">
                                    <img class="" src="images/FilterEffects/MovieImpression.jpg" /><span>电影印象</span></a></li>
                                <li furl="气泡" class="JscFilterElements"><a href="javascript:void(0)" class="JscSelectFilter">
                                    <img class="" src="images/FilterEffects/Bubble.jpg" /><span>气泡</span></a></li>
                            </ul>
                        </div>
                    </div>

                    <!--发布(相框选择)-->
                    <div class="release-filter JscPhotoFrameDiv JscOperatingHide" style="display: none">
                        <div class="filter-bar">
                            <button class="icons-returns JscPhotoFrameRevocationBtn">
                                <em><i class="icons-sprite"></i></em>
                                <span>返回</span>
                            </button>
                            <ul class="filter-nav tags-box JscPhotoAll">
                                <!--选中滤镜添加a标签select-->
                                <li frid="" frurl="" class="JscPhotoFrameElements dat-FrameID-frid dat-BigPicPath-frurl"><a href="javascript:void(0)" class="JscSelectPhotoFrame">
                                    <img class="dat-SmallPicPath-src" src="images/filter-color.png" /><span class="dat-FrameDesc">原图</span></a></li>
                            </ul>
                        </div>
                    </div>

                    <!--发布(剪纸选择)-->
                    <div class="release-filter JscStickersDiv JscOperatingHide" style="display: none">
                        <div class="filter-bar">
                            <button class="icons-returns JscStickersRevocationBtn">
                                <em><i class="icons-sprite"></i></em>
                                <span>返回</span>
                            </button>
                            <ul class="filter-nav tags-box">
                                <!--选中滤镜添加a标签select-->
                                <li sid="" class="JscStickersElements dat-StickerCategoryID-sid"><a href="javascript:void(0)" class="">
                                    <img class="dat-PicPath-src" src="images/filter-color.png" /><span class="dat-StickerCategoryDesc">原图</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <!---------------剪纸选择浮层-------------------->
                    <div class="papercut-float JscStickersShow JscOperatingHide" style="position: fixed; display: none">
                        <div class="papercut-box">
                            <!-----------熊猫贴纸---------->
                            <div class="panda-box sticker-box JscFourPhoto">
                                <ul>
                                    <li class="JscFourPhotoElement"><a href="javascript:void(0)">
                                        <img class="dat-PicPath-src" src="images/sticker/big/panda/panda-1.png" /></a></li>
                                    <%--  <li><a href="javascript:void(0)"><img src="images/sticker/big/panda/panda-2.png" /></a></li>
                                <li><a href="javascript:void(0)"><img src="images/sticker/big/panda/panda-3.png" /></a></li>
                                <li><a href="javascript:void(0)"><img src="images/sticker/big/panda/panda-4.png" /></a></li>--%>
                                </ul>
                            </div>

                            <!-----------文字贴纸---------->
                            <div class="words-box sticker-box JscSixPhoto">
                                <ul>
                                    <li class="JscSixPhotoElement"><a href="javascript:void(0)">
                                        <img class="dat-PicPath-src" src="images/sticker/big/text/text-1.png" /></a></li>
                                    <%--<li><a href="javascript:void(0)"><img src="images/sticker/big/text/text-2.png" /></a></li>
                                <li><a href="javascript:void(0)"><img src="images/sticker/big/text/text-3.png" /></a></li>
                                <li><a href="javascript:void(0)"><img src="images/sticker/big/text/text-4.png" /></a></li>
                                <li><a href="javascript:void(0)"><img src="images/sticker/big/text/text-5.png" /></a></li>
                                <li><a href="javascript:void(0)"><img src="images/sticker/big/text/text-6.png" /></a></li>--%>
                                </ul>
                            </div>
                        </div>
                        <div class="papercut-bar JscArrowAll">
                            <button class="icons-returns JscRevocationBtn">
                                <em><i class="icons-sprite"></i></em>
                                <span>返回</span>
                            </button>
                            <ul class="papercut-nav tags-box JscTagsList">
                                <li ssid="" class="JscStickersElementsSon dat-StickerCategoryID-ssid"><a href="javascript:void(0)" class="">
                                    <img class="dat-PicPath-src" src="images/filter-color.png" /><span class="dat-StickerCategoryDesc">的萨达粉丝</span></a></li>
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
                        <div class="search-input">
                            <input type="text" class="JscAttentionText" placeholder="中国美女" /></div>
                        <div class="search-submit JscAttentionTextBtn"><a href="javascript:void(0)"><i class="icons-seach icons-sprite"></i></a></div>
                    </div>
                    <div class="release-whos pub-notice pub-call">
                        <ul class="notice-praise-nav pub-call-nav">
                            <li uid="" class="JscPersonalInformation dat-UserID-uid">
                                <a href="javascript:void(0)">
                                    <div class="praise-left">
                                        <img class="JscUserHeadImg dat-HeadImgUrl-src" src="images/individual-box.png" />
                                        <strong class="JscUserName dat-NickName">寻找你的存在</strong>
                                        <em style="display: none;" class="icons-tages JscUserIdentitys dat-IdentitysStyle-style">C</em>
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

        </div>
        <!--Main_end-->
    </div>
    <!--Wrap_end-->
    <!---------------顶部菜单(在发布(@了谁这个场景时隐藏))-------------------->
    <div class="header-box JscHeadColumn">
        <div class="return-btn JscHidePhotoBtn"><a href="javascript:void(0)"><i class="icons-return icons-sprite"></i></a></div>
        <div class="search-btn JscDetermineBtn" style="display: none">
            <a href="javascript:void(0)"><i class="icons-correct icons-sprite"></i></a>
        </div>
    </div>

    <!---------------浮层-------------------->
    <div style="display: none; position: fixed; width: 100%; top: 0; height: 100%; background-color: rgba(0,0,0,0.8); z-index: 8888888888888" class="JscLayer">
        <div class="update-load JscLableIsShow" style="display: none;">
            <div class="update-push JscUploadLayer JscLayerHide">
                <i class="icons-load"></i>
                <span>正在上传...</span>
            </div>
            <div class="update-success JscUpdateLayer JscLayerHide">
                <i class="icons-right icons-sprite"></i>
                <span>更新成功</span>
            </div>
        </div>
      <!-----------发布成功浮层---------->
    <div class="success-float JscFloatAllHide">
        <div class="success-arrow">
            <img src="images/load.png" lazypath="images/success-arrow.png" /></div>
        <div class="success-arrow2">
            <img src="images/load.png" lazypath="images/success-arrow2.png" /></div>
        <div class="success-tip">
            <img src="images/load.png" lazypath="images/success-tip.png" /></div>
        <div class="success-text">
            <img src="images/load.png" lazypath="images/success-text.png" /></div>
    </div>
    </div>

    <div class="pop-float JscLableFloat">

        <!-----------发布弹出浮层---------->
        <div class="tag-float JscLableShowFloat">
            <div class="header-search">
                <div class="search-input">
                    <input class="JscLableText" maxlength="9" type="text" placeholder="中国美女" /></div>
                <div class="search-submit JscLableDetermineBtn"><a href="javascript:void(0)">确定</a></div>
            </div>
        </div>
        <!-----------发布成功浮层---------->
        <div class="success-float">
            <div class="success-arrow">
                <img src="images/load.png" lazypath="images/success-arrow.png" /></div>
            <div class="success-tip">
                <img src="images/load.png" lazypath="images/success-tip.png" /></div>
            <div class="success-text">
                <img src="images/load.png" lazypath="images/success-text.png" /></div>
        </div>
    </div>

    <!-----------抛出来的滤镜---------->
    <div class="JscTemplatePhoto" style="display: none">
        <img class="dat-BigPicPath-src" src="images/success-arrow.png" /></div>
    <!-----------抛出来的相框---------->
    <div class="JscPhotoFramePhoto" style="display: none">
        <img class="dat-BigPicPath-src" src="images/success-arrow.png" /></div>


    <!---------------底部导航-------------------->
    <div class="footer-bar JscMaterialAll" style="display: none">
        <ul class="footer-item">
            <!-------选中添加select---------->
            <li class="JscMaterialSelection"><a href="javascript:void(0)" class="icons-sprite select"></a></li>
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
