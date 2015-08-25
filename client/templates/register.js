Template.registerTmp.events({
    "click #btn_return": function (e) {
        Router.go("/");
    },
    "click #btn_register": function (e) {
        e.preventDefault();

        var userCode, password, profile = {}, repeatPassword;

        userCode = $("#input_user_id").val();
        if (userCode === "") {
            $("#error_zone").html("未生成可用职工编号，请选择所在部门");
            return;
        }

        password = $("#input_user_pw").val();
        repeatPassword = $("#input_user_repeat_pw").val();
        if (password != repeatPassword) {
            $("#error_zone").html("密码两次输入不相同");
            return;
        } else if (password.toString().length < 3) {
            $("#error_zone").html("密码至少包括3个字符");
            return;
        }

        profile.name = $("#input_user_name").val();
        if (profile.name === "") {
            $("#error_zone").html("用户名不能为空");
            return;
        }

        profile.gender = $("#select_gender").val();
        profile.permission = $("#select_permission").val();
        profile.companyID = $("#select_company").val();
        profile.departmentID = $("#select_department").val();
        profile.jobID = $("#select_job").val();
        profile.regionID = $("#select_region").val();

        console.log(profile);


        //console.log(repeatPassword);
        $("#error_zone").html("");
    }
});

Template.permissionListTmp.helpers({
    permissions: function () {
        return gPermissions.find();
    }
});

Template.companiesListTmp.helpers({
    companies: function () {
        return gCompanies.find();
    }
});

Template.companiesListTmp.events({
    "change #select_company": function (e) {
        e.preventDefault();
        Session.set("selectedCompanyID", $('#select_company').val());
    }
});

Template.departmentsListTmp.helpers({
    departments: function () {
        var ob = Session.get("selectedCompanyID");
        if (ob)
            return gDepartments.find({companyID: ob});
        else
            return gDepartments.find({companyID: $('#select_company').val()});
    }
});

Template.departmentsListTmp.events({
    "change #select_department": function (e) {
        e.preventDefault();
        Session.set("selectedDepartmentID", $('#select_department').val());
        //生成新的员工编号
        var departmentID = $("#select_department").val();
        Meteor.call("getLastUserCoder", departmentID, function (err, result) {
            if (result >= 0) {
                console.log("new employee id " + result);
                $('#input_user_id').val(1 + parseInt(result, 10));
            }
        });
    }
});

Template.jobsListTmp.helpers({
    jobs: function () {
        var ob = Session.get("selectedDepartmentID");
        if (ob)
            return gJobs.find({departmentID: ob});
        else
            return gJobs.find({departmentID: $('#select_department').val()});
    }
});

Template.jobsListTmp.events({
    "change #select_job": function (e) {
        e.preventDefault();


    }
});
Template.regionListTmp.helpers({
    regions: function () {
        return gRegions.find();
    }
});
