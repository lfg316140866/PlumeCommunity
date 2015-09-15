/// <reference path="../jquery-1.9.1.min.js" />
/// <reference path="../Cmn.js" />
/// <reference path="../CmnAjax.js" />
/// <reference path="../CmnFuncExd.js" />

//推荐页面的切换
//公共方法库
var Recommend = function (selector, parentBox, nextFunc, preFunc,beforeChangeFunc) {
    /// <summary>支持动态数据的简单DIV切换（需要CmnFuncExd的支持）</summary>
    /// <param name="selector" type="String">要切换的元素选择器（程序会动态循环抛出）</param>
    /// <param name="parentBox" type="String">要切换的区域选择器，不支持动态</param>
    /// <param name="nextFunc" type="String">下一个切换完毕的方法</param>
    /// <param name="preFunc" type="function">上一个切换的方法</param>
    /// <param name="beforeChangeFunc" type="function">切换前的方法</param>
    var _Self = this;
    _Self.Selector = selector;//元素的选择器
    _Self.Obj = $(_Self.Selector);//存在的元素对象集合
    _Self.PatentObj=$(parentBox);//滑动的区域，不能和要滚动的元素相同
    _Self.CurIndex=0;//当前显示的对象的下标
    _Self.ChangeSpeed = 300;//滚动的速度
    _Self.IsAnimate = false;//是否正在滚动
    //初始化
    _Self.Init = function () {
        _Self.Obj = $(_Self.Selector);
        if (_Self.Obj.length < 1) { console.log("没有元素存在"); return; }
        _Self.Obj.css("left", "150%");
        _Self.Obj.eq(0).css("left", "0");
        _Self.BingTouchSlideChange();
    };
    //切换到下一个的方法
    _Self.NextChange = function () {
        _Self.RefreshObj();
        if (_Self.IsAnimate) { return; }
        if (_Self.CurIndex + 1 == _Self.Obj.length) { console.log("已经到最后一个元素了"); return; }
        beforeChangeFunc && beforeChangeFunc();
        _Self.IsAnimate = true;
        _Self.Obj.eq(_Self.CurIndex).css("left", "0").animate({ "left": "-150%" }, _Self.ChangeSpeed, "linear", function () {
            _Self.CurIndex++;
            _Self.IsAnimate = false;
            nextFunc && nextFunc(_Self.CurIndex);
            _Self.RefreshObj();
        });
        _Self.Obj.eq(_Self.CurIndex + 1).css("left", "150%").animate({"left":"0%"}, _Self.ChangeSpeed, "linear", function () {
        });
    };
    //切换到上一个的方法
    _Self.PreChange = function () {
        _Self.RefreshObj();
        if (_Self.IsAnimate) { return; }
        if (_Self.CurIndex == 0) { console.log("已经到第一个元素了"); return; }
        beforeChangeFunc && beforeChangeFunc();
        _Self.IsAnimate = true;
        _Self.Obj.eq(_Self.CurIndex).css("left", "0").animate({ "left": "150%" }, _Self.ChangeSpeed, "linear", function () {
            _Self.CurIndex--;
            _Self.IsAnimate = false;
            preFunc && preFunc(_Self.CurIndex);
            _Self.RefreshObj();
        });
        _Self.Obj.eq(_Self.CurIndex - 1).css("left", "-150%").animate({ "left": "0%" }, _Self.ChangeSpeed, "linear", function () {
            
        });
    };
    //刷新对象
    _Self.RefreshObj = function () {
        _Self.Obj = $(_Self.Selector);
        _Self.Obj.css("left", "150%");
        _Self.Obj.eq(_Self.CurIndex).css("left", "0");
    };
    //绑定左右滑动
    _Self.BingTouchSlideChange = function () {
        Cmn.Func.TouchSlide(_Self.PatentObj, 100, function (dir) {
            if (dir == "left") {
                _Self.NextChange();
            }
            else if (dir == "right")
            {
                _Self.PreChange();
            }
        })
    }
};