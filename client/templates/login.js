Template.loginTemplate.helpers({
    //进行错误检测
    is_error:function(err){
        if(err==="")
            return false;
        else
            return true;
    },
    validateLoginName: function(){
        return Session.get('validateLoginName');
    },
    validateLoginPassword: function(){
        return Session.get('validateLoginPassword');
    },
    validateLoginError:function(){
        return Session.get('validateLoginError')  ;
    },
    //下面的辅助函数是为了界面多语言
    langLogin: function () {
        return Session.get('langLogin');
    },
    langLoginName: function () {
        return Session.get('langLoginName');
    },
    langLoginPassword: function () {
        return Session.get('langLoginPassword');
    },
    langAdd: function () {
        return Session.get('langAdd');
    }
});


Template.loginTemplate.events({
   "click #btn_login":function(e){
       //登录前先进行数据的检测
       var is_ok = true;
       is_ok = Meteor.validate_no_empty("input_login_name", "validateLoginName");
       is_ok = Meteor.validate_no_empty("input_login_password", "validateLoginPassword");

       if(is_ok===false)return;

       var login={};
       login.userName = $('#input_login_name').val();
       login.password = $('#input_login_password').val();

       Meteor.loginWithPassword(login.userName, login.password, function(e){
           if(!e){
               Session.set('validateLoginError',"");
               Router.go('/');
           }else{
               //console.log(e);
               Session.set('validateLoginError',Session.get('langErrorNotExist'));
           }
       });
   }

});

Template.loginTemplate.rendered = function(){

};