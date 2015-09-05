Session.setDefault('isShowAddUserPanel',false);
Session.setDefault('isModifyUserPanel',false);
Session.setDefault('verifyInputNameError',"");
Session.setDefault('verifyInputPasswordError',"");
Session.setDefault('modifyUserCompany',"");
Session.setDefault('modifyUserDepartment',"");

Template.userManagerTemplate.helpers({
    isShowAddUserPanel: function () {
        return Session.get('isShowAddUserPanel');
    },
    isPermitedToshowUsers: function () {
        return true;
    },
    //下面是关于界面上的语言的帮助函数
    langUserManagement: function () {
        return Session.get("langUserManagement");
    },
    langAdd: function () {
        return Session.get("langAdd");
    }
});

Template.userAddTemplate.helpers({
    "verifyInputNameError":function(){return Session.get('verifyInputNameError');},
    "verifyInputPasswordError":function(){return Session.get('verifyInputPasswordError');},
    //数据库内容
    companies:function(){
        return gCompanies.find();
    },
    departments: function () {
        var companyID  = Session.get('modifyUserCompany');
        if(companyID===""){
            return [{_id:"",title:""}];
        }else{
            return gDepartments.find({companyID:companyID});
        }
    },
    jobs:function(){
        var departmentID  = Session.get('modifyUserDepartment');
        if(departmentID===""){
            return [{_id:"",title:""}];
        }else{
            return gJobs.find({departmentID:departmentID});
        }
    },
    permissions:function(){
        return gPermissions.find();
    },
    //下面是关于界面上的语言的帮助函数
    langSelect: function () {
        return Session.get("langSelect");
    },
    langUserName: function () {
        return Session.get("langUserName");
    },
    langUserPassword: function () {
        return Session.get("langUserPassword");
    },
    langUserRealName: function () {
        return Session.get("langUserRealName");
    },
    langUserGender: function () {
        return Session.get("langUserGender");
    },
    langMan: function () {
        return Session.get("langMan");
    },
    langWomen: function () {
        return Session.get("langWomen");
    },
    langUserCompany: function () {
        return Session.get("langUserCompany");
    },
    langUserDepartment: function () {
        return Session.get("langUserDepartment");
    },
    langUserJob: function () {
        return Session.get("langUserJob");
    },
    langUserPermission: function () {
        return Session.get("langUserPermission");
    }
});

Template.userListTemplate.helpers({
    selected: function (v1, v2) {
        return (v1 === v2) ? '' : 'true';
    },
    companies: function () {
        return gCompanies.find();
    },
    companyTitle: function (companyCode) {
        if(companyCode===""){
            return ""
        }else{
            var o = gCompanies.findOne({code: companyCode});
            if(o && o.title)
                return o.title;
            else
                return "";
        }

    },
    users: function () {

        return gEmployees.find();
    },

    //下面是关于界面上的语言的帮助函数
    langUserManagement: function () {
        return Session.get("langUserManagement");
    },
    langAddUser: function () {
        return Session.get("langAddUser");
    },
    langUserCode: function () {
        return Session.get("langUserCode");
    },
    langUserName: function () {
        return Session.get("langUserName");
    },
    langUserRealName: function () {
        return Session.get("langUserRealName");
    },
    langUserGender: function () {
        return Session.get("langUserGender");
    },
    langUserCompany: function () {
        return Session.get("langUserCompany");
    },
    langUserDepartment: function () {
        return Session.get("langUserDepartment");
    },
    langUserJob: function () {
        return Session.get("langUserJob");
    }
});

Template.userManagerTemplate.events({
    'click #btn_show_add_user_panel': function () {
        var v1 = Session.get('isShowAddUserPanel');
        if(v1 ===true){
            Session.set('isShowAddUserPanel',false);
        }else{
            Session.set('isShowAddUserPanel',true);
           initInputField();
        }
    }
});

function initInputField(){
    Session.set('verifyInputNameError','');
    Session.set('verifyInputPasswordError','');
    Session.set('modifyUserCompany','');
    Session.set('modifyUserDepartment',"");
}

Template.userAddTemplate.events({
    'click #btn_save': function (e) {
        //Session.set('isShowAddUserPanel',false);
        e.preventDefault();
        $('#addUserModal').modal('hide');
    },
    'change  #input_user_company':function(e){
        var companyID = e.currentTarget.value;
        //console.log(gCompanies.findOne({_id:companyID}));
        Session.set('modifyUserCompany',companyID);
    },
    'change  #input_user_department':function(e){
        var dptID = e.currentTarget.value;
       // console.log(gDepartments.findOne({_id:dptID}));
        Session.set('modifyUserDepartment',dptID);
    }
});

