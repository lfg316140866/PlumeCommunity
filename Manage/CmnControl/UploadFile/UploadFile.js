/// <reference path="../../../Js/jquery.js" />
/// <reference path="../../../Js/Cmn.js" />
/// <reference path="../../../Js/CmnUI/CmnUI.js" />
/// <reference path="../../../Js/CmnUI/FileUpload/FileUpload.js" />


//--------------------------------UploadFile控件类----------------------
 
(function (control, object) {

    control.UploadFile = function (colName, controlCfg) {
        /// <summary>HtmlEditor控件类</summary>
        /// <param name="colName" type="String">字段名称</param> 
        /// <param name="controlCfg" type="String">控件配置</param>
        object.Inherit(this, control.BasControl, [colName, controlCfg]);

        //指向当前控件对象
        var _Self = this;
        //控件类型
        _Self.Type = "UploadFile";
        _Self.IsExistHtmlTemp = true;

        //设置控件配置描述配置 
        _Self.SetCfgDescCfg({
            "ItfUrl": { "Type": "TextArea", "Desc": "上传的接口地址", "Val": "Itf/CSharp/Upload.aspx" },
            "SavePath": { "Type": "Text", "Desc": "上传保存的路径", "Val": "/Upload" },
            "FileType": { "Type": "RadioButton", "Desc": "上传控件类型", "Val": [{ "key": "image", "val": "图片上传" }, { "key": "file", "val": "文件上传" }] },
            "FileExt": { "Type": "TextArea", "Desc": "上传文件限制后缀", "Val": "jpg,jpeg,png,gif,bmp" },
            "IsSaveRealFileName": { "Type": "RadioButton", "Desc": "是否保存真实文件名称", "Val": [{ "key": "0", "val": "否" }, { "key": "1", "val": "是" }] }
        });

        //初始化控件配置
        _Self.ControlCfg = _Self.InitControlConfig(Cmn.Extend(_Self.ControlCfg, controlCfg));

        //文件选择完毕的事件
        _Self.SelectComplete = function () {}
        //文件选择完毕的事件
        _Self.OnFilter = function () { }
        //文件上传完毕的事件
        _Self.OnComplete = function () {}
        //点击删除按钮的事件
        _Self.OnClickDelBtn = function () {}

        //初始化控件配置
        _Self.InitControl = function (controlCfg) {

            //加载所需js文件
            if (!Cmn.UI || !Cmn.UI.BasPlugin) { CmnAjax.Func.LoadJs(Cmn.Func.GetRoot() + "Js/CmnUI/CmnUI.js"); }
            if (!Cmn.UI || !Cmn.UI.FileUpload) { CmnAjax.Func.LoadJs(Cmn.Func.GetRoot() + "Js/CmnUI/FileUpload/FileUpload.js"); }


            if (!!_Self.ControlCfg.ItfUrl) {
                _Self.ControlCfg.ItfUrl = _Self.ControlCfg.ItfUrl.indexOf("method=") > 1 ?
                    _Self.ControlCfg.ItfUrl : _Self.ControlCfg.ItfUrl + "?method=File";
            }

            //设置控件宽度
            _Self.ControlDom.css({ height: "auto" }).find(CmnMis.UI.Control.Selector.CtlContent)
                .css({ height: "auto", "border": "none", "text-align": "left" });

            //实例化上传插件
            _Self.fileUpload = Cmn.UI.FileUpload(_Self.ControlDom.find(".cg-Ctl-UploadFileContainer"),
                _Self.ControlCfg.ItfUrl, true);

            //设置文件过滤后缀名
            _Self.fileUpload.LimitFileSuffix = !!_Self.ControlCfg.FileExt ?
                _Self.ControlCfg.FileExt.split(",") : _Self.fileUpload.LimitFileSuffix;

            //设置文件过滤大小
            _Self.fileUpload.LimitSize = (parseInt(_Self.ControlCfg.FileSize) || 3) * 1048576;

            //设置上传的参数
            _Self.fileUpload.Data = {
                limitSize: _Self.fileUpload.LimitSize / 1048576,
                rootPath: _Self.ControlCfg.SavePath,
                suffix: _Self.fileUpload.LimitFileSuffix.toString(),
                isSaveRealFileName: _Self.ControlCfg.IsSaveRealFileName
            };


            //选择完毕的回调
            _Self.fileUpload.SelectComplete = function () {
                _Self.ControlDom.find(".cg-Ctl-FileViewContainer").show();
                _Self.ControlDom.find(".cg-Ctl-ProgressContainer").show();
                _Self.SelectComplete();
            }

            //过滤完毕的回调
            _Self.fileUpload.OnFilter = function (e) {
                if (!e.state) { _Self.ControlDom.find(".cg-Ctl-ProgressContainer").hide(); }
                _Self.OnFilter(e);
                _Self.ControlDom.find(control.Selector.CtlTipDesc).show();
                _Self.ControlDom.find(control.Selector.CtlErrTipDesc).hide().html("");
            }

            //上传完毕的回调
            _Self.fileUpload.OnComplete = function (event) {
                _Self.SetValue({ path: event.data.path });
                _Self.OnComplete(event.data);
            }

            //点击删除的事件
            _Self.fileUpload.OnClickDelBtn = function () {
                _Self.SetValue({ path: "" });
                _Self.ControlDom.find(".cg-Ctl-FileViewContainer").hide();
                _Self.ControlDom.find(".cg-Ctl-SelectFileBtn").show();
                _Self.OnClickDelBtn();
            }

        }

        //获取控件的值
        _Self.GetValue = function () {
            return this.ControlDom.find(this.fileUpload.Selector.SelectFile).data("path");
        }

        //设置控件的值
        _Self.SetValue = function (value) {
            if (!!value) {
                //如果设置的是对象 就做下处理
                if (object.IsType(value, "object")) { value = !!value.path ? value.path : ""; }
                else { this.fileUpload.SetFileInfo({ path: Cmn.Func.AddSiteRoot(value) }); }
                this.ControlDom.find(".cg-Ctl-SelectFileBtn").hide();
                this.ControlDom.find(".cg-Ctl-ProgressContainer").hide();
                this.ControlDom.find(".cg-Ctl-FileViewContainer").show();
                this.ControlDom.find(this.fileUpload.Selector.SelectFile).data("path", value);

            }
        }

        //设置控件的宽度
        _Self.SetWidth = function (Width) {
            this.ControlDom.find(this.fileUpload.Selector.SelectFile).css({ width: Width });
        }

        //控件初始化
        _Self.Init = function () {
            this.ControlDom.find(this.fileUpload.Selector.SelectFile).data("path", "");
            this.fileUpload.SetFileInfo();
            this.ControlDom.find(".cg-Ctl-SelectFileBtn").show();
            this.ControlDom.find(".cg-Ctl-ProgressContainer").hide();
            this.ControlDom.find(".cg-Ctl-FileViewContainer").hide();
        }

    }

})(CmnMis.UI.Control, Cmn.Object);
