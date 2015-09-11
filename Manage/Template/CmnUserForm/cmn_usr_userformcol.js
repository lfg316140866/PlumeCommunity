/// <reference path="../../../Js/ThirdLib/jquery.js" />
/// <reference path="../../Js/CmnMis/CmnMis.js" />
/// <reference path="../../../Js/md5.js" />
/// <reference path="../../Js/CmnMis/CmnMisUserForm.js" />
/// <reference path="../../Js/CmnMis/CmnMisControl.js" />

//填充之前的事件
CmnMis.CurUserForm.BeforeFillRecList.Add(function (data) {
    for (var _i = 0; _i < data.length; _i++) {
        if (data[_i]["isshowhtml"] == "1" || data[_i]["isshowhtml"] == "True") { data[_i]["isshowhtml"] = "yescheck"; }
        else { data[_i]["isshowhtml"] = "nocheck"; }

        if (data[_i]["isshowingrid"] == "1" || data[_i]["isshowingrid"] == "True") {
            data[_i]["isshowingrid"] = "yescheck";
            data[_i]["isshowcol"] = "";
        }
        else {
            data[_i]["isshowingrid"] = "nocheck";
            data[_i]["isshowcol"] = "hide";
        }

        if (data[_i]["isshowinedit"] == "1" || data[_i]["isshowinedit"] == "True") {
            data[_i]["isshowinedit"] = "yescheck";
            data[_i]["isShowEditCol"] = "jscEdit";
        }
        else {
            data[_i]["isshowinedit"] = "nocheck";
            data[_i]["isShowEditCol"] = "";
        }
    }

    //设置表单名称
    $(".jscUserFromDesc").html(CmnMis.Func.GetUserFormByID(UserFormColManage.TargetUserFormID).UserFormDesc);
});

//jquery
$.fn.RadioButton = function () {
    $(this).each(function (index,item) {
        if ($(item).hasClass("yescheck")) {
            $(this).attr("value", "1");
        } else {
            $(this).attr("value", "0");
        }
    });

    $(this).off("click").on("click", function () {
        if ($(this).hasClass("yescheck")) {
            $(this).removeClass("yescheck").addClass("nocheck");
            $(this).attr("value", "0");
            $(this).trigger("change");
        }
        else {
            $(this).removeClass("nocheck").addClass("yescheck");
            $(this).attr("value", "1");
            $(this).trigger("change");
        }
    });
}

