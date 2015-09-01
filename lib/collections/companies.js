gCompanies = new Mongo.Collection("companies"); //公司表
gCompanyType = new Mongo.Collection("companyType"); //公司性质，或者种类，一般情况下是两种：集团，子公司

gCompanyType.attachSchema(new SimpleSchema({
        title: {
            type: String,
            label: "机构类型名称",
            max: 200
        }
    })
);
///*
Schema = {};
Schema.company = new SimpleSchema({
    code: {
        type: String,
        label: "公司编码",
        max: 10
    },
    title: {
        type: String,
        label: "公司名称",
        max: 300
    },
    companyType: {
        type: String,
        label: "公司类型",
        defaultValue:" "
    },
    boss: {
        type: String,
        label: "负责人",
        defaultValue:" "
    },
    supervisor: {
        type: String,
        label: "上级公司",
        defaultValue:" "
    },
    region: {
        type: String,
        label: "区域",
        defaultValue:" "
    },
    comments: {
        type: String,
        label: "备注",
        defaultValue:" "
    }
});

gCompanies.attachSchema(Schema.company);
//    */