//设置缺省的显示参数，这些都是各个页面的缺省添加窗口，缺省下不显示
Session.setDefault("errorMessage","");
Session.setDefault('isShowAddUserPanel', false);



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

Meteor.validate_no_empty=function (id, validkey){
    var node=$("#"+id);
    if(node.val()===""){
        node.parent().addClass("has-error");
        Session.set(validkey, Session.get("langErrorCannotEmpty"));
        return false;
    }else{
        node.parent().removeClass("has-error");
        Session.set(validkey,"");
        return true;
    }
};

Meteor.validate_must_same=function (id1, id2, validkey){
    var node1=$("#"+id1),
        node2=$("#"+id2);
    if(node1.val()==="" || node2.val()==="" || node1.val()!==node2.val()){
        node1.parent().addClass("has-error");
        Session.set(validkey, Session.get("langErrorMustBeSame"));
        return false;
    }else{
        node1.parent().removeClass("has-error");
        Session.set(validkey,"");
        return true;
    }
};

