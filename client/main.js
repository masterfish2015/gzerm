//设置缺省的显示参数，这些都是各个页面的缺省添加窗口，缺省下不显示
Session.setDefault("errorMessage", "");
Session.setDefault('isShowAddUserPanel', false);


//设置界面的缺省语言是中文简体
for (var k in SimpleChineseItem) {
    Session.setDefault(k, SimpleChineseItem[k]);
}

//设置动态显示时钟
Meteor.setInterval(function () {
    var d = new Date();
    Session.set("currentTime", d.toLocaleDateString() + d.toLocaleTimeString());
}, 1000);

//修改界面语言的缺省函数，参数lang目前有“EnglishItem,SimpleChineseItem,TraditionChineseItem"
Meteor.setDefaultLanguage = function (lang) {
    //Session.set("langWebTitle", lang.langWebTitle);
    for (var k in lang) {
        Session.set(k, lang[k]);
    }
};

Meteor.get_group_id = function () {
    var user = Meteor.user();
    if (user && user.profile && user.profile.group) {
        return user.profile.group;
    }
    return null;
};


Meteor.get_user_grade = function () {
    var user = Meteor.user();
    if (user && user.profile && user.profile.grade !== null) {
        return user.profile.grade;
    }
    return -1;
};

Meteor.validate_no_empty = function (id, validkey) {
    var node = $("#" + id);
    if (node.val() === "") {
        node.parent().addClass("has-error");
        Session.set(validkey, Session.get("langErrorCannotEmpty"));
        return false;
    } else {
        node.parent().removeClass("has-error");
        Session.set(validkey, "");
        return null
    }
};

Meteor.validate_must_same = function (id1, id2, validkey) {
    var node1 = $("#" + id1),
        node2 = $("#" + id2);
    if (node1.val() === "" || node2.val() === "" || node1.val() !== node2.val()) {
        node1.parent().addClass("has-error");
        Session.set(validkey, Session.get("langErrorMustBeSame"));
        return false;
    } else {
        node1.parent().removeClass("has-error");
        Session.set(validkey, "");
        return true;
    }
};

//template 辅助函数
Template.registerHelper('is_same', function(v1, v2) {
    if(v1===v2)return true; else return false;
});

Template.registerHelper('is_super_admin', function() {
    var grade = Meteor.get_user_grade();
    if (grade!==-1 && grade === 0) {
        return true;
    } else {
        return false;
    }
});

Template.registerHelper('is_error', function(err) {
    if (err === "")
        return false;
    else
        return true;
});

Template.registerHelper('is_same', function(v1, v2) {
    if(v1===v2)return true; else return false;
});

