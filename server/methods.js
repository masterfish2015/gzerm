Meteor.methods({
    'addNewUser':function(username) {

    },
    'getLastUserCoder':function(departmentID){
        //获取本部门机构用户的最后一个编码
        //编码最大的字符数是10个字符，格式： 部门编码+序列号，如果加起来不到10个字符，则在两者之间加入'0'填充
        var code_length =10; //最大的字符数
        //查询部门的代码
        var department = gDepartments.findOne({_id:departmentID});
        if(department){
            //查询该部门的用户
            var user = Meteor.users.findOne();
            return department.code;
        }else{
            return null;
        }

    }
});