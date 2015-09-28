//发布数据库
//有最高权限（0）的可以发布所有数据，1权限的只有本集团的数据
Meteor.publish("companyType",function(){
    var user=Meteor.users.findOne({_id:this.userId});
    if(user && user.profile && user.profile.grade === 0){
        return gCompanyType.find();
    }
    if(user && user.profile && user.profile.group){
        return gCompanyType.find({groupID:user.profile.group});
    }

    return [];
});

Meteor.publish("permissions", function(){
    var user=Meteor.users.findOne({_id:this.userId});
    if(user && user.profile && user.profile.grade === 0){
        return gPermissions.find();
    }
    if(user && user.profile && user.profile.group){
        return gPermissions.find({groupID:user.profile.group});
    }
    return [];
});

Meteor.publish("companies",function(){
    var user=Meteor.users.findOne({_id:this.userId});
    if(user && user.profile && user.profile.grade === 0){
        return gCompanies.find();
    }
    if(user && user.profile && user.profile.group){
        return gCompanies.find({groupID:user.profile.group});
    }
    return [];
});

Meteor.publish("departments",function(){
    var user=Meteor.users.findOne({_id:this.userId});
    if(user && user.profile && user.profile.grade === 0){
        return gDepartments.find();
    }
    if(user && user.profile && user.profile.group){
        return gDepartments.find({groupID:user.profile.group});
    }
    return [];
});

Meteor.publish("jobs",function(){
    var user=Meteor.users.findOne({_id:this.userId});
    if(user && user.profile && user.profile.grade === 0){
        return gJobs.find();
    }
    if(user && user.profile && user.profile.group){
        return gJobs.find({groupID:user.profile.group});
    }
    return [];
});

Meteor.publish("regions",function(){
    var user=Meteor.users.findOne({_id:this.userId});
    if(user && user.profile && user.profile.grade === 0){
        return gRegions.find();
    }
    if(user && user.profile && user.profile.group){
        return gRegions.find({groupID:user.profile.group});
    }
    return [];
});

Meteor.publish("employees",function(){
    var user=Meteor.users.findOne({_id:this.userId});
    if(user && user.profile && user.profile.grade === 0){
        return gEmployees.find();
    }
    if(user && user.profile && user.profile.group){
        return gEmployees.find({groupID:user.profile.group});
    }
    return [];
});

Meteor.publish("groups",function(){
    var user=Meteor.users.findOne({_id:this.userId});
    if(user && user.profile && user.profile.grade === 0){
        return gGroups.find();
    }
    if(user && user.profile && user.profile.group){
        return gGroups.find({_id:user.profile.group});
    }
    return [];
});