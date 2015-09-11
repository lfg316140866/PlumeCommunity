﻿CmnMis_UI_Control_StockSelect_Version = "2.3.1", function () { var a = CmnMis.UI.Control; a.StockSelect = function (b, c) { var d, e, f; Cmn.Object.Inherit(this, a.DetailUserForm, [b, c]), d = this, d.Type = "StockSelect", d.IsSetValByKey = !0, e = $('<div style="height:100%;width:500px;margin: auto;">'), e.append($('<div style="text-align: center; font-size: 18px; padding-top: 20px;"><b class="cmn-StockSelectPageTitle"></b></div>')), e.append($('<div class="cmn-StockSelectContent" style="height:80%; width: 100%;overflow-y: auto;overflow-x: hidden;margin-top:20px;"> </div>')), e.append($('<div style="height: 55px; width: 100%;"><b class="cmn-StockSelectCancel" style="display: inline; height: 35px; width: 110px; cursor: pointer; border-radius: 5px; color: #fff; font-size: 16px; line-height: 35px; text-align: center; background: #505050; float: right; margin: 10px;">取消</b><b class="cmn-StockSelectSave" style="display: inline; height: 35px; width: 110px; cursor: pointer; border-radius: 5px; color: #fff; font-size: 16px; line-height: 35px; text-align: center; background: #505050; float: right; margin: 10px;">保存</b> </div>')), _OriginalTableData = [], _IsSaveOriginalTableData = !1, _FieldInfos = { GoodsID: "GoodsID", GoodsDesc: "GoodsDesc_l1", Qty: "Qty", WarehouseID: "WarehouseID", Price: "Price", StockQty: "StockQty", Amount: "Amount", BatchNo: "BatchNo", StockID: "StockID" }, _UserFormInfo = null, _IsShowBatchNo = !1, d.InitControl = function () { e.find(".cmn-StockSelectContent").empty(), d.ControlDom.find(a.Selector.CtlContent).css({ border: " 1px solid #e6e6e6" }) }, f = { Clone: function (a) { if (Cmn.IsType(a, "array")) { var b = []; return $.each(a, function (a, c) { b.push($.extend({}, c)) }), b } return Cmn.IsType(a, "object") ? $.extend({}, a) : a }, Exists: function (a, b) { return null != this.GetIndexByGoods(a, b) }, ExistsByID: function (a, b) { Cmn.IsType(b, "array") || (b = _UserFormInfo.TableCache.GetData()); for (var c = 0; c < b.length; c++) if (a[_FieldInfos["GoodsID"]] == b[c][_FieldInfos["GoodsID"]]) return !0; return !1 }, GetGoodsListByGoods: function (a, b) { var c = []; return Cmn.IsType(b, "array") || (b = _UserFormInfo.TableCache.GetData()), !_UserFormInfo && Cmn.IsType(b, "array") ? c : ($.each(b, function (b, d) { d[_FieldInfos["GoodsID"]] == a[_FieldInfos["GoodsID"]] && "" != a[_FieldInfos["GoodsID"]] && null != a[_FieldInfos["GoodsID"]] && void 0 != a[_FieldInfos["GoodsID"]] && c.push(d) }), c) }, GetIndexByGoods: function (a, b) { var c = null; return Cmn.IsType(b, "array") || (b = _UserFormInfo.TableCache.GetData()), !_UserFormInfo && Cmn.IsType(b, "array") ? c : ($.each(b, function (b, d) { return d[_FieldInfos.BatchNo] != a[_FieldInfos.BatchNo] && void 0 !== d[_FieldInfos.BatchNo] && void 0 !== a[_FieldInfos.BatchNo] || d[_FieldInfos.GoodsStatusID] != a[_FieldInfos.GoodsStatusID] && void 0 !== d[_FieldInfos.GoodsStatusID] && void 0 !== a[_FieldInfos.GoodsStatusID] || d[_FieldInfos.WarehouseID] != a[_FieldInfos.WarehouseID] && void 0 !== d[_FieldInfos.WarehouseID] && void 0 !== a[_FieldInfos.WarehouseID] || d[_FieldInfos.GoodsID] != a[_FieldInfos.GoodsID] || "" == a[_FieldInfos.GoodsID] || null == a[_FieldInfos.GoodsID] || void 0 == a[_FieldInfos.GoodsID] ? void 0 : (c = b, !1) }), c) }, GetGoodsSumQtyByGoods: function (a, b) { var e, c = this.GetGoodsListByGoods(a, b), d = 0; for (e = 0; e < c.length; e++) d += 1 * (c[e][_FieldInfos.Qty] || 0); return d }, MergeGoodsByGoodsID: function (a) { var b, c, d, e; if (!_UserFormInfo) return !0; for (b = this.Clone(a || _UserFormInfo.TableCache.GetData()), c = {}, d = 0; d < b.length; d++) b[d] && "" != b[d][_FieldInfos.GoodsID] && (delete b[d][_FieldInfos.BatchNo], 0 == c[b[d][_FieldInfos.GoodsID]] || c[b[d][_FieldInfos.GoodsID]] ? (e = b[c[b[d][_FieldInfos.GoodsID]]], b[d][_UserFormInfo.KeyColName].indexOf("ID") < 0 && (e[_UserFormInfo.KeyColName] = b[d][_UserFormInfo.KeyColName]), e[_FieldInfos.Qty] = 1 * e[_FieldInfos.Qty] + 1 * b[d][_FieldInfos.Qty], e[_FieldInfos.Amount] = (e[_FieldInfos.Qty] * e[_FieldInfos.Price]).toFixed(2), b.splice(d--, 1)) : (c[b[d][_FieldInfos.GoodsID]] = d, e = b[c[b[d][_FieldInfos.GoodsID]]], e[_FieldInfos.Qty] = 1 * e[_FieldInfos.Qty], e[_FieldInfos.Amount] = (e[_FieldInfos.Qty] * e[_FieldInfos.Price]).toFixed(2))); return b }, GenerateChangeList: function (a, b) { var c, d; if (b.length = 0, Cmn.IsType(a), "array") { for (c = 0; c < a.length; c++) d = a[c], f.Exists(d, _OriginalTableData) ? (d.CmnOpt = "Update", b.push(d)) : (d.CmnOpt = "Add", b.push(d)); for (c = 0; c < _OriginalTableData.length; c++) d = _OriginalTableData[c], f.Exists(d, a) || (d.CmnOpt = "Delete", b.push(d)) } }, AddGoods: function (b, c, d) { var e, g, h, i; return _UserFormInfo ? (e = _UserFormInfo.TableCache, g = _UserFormInfo.TableCache.GetData(), h = _UserFormInfo.TableCache.GetChangeRecList(), CmnMis.Hint.Show(), i = a.GetControlByName(CmnMis.Func.GetUserFormByID(_UserFormInfo.ParentUserFormID).GetSelector(_UserFormInfo.Selector.EditControlPanel), "ApplyUserID"), CmnMis.Itf.GetData("Erp_wl_GetStockBatchNoLst", { GoodsID: b[_FieldInfos["GoodsID"]], NeedQty: b[_FieldInfos["Qty"]], ApplyUserID: i ? i.GetValue() : void 0 }, !1, function (a) { Cmn.IsType(a, "object") && Cmn.IsType(a.data, "array") && $.each(a.data, function (a, c) { var h, i; c[_FieldInfos.StockQty] = void 0, h = $.extend({}, b, c), h[_FieldInfos["Amount"]] = h[_FieldInfos["Price"]] * h[_FieldInfos["Qty"]], h[_UserFormInfo.KeyColName] = "ID_" + e.MaxNewRecID++, h.CmnOpt = "Add", f.Exists(h) ? (i = f.GetIndexByGoods(h), g[i] = h) : g[g.length] = h, d && d() }), f.GenerateChangeList(g, h), CmnMis.Hint.Hide(), CmnMis.PopWin.HideAll(), (1 == c || void 0 == c) && _UserFormInfo.RefreshData() }), !1) : !0 }, UpdateGoods: function (b, c, d) { function n() { f.GenerateChangeList(g, h), d && d(), CmnMis.PopWin.HideAll(), (1 == c || void 0 == c) && _UserFormInfo.RefreshData() } var k, l, m, e = _UserFormInfo.TableCache, g = _UserFormInfo.TableCache.GetData(), h = _UserFormInfo.TableCache.GetChangeRecList(), j = 0; if (j = f.ExistsByID(b, _OriginalTableData) ? b[_FieldInfos["Qty"]] - f.GetGoodsSumQtyByGoods(b, _OriginalTableData) : 1 * b[_FieldInfos["Qty"]], j > 0) CmnMis.Hint.Show(), CmnMis.Itf.GetData("Erp_wl_GetStockBatchNoLst", { GoodsID: b[_FieldInfos["GoodsID"]], NeedQty: j, ApplyUserID: a.GetControlByName(CmnMis.Func.GetUserFormByID(_UserFormInfo.ParentUserFormID).GetSelector(_UserFormInfo.Selector.EditControlPanel), "ApplyUserID").GetValue() }, !1, function (a) { var c, d, h, i, j; if (Cmn.IsType(a, "object") && Cmn.IsType(a.data, "array")) { for (c = 0; c < g.length; c++) b[_FieldInfos["GoodsID"]] == g[c][_FieldInfos["GoodsID"]] && g.splice(c--, 1); for (d = 0; d < a.data.length; d++) a.data[d][_FieldInfos.StockQty] = void 0, h = $.extend({}, b, a.data[d]), h[_FieldInfos["Amount"]] = h[_FieldInfos["Price"]] * h[_FieldInfos["Qty"]], f.Exists(h, _OriginalTableData) ? g.push(h) : (h[_UserFormInfo.KeyColName] = "ID_" + e.MaxNewRecID++, g.push(h)); for (i = f.Clone(g), c = 0; c < _OriginalTableData.length; c++) for (j = 0; j < i.length; j++) if (_OriginalTableData[c][_FieldInfos["GoodsID"]] == b[_FieldInfos["GoodsID"]]) { if (i[j][_FieldInfos["GoodsID"]] == _OriginalTableData[c][_FieldInfos["GoodsID"]] && i[j][_FieldInfos["BatchNo"]] == _OriginalTableData[c][_FieldInfos["BatchNo"]]) { g[j][_FieldInfos["Qty"]] = 1 * i[j][_FieldInfos["Qty"]] + 1 * _OriginalTableData[c][_FieldInfos["Qty"]], g[j][_FieldInfos["Amount"]] = 1 * i[j][_FieldInfos["Amount"]] + 1 * _OriginalTableData[c][_FieldInfos["Amount"]], i[j][_UserFormInfo.KeyColName] = _OriginalTableData[c][_UserFormInfo.KeyColName]; break } g.push(_OriginalTableData[c]); break } } CmnMis.Hint.Hide(), n() }); else { for (k = f.GetGoodsListByGoods(b, _OriginalTableData), k.sort(function (a, b) { return parseInt(a[_FieldInfos["StockID"]]) > parseInt(b[_FieldInfos["StockID"]]) ? 1 : -1 }), l = 0; l < g.length; l++) b[_FieldInfos["GoodsID"]] == g[l][_FieldInfos["GoodsID"]] && g.splice(l--, 1); for (l = 0; l < k.length; l++) { if (m = k[l], 1 * m[_FieldInfos["Qty"]] + j > 0) { m[_FieldInfos["Qty"]] = 1 * m[_FieldInfos["Qty"]] + j, m[_FieldInfos["Amount"]] = m[_FieldInfos["Qty"]] * m[_FieldInfos["Price"]]; break } j += 1 * m[_FieldInfos["Qty"]], m[_FieldInfos["Qty"]] = 0, k.splice(l--, 1) } for (l = 0; l < k.length; l++) g.push(k[l]); n() } return !1 }, DeleteGoodsByRecID: function (a) { var b, c, d, e, f, g, h, i; if (!_UserFormInfo) return !0; for (b = a ? _UserFormInfo.TableCache.GetData({ RecID: a }) : _UserFormInfo.TableCache.GetData(), c = _UserFormInfo.TableCache.GetData(), d = _UserFormInfo.TableCache.GetChangeRecList(), e = 0; e < b.length; e++) for (f = b[e][_FieldInfos["GoodsID"]], g = 0; g < c.length; g++) if (c[g][_FieldInfos["GoodsID"]] == f) { for (h = 0; h < d.length; h++) d[h][_FieldInfos["GoodsID"]] == f && d.splice(h--, 1); i = c[g][_UserFormInfo.KeyColName], i.indexOf("ID_") < 0 && (d[d.length] = c[g], d[d.length - 1].CmnOpt = "Delete"), c.splice(g--, 1) } return !1 } }, d.SetGoodsList = function (a) { function d() { return ++b < c ? !1 : (_UserFormInfo.RefreshData(), void 0) } if (!_UserFormInfo || !Cmn.IsType(a, "array")) return !1; $.each(a, function (a, b) { f.Exists(b) ? f.UpdateGoods(b, !1, d) : f.AddGoods(b, !1, d) }); var b = 0, c = a.length; return !0 }, d.RemoveAllGoods = function () { return _UserFormInfo ? (f.DeleteGoodsByRecID(), _UserFormInfo.RefreshData(), !0) : !1 }, d.GetGoodsListLength = function () { return _UserFormInfo ? _UserFormInfo.TableCache.GetData().length : 0 }, d.BindUserFormEvent = function (b) { var d, g, h, i, j, k; _UserFormInfo = b, _OriginalTableData = [], _IsSaveOriginalTableData = !1, e.find(".cmn-StockSelectContent").empty(), $.each(b.ColInfo, function (c, d) { if ("1" != d.IsShowInEdit) return !0; var f = a.NewControl(d.ColControlName, d.ColName, d.ControlCfg); f.AppendTo(e.find(".cmn-StockSelectContent")), f.InitControl(), f.SetColDesc(d.ColTitle), d.ColName == _FieldInfos.GoodsID && f.AutoComplete && f.AutoComplete.AppendTo(e), "1" == f.ControlCfg.IsReadOnly && f.SetEnabled(!1), b.KeyColName == d.ColName && (f.ControlCfg.IsReadOnly = "1", f.ControlCfg.IsRequired = "0") }), a.BindControlLink(e), d = a.GetControlByName(e, _FieldInfos["Qty"]), g = a.GetControlByName(e, _FieldInfos["Price"]), h = a.GetControlByName(e, _FieldInfos["StockQty"]), i = a.GetControlByName(e, _FieldInfos["Amount"]), d && g && i && d.OnKeyup.Add(function () { var b, a = 1 * this.GetValue(); /^[0-9]+$/.test(a + "") || (a = 0), b = g.GetValue() || 0, h && (_stockQty = 1 * h.GetValue() || 0, a > _stockQty && (a = _stockQty, this.SetValue(a))), i.SetValue((b * a).toFixed(2)) }, "_changeQtyKeydwonHandle"), j = a.GetControlByName(e, _FieldInfos["GoodsID"]), j && j.OnChange.Add(function () { h && d.OnKeyup.Trigger() }, "_selectGoodsChangeHandle"), k = function (c) { var d, g, h; CmnMis.PopWin.Show(e), a.InitValueList(e), e.find(".cmn-StockSelectCancel").off("click").on("click", function () { CmnMis.PopWin.Hide() }), c ? (d = b.TableCache.GetData({ RecID: c }), g = a.GetControlByName(e, b.KeyColName), j.SetEnabled(!1), d = f.MergeGoodsByGoodsID(f.GetGoodsListByGoods(d[0])), h = {}, h[_FieldInfos.GoodsID] = "", h[_FieldInfos.GoodsDesc] = "", d = $.extend(h, d[0]), j.AutoComplete ? j.AutoComplete.SetValue(d) : (j.SetValue(d[_FieldInfos.GoodsID]), j.OnChange.Trigger([d[_FieldInfos.GoodsID], d[_FieldInfos.GoodsDesc], d])), g.SetValue(d[b.KeyColName]), e.find(".cmn-StockSelectSave").off("click").on("click", function () { b.TableCache.Update(c, e) }), b.OnUpdateInitComplete.Trigger([c, e])) : (j.SetEnabled(!0), e.find(".cmn-StockSelectSave").off("click").on("click", function () { b.TableCache.Add(e) }), b.OnAddInitComplete.Trigger([e])) }, b.TableCache.BeforeAdd.Add(function (a, c) { return b.BeforeAddSave.Trigger([a, c]) === !1 ? !1 : f.ExistsByID(a) ? (Cmn.alert("该货物已存在！请点击修改！"), !1) : "" == a[_FieldInfos["GoodsID"]] ? (alert("添加的库存商品不能为空！"), !1) : /^[0-9\.]+$/.test(a[_FieldInfos["Qty"]]) && "0" != a[_FieldInfos["Qty"]] ? f.AddGoods(a) : (alert("添加的库存商品数量不合法！"), !1) }, "stock_TableCache_BeforeAdd"), b.TableCache.BeforeUpdate.Add(function (a, c) { return b.BeforeUpdateSave.Trigger([a, c]) === !1 ? !1 : f.UpdateGoods(a) }, "stock_TableCache_BeforeUpdate"), b.TableCache.BeforeDelete.Add(function (a) { return f.DeleteGoodsByRecID(a) }, "stock_TableCache_BeforeDelete"), b.OnAddClick.Add(function () { return k(), !1 }, "stock_AddClick"), b.BeforeView.Add(function (b) { return k(b), $.each(a.GetControls(e), function () { this.SetEnabled(!1) }), !1 }, "stock_BeforeView"), b.OnUpdateClick.Add(function (a) { return k(a), !1 }, "stock_UpdateClick"), b.BeforeFillRecList.Add(function (a) { if (0 == _IsShowBatchNo) { var b = f.Clone(a); a.length = 0, $.each(f.MergeGoodsByGoodsID(b), function () { a.push(this) }), a.sort(function (a, b) { return a[_FieldInfos["GoodsID"]] > b[_FieldInfos["GoodsID"]] ? 1 : -1 }) } }, "stock_BeforeFillRecList"), b.AfterRecListLoad.Add(function (a) { a.RecCount = a.data.length, 0 == _IsSaveOriginalTableData && (_IsSaveOriginalTableData = !0, _OriginalTableData = $.extend(_OriginalTableData, b.TableCache.GetData())) }, "stock_AfterRecListLoad") }, d.SetColDesc = function (b) { b || (b = this.KeyName), this.ControlDom.find(a.Selector.ColName).html(b + " : "), e.find(".cmn-StockSelectPageTitle").html(b) } } }();