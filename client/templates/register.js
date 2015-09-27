Session.setDefault('verifyInviteError','');
Session.setDefault('verifyRegisterGroupNameError','');
Session.setDefault('verifyRegisterUserNameError','');
Session.setDefault('verifyRegisterPasswordError','');
Session.setDefault('verifyRegisterRepeatPasswordError','');

Template.registerTemplate.helpers({
    //输入验证错误提示
    verifyInviteError: function () {
        return Session.get('verifyInviteError');
    },
    verifyRegisterGroupNameError: function () {
        return Session.get('verifyRegisterGroupNameError');
    },
    verifyRegisterUserNameError: function () {
        return Session.get('verifyRegisterUserNameError');
    },
    verifyRegisterPasswordError: function () {
        return Session.get('verifyRegisterPasswordError');
    },
    verifyRegisterRepeatPasswordError: function () {
        return Session.get('verifyRegisterRepeatPasswordError');
    },
    //下面的辅助函数是为了界面多语言
    langRegistration: function () {
        return Session.get('langRegistration');
    },
    langRegistrationUserName: function () {
        return Session.get('langRegistrationUserName');
    },
    langRegistrationGroupName: function () {
        return Session.get('langRegistrationGroupName');
    },
    langInviteCode: function () {
        return Session.get('langInviteCode');
    },
    langRegistrationPassword: function () {
        return Session.get('langRegistrationPassword');
    },
    langRegistrationConfirmPassword: function () {
        return Session.get('langRegistrationConfirmPassword');
    }
});

Template.registerTemplate.events({
    "click #btn_register": function (e) {
        var newUser = {};
        newUser.inviteCode = $("#input_invite_code").val();
        if(newUser.inviteCode===''){
            Session.set('verifyInviteError', Session.get("langErrorCannotEmpty"));
            return;
        }
        newUser.userName = $("#input_register_user_name").val();
        newUser.groupName = $("#input_register_group_name").val();
        newUser.password = $("#input_register_password").val();
        var rp = $("#input_register_password_repeat").val();

    }
});

Template.registerTemplate.rendered = function(){
    $('.form-horizontal').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            input_invite_code: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_registration_user_name: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_registration_group_name: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_registration_password: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_registration_confirm_password: {
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
        user.inviteCode=$("#input_invite_code").val();
        user.userName=$("#input_registration_user_name").val();
        user.groupName=$("#input_registration_group_name").val();
        user.password=$("#input_registration_password").val();
        user.confirmPassword=$("#input_registration_confirm_password").val();
        console.log(user);
    });
};