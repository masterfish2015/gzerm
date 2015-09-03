Session.setDefault("showAddCompanyTypePanel",false);
Session.setDefault("isModifyCompanyType",false);
Session.setDefault("modifyCompanyTypeTitle","");
Session.setDefault("modifyCompanyTypeGrade","");
Session.setDefault("oldCompanyTypeID","");

Template.companyTypeMangagerTemplate.helpers({
    "showAddCompanyTypePanel": function () {
        var ob = Session.get("showAddCompanyTypePanel");
        return ob;
    },
    //下面的辅助函数是为了界面多语言
    "langOrganizeTypeManagement": function () {
        return Session.get("langOrganizeTypeManagement");
    },
    "langAddOrganizeType": function () {
        return Session.get("langAddOrganizeType");
    },
    "langAdd": function () {
        return Session.get("langAdd");
    }
});

Template.companyTypeListTemplate.helpers({
    "companyTypes": function () {
        return gCompanyType.find();
    },
    //下面的辅助函数是为了界面多语言
    "langCurrentOrganizeTypes": function () {
        return Session.get("langCurrentOrganizeTypes");
    },
    "langOganizeGrade": function () {
        return Session.get("langOganizeGrade");
    }
});

Template.addCompanyTypeTemplate.helpers({
    //下面的辅助函数是为了输入验证
    "verifyCompanyTypeTitleError": function () {
        return Session.get("verifyCompanyTypeTitleError");
    },
    "verifyCompanyTypeGradeError": function () {
        return Session.get("verifyCompanyTypeGradeError");
    },
    "isModifyCompanyType": function () {
        return Session.get("isModifyCompanyType");
    },
    "modifyCompanyTypeTitle": function () {
        return Session.get("modifyCompanyTypeTitle");
    },
    "modifyCompanyTypeGrade": function () {
        return Session.get("modifyCompanyTypeGrade");
    },
    //下面的辅助函数是为了界面多语言
    "langAddOrganizeType": function () {
        return Session.get("langAddOrganizeType");
    },
    "langOrganizeType": function () {
        return Session.get("langOrganizeType");
    },
    "langOganizeGrade": function () {
        return Session.get("langOganizeGrade");
    },
    "langAdd": function () {
        return Session.get("langAdd");
    },
    "langCancel": function () {
        return Session.get("langCancel");
    },
    "langModify": function () {
        return Session.get("langModify");
    },
    "langModifyCompanyType": function () {
        return Session.get("langModifyCompanyType");
    }
});


Template.companyTypeMangagerTemplate.events({
    "click #btn_show_or_hide_addCompanyType_panel": function (e, v) {
        var v1 = Session.get("showAddCompanyTypePanel");
        var v2 = Session.get("isModifyCompanyType");
        if (v1 === true && v2 === true) {
            //情况1：v1=true表示面板已经打开，v2=true表示现在是修改状态，所以这时候按这个按钮，应该切换为添加状态，保持面板打开
            Session.set("isModifyCompanyType", false);
            Session.set("modifyCompanyTypeTitle", "");
            Session.set("modifyCompanyTypeGrade", "");
        }
        if (v1 === true && v2 === false) {
            //情况2： v1=true表示面板已经打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该把面板收起来
            Session.set("showAddCompanyTypePanel", false);
        }
        if (v1 === false && v2 === true) {
            //情况3： v1=false表示面板未打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该切换为添加状态，且把面板打开
            Session.set("showAddCompanyTypePanel", true);
            Session.set("isModifyCompanyType", false);
            Session.set("modifyCompanyTypeTitle", "");
            Session.set("modifyCompanyTypeGrade", "");
        }
        if (v1 === false && v2 === false) {
            //情况4： v1=false表示面板未打开，v2=false表示现在是新建状态，所以这时候按这个按钮，就应该把面板打开
            Session.set("showAddCompanyTypePanel", true);
            Session.set("modifyCompanyTypeTitle", "");
            Session.set("modifyCompanyTypeGrade", "");
        }
    }
});

Template.addCompanyTypeTemplate.events({
    "click #btn_add_company_type": function (e, v) {
        var ct={};
        ct.title = $('#text_add_organize_type_title').val();
        if (ct.title === "") {
            Session.set("verifyCompanyTypeTitleError", Session.get("langErrorCannotEmpty"));
            return;
        } else {
            Session.set("verifyCompanyTypeTitleError", "");
        }
        ct.grade = $('#text_add_organize_type_grade').val();
        if (ct.grade === "") {
            Session.set("verifyCompanyTypeGradeError", Session.get("langErrorCannotEmpty"));
            return;
        } else {
            Session.set("verifyCompanyTypeGradeError", "");
        }
        //检查是创建新的还是修改旧的
        if (Session.get("isModifyCompanyType") === true) {
            //修改
            var id = Session.get("oldCompanyTypeID");
            Meteor.call("updateCompanyType", id, ct, function (e, r) {
                if (r.error !== "OK") {
                    //Session.set("verifyCompanyTypeError", result.error);
                    alert(Session.get(result.error));
                }
            });
            return;
        } else {
            //创建
            Meteor.call("addNewCompanyType", ct, function (error, result) {
                if (result.error !== "OK") {
                    //Session.set("verifyCompanyTypeError", result.error);
                    //Session.set("errorMessage",Session.get(result.error));
                    alert(Session.get(result.error));
                } else {
                    // Session.set("errorMessage","");
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
                    //Session.set("errorMessage", Session.get(r.error));
                    alert(Session.get(r.error));
                } else {
                    //Session.set("errorMessage", "");
                }
            });
        }
    },
    "click .companyTypeEdit": function (e) {
        Session.set("showAddCompanyTypePanel", true);
        Session.set("isModifyCompanyType", true);
        var id = e.currentTarget.value;
        Session.set("oldCompanyTypeID", id);
        var o = gCompanyType.findOne({_id: id});
        Session.set("modifyCompanyTypeTitle",o.title);
        Session.set("modifyCompanyTypeGrade", o.grade);
    }
});