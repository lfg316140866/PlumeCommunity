﻿Cmn_UI_Upload_Version="2.1",function(a){a||a.alert("为引用Cmn"),a.UI||(a.UI={});var b=function(b,c){function p(b,c){var e,g;if(a.IsType(b,"file"))n.Path=b.name,n.FileSize=Math.round(100*(b.size/1048576))/100,n.FileName=b.name,n.FileType=f.GetFileType(n.Path),n.FileSuffix=f.GetFileSuffix(n.Path);else{if($.browser.msie)n.Path=n.Target.value;else try{n.Path=n.Target.files.item(0).getAsDataURL()}catch(d){n.Path=window.URL.createObjectURL(n.Target.files[0])}n.FileSize=n.Target.fileSize?n.Target.fileSize:"unkown",n.FileName=n.Target.fileName?eventHandle.Target.fileName:f.GetFileName(n.Path),n.FileType=f.GetFileType(n.Path),n.FileSuffix=f.GetFileSuffix(n.Path)}return f.OnSelect.Trigger([n])===!1?!1:!a.Object.IsType(n.FileSize,"string")&&n.FileSize>f.LimitSize?(n.Msg="文件大小超过了 "+Math.round(f.LimitSize)+" M",f.OnFilter.Trigger([n]),c&&c(n),!1):new RegExp(".("+f.LimitFileSuffix.toString().replace(/\,/g,"|").toLowerCase()+")+$").test(n.Path.toLowerCase())?(window["FileReader"]&&n.FileType.indexOf("image")>=0?(e=new FileReader,e.onload=function(a){var d,e;a.target.result,d=/^data:base64,/,d.test(a.target.result)&&(e={png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",bmp:"image/bmp"},a.target.result=a.target.result.replace(d,"data:"+e[n.FileSuffix]+";base64,")),n.State=!0,n.Path=a.target.result,f.OnFilter.Trigger([n]),c&&c(n)},e.readAsDataURL(b)):window["Audio"]&&window.AudioContext&&n.FileType.indexOf("audio")>=0?(window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext,g=new AudioContext,e=new FileReader,e.onload=function(a){g.decodeAudioData(a.target.result,function(a){a&&a.duration&&a.duration>f.LimitMediaLength?n.Msg="音频长度不能超过"+f.LimitMediaLength+"秒！":n.State=!0,f.OnFilter.Trigger([n]),c&&c(n)})},e.readAsArrayBuffer(b)):(n.State=!0,f.OnFilter.Trigger([n]),c&&c(n)),void 0):(n.Msg=n.FileSuffix+"不允许上传!",f.OnFilter.Trigger([n]),c&&c(n),!1)}function q(b){var d,c=new XMLHttpRequest;c.upload&&(c.upload.addEventListener("progress",function(a){n.Progress=Math.round(100*a.loaded/a.total),f.OnProgress.Trigger([n])},!1),c.onreadystatechange=function(){if(4==c.readyState){if(200==c.status){var d=a.Object.IsType(c.responseText,"string")?$.parseJSON(c.responseText):c.responseText;n.State="1"==d.State,n.Msg=d.Msg,n.Path=d.Path}else n.State=!1,n.Msg="接口请求失败！";n.Progress=100,f.OnProgress.Trigger([n]),f.OnComplete.Trigger([n])}},c.open("POST",f.UploadItf,!0),d=new FormData,a.Object.IsType(b,"Object")&&$.each(b,function(a,b){d.append(a,b)}),n.File&&!o[k]&&d.append(k,n.File),c.send(d))}function r(b){function c(b){var c=a.Object.IsType(b,"string")?$.parseJSON(b):b;n.State="1"==c.State,n.Msg=c.Msg,n.Path=c.Path,n.Progress=100,f.OnProgress.Trigger([n]),f.OnComplete.Trigger([n])}return $.ajaxFileUpload?(j&&!o[k]?$.ajaxFileUpload({url:f.UploadItf,secureuri:!1,data:b,fileElementId:l,dataType:"script",success:function(a){c(a)},error:function(){}}):CmnAjax.PostData(f.UploadItf,b,c),void 0):(a.alert("ajaxFileUpload插件不存在！"),void 0)}function s(){return""==f.WXAccessToken?(alert("微信下载问价凭证 AccessToken 未设置！"),!1):(window["InterfaceUrl"]||CmnAjax.Func.LoadJs(Cmn.Func.GetRoot()+"Js/SiteConfig.js"),window["InterfaceUrl"]?(wx.chooseImage({success:function(a){function g(a){function d(){var a=document.createElement("canvas"),b=a.getContext("2d");a.width=c.width,a.height=c.height,b.drawImage(c,0,0,c.width,c.height,0,0,c.width,c.height),n.Path=a.toDataURL("image/png"),n.Msg="微信API选择文件完成了...",f.OnFilter.Trigger([n]),d=function(){}}var b=InterfaceUrl+"?method=ImgAgent&Path="+encodeURIComponent("http://file.api.weixin.qq.com/cgi-bin/media/get?access_token="+f.WXAccessToken+"&media_id="+a.serverId),c=new Image;c.onload=d,c.src=b,c.complete&&d&&d()}var b=a.localIds,c=b.toString().split(",")[0];return n={Target:wx,State:!0,File:null,Name:"",FileName:"",FileSuffix:"",FileSize:"",FileType:"",Path:c,Progress:0,Msg:"微信API选择文件中..."},f.OnSelect.Trigger([n])===!1?!1:(wx.uploadImage({localId:c,isShowProgressTips:0,success:g}),void 0)}}),void 0):(alert("SiteConfig.js 不存在！"),!1))}var d,f,g,h,j,k,l,m,n,o;return $(b).length?(d=[],"undefined"==typeof Worker&&d.push("/CmnUI/FileUpload/resources/ajaxfileupload.js"),a.Object.Inherit(this,a.UI.BasPlugin,[d||[]]),f=this,g="undefined"!=typeof Worker,h=$(b),j="",k="InputFile"+Cmn.GetUUID(),l=k,m=h,n={Target:null,State:!1,File:null,Name:"",FileName:"",FileSuffix:"",FileSize:"",FileType:"",Path:"",Progress:0,Msg:""},o={InputName:k,LimitSize:"3",SavePath:"/Upload/"+Cmn.Func.GetMainDomain(window.location.href),LimitSuffixName:""},this.InputFileName=k,this.LimitSize=3,this.LimitMediaLength=20,this.SaveRootPath="/Upload/"+Cmn.Func.GetMainDomain(window.location.href),this.UploadItf=c,this.DelFileItf="",this.LimitFileSuffix="jpg,jpeg,gif,png,swf,wmv,avi,wma,mp3,mid,mp4,txt,zip",this.WXAccessToken="",this.OnSelect=new Cmn.Event(this),this.OnFilter=new Cmn.Event(this),this.OnProgress=new Cmn.Event(this),this.OnComplete=new Cmn.Event(this),Cmn.Func.IsAndroid()&&Cmn.Func.IsWeiXin()&&wx&&wx.chooseImage?$(h).off(Cmn.UI.EventType.Mousedown).on(Cmn.UI.EventType.Mousedown,function(a){Cmn.UI.StopBubble(a)}):(Cmn.IsType(h[0],"htmlimageelement")&&(m=h.parent()),j=m.find("input[type=file]").length>0?m.find("input[type=file]"):$('<input type="file">'),j.css({position:"absolute",width:"1px",height:"1px",opacity:"0",filter:"alpha(opacity=0)",left:"-10px",top:"-10px"}),m.find(".cg-AllUploadFileInputContainer").length<=0&&m.append($("<div class='cg-AllUploadFileInputContainer'>").css({overflow:"hidden",width:"1px",top:"0px",left:"0px",height:"1px",position:"absolute","z-index":"-10"})),m.find(".cg-AllUploadFileInputContainer").append(j),j.attr("id",l),j.attr("name",k),$(h).parent("label").length<=0&&($(h).wrap('<label style="zoom:1;display: inline-block;"></label>'),$(h).parent("label").css({position:$(h).parent().css("position"),width:$(h).css("width"),height:$(h).css("height")})),$(h).parent("label").off(Cmn.UI.EventType.Mousedown).on(Cmn.UI.EventType.Mousedown,function(a){Cmn.UI.StopBubble(a)})),this.UnBindEvent=function(){$(h).off(Cmn.UI.EventType.Mouseup),$(h).parent("label").attr("for",""),j.off("change")},this.BindEvent=function(){function a(a){var b=a.target.files||(a.dataTransfer?a.dataTransfer.files:a.target),c=b[0]||b,d=this;n={Target:a.target,State:!1,File:c,Name:"",FileName:"",FileSuffix:"",FileSize:"",FileType:"",Path:"",Progress:0,Msg:""},p(c,function(){g&&(d=$(d).clone(!0,!0).replaceAll(file=d))})}Cmn.Func.IsAndroid()&&Cmn.Func.IsWeiXin()&&wx&&wx.chooseImage?$(h).off(Cmn.UI.EventType.Mouseup).on(Cmn.UI.EventType.Mouseup,function(a){Cmn.UI.StopBubble(a),s()}):($(h).parent("label").attr("for",l),j.off("change").on("change",a))},this.GetFileName=function(a){var b=a.lastIndexOf("/");return b>0?a.substr(b+1):a},this.GetFileName=function(a){var b=a.lastIndexOf("/");return b>0?a.substr(b+1):a},this.GetFileType=function(a){if(!a)return"unkown type";if(a.indexOf("base64")>0)return"image";var b=this.GetFileSuffix(a),c={jpg:"image",png:"image",gif:"image",jpeg:"image",bmp:"image",txt:"txt",zip:"zip",rar:"rar",swf:"fl",wmv:"video",avi:"video",wma:"video",mp3:"audio",mp4:"video"};return c[b]||b},this.GetFileSuffix=function(a){a=this.GetFileName(a);var b=a.lastIndexOf(".");return b>0?a.substr(b+1).toLowerCase():a.toLowerCase()},this.Upload=function(a){this.UploadItf||(window["InterfaceUrl"]||CmnAjax.Func.LoadJs(Cmn.Func.GetRoot()+"Js/SiteConfig.js"),this.UploadItf=window["InterfaceUrl"]?InterfaceUrl+"?method=Upload":"http://"+window.location.host+"/Itf/CSharp/CmnMisItf.aspx?method=Upload"),o.LimitSize=f.LimitSize,o.LimitSuffixName=f.LimitFileSuffix,o.SavePath=f.SaveRootPath,m.find("#"+l).length<=0&&n.Path.indexOf("base64,")>=0&&n.Path.indexOf("data,")>=0&&(o[k]=e.Path),g?q(Cmn.Extend(o,a)):r(Cmn.Extend(o,a))},this.BindEvent(),void 0):(a.alert("文件上传容器选择器，是必要的！"),void 0)};a.UI.Upload=function(a,c){return new b(a,c)}}(Cmn);