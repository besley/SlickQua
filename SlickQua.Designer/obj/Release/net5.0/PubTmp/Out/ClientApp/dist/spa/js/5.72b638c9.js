(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{"511b":function(i,e,t){"use strict";t("bbd6")},"876e":function(i,e,t){"use strict";t.r(e);var s=function(){var i=this,e=i.$createElement,t=i._self._c||e;return t("q-page",[t("div",{staticClass:"row",staticStyle:{"margin-left":"10px"}},[t("div",{staticClass:"col"},[t("h5",[i._v(i._s(i.ui.bindingtitle))]),t("div",{staticClass:"row"},[t("div",{staticClass:"col"},[t("q-select",{attrs:{label:i.ui.processlist,options:i.processlist},model:{value:i.selectedProcess,callback:function(e){i.selectedProcess=e},expression:"selectedProcess"}})],1),t("div",{staticClass:"col"},[t("q-btn",{attrs:{label:i.ui.binding,color:"primary",icon:"build"},on:{click:i.onBindClick}}),t("q-btn",{attrs:{label:i.ui.unbinding,color:"orange",icon:"edit_off"},on:{click:i.onUnbindClick}})],1)]),t("div",{staticClass:"row",staticStyle:{"margin-top":"10px"}},[t("q-list",{staticClass:"rounded-borders",attrs:{dense:"",bordered:"",padding:""},model:{value:i.selectedActivity,callback:function(e){i.selectedActivity=e},expression:"selectedActivity"}},[t("q-item-label",{attrs:{header:""}},[i._v(i._s(i.ui.activitylist))]),i._l(i.activitylist,(function(e){return t("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:e.ActivityGUID,attrs:{clickable:"",active:i.link===e.ActivityGUID,"active-class":"my-active-link"},on:{click:function(t){i.link=e.ActivityGUID}}},[t("q-item-section",{attrs:{avatar:""}},[t("q-icon",{attrs:{color:"green",name:"account_circle"}})],1),t("q-item-section",{on:{click:function(t){return i.onActivityClick(e)}}},[i._v("\n              "+i._s(e.ActivityName)+"\n            ")])],1)}))],2)],1)]),t("div",{staticClass:"col"},[t("h5",[i._v(i._s(i.ui.fieldpermission))]),t("div",{staticClass:"row"},[t("q-btn",{attrs:{label:i.ui.savepermission,color:"green",icon:"save"},on:{click:i.onSavePermissionClick}}),t("q-btn",{attrs:{label:i.ui.return,color:"orange",icon:"keyboard_return"},on:{click:i.onReturnClick}})],1),t("div",{staticClass:"row",staticStyle:{"margin-top":"10px"}},[t("q-table",{attrs:{title:"",data:i.permissiondata,columns:i.columns,"row-key":"FieldID",prefix:"permissionlist"},scopedSlots:i._u([{key:"body",fn:function(e){return[t("q-tr",{attrs:{props:e}},[t("q-td",{key:"fieldID",attrs:{props:e}},[i._v("\n                "+i._s(e.row.FieldID)+"\n              ")]),t("q-td",{key:"fieldName",attrs:{props:e}},[i._v("\n                "+i._s(e.row.FieldName)+"\n              ")]),t("q-td",{key:"isNotVisible",attrs:{props:e}},[t("q-checkbox",{model:{value:e.row.IsNotVisible,callback:function(t){i.$set(e.row,"IsNotVisible",t)},expression:"props.row.IsNotVisible"}})],1),t("q-td",{key:"isReadOnly",attrs:{props:e}},[t("q-checkbox",{model:{value:e.row.IsReadOnly,callback:function(t){i.$set(e.row,"IsReadOnly",t)},expression:"props.row.IsReadOnly"}})],1)],1)]}}])})],1)])])])},o=[],n=t("ded3"),r=t.n(n),l=t("1157"),a=t.n(l),c=(t("00a0"),t("0891")),d=t("2f62"),m={name:"Binding",created(){this.loadProcessList()},data(){return{ui:{processlist:this.gmxGetTitle("processlist"),activitylist:this.gmxGetTitle("activitylist"),binding:this.gmxGetTitle("binding"),unbinding:this.gmxGetTitle("unbinding"),bindingtitle:this.gmxGetTitle("bindingtitle"),fieldpermission:this.gmxGetTitle("fieldpermission"),savepermission:this.gmxGetTitle("savepermission"),return:this.gmxGetTitle("return")},processlist:[],selectedProcess:null,originalBindingProcessID:0,link:"",activitylist:[],selectedActivity:null,permissiondata:[],columns:[{name:"fieldID",label:this.gmxGetTitle("fieldid"),align:"left",field:"FieldID"},{name:"fieldName",label:this.gmxGetTitle("fieldname"),align:"left",field:"FieldName"},{name:"isNotVisible",label:this.gmxGetTitle("isnotvisible"),align:"left",field:"IsNotVisible"},{name:"isReadOnly",align:"left",label:this.gmxGetTitle("isreadonly"),field:"IsReadOnly"}],selected:[]}},methods:r()(r()({},Object(d["b"])("workflow",["getProcessList","getActivityList","getFormFieldActivityEditList","saveFormFieldActivityEditList","bindFormProcess","unbindFormProcess"])),{},{loadProcessList(){var i=this,e=this.$route.params.id,t={FormID:e,callback:function(e){if(1===e.Status){a.a.each(e.Entity.ProcessList,(function(e,t){var s={value:t.ID,label:t.ProcessName};i.processlist.push(s)}));var t=e.Entity.FormProcess;if(null!==t){var s={value:t.ProcessID,label:t.ProcessName};i.selectedProcess=s,i.originalBindingProcessID=t.ProcessID,i.loadActivityList(t.ProcessID)}else i.selectedProcess=null}else c["a"].error(i.gmxGetTitle("Process.bindingProcess.error"),e.Message)}};this.getProcessList(t)},loadActivityList(i){var e=this,t={ProcessID:this.originalBindingProcessID,callback:function(i){1===i.Status?e.activitylist=i.Entity:c["a"].error(e.gmxGetTitle(""),i.Message)}};this.getActivityList(t)},onBindClick(){var i=this,e=this.$route.params.id;if(0!==e&&null!==this.selectedProcess){var t=this.selectedProcess.value;t!==i.originalBindingProcessID&&c["a"].confirm(i.gmxGetTitle("Process.onFormBindingProcess.confirm"),(function(){var s={FormID:e,ProcessID:t,callback:function(e){1===e.Status?(i.originalBindingProcessID=t,i.loadActivityList(t),c["a"].info(i.gmxGetTitle("Process.onFormBindingProcess.ok"))):c["a"].error(i.gmxGetTitle("Process.onFormBindingProcess.error"),e.Message)}};i.bindFormProcess(s)}))}else c["a"].warn(this.gmxGetTitle("Process.onFormBindingProcess.null.warn"))},onUnbindClick(){var i=this,e=this.$route.params.id;0!==e?c["a"].confirm(i.gmxGetTitle("Process.onFormUnbindingProcess.confirm"),(function(){var t={FormID:e,callback:function(e){1===e.Status?(i.selectedProcess=null,i.activitylist=[],i.selectedActivity=null,i.originalBindingProcessID=0,i.permissiondata=[],c["a"].info(i.gmxGetTitle("Process.onFormUnbindingProcess.ok"))):c["a"].error(i.gmxGetTitle("Process.onFormUnbindingProcess.error"),e.Message)}};i.unbindFormProcess(t)})):c["a"].warn(i.gmxGetTitle("Process.onFormUnbindingProcess.null.warn"))},onActivityClick(i){var e=this.$route.params.id,t=this.originalBindingProcessID;this.selectedActivity=i,this.loadFieldPermissionData(e,t,i.ActivityGUID)},loadFieldPermissionData(i,e,t){var s=this,o={Query:{FormID:i,ProcessID:e,ActivityGUID:t},callback:function(i){1===i.Status?s.permissiondata=i.Entity:Object(c["a"])(s.gmxGetTitle("Process.loadFieldPermissionData.error"),i.Message)}};this.getFormFieldActivityEditList(o)},onSavePermissionClick(){var i=this;if(null!==i.selectedActivity){var e=this.$route.params.id,t=i.originalBindingProcessID,s=i.selectedActivity.ActivityGUID,o=i.selectedActivity.ActivityName,n={Query:{FormID:e,ProcessID:t,ActivityGUID:s,ActivityName:o,FieldEditList:i.permissiondata},callback:function(e){1===e.Status?c["a"].info(i.gmxGetTitle("Process.saveFieldPermissionData.ok")):c["a"].error(i.gmxGetTitle("Process.saveFieldPermissionData.error"),e.Message)}};this.saveFormFieldActivityEditList(n)}else c["a"].info(i.gmxGetTitle("Process.saveFieldPermissionData.noneactivity.warn"))},onReturnClick(){window.close()}})},v=m,u=(t("511b"),t("2877")),g=t("9989"),b=t("ddd8"),P=t("9c40"),p=t("1c1c"),y=t("0170"),f=t("66e5"),k=t("4074"),h=t("0016"),I=t("eaac"),D=t("bd08"),x=t("db86"),F=t("8f8e"),G=t("714f"),w=t("eebe"),A=t.n(w),T=Object(u["a"])(v,s,o,!1,null,"b2582790",null);e["default"]=T.exports;A()(T,"components",{QPage:g["a"],QSelect:b["a"],QBtn:P["a"],QList:p["a"],QItemLabel:y["a"],QItem:f["a"],QItemSection:k["a"],QIcon:h["a"],QTable:I["a"],QTr:D["a"],QTd:x["a"],QCheckbox:F["a"]}),A()(T,"directives",{Ripple:G["a"]})},bbd6:function(i,e,t){}}]);