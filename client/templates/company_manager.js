Template.companyManagerTemplate.helpers({
    "langCompanyManagement": function () {
        return Session.get('langCompanyManagement')
    },
    "langAddCompany": function () {
        return Session.get('langAddCompany')
    },
    "showAddCompanyPanel": function () {
        return Session.get("showAddCompanyPanel");
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
    "langAddCompany": function () {
        return Session.get('langAddCompany');
    },
    "langAdd": function () {
        return Session.get('langAdd');
    },
    "langCancel": function () {
        return Session.get('langCancel');
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
    "getBoss": function (bossCode) {
        if (bossCode === "null") {
            return "";
        } else {
            return gEmployees.findOne({code: bossCode}).name;
        }
    },
    "getSupervisor": function (supervisorCode) {
        if (supervisorCode === "null") {
            return "";
        } else {
            return gCompanies.findOne({code: supervisorCode}).title;
        }
    },
    "getRegion": function (regionCode) {
        if (regionCode === "null") {
            return "";
        } else {
            return gRegions.findOne({code: regionCode}).title;
        }
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

Template.companyManagerTemplate.events({
    "click #btn_add_company": function (e, v) {
        var v = !Session.get("showAddCompanyPanel");
        Session.set("showAddCompanyPanel",v);
    }
});

Template.addCompanyTemplate.events({

});