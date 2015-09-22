/// <reference path="easeljs-0.6.0.min.js" />
/// <reference path="../../Cmn.js" />
/// <reference path="../CmnUI.js" />

Cmn_UI_CanvasTools_PictureEditing_Version = "1.0";
(function (window, undefined) {

    //滤镜效果
    var _FilterEffects = {};

    var _ImageEditing = function (stageSelector, width, height, editCfg) {
        /// <summary>图片编辑</summary>
        /// <param name="stageSelector" type="String">舞台选择器</param>
        /// <param name="width" type="int">舞台宽度</param>
        /// <param name="height" type="int">舞台高度</param>
        /// <param name="editCfg" type="JSON">编辑配置</param>


        var _Self = this,
            //舞台canvas对象
            _Canvas = Cmn.Object.IsType($(stageSelector)[0], "HTMLCanvasElement") ?
            $(stageSelector)[0] : $(stageSelector).append(document.createElement("canvas")).find("canvas")[0];

        if (!(width && height)) { Cmn.alert("PictureEditing.js : 实例图片编辑对象的时候发生错误，舞台的宽高是必须要传入的!"); }

        //设置舞台的宽高
        _Self.Width = width * 1;
        _Self.Height = height * 1;

        //设置舞台canvas大小
        $(_Canvas).attr('width', width);
        $(_Canvas).attr('height', height);

        //图片编辑的配置
        _Self.EditCfg = Cmn.Extend({
            //最小允许缩放
            MinScale: 0,
            //最大允许缩放
            MaxScale: 10,
            //每次缩放比例
            ScaleStep: 0.05
        }, editCfg);

        //舞台对象
        _Self.Stage = new createjs.Stage(_Canvas);

        //根容器对象
        _Self.Root = new createjs.Container();
        _Self.Root.name = 'Root';
        _Self.Stage.addChild(_Self.Root);

        //实例化背景层
        _Self.BgContainer = new createjs.Container();
        _Self.BgContainer.name = 'BgContainer';
        _Self.Root.addChild(_Self.BgContainer);

        //实例化主内容容器层
        _Self.MainContainer = new createjs.Container();
        _Self.MainContainer.name = 'MainContainer';
        _Self.Root.addChild(_Self.MainContainer);

        //实例化滤镜容器层
        _Self.FilterContainer = new createjs.Container();
        _Self.FilterContainer.name = 'FilterContainer';
        _Self.Root.addChild(_Self.FilterContainer);

        //实例化模板容器层
        _Self.ModelContainer = new createjs.Container();
        _Self.ModelContainer.name = 'ModelContainer';
        _Self.Root.addChild(_Self.ModelContainer);

        //实例化贴纸容器层
        _Self.StickersContainer = new createjs.Container();
        _Self.StickersContainer.name = 'StickersContainer';
        _Self.Root.addChild(_Self.StickersContainer);

        //设置鼠标移动上去响应帧数
        _Self.Stage.enableMouseOver(20);
        //开启touch事件
        createjs.Touch.enable(_Self.Stage);
        //设置刷新率
        createjs.Ticker.setFPS(65);
        //监听刷新
        createjs.Ticker.addEventListener("tick", function (e) {
            _Self.Stage.update();
        });

        //当前的操作状态
        _Self.CurActionState = "LockUserActionStickers";
        //之前的操作状态
        var _BeforeActionState = _Self.CurActionState;

        //锁定用户操作
        _Self.LockUserAction = function () {
            
            if (_Self.CurActionState != "LockUserAction") {
                _BeforeActionState = _Self.CurActionState;
                _Self.CurActionState = "LockUserAction";
                _CurActionObj = null;
            }
        }

        //锁定用户操作图片
        _Self.LockUserActionImage = function () {
            _Self.CurActionState = "LockUserActionImage";
            _CurActionObj = null
        }
        //锁定用户操作贴图
        _Self.LockUserActionStickers = function () {
            _Self.CurActionState = "LockUserActionStickers";
            _CurActionObj = null
        }
        //解锁用户操作
        _Self.UnLockUserAction = function () { _Self.CurActionState = _BeforeActionState; }


        //获取canvas对象
        _Self.GetCanvas = function () { return _Canvas; }

        //是否设置滤镜效果
        var _IsSetFilterEffect = false;

        //设置图片
        _Self.SetImage = function (image) {
            /// <summary>设置要编辑的图片</summary>
            /// <param name="image" type="Image">图片对象或者图片地址</param>

            //图片对象
            var _image = null,
                _loadCount = 0;

            //如果是字符串 搞不好外面传进来的是图片的url地址
            if (Cmn.IsType(image, "string")) {
                _image = new Image();
                _image.onload = _imgLoadComplete;
                _image.src = image;
            }
            else { _image = image; }

            var _mainImage = new createjs.Container();
            _Self.MainContainer.removeAllChildren();
            _Self.MainContainer.addChild(_mainImage);

            if (_image.complete) { _imgLoadComplete(); }

            function _imgLoadComplete() {
                //清空主内容容器里面的图片对象

                if (++_loadCount >= 2) { return; }

                _mainImage.x = (_Self.Width - _image.width) / 2;
                _mainImage.y = (_Self.Height - _image.height) / 2;
                var _bitmap = new createjs.Bitmap(_image);
                _bitmap.regX = _image.width / 2;
                _bitmap.regY = _image.height / 2;
                _bitmap.x = _image.width / 2 ;
                _bitmap.y = _image.height / 2  ;
                _mainImage.addChild(new createjs.Shape());
                _mainImage.addChild(_bitmap);

                if (_IsSetFilterEffect) _bitmap.updateCache();
            }
          
        }
        //移除图片
        _Self.RemoveImage = function () { _Self.MainContainer.removeAllChildren(); }

        //设置滤镜
        _Self.SetFilterEffect = function (effectName) {
            /// <summary>设置滤镜效果</summary>
            /// <param name="effectName" type="String">滤镜效果名称</param>

            var _filterEffect = _FilterEffects[effectName],
                //滤镜应用的图片对象
                _bitmap = _Self.MainContainer.children[0];

            if (Cmn.IsType(_filterEffect, "function") && _bitmap) {
                //去掉已有的滤镜
                _Self.RemoveFilterEffect();
                _filterEffect.call(_bitmap, _Self);
                _IsSetFilterEffect = true;
            }
            else { Cmn.alert("滤镜不存在或者滤镜应用的图片对象不存在！是否没有添加图片");}

        }
        //删除滤镜效果
        _Self.RemoveFilterEffect = function () {
            /// <summary>删除滤镜效果</summary>
            var _bitmap = _Self.MainContainer.children[0];
            if (_bitmap) {
                _bitmap.filters = [];
                _bitmap.uncache();
            }
            _Self.FilterContainer.removeAllChildren();
            _IsSetFilterEffect = false;
        }


        //设置模板
        _Self.SetModel = function (image) {
            /// <summary>设置模板</summary>
            /// <param name="image" type="Image">图片对象或者图片地址</param>

            var _image = null,
                _loadCount = 0;

            //如果是字符串 搞不好外面传进来的是图片的url地址
            if (Cmn.IsType(image, "string")) {
                _image = new Image();
                _image.onload = _imgLoadComplete;
                _image.src = image;
            }
            else { _image = image; }

            if (_image.complete) { _imgLoadComplete(); }
            function _imgLoadComplete() {
                //清空主内容容器里面的图片对象

                if (++_loadCount >= 2) { return; }

                var _bitmap = new createjs.Bitmap(_image),
                    _scale = 1;

                if (_Self.Width / _image.width > _Self.Height / _image.height) {
                    _scale = _Self.Width / _image.width;
                }
                else { _scale = _Self.Height / _image.height; }

                _bitmap.scaleX = _scale;
                _bitmap.scaleY = _scale;
                _bitmap.x = (_Self.Width - _image.width * _scale) / 2;
                _bitmap.y = (_Self.Height - _image.height * _scale) / 2;

                _Self.ModelContainer.removeAllChildren();
                _Self.ModelContainer.addChild(_bitmap);
            }
        }
        //移除模板
        _Self.RemoveModel = function () { _Self.ModelContainer.removeAllChildren(); }

        //添加贴图
        _Self.AddStickers = function (image, index) {
            /// <summary>添加贴图</summary>
            /// <param name="image" type="Image">图片对象或者图片地址</param>
            /// <param name="index" type="int">索引</param>

            //图片对象
            var _image = null,
                _loadCount = 0;

            //如果是字符串 搞不好外面传进来的是图片的url地址
            if (Cmn.IsType(image, "string")) {
                _image = new Image();
                _image.onload = _imgLoadComplete;
                _image.src = image;
            }
            else { _image = image; }

            if (_image.complete) { _imgLoadComplete(); }
            function _imgLoadComplete() {
                //清空主内容容器里面的图片对象

                if (++_loadCount >= 2) { return; }

                //贴图容器
                var _stickers = new createjs.Container(_stickers);
                //贴图图片对象
                var _bitmap = new createjs.Bitmap(_image);
                //贴图背景对象
                var _bgShape = new createjs.Shape();
                _bgShape.visible = false;
                _bgShape.graphics.beginFill("rgba(0, 0, 0, 0.8)").drawCircle(_image.width - 10, -20, 15);

                _bgShape.graphics.beginStroke("#fff");
                _bgShape.graphics.setStrokeStyle(3);
                _bgShape.graphics.moveTo(_image.width - 2, -27);
                _bgShape.graphics.lineTo(_image.width - 17, -15);

                _bgShape.graphics.moveTo(_image.width - 17, -27);
                _bgShape.graphics.lineTo(_image.width - 2, -15);

                _stickers.addChild(_bgShape);
                _stickers.addChild(_bitmap);

                _bitmap.regX = _image.width / 2;
                _bitmap.regY = _image.height / 2;
                _bitmap.x = _image.width / 2;
                _bitmap.y = _image.height / 2 ;

                _stickers.x = (_Self.Width - _image.width) / 2;
                _stickers.x = (_Self.Height - _image.height) / 2;

                if (arguments.length == 2) { _Self.StickersContainer.addChildAt(_stickers, index); }
                else { _Self.StickersContainer.addChild(_stickers); }

                //点击叉叉
                _bgShape.addEventListener("mousedown", function () {
                    _Self.StickersContainer.removeChild(_stickers);
                });

                //点击图片
                _bitmap.addEventListener("mousedown", function (e) {

                    if (!_stickers.IsFocus && _Self.CurActionState == "LockUserActionImage") {
                        _stickers.dispatchEvent("focus");
                        _stickers.IsFocus = true;
                    }
                    
                    for (var _i = 0; _i < _Self.StickersContainer.children.length; _i++) {
                        if (_Self.StickersContainer.children[_i].IsFocus &&
                            _Self.StickersContainer.children[_i].id != _stickers.id) {
                            _Self.StickersContainer.children[_i].dispatchEvent("blur");
                            _Self.StickersContainer.children[_i].IsFocus = false;
                        }
                    }

                    _CurActionObj = _stickers;
                });

                //失去焦点
                _stickers.addEventListener("blur", function (e) {
                    _stickers.children[0].visible = false;
                });

                //获得焦点
                _stickers.addEventListener("focus", function (e) {
                    //当前是否聚焦
                    _stickers.children[0].visible = true;
                });

            }

        }
        //移除贴纸
        _Self.RemoveStickers = function (index) {
            /// <summary>移除贴纸</summary>
            /// <param name="index" type="int">移除贴纸的索引</param>
            if (arguments.length == 0) { _Self.StickersContainer.removeAllChildren(); }
            else { _Self.StickersContainer.removeChildAt(index); }
        }

        //扩展滤镜
        _Self.ExtendFilter = function () { }

        //改变的属性
        var _ChangePrototype = { X: 0, Y: 0, ScaleX: 1, ScaleY: 1, Rotation: 0 },
            //当前操作的对象
            _CurActionObj = null;

        //鼠标滚轴缩放图片
        $(_Canvas).on("DOMMouseScroll mousewheel", function (event) {

            event.preventDefault();
            event = event.originalEvent;

            if (_Self.CurActionState == "LockUserAction") { _CurActionObj = null; }
            else if (_Self.CurActionState == "LockUserActionStickers") {
                _CurActionObj = _Self.MainContainer.children[0];
            }


            if (_CurActionObj) {
                //当前计算的缩放比例
                var _scale = (event.wheelDelta ? event.wheelDelta / (-120) : (event.detail || 0) / 3) *
                    Math.abs(_Self.EditCfg.ScaleStep) * -1;

                if ((_ChangePrototype.ScaleX - _Self.EditCfg.ScaleStep > _Self.EditCfg.MinScale
                        && _ChangePrototype.ScaleY - _Self.EditCfg.ScaleStep > _Self.EditCfg.MinScale && _scale < 0)
                    || (_ChangePrototype.ScaleX + _Self.EditCfg.ScaleStep < _Self.EditCfg.MaxScale
                         && _ChangePrototype.ScaleY + _Self.EditCfg.ScaleStep < _Self.EditCfg.MaxScale && _scale > 0)) {

                    _ChangePrototype.ScaleX += _scale;
                    _ChangePrototype.ScaleY += _scale;

                }
                else { return false; }

                _CurActionObj.children[1].scaleX = _ChangePrototype.ScaleX;
                _CurActionObj.children[1].scaleY = _ChangePrototype.ScaleY;
            }

        });

        //touch js 不存在就不绑定
        if (!!window.touch) {
            
            touch.on(_Canvas, "dragstart drag pinchstart pinch rotate", function (e) {

                if (_Self.CurActionState == "LockUserAction") { _CurActionObj = null; }
                else if (_Self.CurActionState == "LockUserActionStickers") {
                    _CurActionObj = _Self.MainContainer.children[0];
                }

                if (_CurActionObj) {
                    //拖动开始
                    if (e.type == "dragstart") {
                        _ChangePrototype.X = _CurActionObj.x;
                        _ChangePrototype.Y = _CurActionObj.y;
                    }
                    else if (e.type == "drag") {
                        _CurActionObj.x = _ChangePrototype.X + e.x;
                        _CurActionObj.y = _ChangePrototype.Y + e.y;
                    }
                        //缩放开始
                    else if (e.type == "pinchstart") {
                        _ChangePrototype.ScaleX = _CurActionObj.children[1].scaleX;
                        _ChangePrototype.ScaleY = _CurActionObj.children[1].scaleY;
                        _ChangePrototype.Rotation = _CurActionObj.children[1].rotation;
                    }
                        //旋转
                    else if (e.type == "rotate") {
                        _CurActionObj.children[1].rotation = _ChangePrototype.Rotation + e.rotation;
                    }
                        //缩放
                    else if (e.type == "pinch") {

                        var _scale = (e.scale - 1);

                        if ((_ChangePrototype.ScaleX + _scale - _Self.EditCfg.ScaleStep > _Self.EditCfg.MinScale
                          && _ChangePrototype.ScaleY + _scale - _Self.EditCfg.ScaleStep > _Self.EditCfg.MinScale && _scale < 0)
                      || (_ChangePrototype.ScaleX + _scale + _Self.EditCfg.ScaleStep < _Self.EditCfg.MaxScale
                           && _ChangePrototype.ScaleY + _scale + _Self.EditCfg.ScaleStep < _Self.EditCfg.MaxScale && _scale > 0)) {

                            _CurActionObj.children[1].scaleX = _ChangePrototype.ScaleX + _scale;
                            _CurActionObj.children[1].scaleY = _ChangePrototype.ScaleY + _scale;


                        }
                        else { return false; }

                    }
                }

            });
        }


    }

    //检测域是否存在
    if (!Cmn.UI) { Cmn.UI = {}; }
    if (!Cmn.UI.CanvasTools) { Cmn.UI.CanvasTools = {}; }
    //开放使用
    Cmn.UI.CanvasTools.ImageEditing = function (stageSelector, width, height, editCfg) {
        /// <summary>图片编辑</summary>
        /// <param name="stageSelector" type="String">舞台选择器</param>
        /// <param name="width" type="int">舞台宽度</param>
        /// <param name="height" type="int">舞台高度</param>
        /// <param name="editCfg" type="JSON">编辑配置</param>

        return new _ImageEditing(stageSelector, width, height, editCfg);
    };

    Cmn.UI.CanvasTools.ImageEditing.ExtendFilterEffects = function (effectName, fn) {
        /// <summary>扩展滤镜效果</summary>
        /// <param name="effectName" type="String">效果名称</param>
        /// <param name="fn" type="Function">效果实现的函数</param>

        _FilterEffects[effectName] = fn;
    };

})(window);
