Session.setDefault("showAddDepartmentPanel", false);
Session.setDefault("isModifyDepartment", false);

Session.setDefault("modifyDepartmentID", "");
Session.setDefault("modifyDepartmentSupervisor", " ");
Session.setDefault("modifyCompanyOwner", " ");
Session.setDefault("modifyDepartmentType", " ");
Session.setDefault("modifyDepartmentBoss", " ");
Session.setDefault("modifyDepartmentRegion", " ");
Session.setDefault("modifyDepartmentCode", "");
Session.setDefault("modifyDepartmentTitle", "");
Session.setDefault("modifyDepartmentComment", "");

Session.setDefault("verifyDepartmentCodeError","");
Session.setDefault("verifyDepartmentTitleError","");

Template.departmentManagerTemplate.helpers({
    "showAddDepartmentPanel": function () {
        return Session.get("showAddDepartmentPanel");
    },
    "isModifyDepartment": function () {
        return Session.get("isModifyDepartment");
    }
});

Template.addDepartmentTemplate.helpers({
    "selected":function(v1,v2){
        if(v1===v2){
            return true;
        }else{
            return false;
        }
    },
    "modifyDepartmentCode":function(){
        return Session.get('modifyDepartmentCode');
    },
    "modifyCompanyOwner":function(){
        return Session.get('modifyCompanyOwner');
    },
    "modifyDepartmentTitle":function(){
        return Session.get('modifyDepartmentTitle');
    },
    "modifyDepartmentType":function(){
        return Session.get('modifyDepartmentType');
    },
    "modifyDepartmentRegion":function(){
        return Session.get('modifyDepartmentRegion');
    },
    "modifyDepartmentBoss":function(){
        return Session.get('modifyDepartmentBoss');
    },
    "modifyDepartmentSupervisor":function(){
        return Session.get('modifyCompanySupervisor');
    },
    "modifyDepartmentComment":function(){
        return Session.get('modifyDepartmentComment');
    },
    //下面是为了下拉选择栏提供选择项
    "companyTypeOptions": function () {
        return gCompanyType.find();
    },
    "bossOptions": function () {
        return gEmployees.find();
    },
    "supervisorOptions": function () {
        //获得机构列表，注意自己和比自己还低的机构都不列入
        var list ;
        if(Session.get("isModifyCompany")===true){
            var rt=[];
            var id = Session.get("modifyCompanyID");

            var companyType = gCompanyType.findOne({_id:gCompanies.findOne({_id:id}).companyType});

            if(!companyType){
                //如果当前修改的公司没有设置类型，那么直接返回所有公司（除自己外）的集合
                return gCompanies.find({_id:{$ne:id}});
            }
            //否则，查找所有机构，找出其公司类型的级别，判断其级别是否<本级别（小于则是等级高），组成列表
            list = gCompanies.find({_id:{$ne:id}}).fetch();
            for(l in list){
                var o = list[l];

                var ct = o.companyType;
                if(ct && gCompanyType.findOne({_id:ct}).grade<companyType.grade){
                    rt.push(o);
                }
            }
            return rt;
        }
        else{
            return gCompanies.find();
        }
    },
    "regionOptions": function () {
        return gRegions.find();
    },
    //错误处理
    "verifyDepartmentCodeError":function(){
        return Session.get("verifyDepartmentCodeError");
    },
    "verifyDepartmentTitleError":function(){
        return Session.get("verifyDepartmentTitleError");
    }
});

Template.departmentListTemplate.helpers({
    departments: function () {
        return gDepartments.find();
    },
    getDepartmentType: function (departmentTypeID) {
        return " ";
    },
    getCompanyOwner:function(companyID){
        var o = gCompanies.findOne({_id:companyID});
        if(o && o.title){
            return o.title;
        }else{
            return " ";
        }
    },
    getBoss: function (bossID) {
        var o =gEmployees.findOne({_id: bossID});
        if(!o){
            return "";
        }else{
            return o.realname || "";
        }
    },
    getSupervisor: function (supervisorID) {

        var o =gCompanies.findOne({_id: supervisorID});
        if(!o){
            return "";
        }else{
            return o.title || "";
        }
    },
    getRegion: function (regionID) {
        var o =gRegions.findOne({_id: regionID});
        if(!o){
            return "";
        }else{
            return o.title || "";
        }
    }
});

