using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using ThirdLoginApi;

public partial class CallBack : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            try
            {
                string _thirdUserID = "";
                string _thirdNickName = "";
                string _thirdUserImg = "";

                string _tmp = Cmn.Request.Get("ThirdType");
                if (_tmp != "")
                {
                    Cmn.Func.SetSessionCookies("ThirdType", _tmp);
                }

                if (ThirdLoginApi.Api.Login(this, ref _thirdUserID, ref _thirdNickName, ref _thirdUserImg))
                { //登录成功 
                    //判断用户是否已经存在
                    UserInfo _ui = ThirdLoginApi.Api.GetUserInfo(this);
                    //Cmn.Log.WriteToFile("CallBack", "ThirdType->" + Cmn.Func.GetSessionCookies("ThirdType"));
                    ThirdParty _thirdType = (ThirdParty)Enum.Parse(typeof(ThirdParty), Cmn.Func.GetSessionCookies("ThirdType"));
                    int _source = 0;
                    switch ((int)_thirdType) {
                        case 6: _source = 3; break;
                        case 7: _source = 2; break;
                        default: _source = 2; break;
                    }
                    if (_thirdUserID != "")
                    {
                        string _userID = Cmn.DB.getFieldValue("select UserID from usr_Users where OpenID='" +
                            _thirdUserID + "' ").Trim();

                        if (_userID == "")
                        { //说明用户不存在需要新增
                            _userID = Cmn.DB.getFieldValue("insert into usr_Users(OpenID,NickName,HeadImgUrl,Source,ISFirst)values('" +
                                    _thirdUserID + "','" + _thirdNickName + "','" + _thirdUserImg + "','" + _source + "','0') select @@identity");
                            YQFunc.SetUserID(_userID);
                            Response.Redirect("Recommend.aspx");
                        }

                        else {
                            Cmn.DB.execSql(@"update usr_Users set OpenID='" + _thirdUserID + @"'
                                                            ,HeadImgUrl='" + _thirdUserImg + @"'
                                                            ,NickName='" + _thirdNickName + @"'
                                                            ,cmn_ModifyDate=getdate() where UserID='" + _userID + "'");
                            Cmn.Func.SetUserID(_userID.Trim());
                            Cmn.Log.Write("UserID========" + _userID);
                        }
                        YQFunc.SetUserID(_userID);
                        Response.Redirect("Home.aspx");
                    }
                }
                else { Cmn.Log.Write("登录失败！"); }
            }
            catch (Exception ex) { Cmn.Log.Write("登录失败！ex->" + ex.Message); }
        }
    }
}