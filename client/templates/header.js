Template.headerTemplate.helpers({
    groupTitle:function(){
        var o = Meteor.user();
        //console.log(o);
        if(o && o.profile && o.profile.grade === 0){
            return Session.get('langSuperAdmin')+":";
        }else{
            var o = gGroups.findOne({});
            if(o && o.title)
                return o.title+":";
            else
                return "";
        }
    },
    //错误处理
    errorMessage:function(){
        return Session.get("errorMessage");
    },
    //下面的辅助函数是为了界面多语言
    langWebTitle:function(){
       return Session.get("langWebTitle");
    },
    langLogin :function(){
       return Session.get("langLogin");
    },
    langLogout :function(){
        return Session.get("langLogout");
    },
    langRegistration :function(){
        return Session.get("langRegistration");
    },
    langChangeLanguage :function(){
        return Session.get("langChangeLanguage");
    }
});

var lang={
    "简体中文": SimpleChineseItem,
    "繁體中文": TraditionChineseItem,
    "English": EnglishItem,
    "日本語": JapanItem
};

Template.headerTemplate.events({
    "change #theme_chooser":function(e){
        var css=e.currentTarget.value;
        //console.log(css);
        $('#bootstrap_theme').attr("href",css);
    },
    "change #language_chooser":function(e){
        var langIndex=e.currentTarget.value;
        //console.log(css);
        Meteor.setDefaultLanguage(lang[langIndex]);
    },
    "click #btn_logout":function(){
        Meteor.logout();
        Router.go('/');
    }
});