var UserFormColManage = {
    //目标表单代码
    TargetUserFormID: CmnMis.CurUserForm.GetShowViewStateData().ReturnUserFormID,
    SaveUserFormID: CmnMis.Func.GetUserFormIDByDesc("用户表单字段管理"),
    RegularUserFormID: CmnMis.Func.GetUserFormIDByDesc("正则表达式管理"),
    ControlTypeUserFormID: CmnMis.Func.GetUserFormIDByDesc("控件类型管理"),
    Update: function (curFormDom, onUpdate, updateComplete) {

        var _recDom = $(curFormDom).find(".jscRec"),
            _updateCount = 0,
            _updateTotalCount = _recDom.length;

        $(curFormDom).find(".jscRec").each(function (index, item) {
            var _param = { CurUserFormID: UserFormColManage.SaveUserFormID, RecID: $(item).attr("recid") };
            $(item).find(".jscColDOM").each(function (i, v) {
                var _val = "";
                if (v.nodeName == "INPUT" || v.nodeName == "SELECT") {
                    _val = $(v).val();
                    if (v.nodeName == "INPUT") { _val = _val || $(v).text(); }
                }
                else if (v.nodeName == "SPAN" && $(v).hasClass("jscRadio")) { _val = $(v).attr("value")||'1'; }
                else { _val = $(v).text(); }
                _param[$(v).attr("colname")] = _val;
            });

            (function (param) {
                CmnAjax.PostData(InterfaceUrl + "?method=UpdateRec", param, function (data) {
                    _updateCount++;
                    if (data.IsSuccess == '1') {
                        onUpdate && onUpdate({ state: true, msg: "更新成功", colName: param["coltitle"] });
                    }
                    else {
                        onUpdate && onUpdate({ state: false, msg: "更新失败", colName: param["coltitle"] });
                    }
                    if (_updateTotalCount == _updateCount) {
                        updateComplete && updateComplete({ state: true, msg: "更新完成"});
                    }
                });
            })(_param);

        });
    },
    Add: function (curFormDom, onAdd) {

        var _param = {
            CurUserFormID: UserFormColManage.SaveUserFormID, userid: '1',
            userformid: this.TargetUserFormID
        };

        $(curFormDom).find(".jscCol").each(function (i, v) {

            var _val = "";
            if (v.nodeName == "INPUT" || v.nodeName == "SELECT") {
                _val = $(v).val() ;
                if (v.nodeName == "INPUT") { _val = _val || $(v).text(); }
                $(v).val((!!$(v).attr("default")?$(v).attr("default"):""));
            }
            else if (v.nodeName == "SPAN" && $(v).hasClass("jscRadio")) { _val = $(v).attr("value"); }
            else { _val = $(v).text(); $(v).text("");}
            if (!!_val && _val!=0) _param[$(v).attr("colname")] = _val;
        });
        
        (function (param) {

            var _p = $.extend({ colname: "",  coltitle: "", colalign: 1, colwidth: "100",  is_required: 1,  isshowingrid: 1, isshowinedit: 1,  isshowhtml: 1 }, param);

            CmnAjax.PostData(InterfaceUrl + "?method=AddRec", _p, function (data) {
               if (data.IsSuccess == '1') {
                   onAdd && onAdd({ state: true, msg: "添加成功" });
               }
               else {
                   onAdd && onAdd({ state: false, msg: "添加失败" + data.ErrMsg });
               }
           });
       })(_param);
    },
    Del: function (recDom, onDel) {

        if (!window.confirm("确认删除" + recDom.find(".jscColDOM[colname=colname]").val() + "吗？")) { return; }

        var _userFormColId = recDom.attr("recid"),
            _param = { CurUserFormID: UserFormColManage.SaveUserFormID, RecID: _userFormColId };

        CmnAjax.PostData(InterfaceUrl + "?method=DeleteRec", _param, function (data) {
            if (data.IsSuccess == '1') {
                onDel && onDel({ state: true, msg: "删除成功" });
            }
            else {
                onDel && onDel({ state: false, msg: "删除失败" + data.ErrMsg });
            }
        });

    }
}
 

 //加载之后的事件
