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
                    if (_thirdUserID != "")
                    {
                        string _userID = Cmn.DB.getFieldValue("select UserID from usr_Users where ThirdUserID='" +
                            _thirdUserID + "' ").Trim();

                        if (_userID == "")
                        { //说明用户不存在需要新增
                            _userID = Cmn.DB.getFieldValue("insert into usr_Users(ThirdUserID,ThirdNickName,ThirdUserImg,ThirdParty)values('" +
                                    _thirdUserID + "','" + _thirdNickName + "','" + _thirdUserImg + "','" + ((int)_thirdType) + "') select @@identity");
                        }

                        if (_userID != "")
                        {
                            Cmn.DB.execSql(@"update usr_Users set ThirdUserID='" + _thirdUserID + @"'
                                                            ,ThirdUserImg='" + _thirdUserImg + @"'
                                                            ,ThirdNickName='" + _thirdNickName + @"'
                                                            ,cmn_ModifyDate=getdate() where UserID='" + _userID + "'");
                            Cmn.Func.SetUserID(_userID.Trim());
                            Cmn.Log.Write("UserID========" + _userID);
                        }
                        if (_userID != "")
                        {
                            //延时2秒钟后跳转至首页  逗号
                            Response.Write("<script type='text/javascript'>setTimeout(function(){window.location.href='index.html';},2000)</script>");

                        }
                    }
                }
                else { Cmn.Log.Write("登录失败！"); }
            }
            catch (Exception ex) { Cmn.Log.Write("登录失败！ex->" + ex.Message); }
        }
    }
}