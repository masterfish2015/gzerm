
//本文件主要是给数据库加入一些初始化数据
//邀请码
if(gInviteCodes.find().count()===0){
    gInviteCodes.insert({title:"xdfsfasv", used:false});
    gInviteCodes.insert({title:"fgndndgf", used:false});
    gInviteCodes.insert({title:"dfdfvdfb", used:false});
    gInviteCodes.insert({title:"aaacdvre", used:false});
    gInviteCodes.insert({title:"nghndere", used:false});
    gInviteCodes.insert({title:"vermjrfg", used:false});
    gInviteCodes.insert({title:"vdfbrtsh", used:false});
    gInviteCodes.insert({title:"bgbngdds", used:false});
    gInviteCodes.insert({title:"tyjyukfc", used:false});
    gInviteCodes.insert({title:"vcxdssgz", used:false});
}

if(gGroups.find().count()===0){
    gGroups.insert({
        inviteCode: gInviteCodes.findOne({title:"xdfsfasv"})._id,
        title:'中国天御集团公司'
    });
}

var group_ID = gGroups.findOne({title:'中国天御集团公司'})._id;

if (gCompanyType.find().count() === 0) {
    gCompanyType.insert({groupID:group_ID, title:"总公司", grade:0});
    gCompanyType.insert({groupID:group_ID, title:"区域分公司", grade:1});
    gCompanyType.insert({groupID:group_ID, title:"营销分部", grade:2});
    gCompanyType.insert({groupID:group_ID, title:"研发分部", grade:2});
}

if (gPermissions.find().count() === 0) {
    gPermissions.insert(
        {
            groupID:group_ID,
            title: "最高管理员",
            comments: "最高权限,可以做所有事"
        });
    gPermissions.insert(
        {
            groupID:group_ID,
            title: "管理员",
            comments: "可以有对其属下人员机构和任务进行管理的功能"
        });
    gPermissions.insert(
        {
            groupID:group_ID,
            title: "普通用户",
            comments: "无法对人员机构进行修改，只能对自己的任务、客户、日志等进行操作"
        });
}

if (gRegions.find().count() === 0) {
    gRegions.insert({groupID:group_ID,code: "1", title: "亚洲区"});
    gRegions.insert({groupID:group_ID,code: "2", title: "欧洲区"});
    gRegions.insert({groupID:group_ID,code: "101", title: "中国区", parentCode: "1"});
    gRegions.insert({groupID:group_ID,code: "10101", title: "华南大区", parentCode: "101"});
    gRegions.insert({groupID:group_ID,code: "1010101", title: "广东", parentCode: "10101"});
    gRegions.insert({groupID:group_ID,code: "101010101", title: "广州", parentCode: "1010101"});
    gRegions.insert({groupID:group_ID,code: "10101010101", title: "天河", parentCode: "101010101"});
    gRegions.insert({groupID:group_ID,code: "10102", title: "华东大区", parentCode: "101"});
    gRegions.insert({groupID:group_ID,code: "1010201", title: "江苏", parentCode: "10102"});
    gRegions.insert({groupID:group_ID,code: "101020101", title: "苏州", parentCode: "1010201"});
}



if (gCompanies.find().count() === 0) {
    gCompanies.insert(
        {
            groupID:group_ID,
            code: "1",
            title: "中国天御集团公司",
            companyType: gCompanyType.findOne({title: "总公司"})._id,
            supervisor: "",
            region: gRegions.findOne({title: "中国区"})._id,
            comments: "abc"
        }
    );
    gCompanies.insert(
        {
            groupID:group_ID,
            code: "101",
            title: "天御上海分公司",
            companyType: gCompanyType.findOne({title: "区域分公司"})._id,
            supervisor: gCompanies.findOne({title: "中国天御集团公司"})._id,
            region: gRegions.findOne({title: "华东大区"})._id,
            comments: "efg"
        }
    );
}

