gEmployees = new Mongo.Collection("employees");
gEmployees.attachSchema(new SimpleSchema({
    code:{
        type:String,
        label:"员工编号",
        defaultValue:" "
    },
    name:{
        type:String,
        label:"姓名",
        max:200
    },
    realname:{
        type:String,
        label:"真实姓名",
        max:200
    },
    gender:{
        type:String,
        label:"性别"
    },
    companyCode:{
        type:String,
        label:"公司代码",
        optional:true
    },
    departmentCode:{
        type:String,
        label:"部门代码",
        optional:true
    },
    jobCode:{
        type:String,
        label:"岗位代码",
        optional:true
    }
}));