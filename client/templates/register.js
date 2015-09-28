Session.setDefault('validateRegistrationInviteCode','');
Session.setDefault('validateRegistrationUserName','');
Session.setDefault('validateRegistrationGroupName','');
Session.setDefault('validateRegistrationPassword','');
Session.setDefault('validateRegistrationConfirmPassword','');

Session.setDefault('validateRegistrationError','');

Template.registerTemplate.helpers({
    //输入验证错误提示
    is_error:function(err){
        if(err==="")
            return false;
        else
            return true;
    },
    validateRegistrationInviteCode: function () {
        return Session.get('validateRegistrationInviteCode');
    },
    validateRegistrationGroupName: function () {
        return Session.get('validateRegistrationGroupName');
    },
    validateRegistrationUserName: function () {
        return Session.get('validateRegistrationUserName');
    },
    validateRegistrationPassword: function () {
        return Session.get('validateRegistrationPassword');
    },
    validateRegistrationConfirmPassword: function () {
        return Session.get('validateRegistrationConfirmPassword');
    },
    validateRegistrationError: function () {
        return Session.get('validateRegistrationError');
    }
});

Template.registerTemplate.events({
    "click #btn_register": function (e) {
        var is_ok=true;

        if(Meteor.validate_no_empty("input_invite_code", "validateRegistrationInviteCode")===false)is_ok=false;
        if(Meteor.validate_no_empty("input_registration_user_name", "validateRegistrationUserName")===false)is_ok=false;
        if(Meteor.validate_no_empty("input_registration_group_name", "validateRegistrationGroupName")===false)is_ok=false;
        if(Meteor.validate_no_empty("input_registration_password", "validateRegistrationPassword")===false)is_ok=false;
        if(Meteor.validate_no_empty("input_registration_confirm_password", "validateRegistrationConfirmPassword")===false)
            is_ok=false;
        if(Meteor.validate_must_same("input_registration_confirm_password", "input_registration_password", "validateRegistrationConfirmPassword")===false)is_ok=false;

        if(is_ok===false)return;

        var reg = {};
        reg.inviteCode = $('#input_invite_code').val();
        reg.userName = $('#input_registration_user_name').val();
        reg.group = $('#input_registration_group_name').val();
        reg.password = $('#input_registration_password').val();
        //console.log(reg);

        Meteor.call('registGroupUser', reg, function(e,r){
            if(r && r.error && r.error==='OK'){
                //注册成功
                //清除错误信息
                Session.set('validateRegistrationError',"");
                Meteor.loginWithPassword(reg.userName, reg.password, function(e){
                    if(!e){

                        Router.go('/');
                    }
                })
            }else if(r && r.error){
                //设置错误信息
                Session.set('validateRegistrationError',Session.get(r.error));
            }
        })

    }
});

Template.registerTemplate.rendered = function(){
};