CmnMis.CurUserForm.AfterRecListLoad.Add(function () {

    var _curFormDom = $(CmnMis.CurUserForm.GetUserFormSelector());
 
    //修正字段对齐方式填充无法设置的问题
    _curFormDom.find(".cmn-RecListView").find(".jscColDOM[colname=colalign]").not(".jscColDOM[v=1]").each(function () {
        $(this).val($(this).attr("v"));
    });

    //绑定自定义单选按钮
    _curFormDom.find(".jscRadio").RadioButton();


    //是否只显示列表字段
    _curFormDom.find(".jscShowListCol").off("change").on("change", function () {
        _curFormDom.find(".jscShowEditCol").removeClass("yescheck").addClass("nocheck");
        _curFormDom.find(".jscShowEditCol").attr("value", "0");

        if ($(this).attr("value") == "0") {
            //显示非列表字段
            _curFormDom.find(".jscRec.hide").show();
            _curFormDom.find(".jscRec.jscEdit").show();
        }
        else {
            _curFormDom.find(".jscRec").show();
            _curFormDom.find(".jscRec.hide").hide();
        }
    });

    //是否只显示编辑字段
    _curFormDom.find(".jscShowEditCol").off("change").on("change", function () {
        _curFormDom.find(".jscShowListCol").removeClass("yescheck").addClass("nocheck");
        _curFormDom.find(".jscShowListCol").attr("value", "0");

        if ($(this).attr("value") == "0") { _curFormDom.find(".jscRec").show(); }
        else {
            _curFormDom.find(".jscRec").hide();
            _curFormDom.find(".jscRec.jscEdit").show();
        }
    });


    //拖动排序
    if (_curFormDom.find(".jscRecContainer").find(".ui-widget-content").length > 0) {
        _curFormDom.find(".jscRecContainer").sortable('destroy');
    }

    _curFormDom.find(".jscRecContainer").sortable({
        opacity: 0.8,                //设置拖动时候的透明度
        axis: "y",                    //拖动方向
        cursor: 'move',              //拖动的时候鼠标样式
        stop: function (event, ui) { //完成拖动之后自动排序
            $(".jscRec").each(function (index, item) {
                $(item).find("td.dat-sortid").html(index);
            });
        }
    });


    var _layer = {

        show: function (selector) {

            if (!_curFormDom.find(".cg-UI-LayerContainer").hasClass(Cmn.UI.GetSelectorName(selector))) {

                if (_curFormDom.find(".cg-UI-LayerContent").find("div").length > 0) {
                    _curFormDom.find(".cg-UI-LayerContent").find("div").eq(0).hide().insertAfter(".cg-UI-LayerContainer");
                }

                _curFormDom.find(selector).appendTo(_curFormDom.find(".cg-UI-LayerContent")).show();
            }

            _curFormDom.find(".cg-UI-LayerContentContainer").css({ "right": "-500px", "opacity": "0" });
            _curFormDom.find(".cg-UI-LayerContainer").show().find(".cg-UI-LayerContentContainer").animate({ "right":"0%", "opacity": "1" });

        },
        hide: function () {
            _curFormDom.find(".cg-UI-LayerContainer").fadeOut(700);
            _curFormDom.find(".cg-UI-LayerContainer").find(".cg-UI-LayerContentContainer").animate({ "right": "-500px" });
        }

    }

    _curFormDom.find(".cg-UI-LayerMask").off("click").on("click", function () { _layer.hide(); })

    //添加字段信息
    _curFormDom.undelegate(".jscAddBtn", "click").delegate(".jscAddBtn", "click", function (e) {
        _layer.show(".jscAddColContainer");
        //设置默认排序
        $(".jscAddColContainer").find(".jscCol[colname=sortid]").val(($(".jscRec").last().find(".jscColDOM[colname=sortid]").text() * 1 + 1));
    });

    //控件配置
    _curFormDom.undelegate(".jscColCtlCfgBtn", "click").delegate(".jscColCtlCfgBtn", "click", function (e) {

        var _cfg = $(this).parents(".jscRec").find(".jscControlcfg").html();

        _layer.show(".jscControlCfgContainer");

        $(".jscControlSelectContent").data("controlCfg", _cfg);
        $(".jscControlSelectContent").data("formDOM", $(this).parents(".jscRec").find(".jscControlcfg"));

        $(".jscControlSelectContent").attr("recid", $(this).parents(".jscRec").attr("recid"));

        $(".jscCurColName").html($(this).parents(".jscRec").find(".dat-colname-value").val());
        $(".jscCurColTitle").html($(this).parents(".jscRec").find(".dat-coltitle-value").val());

        $(".jscControlTypeSelect").val($(this).parents(".jscRec").find(".jscControlcfg").attr("colcontroltypeid"));
        $(".jscControlTypeSelect").change();
    });


    //更新控件配置
    _curFormDom.find(".cg-UI-LayerContainer").undelegate("click")
        .delegate(".jscSavaSubmitControl", "click", function () {

        var _param = { CurUserFormID: UserFormColManage.SaveUserFormID, RecID: $(".jscControlSelectContent").attr("recid") };

        //获取生成的控件配置
        _param.controlcfg = ControlCfg.GetValueList(".jscControlCfgContent");
        //控件类型代码
        _param.colcontroltypeid = $(".jscControlTypeSelect").val();


        CmnAjax.PostData(InterfaceUrl + "?method=UpdateRec", _param, function (data) {
            if (data.IsSuccess == '1') {
                alert("更新成功！");
                $(".jscControlSelectContent").data("controlCfg", _param.controlcfg);
                $(".jscControlSelectContent").data("formDOM") && $(".jscControlSelectContent").data("formDOM").html(_param.controlcfg);
                $(".jscControlSelectContent").data("formDOM") && $(".jscControlSelectContent").data("formDOM").parents(".jscRec").find(".jscControlcfg").attr("colcontroltypeid", _param.colcontroltypeid);
            }
            else { alert("更新失败！"); }

            _layer.hide();
        });

    });

    //取消控件配置编辑
    _curFormDom.find(".cg-UI-LayerContainer").delegate(".jscCancelControlEdit", "click", function () {
        _layer.hide();
    });
    
    //控件配置
    $(".jscControlSelectContent").undelegate("change").delegate(".jscControlTypeSelect", "change", function () {

        //创建控件配置的配置面板
        ControlCfg.CreateCfgPanel($(this).find("option:selected").text(), ".jscControlCfgContent");

        //设置初始值
        ControlCfg.SetValueList(".jscControlCfgContent", $(".jscControlSelectContent").data("controlCfg"));

    });


    _curFormDom.undelegate(".jscAddBtn", "mouseenter").delegate(".jscMoreBtn", "mouseenter", function (e) {
        $(this).parent(".jscTools").find(".jscMorePanel").fadeIn();
    });

    _curFormDom.undelegate(".jscTools", "mouseleave").delegate(".jscTools", "mouseleave", function (e) {
        $(this).find(".jscMorePanel").hide();
    });



    //提交更新
    _curFormDom.find(".jscSavaSubmit").off("click").on("click", function () {
        UserFormColManage.Update(_curFormDom, function (e) {
            console.log(e.colName + ":" + e.msg);
        }, function (e) {
            if (e.state) { Cmn.alert(e.msg);}
        });
    });

    //提交添加
    _curFormDom.find(".jscSavaAddSubmit").off("click").on("click", function () {
        UserFormColManage.Add(_curFormDom, function (e) {
            if (e.state) {
                _layer.hide();
                CmnMis.CurUserForm.GetRecList();
            }
            else { alert(e.msg); }
        });
    });

    //删除
    _curFormDom.find(".jscDelRecByID").off("click").on("click", function () {
       
        UserFormColManage.Del($(this).parents(".jscRec"), function (e) {
            if (e.state) {
                CmnMis.CurUserForm.GetRecList();
            }
            else { alert(e.msg); }
        });
       
    });

    //填充控件类型
    CmnAjax.PostData(InterfaceUrl + "?method=GetRecList", {
        "CurUserFormID": UserFormColManage.ControlTypeUserFormID,
        "SortBy": "[controltypedesc] asc"
    }, function (data) {
        Cmn.FillData(".jscControlType", data.data);
    });

    //填充正则表达式
    CmnAjax.PostData(InterfaceUrl + "?method=GetRecList", { "CurUserFormID": UserFormColManage.RegularUserFormID }, function (data) {
        Cmn.FillData(".jscRegular", data.data);
    });
});
 