if (gDepartments.find().count() === 0) {
    gDepartments.insert(
        {
            groupID:group_ID,
            code: "10001",
            companyID: gCompanies.findOne({title: "中国天御集团公司"})._id,
            title: "董事长办公室",
            region: gRegions.findOne({title: "中国区"})._id,
            supervisior: null //行政上级部门
        }
    );
    gDepartments.insert(
        {
            groupID:group_ID,
            code: "10002",
            companyID: gCompanies.findOne({title: "中国天御集团公司"})._id,
            title: "内贸部",
            region: gRegions.findOne({title: "中国区"})._id,
            supervisior: gDepartments.findOne({code: "10001"})._id
        }
    );
    gDepartments.insert(
        {
            groupID:group_ID,
            code: "10003",
            companyID: gCompanies.findOne({title: "中国天御集团公司"})._id,
            title: "外贸部",
            region: gRegions.findOne({title: "欧洲区"})._id,
            supervisior: gDepartments.findOne({code: "10001"})._id
        }
    );
    gDepartments.insert(
        {
            groupID:group_ID,
            code: "10101",
            companyID: gCompanies.findOne({title: "天御上海分公司"})._id,
            title: "总经理办公室",
            region: gRegions.findOne({title: "华东大区"})._id,
            supervisior: gDepartments.findOne({code: "10001"})._id
        }
    );
    gDepartments.insert(
        {
            groupID:group_ID,
            code: "10102",
            companyID: gCompanies.findOne({title: "天御上海分公司"})._id,
            title: "销售部",
            region: gRegions.findOne({title: "华东大区"})._id,
            supervisior: gDepartments.findOne({code: "10101"})._id
        }
    );
}

if (gJobs.find().count() === 0) {
    gJobs.insert(
        {
            groupID:group_ID,
            departmentID: gDepartments.findOne({code: "10001"})._id,
            code:"01",
            title: "董事长"
        }
    );
    gJobs.insert(
        {
            groupID:group_ID,
            departmentID: gDepartments.findOne({code: "10101"})._id,
            code:"02",
            title: "总经理"
        }
    );
    gJobs.insert(
        {
            groupID:group_ID,
            departmentID: gDepartments.findOne({code: "10101"})._id,
            code:"03",
            title: "销售总监"
        }
    );
    gJobs.insert(
        {
            groupID:group_ID,
            departmentID: gDepartments.findOne({code: "10102"})._id,
            code:"04",
            title: "部门经理"
        }
    );
}

if(gEmployees.find().count()===0){
    gEmployees.insert({
        groupID:group_ID,
        code:"1000000001",
        name:"jack",
        realname:"戴建国",
        gender:"男"
    });
    gEmployees.insert({
        groupID:group_ID,
        code:"1010100001",
        name:"mary",
        realname:"张英",
        gender:"女"
    });
    gEmployees.insert({
        groupID:group_ID,
        code:"1001000002",
        name:"Tom",
        realname:"李四",
        gender:"男"
    });
    gEmployees.insert({
        groupID:group_ID,
        code:"1001000003",
        name:"mary",
        realname:"莫瑶",
        gender:"女"
    });
}

if(gPersonAppointments.find().count()===0){
    gPersonAppointments.insert({
        groupID:group_ID,
        companyID: gCompanies.findOne({title: "中国天御集团公司"})._id,
        departmentID: gDepartments.findOne({title: "董事长办公室"})._id,
        personID: gEmployees.findOne({realname:"戴建国"})._id,
        jobID: gJobs.findOne({code:'01'})._id,
        startTime: new Date(Date.parse("2015-5-6 10:32：10")),
        appointer:gEmployees.findOne({realname:"戴建国"})._id
    });
    gPersonAppointments.insert({
        groupID:group_ID,
        companyID: gCompanies.findOne({title: "中国天御集团公司"})._id,
        departmentID: gDepartments.findOne({title: "内贸部"})._id,
        personID: gEmployees.findOne({realname:"张英"})._id,
        jobID: gJobs.findOne({code:'02'})._id,
        startTime: new Date(Date.parse("2015-5-6 10:32：10")),
        appointer:gEmployees.findOne({realname:"戴建国"})._id
    });
}


