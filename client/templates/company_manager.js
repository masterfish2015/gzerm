Session.setDefault("showAddCompanyPanel", false);
Session.setDefault("isModifyCompany", false);
Session.setDefault("modifyCompanyID", "");

Session.setDefault("modifyCompanyGroup", "");
Session.setDefault("modifyCompanySupervisor", "");
Session.setDefault("modifyCompanyType", " ");
Session.setDefault("modifyCompanyBoss", " ");
Session.setDefault("modifyCompanyRegion", " ");
Session.setDefault("modifyCompanyCode", "");
Session.setDefault("modifyCompanyTitle", "");
Session.setDefault("modifyCompanyComment", "");

Session.setDefault("validateAddCompany", "");

Template.companyManagerTemplate.helpers({
    "showAddCompanyPanel": function () {
        return Session.get("showAddCompanyPanel");
    },
    "isModifyCompany": function () {
        return Session.get("isModifyCompany");
    }
   
});

Template.addCompanyTemplate.helpers({
    "selected":function(v1,v2){
        if(v1===v2){
            return true;
        }else{
            return false;
        }
    },
    "modifyCompanyGroup":function(){
        return Session.get('modifyCompanyGroup');
    },
    "modifyCompanyCode":function(){
        return Session.get('modifyCompanyCode');
    },
    "modifyCompanyTitle":function(){
        return Session.get('modifyCompanyTitle');
    },
    "modifyCompanyType":function(){
        return Session.get('modifyCompanyType');
    },
    "modifyCompanyRegion":function(){
        return Session.get('modifyCompanyRegion');
    },
    "modifyCompanyBoss":function(){
        return Session.get('modifyCompanyBoss');
    },
    "modifyCompanySupervisor":function(){
        return Session.get('modifyCompanySupervisor');
    },
    "modifyCompanyComment":function(){
        return Session.get('modifyCompanyComment');
    },
    //下面是为了下拉选择栏提供选择项
    "companyTypeOptions": function () {
        return gCompanyType.find();
    },
    "bossOptions": function () {
        return gEmployees.find();
    },
    "supervisorOptions": function () {
        return gCompanies.find();
    },
    "regionOptions": function () {
        return gRegions.find();
    },
    "groups": function(){
        return gGroups.find();
    },
    //错误处理
    "verifyCompanyCodeError":function(){
        return Session.get("verifyCompanyCodeError");
    },
    "verifyCompanyTitleError":function(){
        return Session.get("verifyCompanyTitleError");
    },
    //下面的辅助函数是为了界面多语言
    "isModifyCompany": function () {
        return Session.get("isModifyCompany");
    },
    

});

Template.companyListTemplate.helpers({
    "companies": function () {
        return gCompanies.find();
    },
    "getCompanyType": function (companyTypeID) {
        var o =gCompanyType.findOne({_id: companyTypeID});
        if(!o){
            return "";
        }else{
            return o.title || "";
        }
    },
    "getBoss": function (bossID) {
        var o =gEmployees.findOne({_id: bossID});
        if(!o){
            return "";
        }else{
            return o.realname || "";
        }
    },
    "getSupervisor": function (supervisorID) {

        var o =gCompanies.findOne({_id: supervisorID});
        if(!o){
            return "";
        }else{
            return o.title || "";
        }
    },
    "getRegion": function (regionID) {
        var o =gRegions.findOne({_id: regionID});
        if(!o){
            return "";
        }else{
            return o.title || "";
        }
    },
    

});

Template.companyManagerTemplate.events({
    "click #btn_show_add_company_panel": function (e, v) {
        var v1 = Session.get("showAddCompanyPanel");
        var v2 = Session.get("isModifyCompany");
        if (v1 === true && v2 === true) {
            //情况1：v1=true表示面板已经打开，v2=true表示现在是修改状态，所以这时候按这个按钮，应该切换为添加状态，保持面板打开
            Session.set("isModifyCompany", false);
            initInputField();
        }
        if (v1 === true && v2 === false) {
            //情况2： v1=true表示面板已经打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该把面板收起来
            Session.set("showAddCompanyPanel", false);
        }
        if (v1 === false && v2 === true) {
            //情况3： v1=false表示面板未打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该切换为添加状态，且把面板打开
            Session.set("showAddCompanyPanel", true);
            Session.set("isModifyCompany", false);
            initInputField();
        }
        if (v1 === false && v2 === false) {
            //情况4： v1=false表示面板未打开，v2=false表示现在是新建状态，所以这时候按这个按钮，就应该把面板打开
            Session.set("showAddCompanyPanel", true);
            initInputField();
        }
    }
});

