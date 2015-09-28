Session.setDefault("showAddCompanyTypePanel", false);
Session.setDefault("isModifyCompanyType", false);
Session.setDefault("modifyCompanyTypeTitle", "");
Session.setDefault("modifyCompanyTypeGrade", "");
Session.setDefault("modifyCompanyTypeGroup", "");
Session.setDefault("oldCompanyTypeID", "");
Session.setDefault("validateCompanyTypeGroup", "");
Session.setDefault("verifyCompanyTypeTitleError", "");
Session.setDefault("verifyCompanyTypeGradeError", "");
Session.setDefault("validateCompanyTypeError", "");

Template.companyTypeMangagerTemplate.helpers({
    showAddCompanyTypePanel: function () {
        var ob = Session.get("showAddCompanyTypePanel");
        return ob;
    }
});

Template.companyTypeListTemplate.helpers({
    companyTypes: function () {
        return gCompanyType.find();
    },
    getGroupName: function (groupID) {
        return gGroups.findOne({_id: groupID}).title;
    }
});

Template.addCompanyTypeTemplate.helpers({

    groups: function () {
        return gGroups.find();
    },
    //下面的辅助函数是为了输入验证

    validateCompanyTypeGroup: function () {
        return Session.get("validateCompanyTypeGroup");
    },
    verifyCompanyTypeTitleError: function () {
        return Session.get("verifyCompanyTypeTitleError");
    },
    verifyCompanyTypeGradeError: function () {
        return Session.get("verifyCompanyTypeGradeError");
    },
    validateCompanyTypeError:function(){
        return Session.get('validateCompanyTypeError')  ;
    },
    isModifyCompanyType: function () {
        return Session.get("isModifyCompanyType");
    },
    modifyCompanyTypeTitle: function () {
        return Session.get("modifyCompanyTypeTitle");
    },
    modifyCompanyTypeGrade: function () {
        return Session.get("modifyCompanyTypeGrade");
    },
    modifyCompanyTypeGroup: function () {
        return Session.get("modifyCompanyTypeGroup");
    }
});


function initInputField(){
    Session.set("modifyCompanyTypeTitle", "");
    Session.set("modifyCompanyTypeGrade", "");
    Session.set("modifyCompanyTypeGroup", "");
    Session.set("verifyCompanyTypeTitleError", "");
    Session.set("verifyCompanyTypeGradeError", "");
    Session.set("validateCompanyTypeGroup", "");
}

function setInputField(companyType){
    Session.set("modifyCompanyTypeTitle", companyType.title);
    Session.set("modifyCompanyTypeGrade", companyType.grade);
    Session.set("modifyCompanyTypeGroup", companyType.groupID);
}

Template.companyTypeMangagerTemplate.events({
    "click #btn_show_or_hide_addCompanyType_panel": function (e, v) {
        var v1 = Session.get("showAddCompanyTypePanel");
        var v2 = Session.get("isModifyCompanyType");
        if (v1 === true && v2 === true) {
            //情况1：v1=true表示面板已经打开，v2=true表示现在是修改状态，所以这时候按这个按钮，应该切换为添加状态，保持面板打开
            Session.set("isModifyCompanyType", false);
            initInputField();
        }
        if (v1 === true && v2 === false) {
            //情况2： v1=true表示面板已经打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该把面板收起来
            Session.set("showAddCompanyTypePanel", false);
        }
        if (v1 === false && v2 === true) {
            //情况3： v1=false表示面板未打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该切换为添加状态，且把面板打开
            Session.set("showAddCompanyTypePanel", true);
            Session.set("isModifyCompanyType", false);
            initInputField();
        }
        if (v1 === false && v2 === false) {
            //情况4： v1=false表示面板未打开，v2=false表示现在是新建状态，所以这时候按这个按钮，就应该把面板打开
            Session.set("showAddCompanyTypePanel", true);
            initInputField();
        }
    }
});

Template.addCompanyTypeTemplate.events({
    "click #btn_add_company_type": function (e, v) {
        var ct = {};
        var is_ok=true;

        if(Meteor.get_user_grade()===0){
            is_ok = Meteor.validate_no_empty("input_company_type_group", "validateCompanyTypeGroup");
        }

        is_ok = Meteor.validate_no_empty("input_company_type_title", "verifyCompanyTypeTitleError");
        is_ok = Meteor.validate_no_empty("input_company_type_grade", "verifyCompanyTypeGradeError");

        if(is_ok===false)return;

        if(Meteor.get_user_grade()===0){
            ct.groupID = $('#input_company_type_group').val();
        }else{
            ct.groupID = Meteor.get_group_id();
        }
        ct.title = $('#input_company_type_title').val();
        ct.grade = $('#input_company_type_grade').val();

        //console.log(ct);
        //return;

        //检查是创建新的还是修改旧的
        if (Session.get("isModifyCompanyType") === true) {
            //修改
            var id = Session.get("oldCompanyTypeID");
            Meteor.call("updateCompanyType", id, ct, function (e, r) {
                if (r.error !== "OK") {
                    Session.set("validateCompanyTypeError", Session.get(r.error));
                    //alert(Session.get(result.error));
                }else{
                    Session.set("validateCompanyTypeError","");
                }
            });
        } else {
            //创建
            Meteor.call("addNewCompanyType", ct, function (e, r) {
                if (r.error !== "OK") {
                    Session.set("validateCompanyTypeError", Session.get(r.error));
                    //alert(Session.get(result.error));
                } else {
                    Session.set("validateCompanyTypeError","");
                }
            });
        }
    }
});

Template.companyTypeListTemplate.events({
    "click .companyTypeRemove": function (e) {
        var companyTypeID = e.currentTarget.value;
        var rt = confirm(Session.get("langAreYouSure"));//询问是否确认删除
        if (rt === true) {
            //console.log(p);
            Meteor.call("removeCompanyType", companyTypeID, function (e, r) {
                if (r.error !== "OK") {
                    console.log("无法删除，因为在companies数据库中用到这个类型");
                    Session.set("validateCompanyTypeError",Session.get(r.error));
                } else {
                    Session.set("validateCompanyTypeError","");
                }
            });
        }
    },
    "click .companyTypeEdit": function (e) {
        Session.set("showAddCompanyTypePanel", true);
        Session.set("isModifyCompanyType", true);
        var id = e.currentTarget.value;
        //console.log(id);
        Session.set("oldCompanyTypeID", id);
        var o = gCompanyType.findOne({_id: id});
        //console.log(o);
        setInputField(o);

        Session.set("verifyCompanyTypeTitleError", "");
        Session.set("verifyCompanyTypeGradeError", "");
        Session.set("validateCompanyTypeGroup", "");
    }
});