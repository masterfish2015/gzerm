//本文件主要是给数据库加入一些初始化数据
if (gCompanyType.find().count() === 0) {
    gCompanyType.insert({title: "集团"});
    gCompanyType.insert({title: "子公司"});
}

if (gPermissions.find().count() === 0) {
    gPermissions.insert(
        {
            title: "最高管理员",
            comments: "最高权限,可以做所有事"
        });
    gPermissions.insert(
        {
            title: "管理员",
            comments: "可以有对其属下人员机构和任务进行管理的功能"
        });
    gPermissions.insert(
        {
            title: "普通用户",
            comments: "无法对人员机构进行修改，只能对自己的任务、客户、日志等进行操作"
        });
}

if (gRegions.find().count() === 0) {
    gRegions.insert({code: "1", title: "亚洲区", parentID: null});
    gRegions.insert({code: "2", title: "欧洲区", parentID: null});
    gRegions.insert({code: "101", title: "中国区", parentID: gRegions.findOne({code: "1"})._id});
    gRegions.insert({code: "10101", title: "华南大区", parentID: gRegions.findOne({code: "101"})._id});
    gRegions.insert({code: "1010101", title: "广东", parentID: gRegions.findOne({code: "10101"})._id});
    gRegions.insert({code: "101010101", title: "广州", parentID: gRegions.findOne({code: "1010101"})._id});
    gRegions.insert({code: "10101010101", title: "天河", parentID: gRegions.findOne({code: "101010101"})._id});
    gRegions.insert({code: "10102", title: "华东大区", parentID: gRegions.findOne({code: "101"})._id});
    gRegions.insert({code: "1010201", title: "江苏", parentID: gRegions.findOne({code: "10102"})._id});
    gRegions.insert({code: "101020101", title: "苏州", parentID: gRegions.findOne({code: "1010201"})._id});
}

if (gCompanies.find().count() === 0) {
    gCompanies.insert(
        {
            code: "1",
            title: "中国天御集团公司",
            companyType: gCompanyType.findOne({title: "集团"})._id,
            phones: [],
            faxes: [],
            addresses: [],
            boss: null,
            supervisor: null,
            region: gRegions.findOne({code: "1"})._id,
            comments: null
        }
    );
    gCompanies.insert(
        {
            code: "101",
            title: "天御上海分公司",
            companyType: gCompanyType.findOne({title: "子公司"})._id,
            phones: [],
            faxes: [],
            addresses: [],
            boss: null,
            supervisor: gCompanies.findOne({code: "1"})._id,
            region: gRegions.findOne({code: "10102"})._id,
            comments: null
        }
    );
}

if (gDepartments.find().count() === 0) {
    gDepartments.insert(
        {
            code: "10001",
            companyID: gCompanies.findOne({code: "1"})._id,
            title: "董事长办公室",
            region: gRegions.findOne({code: "1"})._id,
            supervisior: null //行政上级部门
        }
    );
    gDepartments.insert(
        {
            code: "10002",
            companyID: gCompanies.findOne({code: "1"})._id,
            title: "内贸部",
            region: gRegions.findOne({code: "101"})._id,
            supervisior: gDepartments.findOne({code: "10001"})
        }
    );
    gDepartments.insert(
        {
            code: "10003",
            companyID: gCompanies.findOne({code: "1"})._id,
            title: "外贸部",
            region: gRegions.findOne({code: "2"})._id,
            supervisior: gDepartments.findOne({code: "10001"})
        }
    );
    gDepartments.insert(
        {
            code: "10101",
            companyID: gCompanies.findOne({code: "101"})._id,
            title: "总经理办公室",
            region: gRegions.findOne({code: "10102"})._id,
            supervisior: gDepartments.findOne({code: "10001"})
        }
    );
    gDepartments.insert(
        {
            code: "10102",
            companyID: gCompanies.findOne({code: "101"})._id,
            title: "销售部",
            region: gRegions.findOne({code: "10102"})._id,
            supervisior: gDepartments.findOne({code: "10101"})
        }
    );
}

if (gJobs.find().count() === 0) {
    gJobs.insert(
        {
            departmentID: gDepartments.findOne({code: "10001"})._id,
            title: "董事长"
        }
    );
    gJobs.insert(
        {
            departmentID: gDepartments.findOne({code: "10101"})._id,
            title: "总经理"
        }
    );
    gJobs.insert(
        {
            departmentID: gDepartments.findOne({code: "10101"})._id,
            title: "销售总监"
        }
    );
    gJobs.insert(
        {
            departmentID: gDepartments.findOne({code: "10102"})._id,
            title: "部门经理"
        }
    );
}