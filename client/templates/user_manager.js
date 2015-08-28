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
    }
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