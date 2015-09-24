gCompanies = new Mongo.Collection("companies"); //公司表
gCompanyType = new Mongo.Collection("companyType"); //公司性质，或者种类，一般情况下是：总公司、子公司、分公司等等

gCompanyType.attachSchema(new SimpleSchema({
        groupID:{
            type:String,
            label:"归属的集团ID"
        },
        title: {
            type: String,
            label: "公司类型名称",
            max: 200
        },
        grade:{
            type:Number,
            label:"公司类型级别，0～n整数，0最高，n越大，级别越低"
        }
    })
);
///*
Schema = {};
Schema.company = new SimpleSchema({
    groupID:{
        type:String,
        label:"归属的集团ID"
    },
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
        defaultValue:" ",
        optional:true
    },
    supervisor: {
        type: String,
        label: "上级公司",
        defaultValue:" ",
        optional:true
    },
    region: {
        type: String,
        label: "区域",
        defaultValue:" ",
        optional:true
    },
    comments: {
        type: String,
        label: "备注",
        defaultValue:" ",
        optional:true
    }
});

gCompanies.attachSchema(Schema.company);
//    */