//控件配置
var ControlCfg = {
   
    //生成控件配置界面
    CreateCfgPanel: function (controlType,containerSelector) {
        /// <summary>生成控件配置界面</summary>
        /// <param name="controlType" type="String">控件类型</param>
        /// <param name="containerSelector" type="String">控件配置面板容器选择器</param>

        //创建临时控件模型
        var _tempControl = CmnMis.UI.Control.NewControl(controlType, "Temp", {}),
            //获取控件配置的描述配置
            _controlCfgDescCfg = _tempControl.CfgDescCfg;

        $(containerSelector).empty()

        if (!CmnMis.UI.Control[controlType]) { return false; }

        //配置存在的话
        if (Cmn.IsType(_controlCfgDescCfg, "object")) {
            //控件默认top的位置
            var _defControlTop = 20; 
            //遍历配置
            for (var _keyName in _controlCfgDescCfg) {
                //获取每个节点的配置
                var _cfg = _controlCfgDescCfg[_keyName];

                //创建控件
                var _control = CmnMis.UI.Control.NewControl(_cfg.Type, _keyName,
                    {
                        Width: 380,
                        Layout:{DescWidth:120},
                        OptionList: Cmn.IsType(_cfg.Val, "array") ? _cfg.Val : undefined,
                        CfgList:_cfg["CfgList"]
                    });
                _control.AppendTo($(containerSelector));
                //设置控件标题
                _control.SetColDesc(_cfg.Desc);
                //初始化控件
                _control.InitControl();
                //如果有父节点
                if (!!_cfg["Parent"]) {
                    _control.ControlDom.attr("Parent", _cfg["Parent"]);
                }

            }

        }
    },
    //设置配置界面的值
    SetValueList: function (containerSelector,controlCfg) {
        /// <summary>设置配置界面的值</summary>
        /// <param name="containerSelector" type="String">控件配置面板容器选择器</param>
        /// <param name="controlCfg" type="Json">控件配置</param>

        if (Cmn.IsType(controlCfg, "string")) { controlCfg = $.parseJSON(controlCfg); }

        $(containerSelector).find(CmnMis.UI.Control.Selector.Container).each(function () {

            //获取控件对象
            var _control = CmnMis.UI.Control.GetControl($(this));

            if (_control != undefined) { _eachSetControlCfg(controlCfg, _control,_control.KeyName); }
            else { Cmn.Log("在设置值的时候，找不到name为" + _name + "的控件"); }
        });

        //遍历找到控件对象对应的数据集 然后设置值
        function _eachSetControlCfg(cfg, control,name) {
            for (var _key in cfg) {
                //如果值是一个对象的话 继续遍历
                if (Cmn.IsType(cfg[_key], "object")) {

                    _eachSetControlCfg(cfg[_key], control, name);

                    //找到对应的控件 设置值
                   // if (_key == name) { control.SetValue(JSON.stringify(cfg[_key])); break; }
                }
                else {
                    //找到对应的控件 设置值
                    if (_key == name) { control.SetValue(cfg[_key]); break; }
                }
               
            }
        }

    },
    //获取生成的配置json字符串
    GetValueList: function (containerSelector) {
        /// <summary>获取配置界面的值</summary>
        /// <param name="containerSelector" type="String">控件配置面板容器选择器</param>

        var _controlCfg = {},
            _parents = {};

        $(containerSelector).find(CmnMis.UI.Control.Selector.Container).each(function () {

            //获取控件对象
            var _control = CmnMis.UI.Control.GetControl($(this));
            //获取字段名称
            var _name = _control.KeyName;

            if (_control != undefined) {
                var _parentKey = _control.ControlDom.attr("Parent"),
                    _cfg = {};
                if (!!_parentKey) {
                    if (_control.GetValue()) {
                        if (!_parents[_parentKey]) { _parents[_parentKey] = {}; };
                        _parents[_parentKey][_name]=_control.GetValue();
                    }
                }
                else {
                    if (_control.GetValue()) { _controlCfg[_name] = _control.GetValue(); }
                   
                }
            }
            else { Cmn.Log("在设置值的时候，找不到name为" + _name + "的控件"); }
        });

        //如果有子配置 耶加进去
        for (var _key in _parents) { _controlCfg[_key] = _parents[_key]; }
       
        return Cmn.Func.JsonToStr(_controlCfg);
    }
}

