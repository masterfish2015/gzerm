gEmployees = new Mongo.Collection("employees");

gEmployees.attachSchema(new SimpleSchema({
    groupID:{
        type:String,
        label:"归属的集团ID"
    },
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
    }
}));