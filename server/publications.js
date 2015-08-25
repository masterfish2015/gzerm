Meteor.publish("companyType",function(){
    return gCompanyType.find();
});

Meteor.publish("permissions", function(){
    return gPermissions.find();
});

Meteor.publish("companies",function(){
    return gCompanies.find();
});

Meteor.publish("departments",function(){
    return gDepartments.find();
});

Meteor.publish("jobs",function(){
    return gJobs.find();
});

Meteor.publish("regions",function(){
    return gRegions.find();
});