//多语言支持
{
    Template.registerHelper("langSuperAdmin", function() {
        return Session.get("langSuperAdmin");
    });
    Template.registerHelper("langAdd", function() {
        return Session.get("langAdd");
    });
    Template.registerHelper("langCancel", function() {
        return Session.get("langCancel");
    });
    Template.registerHelper("langOK", function() {
        return Session.get("langOK");
    });
    Template.registerHelper("langModify", function() {
        return Session.get("langModify");
    });
    Template.registerHelper("langSelect", function() {
        return Session.get("langSelect");
    });
    Template.registerHelper("langWebTitle", function() {
        return Session.get("langWebTitle");
    });
    Template.registerHelper("langLogin", function() {
        return Session.get("langLogin");
    });
    Template.registerHelper("langLoginName", function() {
        return Session.get("langLoginName");
    });
    Template.registerHelper("langLoginPassword", function() {
        return Session.get("langLoginPassword");
    });
    Template.registerHelper("langRegistration", function() {
        return Session.get("langRegistration");
    });
    Template.registerHelper("langRegistrationUserName", function() {
        return Session.get("langRegistrationUserName");
    });
    Template.registerHelper("langRegistrationGroupName", function() {
        return Session.get("langRegistrationGroupName");
    });
    Template.registerHelper("langInviteCode", function() {
        return Session.get("langInviteCode");
    });
    Template.registerHelper("langRegistrationPassword", function() {
        return Session.get("langRegistrationPassword");
    });
    Template.registerHelper("langRegistrationConfirmPassword", function() {
        return Session.get("langRegistrationConfirmPassword");
    });
    Template.registerHelper("langLogout", function() {
        return Session.get("langLogout");
    });
    Template.registerHelper("langChangeLanguage", function() {
        return Session.get("langChangeLanguage");
    });
    Template.registerHelper("langSystemManagement", function() {
        return Session.get("langSystemManagement");
    });
    Template.registerHelper("langUserManagement", function() {
        return Session.get("langUserManagement");
    });
    Template.registerHelper("langBaseDataManagement", function() {
        return Session.get("langBaseDataManagement");
    });
    Template.registerHelper("langCompanyTypeManagement", function() {
        return Session.get("langCompanyTypeManagement");
    });
    Template.registerHelper("langOrganizeManagement", function() {
        return Session.get("langOrganizeManagement");
    });
    Template.registerHelper("langCompanyManagement", function() {
        return Session.get("langCompanyManagement");
    });
    Template.registerHelper("langBusinessProcessManagement", function() {
        return Session.get("langBusinessProcessManagement");
    });
    Template.registerHelper("langBusinessReportManagement", function() {
        return Session.get("langBusinessReportManagement");
    });
    Template.registerHelper("langCurrentCompanyTypes", function() {
        return Session.get("langCurrentCompanyTypes");
    });
    Template.registerHelper("langAddCompanyType", function() {
        return Session.get("langAddCompanyType");
    });
    Template.registerHelper("langOrganizeType", function() {
        return Session.get("langOrganizeType");
    });
    Template.registerHelper("langAddCompany", function() {
        return Session.get("langAddCompany");
    });
    Template.registerHelper("langCompanyCode", function() {
        return Session.get("langCompanyCode");
    });
    Template.registerHelper("langCompanyTitle", function() {
        return Session.get("langCompanyTitle");
    });
    Template.registerHelper("langCompanyType", function() {
        return Session.get("langCompanyType");
    });
    Template.registerHelper("langCompanyCharger", function() {
        return Session.get("langCompanyCharger");
    });
    Template.registerHelper("langCompanySupervisor", function() {
        return Session.get("langCompanySupervisor");
    });
    Template.registerHelper("langCompanyRegion", function() {
        return Session.get("langCompanyRegion");
    });
    Template.registerHelper("langCompanyComment", function() {
        return Session.get("langCompanyComment");
    });
    Template.registerHelper("langAddUser", function() {
        return Session.get("langAddUser");
    });
    Template.registerHelper("langUserCode", function() {
        return Session.get("langUserCode");
    });
    Template.registerHelper("langUserName", function() {
        return Session.get("langUserName");
    });
    Template.registerHelper("langUserPassword", function() {
        return Session.get("langUserPassword");
    });
     Template.registerHelper("langUserConfirmPassword", function() {
        return Session.get("langUserConfirmPassword");
    });
    Template.registerHelper("langUserRealName", function() {
        return Session.get("langUserRealName");
    });
    Template.registerHelper("langUserGender", function() {
        return Session.get("langUserGender");
    });
    Template.registerHelper("langMan", function() {
        return Session.get("langMan");
    });
    Template.registerHelper("langWomen", function() {
        return Session.get("langWomen");
    });
    Template.registerHelper("langUserCompany", function() {
        return Session.get("langUserCompany");
    });
    Template.registerHelper("langUserDepartment", function() {
        return Session.get("langUserDepartment");
    });
    Template.registerHelper("langUserJob", function() {
        return Session.get("langUserJob");
    });
    Template.registerHelper("langUserPermission", function() {
        return Session.get("langUserPermission");
    });
    Template.registerHelper("langCompanyGrade", function() {
        return Session.get("langCompanyGrade");
    });
    Template.registerHelper("langRegionManagement", function() {
        return Session.get("langRegionManagement");
    });
    Template.registerHelper("langRegionCode", function() {
        return Session.get("langRegionCode");
    });
    Template.registerHelper("langRegionTitle", function() {
        return Session.get("langRegionTitle");
    });
    Template.registerHelper("langRegionParent", function() {
        return Session.get("langRegionParent");
    });
    Template.registerHelper("langDepartmentManagement", function() {
        return Session.get("langDepartmentManagement");
    });
    Template.registerHelper("langDepartmentCode", function() {
        return Session.get("langDepartmentCode");
    });
    Template.registerHelper("langDepartmentTitle", function() {
        return Session.get("langDepartmentTitle");
    });
    Template.registerHelper("langDepartmentType", function() {
        return Session.get("langDepartmentType");
    });
    Template.registerHelper("langDepartmentCompanyOwner", function() {
        return Session.get("langDepartmentCompanyOwner");
    });
    Template.registerHelper("langDepartmentCharger", function() {
        return Session.get("langDepartmentCharger");
    });
    Template.registerHelper("langDepartmentSupervisor", function() {
        return Session.get("langDepartmentSupervisor");
    });
    Template.registerHelper("langDepartmentRegion", function() {
        return Session.get("langDepartmentRegion");
    });
    Template.registerHelper("langDepartmentComment", function() {
        return Session.get("langDepartmentComment");
    });
    Template.registerHelper("langGroup", function() {
        return Session.get("langGroup");
    });
    Template.registerHelper("langAreYouSure", function() {
        return Session.get("langAreYouSure");
    });
    Template.registerHelper("langErrorCompanyTypeEmpty", function() {
        return Session.get("langErrorCompanyTypeEmpty");
    });
    Template.registerHelper("langErrorAlreadyExist", function() {
        return Session.get("langErrorAlreadyExist");
    });
    Template.registerHelper("langErrorCannotCreate", function() {
        return Session.get("langErrorCannotCreate");
    });
    Template.registerHelper("langErrorNotExist", function() {
        return Session.get("langErrorNotExist");
    });
    Template.registerHelper("langErrorUsedInOtherCollection", function() {
        return Session.get("langErrorUsedInOtherCollection");
    });
    Template.registerHelper("langErrorCannotEmpty", function() {
        return Session.get("langErrorCannotEmpty");
    });
    Template.registerHelper("langErrorMustBeSame", function() {
        return Session.get("langErrorMustBeSame");
    });
}