Template.departmentManagerTemplate.events({
    "click #btn_show_add_department_panel": function (e, v) {
        var v1 = Session.get("showAddDepartmentPanel");
        var v2 = Session.get("isModifyDepartment");
        //console.log([v1,v2]);

        if (v1 === true && v2 === true) {
            //情况1：v1=true表示面板已经打开，v2=true表示现在是修改状态，所以这时候按这个按钮，应该切换为添加状态，保持面板打开
            Session.set("isModifyDepartment", false);
            initInputField();
        }
        if (v1 === true && v2 === false) {
            //情况2： v1=true表示面板已经打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该把面板收起来
            Session.set("showAddDepartmentPanel", false);
        }
        if (v1 === false && v2 === true) {
            //情况3： v1=false表示面板未打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该切换为添加状态，且把面板打开
            Session.set("showAddDepartmentPanel", true);
            Session.set("isModifyDepartment", false);
            initInputField();
        }
        if (v1 === false && v2 === false) {
            //情况4： v1=false表示面板未打开，v2=false表示现在是新建状态，所以这时候按这个按钮，就应该把面板打开
            Session.set("showAddDepartmentPanel", true);
            initInputField();
        }
    }
});

function initInputField(){
    Session.set("modifyCompanyID","");
    Session.set('modifyCompanySupervisor'," ");
    Session.set('modifyCompanyBoss'," ");
    Session.set('modifyCompanyRegion'," ");
    Session.set('modifyCompanyType'," ");
    Session.set('modifyCompanyTitle',"");
    Session.set('modifyCompanyCode',"");
    Session.set('modifyCompanyComment',"");
}

function setInputField(company){
    Session.set('modifyCompanyCode',company.code);
    Session.set('modifyCompanyTitle',company.title);
    Session.set('modifyCompanyComment',company.comments);
    Session.set('modifyCompanyType',company.companyType);
    Session.set('modifyCompanyRegion',company.region);
    Session.set('modifyCompanyBoss',company.boss);
    Session.set('modifyCompanySupervisor',company.supervisor);

}

Template.addDepartmentTemplate.events({
    "click #btn_add_company":function(e){
        //获取相关数据
        var cp={};

        cp.code = $('#input_company_code').val();
        if(cp.code===""){
            //编码不能为空
            Session.set("verifyCompanyCodeError",Session.get("langErrorCannotEmpty"));
            return ;
        }else{
            Session.set("verifyCompanyCodeError","");
        }

        cp.title = $('#input_company_title').val();
        if(cp.title===""){
            //名称不能为空
            Session.set("verifyCompanyTitleError",Session.get("langErrorCannotEmpty"));
            return;
        }else{
            Session.set("verifyCompanyTitleError","");
        }

        cp.companyType = $('#input_company_type').val();

        cp.region = $('#input_company_region').val();

        cp.boss = $('#input_company_charger').val();

        cp.supervisor = $('#input_company_supervisor').val();

        cp.comments = $('#input_company_comment').val();

        //console.log(cp);
        if(Session.get('isModifyCompany')===false){
            //create
            Meteor.call("addNewCompany",cp,function(error, result){
                if(result.error!=="OK"){
                    //console.log("无法增加新的公司"+result.error);
                    alert(Session.get(result.error));
                }else{
                    initInputField();

                }


            });
        }else{
            //modify
            Meteor.call("updateCompany",Session.get("modifyCompanyID"),cp,function(error, result){
                if(!error){
                    if(result.error && result.error!=="OK"){
                        //console.log("无法修改该公司数据"+result.error);
                        alert(Session.get(result.error));
                    }else{
                        //initInputField();
                    }
                }
            });
        }

    }

});

Template.departmentListTemplate.events({
    "click .companyRemove": function (e) {
        var id = e.currentTarget.value;
        var rt = confirm(Session.get("langAreYouSure"));//询问是否确认删除
        if (rt === true) {
            //console.log(p);
            Meteor.call("removeCompany", id, function (e, r) {
                if (r.error !== "OK") {
                    alert(Session.get(r.error));
                } else {
                    //Session.set("errorMessage", "");
                    initInputField();
                }
            });
        }
    },
    "click .companyEdit": function (e) {
        var id = e.currentTarget.value;
        Session.set("modifyCompanyID",id);
        Session.set("isModifyCompany",true);
        Session.set("showAddCompanyPanel", true);
        var company = gCompanies.findOne({_id:id});
        //console.log(company);
        setInputField(company);
    }
});