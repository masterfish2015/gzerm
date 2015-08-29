Template.companyTypeMangagerTemplate.events({
    "click #btn_add_companyType": function (e, v) {
        $('#addCompanyTypeModal').modal('show');
    }
});

Template.companyTypeListTemplate.helpers({
    "companyTypes": function () {
        return gCompanyType.find();
    }
});