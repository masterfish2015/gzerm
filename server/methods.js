Meteor.methods({
    'addNewUser': function (username) {

    },
    'getLastUserCoder': function (departmentID) {

    },
    'addNewCompanyType':function(companyType){
        var ob = gCompanyType.findOne({title:companyType.title});
        if(ob){
            console.log("增加公司类型错误，公司名称不能重复:"+companyType.title);
            return {error:"langErrorAlreadyExist"};
        }else{
            ob = gCompanyType.insert(companyType);
            if(!ob){
                console.log("增加公司类型错误，无法创建新的数据库项目:"+companyType);
                return {error:"langErrorCannotCreate"};
            }else{
                console.log("增加公司类型:"+companyType);
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

    'updateCompanyType':function(id, newCompanyType){
        var ob = gCompanyType.findOne({_id:id});
        if(!ob){
            console.log("更新公司类型错误:"+newCompanyType);
            return {error:"langErrorNotExist"};
        }else{
            console.log("更新公司类型:"+ob.title);
            gCompanyType.update(id, {$set:newCompanyType});
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
    },

    'updateCompany':function(id, newCompany){
        var ob = gCompanies.findOne({_id:id});
        if(!ob){
            console.log("更新公司错误:"+newCompany.title);
            return {error:"langErrorNotExist"};
        }else{

            console.log("更新公司类型:"+ob.title);
            gCompanies.update(id, {$set:newCompany});
            return {error:"OK"};
        }
    },

    'addNewRegion':function(region){
        //添加区域，注意几点：区域名称、编码 不能重复
        if(gRegions.find({code:region.code}).count()>0 || gRegions.find({title:region.title})>0){
            console.log("增加区域错误，名称、编码 不能重复:"+region.title+":"+region.code);
            return {error:"langErrorAlreadyExist"};
        }
        //
        var ob = gRegions.insert(region);
        if(!ob){
            console.log("增加区域错误，无法创建新的数据库项目:"+region.title);
            return {error:"langErrorCannotCreate"};
        }else{
            console.log("增加区域:"+region.title);
            return {error:"OK"};
        }
    },
    'removeRegion':function(id){
        var ob = gRegions.findOne({_id:id});
        if(!ob){
            console.log("删除区域错误，不存在");
            return {error:"langErrorNotExist"};
        }else{
            var count = gCompanies.find({region:id}).count();
            if(count>0){
                console.log("无法删除，因为在companies数据库中用到这个区域");
                return {error:"langErrorUsedInOtherCollection"};
            }
            console.log("删除区域："+ob.title);
            gRegions.remove({_id:id});
            return {error:"OK"};
        }
    },
    'updateRegion':function(id, newRegion){
        var ob = gRegions.findOne({_id:id});
        if(!ob){
            console.log("更新区域错误:"+newRegion.title);
            return {error:"langErrorNotExist"};
        }else{

            console.log("更新区域类型:"+ob.title);
            gRegions.update(id, {$set:newRegion});
            return {error:"OK"};
        }
    },
});