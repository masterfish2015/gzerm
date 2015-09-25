Template.loginTmp.helpers({
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

Template.loginTmp.events({
   "click #btn_return":function(e){
       Router.go("/");
   },
   "click #btn_login":function(e){
       e.preventDefault();

       var user={};
       user.id=$("#text_login_name").val();
       user.pw=$("#text_login_password").val();

       console.log(user);

       Router.go("/");
   }
});