

Template.companyTypeMangagerTemplate.helpers({
    "langOrganizeTypeManagement": function () {
        return Session.get("langOrganizeTypeManagement");
    },
    "langAddOrganizeType": function () {
        return Session.get("langAddOrganizeType");
    }
});

Template.companyTypeListTemplate.helpers({
    "companyTypes": function () {
        return gCompanyType.find();
    },
    "langCurrentOrganizeTypes": function () {
        return Session.get("langCurrentOrganizeTypes");
    }
});

Template.addCompanyTypeTemplate.helpers({
    "langAddOrganizeType": function () {
        return Session.get("langAddOrganizeType");
    },
    "langOrganizeType": function () {
        return Session.get("langOrganizeType");
    },
    "langAdd": function () {
        return Session.get("langAdd");
    },
    "langCancel": function () {
        return Session.get("langCancel");
    }
});


Template.companyTypeMangagerTemplate.events({
    "click #btn_add_companyType": function (e, v) {
        $('#addCompanyTypeModal').modal('show');
    }
});