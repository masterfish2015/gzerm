Session.setDefault("showAddCompanyPanel", false);
Session.setDefault("isModifyCompany", false);
Session.setDefault("verifyCompanyTypeError","");
Session.setDefault("verifyCompanyTitleError","");

Template.companyManagerTemplate.helpers({
    "showAddCompanyPanel": function () {
        return Session.get("showAddCompanyPanel");
    },
    "isModifyCompany": function () {
        return Session.get("isModifyCompany");
    },
    //下面的辅助函数是为了界面多语言
    "langCompanyManagement": function () {
        return Session.get('langCompanyManagement')
    },
    "langAddCompany": function () {
        return Session.get('langAddCompany')
    }
});

Template.addCompanyTemplate.helpers({
    "companyTypeOptions": function () {
        return gCompanyType.find();
    },
    "bossOptions": function () {
        return gEmployees.find();
    },
    "supervisorOptions": function () {
        return gCompanies.find();
    },
    "regionOptions": function () {
        return gRegions.find();
    },
    //错误处理
    "verifyCompanyCodeError":function(){
        return Session.get("verifyCompanyCodeError");
    },
    "verifyCompanyTitleError":function(){
        return Session.get("verifyCompanyTitleError");
    },
    //下面的辅助函数是为了界面多语言
    "langAddCompany": function () {
        return Session.get('langAddCompany');
    },
    "langAdd": function () {
        return Session.get('langAdd');
    },
    "langCancel": function () {
        return Session.get('langCancel');
    },
    "langModify": function () {
        return Session.get("langModify");
    },
    "langCompanyCode": function () {
        return Session.get('langCompanyCode')
    },
    "langCompanyTitle": function () {
        return Session.get('langCompanyTitle')
    },
    "langCompanyType": function () {
        return Session.get('langCompanyType')
    },
    "langCompanyCharger": function () {
        return Session.get('langCompanyCharger')
    },
    "langCompanySupervisor": function () {
        return Session.get('langCompanySupervisor')
    },
    "langCompanyRegion": function () {
        return Session.get('langCompanyRegion')
    },
    "langCompanyComment": function () {
        return Session.get('langCompanyComment')
    }

});

Template.companyListTemplate.helpers({
    "companies": function () {
        return gCompanies.find();
    },
    "getCompanyType": function (companyTypeID) {
        return gCompanyType.findOne({_id: companyTypeID}).title;
    },
    "getBoss": function (bossID) {
        if (bossID === "null") {
            return "";
        } else {
            return gEmployees.findOne({_id: bossID}).name;
        }
    },
    "getSupervisor": function (supervisorID) {
        if (supervisorID === "null") {
            return "";
        } else {
            return gCompanies.findOne({_id: supervisorID}).title;
        }
    },
    "getRegion": function (regionID) {
        if (regionID === "null") {
            return "";
        } else {
            return gRegions.findOne({_id: regionID}).title;
        }
    },
    //下面的辅助函数是为了界面多语言
    "langCompanyCode": function () {
        return Session.get('langCompanyCode');
    },
    "langCompanyTitle": function () {
        return Session.get('langCompanyTitle');
    },
    "langCompanyType": function () {
        return Session.get('langCompanyType');
    },
    "langCompanyCharger": function () {
        return Session.get('langCompanyCharger');
    },
    "langCompanySupervisor": function () {
        return Session.get('langCompanySupervisor');
    },
    "langCompanyRegion": function () {
        return Session.get('langCompanyRegion');
    },
    "langCompanyComent": function () {
        return Session.get('langCompanyComent');
    }

});

Template.companyManagerTemplate.events({
    "click #btn_show_add_company_panel": function (e, v) {
        var v = !Session.get("showAddCompanyPanel");
        Session.set("showAddCompanyPanel", v);
    }
});

Template.addCompanyTemplate.events({
    "click #btn_add_company":function(e){
        //获取相关数据
        var cp={};

        cp.code = $('#input_company_code').val();
        if(cp.code===""){
            Session.set("verifyCompanyCodeError",Session.get("langErrorCannotEmpty"));
        }else{
            Session.set("verifyCompanyCodeError","");
        }

        cp.title = $('#input_company_title').val();
        if(cp.title===""){
            Session.set("verifyCompanyTitleError",Session.get("langErrorCannotEmpty"));
        }else{
            Session.set("verifyCompanyTitleError","");
        }

        cp.companyType = $('#input_company_type').val();

        cp.region = $('#input_company_region').val();

        cp.boss = $('#input_company_charger').val();

        cp.supervisor = $('#input_company_supervisor').val();

        cp.comments = $('#input_company_comment').val();

        console.log(cp);
        Meteor.call("addNewCompany",cp,function(error, result){
            if(result.error!=="OK"){
                console.log("无法增加新的公司"+result.error);
                alert(Session.get(result.error));
            }
        });
    }
});