Template.loginTemplate.helpers({
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
   "click #btn_return":function(e){
       Router.go("/");
   }
});

Template.loginTemplate.rendered = function(){
    $('.form-horizontal').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            input_login_name: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_login_password: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();
        var user={};
        user.id=$("#input_login_name").val();
        user.pw=$("#input_login_password").val();

        console.log(user);
    });
};