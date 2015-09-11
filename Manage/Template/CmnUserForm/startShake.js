/// <reference path="../../../Js/jquery-1.9.1.min.js" />
/// <reference path="../../../Js/Cmn.js" />
/// <reference path="../../../Js/CmnAjax.js" />

CmnMis.CurUserForm.EventBeforeFillRecList = function (data) {
    for (var _i = 0; _i < data.length; _i++) {
        var _data_id = data[_i]["ActivityID"]
        data[_i]["StartBtn"] = "<span class='JscStartShakeBtn' data_id='" + _data_id + "' style='font-size: 18px;color: #00FF15;font-weight: bolder;cursor: pointer;'>摇一摇开始</span>";
        data[_i]["ClearBtn"] = "<span class='JscClearShakeBtn' data_id='" + _data_id + "' style='font-size: 18px;color: #f00;font-weight: bolder;cursor: pointer;'>清除数据</span>";
    }

}

CmnMis.CurUserForm.EventAfterRecListLoad = function () {
    $(".JscStartShakeBtn").off("click").on("click", function () {
        if (confirm("确定要开始的了吗？")) {
            var _data_id = $(this).attr("data_id");
            CmnAjax.PostData("/Itf/CSharp/DataInterface.aspx?Method=SetShakeStart", { "CityID": _data_id }, function (dat) {
                alert(dat.ErrMsg);
            })
        }

    });
    $(".JscClearShakeBtn").off("click").on("click", function () {
        if (confirm("此按钮为测试所用，不是技术人员请取消操作！")) {
            if (confirm("确定删除当前城市的所有数据吗？删除后将无法恢复！")) {
                var _data_id = $(this).attr("data_id");
                CmnAjax.PostData("/Itf/CSharp/DataInterface.aspx?Method=ClearShake", { "CityID": _data_id }, function (dat) {
                    alert(dat.ErrMsg);
                });
            }
        }

    });
}