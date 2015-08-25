Meteor.methods({
    'addNewUser':function(username, ) {


    },
    'getLastUserCoder':function(departmentID){
        //获取本部门机构用户的最后一个编码
        //编码最大的字符数是10个字符，格式： 部门编码+序列号，如果加起来不到10个字符，则在两者之间加入'0'填充
        var code_length =10; //最大的字符数
        //查询部门的代码
        var department = gDepartments.findOne({_id:departmentID});
        if(department){
            //查询该部门的用户
            var user = Meteor.users.findOne({profile.departmentID:department._id},{sort});
            return department.code;
        }else{
            return null;
        }
        //var code_length = 10;
        //var ob=Meteor.users.findOne({"profile.departmentID": departmentID},{sort:{username:-1}});
        //if(ob){
        //    var left = 10-gDepartments.findOne({_id:departmentID}).code.length;
        //}
        //    return ob.username|| gDepartments.findOne({_id:departmentID}).code+"00";
        //else if(gDepartments.findOne({_id:departmentID}))
        //    return gDepartments.findOne({_id:departmentID}).code+"00";
        //else
        //    return -1;
    }
});