Session.setDefault('isShowAddUserPanel', false);

for(var k in SimpleChineseItem){
    Session.setDefault(k, SimpleChineseItem[k]);
}

//Session.setDefault("langWebTitle", "企业营销管理软件");

Meteor.setInterval(function () {
    var d = new Date();
    Session.set("currentTime", d.toLocaleDateString() + d.toLocaleTimeString());
}, 1000);

Meteor.setDefaultLanguage=function(lang){
    //Session.set("langWebTitle", lang.langWebTitle);
    for(var k in lang){
        Session.set(k, lang[k]);
    }
};