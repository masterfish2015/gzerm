Template.loginTmp.events({
   "click #btn_return":function(e){
       Router.go("/");
   },
   "click #btn_login":function(e){
       e.preventDefault();

       var user={};
       user.id=$("#input_user_id").val();
       user.pw=$("#input_user_pw").val();

       console.log(user);

       Router.go("/");
   }
});