//HasMap控件类 生成控件配置需要的控件
CmnMis.UI.Control.HasMap = function (colName, controlCfg) {
    /// <summary>HasMap控件类</summary>
    /// <param name="colName" type="String">字段名称</param> 
    /// <param name="controlCfg" type="String">控件配置</param>
    //继承基类
    Cmn.Object.Inherit(this, CmnMis.UI.Control.BasControl, [colName, controlCfg]);

    //指向当前控件对象
    var _Self = this;

    //控件类型
    _Self.Type = "HasMap";
    //控件Key
    _Self.KeyName = colName;
    //初始化控件配置
    _Self.ControlCfg = _Self.InitControlConfig(Cmn.Extend(_Self.ControlCfg, controlCfg));
    //获取创建控件的html代码
    _Self.GetInitHtml = function () { return ""; }

    //创建dom
    var _CreateDOM = function (data) {
        //数据
        var _data = data,
            _controlHtml = "",
            _controlContent = _Self.ControlDom.find(CmnMis.UI.Control.Selector.CtlContent),
            _count = 1;

        if (!!_data && _data.length > 0) {

            //如果数据字符串的话 转成对象
            if (Cmn.IsType(_data, "string")) { _data = $.parseJSON(_data); };

            _count = _data.length;

            //遍历集合拿到每个json
            $.each(_data, function (index, items) {
              
                _controlHtml +=
                    "<div class='cmn-Ctl-HasMapItem' style='width:100%;height:25px;line-height:25px;margin-top:5px;'>" +
                       "<input type=\"text\"   value=\"" + items.key + "\" style='width:10%;height:100%;  text-align: center; border:1px solid #e6e6e6;' />" +
                       "<b> -- </b>" +
                       "<input type=\"text\"  value=\"" + items.value + "\" style='width:50%;height:100%;  text-align: center; border:1px solid #e6e6e6;' />" +
                       "<button class='cmn-Ctl-HasMapDel' style='width:25%;height:100%;margin-left:5px;  cursor: pointer; border:1px solid #e6e6e6;'>" +
                       "删除</button>" +
                    "</div>";
            });
        }
        else {
            _controlHtml +=
               "<div class='cmn-Ctl-HasMapItem' style='width:100%;height:25px;line-height:25px;margin-top:5px;'>" +
                  "<input type=\"text\" style='width:10%;height:100%;  text-align: center; border:1px solid #e6e6e6;' />" +
                  "<b> -- </b>" +
                  "<input type=\"text\" style='width:50%;height:100%;  text-align: center; border:1px solid #e6e6e6;' />" +
                  "<button class='cmn-Ctl-HasMapDel' style='width:25%;height:100%;margin-left:5px;  cursor: pointer; border:1px solid #e6e6e6;'>" +
                  "删除</button>" +
               "</div>";
        }

        _controlHtml += "<div style='width:100%;height:33px;line-height:25px;'>" +
             "<button class='cmn-Ctl-HasMapAdd' style='width:25%;height:100%;  margin-top: 10px; cursor: pointer;border:1px solid #e6e6e6;'>" +
             "添加</button>" +
            "<div>"

        //初始化控件
        _Self.Init();
        //添加dom
        _controlContent.height(40 * _count +33).append($(_controlHtml));
        _Self.ControlDom.height(_controlContent.height());
        //绑定事件 添加项
        _controlContent.find(".cmn-Ctl-HasMapAdd").off("click").
                on("click", function () {
                    var _itemClone = _controlContent.find(".cmn-Ctl-HasMapItem").eq(0).clone(true, true);
                    _itemClone.find("input").val("");
                    _itemClone.insertBefore($(this));
                    _controlContent.css({ height: "+=40px" });
                    _Self.ControlDom.height(_controlContent.height());
                });

        //删除项
        _controlContent.undelegate(".cmn-Ctl-HasMapDel", "click").
            delegate(".cmn-Ctl-HasMapDel", "click", function () {
                $(this).parent().remove();
                _controlContent.css({ height: "-=40px" });
                _Self.ControlDom.height(_controlContent.height());
            });
    }

    this.InitControl = function () { _CreateDOM(""); }

    //初始化控件的配置
    _Self.Init = function () {
        var _controlContent = _Self.ControlDom.find(CmnMis.UI.Control.Selector.CtlContent);
        _controlContent.empty();
       
    }

    //初始化控件的配置
    _Self.GetValue = function () {
        var _hasmap = [];
        _Self.ControlDom.find(".cmn-Ctl-HasMapItem").each(function () {
            if ($(this).find("input").eq(0).val() &&
                $(this).find("input").eq(1).val()) {
                _hasmap.push({
                    key: $(this).find("input").eq(0).val(),
                    value: $(this).find("input").eq(1).val()
                });
            }
        });

        return Cmn.Func.JsonToStr(_hasmap);
    }

    //设置控件的值
    _Self.SetValue = function (val) { _CreateDOM(val); }

};


