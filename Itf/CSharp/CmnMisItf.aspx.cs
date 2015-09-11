using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class CmnMisItf : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Response.Write(Cmn.Mis.CmnMisItf.CallItf());


       // //允许跨域
       //// Response.AddHeader("Access-Control-Allow-Origin", "*"); 

        //string _method = Cmn.Request.Get("method").Trim();
        //Cmn.JObjectItf _json = new Cmn.JObjectItf();

        //if (_method == "") { Response.Write(_json.Error("方法名不能为空").ToString()); return; }
        
        //MethodInfo _methodInfo = null;

        //if (_method.IndexOf(".") >= 0) {
        //    int _loc = _method.LastIndexOf(".");

        //    if (_loc < 0) { Response.Write(_json.Error("方法名错误！").ToString()); return; }

        //    string _className = _method.Substring(0, _loc);
        //    string _methodName = _method.Substring(_loc + 1);
        //    string _libName = _method.Substring(0, _className.LastIndexOf("."));

        //    System.Reflection.Assembly _lib = System.Reflection.Assembly.Load("CmnMis");

        //    _methodInfo = _lib.GetType(_className).GetMethod(_methodName);    
        //}
        //else { //默认调用 Cmn.Mis.UserFormProcessItf中的函数
        //    _methodInfo = typeof(Cmn.Mis.UserFormProcessItf).GetMethod(_method); 
        //}

        //if (_methodInfo == null) {
        //    Response.Write(_json.Error( _method + "方法不存在，请注意大小写。").ToString());
        //    return;
        //}

        //string _retVal = "";

        //try {
        //    _retVal = (string)_methodInfo.Invoke(null, new object[] { _json });
        //   // _retVal = _json.ToString();
        //}
        //catch {
        //    _retVal = (string)_methodInfo.Invoke(null, new object[] { });
        //}

        ////处理jsonp,如果有callback加上callback函数
        //string _callBack = Cmn.Request.Get("callback");
        
        //if (_callBack != "") {  _retVal = _callBack + "(" + _retVal + ")"; }
        
        //Response.Write(_retVal);
    }
}