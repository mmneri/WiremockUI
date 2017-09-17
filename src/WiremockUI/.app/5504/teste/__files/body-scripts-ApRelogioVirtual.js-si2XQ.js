/*Compiled by Apdata: 2016-04-29 14:04*/
Ext.apdata.ApRelogioVirtual=Ext.extend(Ext.ux.Portlet,{messageTypes:{tmNormal:0,tmOk:1,tmErro:2,tmAtencao:3},initComponent:function(){Ext.apdata.ApRelogioVirtual.superclass.initComponent.call(this);this.remoteInit();},render:function(o){var cache=Ext.apdata.ScreenUtil.cache;var lang=Ext.apdata.lang;var deviceId=this.deviceID;Ext.apdata.ApRelogioVirtual.superclass.render.call(this,o);this.update(relogioVirtualPortletTpl.applyTemplate({device:deviceId}));this.clockEl=cache.get("horaRelogio_"+deviceId);this.dateEl=cache.get("dataRelogio_"+deviceId);this.crachaEl=cache.get("cracha_relogio_"+deviceId);this.crachaCt=cache.get("cracha_relogio_ct_"+deviceId);this.userNameEl=cache.get("userName_relogio_"+deviceId);this.userNameCt=cache.get("userName_relogio_ct_"+deviceId);this.passwordEl=cache.get("password_relogio_"+deviceId);this.passwordCt=cache.get("password_relogio_ct_"+deviceId);this.enteringBt=cache.get("btEntrada_relogio_"+deviceId);this.exitingBt=cache.get("btSaida_relogio_"+deviceId);this.messageEl=cache.get("msglbl_relogio_"+deviceId);this.messageCtEl=cache.get("msg_relogio_"+deviceId);this.costCenterEl=cache.get("costCenter_relogio_"+deviceId);this.costCenterCt=cache.get("costCenter_relogio_ct_"+deviceId);this.leaveEl=cache.get("leave_relogio_"+deviceId);this.leaveCt=cache.get("leave_relogio_ct_"+deviceId);this.funcEl=cache.get("func_relogio_"+deviceId);this.funcCt=cache.get("func_relogio_ct_"+deviceId);cache.get("label_costCenter_relogio_"+deviceId).update(lang.relogioCentroCusto);cache.get("label_leave_relogio_"+deviceId).update(lang.relogioLeave);cache.get("label_func_relogio_"+deviceId).update(lang.relogioFuncao);cache.get("label_userName_relogio_"+deviceId).update(lang.relogioUserName);cache.get("label_password_relogio_"+deviceId).update(lang.relogioPassword);cache.get("label_cracha_relogio_"+deviceId).update(lang.relogioCracha);cache.get("btEntrada_relogio_"+deviceId).dom.value=lang.entrada;cache.get("btSaida_relogio_"+deviceId).dom.value=lang.saida;},remoteInit:function(){Ext.Ajax.request({method:"GET",url:Ext.apdata.getAction("GetClockDeviceInfo"),params:{deviceID:this.deviceID},success:function(response){this.deviceInfo=Ext.decode(response.responseText).deviceInfo;this.crachaCt.setDisplayed(this.deviceInfo.useCracha);this.userNameCt.setDisplayed(this.deviceInfo.useUserPwd);this.passwordCt.setDisplayed(this.deviceInfo.useUserPwd);this.leaveCt.setDisplayed(this.deviceInfo.oplLiberarFolhaRVirtual);this.costCenterCt.setDisplayed(this.deviceInfo.oplLiberarCCustoRVirtual);this.funcCt.setDisplayed(this.deviceInfo.oplLiberarFuncoesRVirtual);this.enteringBt.on("click",this.enteringClick,this);this.exitingBt.on("click",this.exitingClick,this);if(this.onlyMarcacao){this.exitingBt.setDisplayed(false);this.enteringBt.dom.value=Ext.apdata.lang.marcacao;}
this.lastTime=new Date().getTime();this.timer={run:function(){var tm=new Date().getTime();var diffTime=tm-this.lastTime;if(diffTime>60000||diffTime<0){this.enteringBt.un("click",this.enteringClick,this);this.exitingBt.un("click",this.exitingClick,this);Ext.TaskMgr.stop(this.timer)
this.remoteInit();}
this.deviceInfo.dtTimeEvent=this.deviceInfo.dtTimeEvent.add(Date.MILLI,tm-this.lastTime);this.lastTime=tm;if(this.clockEl){this.clockEl.dom.innerHTML=this.deviceInfo.dtTimeEvent.format(Ext.apdata.util.ApTimeFormat);}
if(this.dateEl){this.dateEl.dom.innerHTML=this.deviceInfo.dtTimeEvent.format(Ext.apdata.util.ApDateFormat);}},scope:this,interval:1000};Ext.TaskMgr.start(this.timer);if(Ext.apdata.ScreenUtil.cache.get("indexPage")){Ext.apdata.ScreenUtil.cache.get("indexPage").on("mouseover",function(){if(this.timer){var now=new Date().getTime();if(now-this.timer.taskRunTime<0){this.timer.taskRunTime=now;}}},this);}},scope:this});},clearMessage:function(){this.messageEl.dom.innerHTML="";this.messageCtEl.setDisplayed(false);this.messageCtEl.removeClass(this.messageCtEl.dom.className);this.crachaEl.dom.value="";this.userNameEl.dom.value="";this.passwordEl.dom.value="";},displayMessage:function(msg,type,displayTime){this.messageEl.dom.innerHTML=msg;this.messageCtEl.setDisplayed(true);switch(type){case this.messageTypes.tmOK:this.messageCtEl.replaceClass("","msg_relogioOK");break;case this.messageTypes.tmErro:this.messageCtEl.replaceClass("","msg_relogioErro");break;case this.messageTypes.tmAtencao:this.messageCtEl.replaceClass("","msg_relogioAtencao");break;default:this.messageCtEl.replaceClass("","msg_relogioOK");break;}
this.clearMessage.createDelegate(this).defer(displayTime);},processEvent:function(eventType){var stop=false;var timeMessage=((this.timeMessage)?this.timeMessage*1000:4000);if(this.deviceInfo.useUserPwd){if(!this.userNameEl.dom.value||!this.passwordEl.dom.value){this.displayMessage(Ext.apdata.lang.usuarioESenhaVazioRV,this.messageTypes.tmErro,timeMessage);stop=true;}}
else{if(!this.crachaEl.dom.value){this.displayMessage(Ext.apdata.lang.crachaVazio,this.messageTypes.tmErro,timeMessage);stop=true;}}
if(!stop){var params={deviceID:this.deviceID,eventType:eventType,userName:this.userNameEl.dom.value,password:this.passwordEl.dom.value,cracha:this.crachaEl.dom.value,costCenter:this.costCenterEl.dom.value,leave:this.leaveEl.dom.value,func:this.funcEl.dom.value};Ext.Ajax.request({url:Ext.apdata.getAction("SaveTimmingEvent"),params:params,success:function(response){var rst=Ext.decode(response.responseText);this.displayMessage(rst.msg.msg,rst.msg.type,timeMessage);},scope:this});}},enteringClick:function(){this.processEvent(1);},exitingClick:function(){this.processEvent(2);}});Ext.reg("relogiovirtual",Ext.apdata.ApRelogioVirtual);