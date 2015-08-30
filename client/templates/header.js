Template.headerTmp.helpers({
   "langWebTitle":function(){
       return Session.get("langWebTitle");
   },
   "langLogin" :function(){
       return Session.get("langLogin");
   },
    "langLogout" :function(){
        return Session.get("langLogout");
    },
    "langChangeLanguage" :function(){
        return Session.get("langChangeLanguage");
    }
});

Template.headerTmp.events({
    "click #btn_english": function(){
        Meteor.setDefaultLanguage(EnglishItem);
    },
    "click #btn_simple_chinese": function(){
        Meteor.setDefaultLanguage(SimpleChineseItem);
    },
    "click #btn_tradition_chinese": function(){
        Meteor.setDefaultLanguage(TraditionChineseItem);
    }
})

