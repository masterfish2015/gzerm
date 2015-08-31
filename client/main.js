//设置缺省的显示参数，这些都是各个页面的缺省添加窗口，缺省下不显示
Session.setDefault('isShowAddUserPanel', false);
Session.setDefault("showAddCompanyPanel", false);
Session.setDefault("showAddCompanyTypePanel",false);

//设置界面的缺省语言是中文简体
for(var k in SimpleChineseItem){
    Session.setDefault(k, SimpleChineseItem[k]);
}

//设置动态显示时钟
Meteor.setInterval(function () {
    var d = new Date();
    Session.set("currentTime", d.toLocaleDateString() + d.toLocaleTimeString());
}, 1000);

//修改界面语言的缺省函数，参数lang目前有“EnglishItem,SimpleChineseItem,TraditionChineseItem"
Meteor.setDefaultLanguage=function(lang){
    //Session.set("langWebTitle", lang.langWebTitle);
    for(var k in lang){
        Session.set(k, lang[k]);
    }
};