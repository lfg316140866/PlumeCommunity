using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Reflection;
using ThirdLoginApi;

public partial class Do : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string _retVal = GetUserLoginUrl();
        Response.Clear();
        Response.Write(_retVal);
        Response.End();
    }

	 public static string GetUserLoginUrl() {
            //ThirdParty: Sina2：新浪；QWeiBo2：腾讯；RenRen2：人人；DouBan2：豆瓣

            string _reqThirdParty = Cmn.Request.Get("ThirdParty");
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