//MultiCfgList控件类 生成控件配置需要的控件
CmnMis.UI.Control.MultiCfgList = function (colName, controlCfg) {
    /// <summary>多配置列表控件类</summary>
    /// <param name="colName" type="String">字段名称</param> 
    /// <param name="controlCfg" type="String">控件配置</param>
    //继承基类
    Cmn.Object.Inherit(this, CmnMis.UI.Control.BasControl, [colName, controlCfg]);

    //指向当前控件对象
    var _Self = this;

    //控件类型
    _Self.Type = "MultiCfgList";
    //控件Key
    _Self.KeyName = colName;
    //初始化控件配置
    _Self.ControlCfg = _Self.InitControlConfig(Cmn.Extend(_Self.ControlCfg, controlCfg));
    //获取创建控件的html代码
    _Self.GetInitHtml = function () { return ""; }

    //新的字段容器
    var _NewFieldContainer = null;

    var _CreateSortPanelByCfg = function (CfgList) {
        var _controlContent = _Self.ControlDom.find(CmnMis.UI.Control.Selector.CtlContent);
        //创建模板容器
        _NewFieldContainer = $("<div class='cmn-Ctl-CfgItem' style='width:100%;border:1px solid #e6e6e6;margin-top:5px;'>" +
               "<div class='cmn-Ctl-CfgTitle' style='width:100%;height:25px;text-align: center; background:#e6e6e6;cursor: pointer;line-height:25px;' >" +
                 "新增配置" +
               "</div>" +
                "<div class='cmn-Ctl-CfgFieldContainer' style='width:100%;' />" +
                "</div>" +
           "</div>");

        if (Cmn.IsType(CfgList, "array")) {
            //遍历配置集合
            $.each(CfgList, function (index, cfg) {

                //配置存在的话
                if (Cmn.IsType(cfg, "object")) {

                    //遍历配置
                    for (var _keyName in cfg) {
                        //获取每个节点的配置
                        var _cfg = cfg[_keyName];
                        //创建控件
                        var _control = CmnMis.UI.Control.NewControl(_cfg.Type, _keyName,
                            {
                                Width: _Self.ControlCfg.Width - 130,
                                Height: _cfg.Type == "Text" ? 25 : 50,
                                Layout: { DescWidth: 120 },
                                OptionList: Cmn.IsType(_cfg.Val, "array") ? _cfg.Val : undefined
                            });
                        _control.AppendTo(_NewFieldContainer.find(".cmn-Ctl-CfgFieldContainer").last());
                        //设置控件标题
                        _control.SetColDesc(_cfg.Desc);
                        //初始化控件
                        _control.InitControl();

                    }
                }
            });

            var _cfgListLen = _Self.ControlCfg.CfgList.length,
                _itemHeight = 35,
                _itemLen = 1;

            // _controlContent.css({ height: _cfgListLen * _itemHeight + 75 });
            _Self.ControlDom.css({ height: _cfgListLen * _itemHeight + 100 });

            _controlContent.append(_NewFieldContainer).append("<button class='cmn-Ctl-CfgFieldAdd' style='width:25%;height:25px;margin:10px 0px 0px 68%; cursor: pointer;border:1px solid #e6e6e6;'>" +
             "添加</button>")

            //单击标题
            _Self.ControlDom.undelegate(".cmn-Ctl-CfgTitle", "click").
            delegate(".cmn-Ctl-CfgTitle", "click", function () {

                $(this).siblings(".cmn-Ctl-CfgFieldContainer").slideToggle(300, function () {
                    if ($(this).is(":visible")) {
                        _Self.ControlDom.css({ height: "+=" + (_cfgListLen * _itemHeight) + "px" });
                    }
                    else {
                        _Self.ControlDom.css({ height: "-=" + (_cfgListLen * _itemHeight) + "px" });
                    }
                });
            });

            //单击添加按钮
            _Self.ControlDom.undelegate(".cmn-Ctl-CfgFieldAdd", "click").
           delegate(".cmn-Ctl-CfgFieldAdd", "click", function () {


           });
        }
    }

    _Self.InitControl = function () {
       

        _CreateSortPanelByCfg(_Self.ControlCfg.CfgList);
    }

    //绑定数据
    var _CreateDOM = function (data) {
        //数据
        var _data = data,
            _controlHtml = "",
            _controlContent = _Self.ControlDom.find(CmnMis.UI.Control.Selector.CtlContent),
            _count = 1;

        if (!!_data && _data.length > 0) {

            //如果数据字符串的话 转成对象
            if (Cmn.IsType(_data, "string")) { _data = $.parseJSON(_data); };

            _count = _data.length;

            //遍历集合拿到每个json
            $.each(_data, function (index, items) {

                _controlHtml +=
                    "<div class='cmn-Ctl-HasMapItem' style='width:100%;height:25px;line-height:25px;margin-top:5px;'>" +
                       "<input type=\"text\"   value=\"" + items.key + "\" style='width:10%;height:100%;  text-align: center; border:1px solid #e6e6e6;' />" +
                       "<b> -- </b>" +
                       "<input type=\"text\"  value=\"" + items.value + "\" style='width:50%;height:100%;  text-align: center; border:1px solid #e6e6e6;' />" +
                       "<button class='cmn-Ctl-HasMapDel' style='width:25%;height:100%;margin-left:5px;  cursor: pointer; border:1px solid #e6e6e6;'>" +
                       "删除</button>" +
                    "</div>";
            });
        }
        else {
            _controlHtml +=
               "<div class='cmn-Ctl-HasMapItem' style='width:100%;height:25px;line-height:25px;margin-top:5px;'>" +
                  "<div style='width:100%;height:25px; border:1px solid #e6e6e6;cursor: pointer;line-height:25px;' >" +
                    "添加配置"+
                  "</div>" +
                   "<div style='width:100%;height:25px; border:1px solid #e6e6e6;' />" +
                   
                  "</div>" +
               "</div>";
        }

        //初始化控件
        _Self.Init();
        //添加dom
        _controlContent.height(40 * _count + 33).append($(_controlHtml));
        _Self.ControlDom.height(_controlContent.height());
        
    }

    //初始化控件的配置
    _Self.GetValue = function () {
        var _hasmap = [];
        //_Self.ControlDom.find(".cmn-Ctl-HasMapItem").each(function () {
        //    if ($(this).find("input").eq(0).val() &&
        //        $(this).find("input").eq(1).val()) {
        //        _hasmap.push({
        //            key: $(this).find("input").eq(0).val(),
        //            value: $(this).find("input").eq(1).val()
        //        });
        //    }
        //});

        return Cmn.Func.JsonToStr(_hasmap);
    }

    //设置控件的值
    _Self.SetValue = function (val) {
         
    }

};