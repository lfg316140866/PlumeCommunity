using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// func 的摘要说明
/// </summary>
public class YQFunc
{
    public static string GetUserID()
    {

        string _userID = Cmn.Session.Get("YQUserID");

        if (_userID != "")
        {
            _userID = Cmn.DB.getFieldValue("select UserID from usr_Users where UserID='" + _userID + "'");
            if (_userID == "")
            {
                Cmn.Log.WriteToFile("NoGetUserID", "非法授权！");
                return "";//非法授权
            }
            else
            {
                return _userID;
            }
        }
        return _userID;
    }

    public static bool SetUserID(string userID)
    {
        Cmn.Session.Set("YQUserID", userID);
        return true;
    }
}