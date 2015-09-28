Meteor.methods({
    'registGroupUser':function(reg){
        var id,gid;
        if(reg.inviteCode && reg.inviteCode==="xdfsfasv"){
            //第一个
            //查找用户列表中是否有相同的
            if(Meteor.users.find({username:reg.userName}).count()>0){
                //已有用户，返回
                return {error:"langErrorAlreadyExist"};
            }
            var profile={group:gGroups.findOne({title:'中国天御集团公司'})._id};
            if(reg.userName==="ldc")
                profile.grade = 0;
            else
                profile.grade = 1;

            id = Accounts.createUser(
                {username: reg.userName,
                 password: reg.password,
                 profile: profile
                });
            if(!id){
                return {error:"langErrorCannotCreate"};
            }else{
                return {error:"OK", id:id};
            }
        }
        //查找邀请码是否正确并检查是否已经被用过
        else{
            var o=gInviteCodes.findOne({title:reg.inviteCode});
            var o1=gInviteCodes.find().fetch();
            console.log(o1);
            if(!o){
                //不存在
                console.log('邀请码不存在');
                return {error:"langErrorNotExist"}; //这个邀请码不存在
            }else{
                if(o.used===true){
                    console.log('这个邀请码已经被用过了');
                    return {error:"langErrorAlreadyExist"}; //这个邀请码已经被用过了
                }else{
                    //没有人用过，则用这个邀请码创建一个新的集团
                    o.used = true;
                    gid = gGroups.insert({
                        inviteCode: o._id,
                        title:reg.group
                    });
                    if(!gid){
                        console.log('无法创建集团');
                        return {error:"langErrorCannotCreate"}; //无法创建集团
                    }
                    else{//如果创建集团成功
                        gInviteCodes.update({_id: o._id},{$set:{used:true}}); //设置这个邀请码已经被使用了
                        id = Accounts.createUser({ //创建一个用户，链接到这个集团上
                            username: reg.userName,
                            password: reg.password,
                            profile:{
                                group :gid,
                                grade :1
                            }
                        });
                        if(!id){//如果创建用户不成功
                            console.log('创建用户不成功');
                            return {error:"langErrorCannotCreate"};
                        }else{
                            console.log('创建用户成功');
                            return {error:"OK", id:id};
                        }
                    }
                }
            }
        }
    },
    'addNewUser': function (username) {

    },
    'getLastUserCoder': function (departmentID) {

    },
    'addNewCompanyType':function(companyType){
        ob = gCompanyType.findOne({groupID:companyType.groupID, title:companyType.title});
        if(ob){
            console.log("增加公司类型错误，公司名称不能重复:"+companyType.title);
            return {error:"langErrorAlreadyExist"};
        }else{
            ob = gCompanyType.insert(companyType);
            if(!ob){
                console.log("增加公司类型错误，无法创建新的数据库项目:"+companyType.title);
                return {error:"langErrorCannotCreate"};
            }else{
                console.log("增加公司类型:"+companyType.title);
                return {error:"OK"};
            }
        }
    },

    'removeCompanyType':function(id){
        var ob = gCompanyType.findOne({_id:id}),count;
        if(!ob){
            console.log("删除公司类型错误，不存在");
            return {error:"langErrorNotExist"};
        }else{
            count = gCompanies.find({groupID:ob.groupID, companyType:id}).count();
            if(count>0){
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
            console.log("不存在公司类型:"+newCompanyType.title);
            return {error:"langErrorNotExist"};
        }else{
            //如果新类型的名称和集团号和已有的一样，则不能更新
            var ob1 = gCompanyType.findOne({groupID:newCompanyType.groupID, title:newCompanyType.title});
            if(ob1){
                console.log('更新后的类型已经存在，不能更新：'+newCompanyType.title);
                return {error:"langErrorAlreadyExist"};
            }
            console.log("更新公司类型:"+ob.title+"=>"+newCompanyType.title);
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
        var ob, groupID;

        if(gRegions.find({groupID:region.groupID, code:region.code}).count()>0 ||
            gRegions.find({groupID:region.groupID, title:region.title}).count()>0){
            console.log("增加区域错误，名称、编码 不能重复:"+region.title+":"+region.code);
            return {error:"langErrorAlreadyExist"};
        }
        //
        ob = gRegions.insert(region);
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
            var count = gCompanies.find({groupID:ob.groupID, region:id}).count();
            if(count>0){
                console.log("无法删除，因为在companies数据库中用到这个区域"+ob.title);
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
            console.log("区域:"+newRegion.title+"不存在，无法更新.");
            return {error:"langErrorNotExist"};
        }else{
            //检查更新后是否和已有项重复
            var count = gRegions.find({groupID:ob.groupID, title:ob.title}).count();
            if(count>0){
                console.log("更新后和已有项重复,无法更新："+ob.title);
                return {error:"langErrorAlreadyExist"};
            }
            console.log("更新区域类型:"+ob.title);
            gRegions.update(id, {$set:newRegion});
            return {error:"OK"};
        }
    }
});