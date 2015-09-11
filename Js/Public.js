/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="Cmn.js" />
/// <reference path="CmnAjax.js" />
/// <reference path="CmnFuncExd.js" />
/// <reference path="animate/AnimateFrame.js" />
/// <reference path="animate/Scenes.js" />
/// <reference path="animate/ScenesSwitch.js" />
$(document).ready(function () {

    Cmn.Func.ImageLazyLoading("body", function (pro) {
        $(".loadinner").css({ "width": pro + "%" });
        $("#counter").html(pro + "%");
    }, function () {
        $(".wrapper").delay(500).fadeOut(800);
        AnimateFrame.Init(500, SwitchMode.Shifting, Direction.Up, Direction.Down);
    });

    $(".con-box").on("touchstart", function (e) {
        e.stopPropagation();
    })
    $(".con-box").on("touchmove", function (e) {
        e.stopPropagation();
    });

});
