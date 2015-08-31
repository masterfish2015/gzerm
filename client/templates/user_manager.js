Template.userManagerTemplate.helpers({
    isShowAddUserPanel: function () {
        return Session.get('isShowAddUserPanel');
    },
    isPermitedToshowUsers: function () {
        return true;
    },
    selected: function (v1, v2) {
        return (v1 === v2) ? '' : 'true';
    },
    companies: function () {
        return gCompanies.find();
    },
    companyTitle:function(companyCode){
        return gCompanies.findOne({code:companyCode}).title;
    },
    users: function () {
        var users = [
            {
                code: "10001",
                name: "jack",
                realname: "Jack Smith",
                companyCode: "1",
                gender: "男",
                departmentCode:""
            },
            {
                code: "10002",
                name: "tom",
                realname: "Tom Lee",
                companyCode: "101",
                gender: "男",
                departmentCode:""
            }
        ];
        return users;
    },
    //下面是关于界面上的语言的帮助函数
    langUserManagement:function(){return Session.get("langUserManagement");},
    langAddUser:function(){return Session.get("langAddUser");},
    langUserCode:function(){return Session.get("langUserCode");},
    langUserName:function(){return Session.get("langUserName");},
    langUserRealName:function(){return Session.get("langUserRealName");},
    langUserGender:function(){return Session.get("langUserGender");},
    langUserCompany:function(){return Session.get("langUserCompany");},
    langUserDepartment:function(){return Session.get("langUserDepartment");},

});

Template.userManagerTemplate.events({
    'click #btn_add_user': function () {
        //Session.set('isShowAddUserPanel',true);
        $('#addUserModal').modal('show');
        //alert('hi');
    }
});

Template.userAddTemplate.events({
    'click #btn_save': function (e) {
        //Session.set('isShowAddUserPanel',false);
        e.preventDefault();
        $('#addUserModal').modal('hide');
    }
});