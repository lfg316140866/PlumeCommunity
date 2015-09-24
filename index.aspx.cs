using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ThirdLoginApi;

public partial class index : System.Web.UI.Page
{
    protected string _SinaUrl = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (YQFunc.GetUserID() == "") {
            if (HttpContext.Current.Request.UserAgent.ToString().ToLower().Contains("micromessenger")) {
                YQFunc.WechatOAuthProcess();
            }
        }
        _SinaUrl = GetUserLoginUrl("Sina2");
    }
    public static string GetUserLoginUrl(string thirdparty) {
        //ThirdParty: Sina2：新浪；QWeiBo2：腾讯；RenRen2：人人；DouBan2：豆瓣

        string _reqThirdParty = thirdparty;
        if (_reqThirdParty == "") {
            return "error";
        }

        if (_reqThirdParty != "Sina2" && _reqThirdParty != "QWeiBo2") {

            return "error";
        }

        string _url = "";
        try {
            ThirdParty _thirdParty = (ThirdParty)Enum.Parse(typeof(ThirdParty), _reqThirdParty);
            _url = ThirdLoginApi.Api.GetLoginUrl(_thirdParty);

        } catch (Exception e) {
            return "error";
        }
        return _url;
    }
}