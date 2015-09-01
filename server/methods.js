Meteor.methods({
    'addNewUser': function (username) {

    },
    'getLastUserCoder': function (departmentID) {

    },
    'addNewCompanyType':function(companyTypeTitle){
        var ob = gCompanyType.findOne({title:companyTypeTitle});
        if(ob){
            console.log("增加公司类型错误，公司名称不能重复:"+companyTypeTitle);
            return {error:"langErrorAlreadyExist"};
        }else{
            ob = gCompanyType.insert({title:companyTypeTitle});
            if(!ob){
                console.log("增加公司类型错误，无法创建新的数据库项目:"+companyTypeTitle);
                return {error:"langErrorCannotCreate"};
            }else{
                console.log("增加公司类型:"+companyTypeTitle);
                return {error:"OK"};
            }
        }
    },

    'removeCompanyType':function(id){
        var ob = gCompanyType.findOne({_id:id});
        if(!ob){
            console.log("删除公司类型错误，不存在");
            return {error:"langErrorNotExist"};
        }else{
            ob = gCompanies.find({companyType:id}).count();
            if(ob>0){
                console.log("无法删除，因为在companies数据库中用到这个类型");
                return {error:"langErrorUsedInOtherCollection"};
            }
            console.log("删除公司类型："+ob.title);
            gCompanyType.remove({_id:id});
            return {error:"OK"};
        }
    },

    'updateCompanyType':function(id, newCompanyTypeTitle){
        var ob = gCompanyType.findOne({_id:id});
        if(!ob){
            console.log("更新公司类型错误:"+ob.title);
            return {error:"langErrorNotExist"};
        }else{
            console.log("更新公司类型:"+ob.title);
            gCompanyType.update(id, {$set:{title:newCompanyTypeTitle}});
            return {error:"OK"};
        }
    },

    'addNewCompany':function(company){
        //添加公司，注意几点：公司名称、编码 不能重复
        if(gCompanies.find({code:company.code}).count()>0 || gCompanies.find({title:company.title})>0){
            console.log("增加公司错误，公司名称、编码 不能重复:"+company.title+":"+company.code);
            return {error:"langErrorAlreadyExist"};
        }
        //
        var ob = gCompanies.insert(company);
        if(!ob){
            console.log("增加公司错误，无法创建新的数据库项目:"+company.title);
            return {error:"langErrorCannotCreate"};
        }else{
            console.log("增加公司:"+company.title);
            return {error:"OK"};
        }
    },

    'removeCompany':function(id){
        var ob = gCompanies.findOne({_id:id});
        if(!ob){
            console.log("删除公司错误，不存在");
            return {error:"langErrorNotExist"};
        }else{
            console.log("删除公司："+ob.title);
            gCompanies.remove({_id:id});
            return {error:"OK"};
        }
    }
});