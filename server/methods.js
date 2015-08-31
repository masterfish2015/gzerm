Meteor.methods({
    'addNewUser': function (username) {

    },
    'getLastUserCoder': function (departmentID) {

    },
    'addNewCompanyType':function(companyTypeTitle){
        var ob = gCompanyType.findOne({title:companyTypeTitle});
        if(ob){
            return {error:"langErrorAlreadyExist"};
        }else{
            ob = gCompanyType.insert({title:companyTypeTitle});
            if(!ob){
                return {error:"langErrorCannotCreate"};
            }else{
                return {error:"OK"};
            }
        }
    },

    'removeCompanyType':function(id){
        var ob = gCompanyType.findOne({_id:id});
        if(!ob){
            return {error:"langErrorNotExist"};
        }else{
            console.log("删除公司类型："+ob.title);
            gCompanyType.remove({_id:id});
            return {error:"OK"};
        }
    },

    'updateCompanyType':function(id, newCompanyTypeTitle){
        var ob = gCompanyType.findOne({_id:id});
        if(!ob){
            return {error:"langErrorNotExist"};
        }else{
            console.log("更新公司类型:"+ob.title);
            gCompanyType.update(id, {$set:{title:newCompanyTypeTitle}});
            return {error:"OK"};
        }
    }
});