function initInputField(){
    Session.set("modifyCompanyID","");
    Session.set("modifyCompanyGroup","");
    Session.set('modifyCompanySupervisor'," ");
    Session.set('modifyCompanyBoss'," ");
    Session.set('modifyCompanyRegion'," ");
    Session.set('modifyCompanyType'," ");
    Session.set('modifyCompanyTitle',"");
    Session.set('modifyCompanyCode',"");
    Session.set('modifyCompanyComment',"");

    // Get bootstrapValidator instance
    var bootstrapValidator = $('#add_company_form').data('bootstrapValidator');
    if(bootstrapValidator)
        bootstrapValidator.resetForm(true);
}

function setInputField(company){
    Session.set('modifyCompanyID',company._id ||'');
    
    Session.set('modifyCompanyGroup',company.groupID ||'');
    $('#input_company_group').val(company.groupID ||'');

    Session.set('modifyCompanyCode',company.code ||'');
    $('#input_company_code').val(company.code ||'');

    Session.set('modifyCompanyTitle',company.title ||'');
    $('#input_company_title').val(company.title ||'');

    Session.set('modifyCompanyComment', company.comments ||'');
    //$('#input_company_comment').html( company.comments ||'');
    
    Session.set('modifyCompanyType',company.companyType ||''); 
    $('#input_company_type').val(company.companyType ||'');

    Session.set('modifyCompanyRegion',company.region ||'');
    $('#input_company_region').val(company.region ||'');

    Session.set('modifyCompanyBoss',company.boss ||'');
    $('#input_company_boss').val(company.boss ||'');

    Session.set('modifyCompanySupervisor',company.supervisor ||'');
    $('#input_company_supervisor').val(company.supervisor ||'');
}

Template.addCompanyTemplate.events({
    "click #btn_add_company":function(e){
        e.preventDefault();
        $('#add_company_form').bootstrapValidator('validate');
    }//end of 'click #btn_add_company' event
 
});

Template.companyListTemplate.events({
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
        //Session.set("modifyCompanyID",id);
        Session.set("isModifyCompany",true);
        Session.set("showAddCompanyPanel", true);
        var company = gCompanies.findOne({_id:id});
        //console.log(company);
        initInputField();
        setInputField(company);
    }
});

Template.addCompanyTemplate.rendered = function(){
    $('#add_company_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            input_company_group: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_company_code: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_company_title: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_company_type: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            }
        }
    }).on('success.form.bv', function(e) {
            
            // If you want to prevent the default handler (bootstrapValidator._onSuccess(e))
            // e.preventDefault();

            var c ={}; //company data
            if(Meteor.get_user_grade()===0){
                //admin 
                c.groupID = $('#input_company_group').val();
            }else{
                c.groupID = Meteor.get_group_id();
            }
            c.code = $('#input_company_code').val();
            c.title = $('#input_company_title').val();
            c.companyType = $('#input_company_type').val();
            c.boss = $('#input_company_boss').val();
            c.region = $('#input_company_region').val();
            c.supervisor = $('#input_company_supervisor').val();
            c.comments = $('#input_company_comment').val();

            console.log(c);
            if(Session.get('isModifyCompany')===false){
                //create
                Meteor.call("addNewCompany",c,function(error, result){
                    if(result.error!=="OK"){
                        //console.log("无法增加新的公司"+result.error);
                        //alert(Session.get(result.error));
                        Session.set('validateAddCompany', Session.get( result.error ) );
                    }else{
                        Session.set('validateAddCompany', '');
                        initInputField();
                    }
                });
            }else{
                //modify
                Meteor.call("updateCompany",Session.get("modifyCompanyID"),c,function(error, result){
                    if(!error){
                        if(result.error && result.error!=="OK"){
                            //console.log("无法修改该公司数据"+result.error);
                            //alert(Session.get(result.error));
                            Session.set('validateAddCompany', Session.get( result.error ) );
                        }else{
                            Session.set('validateAddCompany', '');
                            var bootstrapValidator = $('#add_company_type_form').data('bootstrapValidator');
                            if(bootstrapValidator)
                                bootstrapValidator.resetForm(false);
                            //initInputField();
                        }
                    }
                });
            }
        });
}