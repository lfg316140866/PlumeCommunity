using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using WeChatCmn.Api;
using WeChatCmn.Api.Utility;

public partial class JsApiWXConfig : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        CgiBin _cgiBin = new CgiBin(Cmn.WebConfig.getApp("wx_app_key"), Cmn.WebConfig.getApp("wx_app_secret"), APIConfig.OnlyOne);
        string _url = Cmn.Request.Get("Url");
        string _debug = Cmn.Request.Get("Debug");
        string _xx = _cgiBin.GetJsApiWXConfig(APIConfig.OnlyOne, _url, (_debug == "1" ? true: false));

        string _callback = Cmn.Request.Get("callback");
        if (_callback != "") {
            _xx = _callback + "(" + (_xx.EndsWith(";") ? _xx.Substring(0, _xx.Length-1) : _xx) + ");";
        }
        //Response.Headers.Add("Access-Control-Allow-Origin", "*");
        Response.Write(_xx);
    }
}