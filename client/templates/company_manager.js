Session.setDefault("showAddCompanyPanel", false);
Session.setDefault("isModifyCompany", false);
Session.setDefault("modifyCompanyID", "");

Session.setDefault("modifyCompanySupervisor", " ");
Session.setDefault("modifyCompanyType", " ");
Session.setDefault("modifyCompanyBoss", " ");
Session.setDefault("modifyCompanyRegion", " ");
Session.setDefault("modifyCompanyCode", "");
Session.setDefault("modifyCompanyTitle", "");
Session.setDefault("modifyCompanyComment", "");
Session.setDefault("modifyCompanyGroup", "");

Session.setDefault("validateCompanyGroup","");
Session.setDefault("validateCompanyCode","");
Session.setDefault("validateCompanyType","");
Session.setDefault("validateCompanyTitle","");
Session.setDefault("validateCompanySupervisor","");
Session.setDefault("validateCompanyRegion","");
Session.setDefault("validateCompanyBoss","");
Session.setDefault("validateAddCompany","");

Template.companyManagerTemplate.helpers({
    showAddCompanyPanel: function () {
        return Session.get("showAddCompanyPanel");
    },
    isModifyCompany: function () {
        return Session.get("isModifyCompany");
    }
});

Template.addCompanyTemplate.helpers({

    modifyCompanyGroup:function(){
        return Session.get('modifyCompanyGroup');
    },
    modifyCompanyCode:function(){
        return Session.get('modifyCompanyCode');
    },
    modifyCompanyTitle:function(){
        return Session.get('modifyCompanyTitle');
    },
    modifyCompanyType:function(){
        return Session.get('modifyCompanyType');
    },
    modifyCompanyRegion:function(){
        return Session.get('modifyCompanyRegion');
    },
    modifyCompanyBoss:function(){
        return Session.get('modifyCompanyBoss');
    },
    modifyCompanySupervisor:function(){
        return Session.get('modifyCompanySupervisor');
    },
    modifyCompanyComment:function(){
        return Session.get('modifyCompanyComment');
    },
    //下面是为了下拉选择栏提供选择项
    groups:function(){
        return gGroups.find();
    },
    companyTypeOptions: function () {
        return gCompanyType.find();
    },
    bossOptions: function () {
        return gEmployees.find();
    },
    supervisorOptions: function () {
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
    regionOptions: function () {
        return gRegions.find();
    },
    //错误处理
    validateCompanyGroup:function(){
        return Session.get("validateCompanyGroup");
    },
    validateCompanyCode:function(){
        return Session.get("validateCompanyCode");
    },
    validateCompanyType:function(){
        return Session.get("validateCompanyType");
    },
    validateCompanyTitle:function(){
        return Session.get("validateCompanyTitle");
    },
    validateCompanySupervisor:function(){
        return Session.get("validateCompanySupervisor");
    },
    validateCompanyRegion:function(){
        return Session.get("validateCompanyRegion");
    },
    validateCompanyBoss:function(){
        return Session.get("validateCompanyBoss");
    },
    validateAddCompany:function(){
        return Session.get("validateAddCompany");
    },
    //
    isModifyCompany: function () {
        return Session.get("isModifyCompany");
    },
    validateCompany:function(){
        var company={};
        var changed=false;

        if(Meteor.get_user_grade()===0){
            company.groupID=$('#input_company_group').val();
            if(Session.get('modifyCompanyGroup')!==company.groupID){
                console.log(company.groupID);
                changed=true;
            }
        }
        company.code = $('#input_company_code').val();
        if(Session.get('modifyCompanyCode')!==company.code){
            console.log(company.code);
            changed=true;
        }

        company.title = $('#input_company_title').val();
        if(Session.get('modifyCompanyTitle')!==company.title){
            console.log(company.title);
            changed=true;
        }

        company.type = $('#input_company_type').val();
        if(Session.get('modifyCompanyType')!==company.type){
            console.log(company.type);
            changed=true;
        }

        company.supervisor = $('#input_company_supervisor').val();
        if(Session.get('modifyCompanySupervisor')!==company.supervisor){
            console.log(company.supervisor);
            changed=true;
        }

        company.region = $('#input_company_region').val();
        if(Session.get('modifyCompanyRegion')!==company.region){
            console.log(company.region);
            changed=true;
        }

        company.boss = $('#input_company_charger').val();
        if(Session.get('modifyCompanyBoss')!==company.boss){
            console.log(company.boss);
            changed=true;
        }

        company.comment = $('#input_company_comment').val();
        if(Session.get('modifyCompanyComment')!==company.comment){
            console.log(company.comment);
            changed=true;
        }

        return changed;
    }
});

Template.companyListTemplate.helpers({
    companies: function () {
        return gCompanies.find();
    },
    getCompanyType: function (companyTypeID) {
        var o =gCompanyType.findOne({_id: companyTypeID});
        if(!o){
            return "";
        }else{
            return o.title || "";
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

Template.companyManagerTemplate.events({
    "click #btn_show_add_company_panel": function (e, v) {
        //alert("hi");

        var v1 = Session.get("showAddCompanyPanel");
        var v2 = Session.get("isModifyCompany");
        //console.log([v1,v2]);

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
    Session.set("modifyCompanyGroup","");
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
    Session.set('modifyCompanyGroup',company.groupID);
    Session.set('modifyCompanyCode',company.code);
    Session.set('modifyCompanyTitle',company.title);
    Session.set('modifyCompanyComment',company.comments);
    Session.set('modifyCompanyType',company.companyType);
    Session.set('modifyCompanyRegion',company.region);
    Session.set('modifyCompanyBoss',company.boss);
    Session.set('modifyCompanySupervisor',company.supervisor);

}

Template.addCompanyTemplate.events({
    //
    //增加公司事件
    "click #btn_add_company":function(e){
        e.preventDefault();
        //获取相关数据
        var cp={};
        var is_ok=true;
        console.log('start adding company');

        if(Meteor.get_user_grade()===0){//super admin
            if(Meteor.validate_no_empty("input_company_group","validateCompanyGroup")===false){
                is_ok = false;
            }
            cp.groupID=$("#input_company_group").val();
        }else{
            cp.groupID=Meteor.get_group_id();
        }
        if(Meteor.validate_no_empty("input_company_code","validateCompanyCode")===false){
            is_ok = false;
        }
        if(Meteor.validate_no_empty("input_company_title","validateCompanyTitle")===false){
            is_ok = false;
        }
        if(Meteor.validate_no_empty("input_company_type","validateCompanyType")===false){
            is_ok = false;
        }
        if(Meteor.validate_no_empty("input_company_region","validateCompanyRegion")===false){
            is_ok = false;
        }
        //if(Meteor.validate_no_empty("input_company_supervisor","validateCompanySupervisor")===false){
        //    is_ok = false;
        //}
        //if(Meteor.validate_no_empty("input_company_charger","validateCompanyBoss")===false){
        //    is_ok = false;
        //}


        cp.code = $('#input_company_code').val();
        cp.title = $('#input_company_title').val();
        cp.companyType = $('#input_company_type').val();
        cp.region = $('#input_company_region').val();
        cp.boss = $('#input_company_charger').val();
        cp.supervisor = $('#input_company_supervisor').val();
        cp.comments = $('#input_company_comment').val();

        console.log(cp);
        if(is_ok===false)
            return;


        if(Session.get('isModifyCompany')===false){
            //create
            Meteor.call("addNewCompany",cp,function(error, result){
                if(result.error!=="OK"){
                    //console.log("无法增加新的公司"+result.error);
                    Session.set("validateAddCompany",(Session.get(result.error)));
                }else{
                    initInputField();
                    Session.set("validateAddCompany","");
                }


            });
        }else{
            //modify
            Meteor.call("updateCompany",Session.get("modifyCompanyID"),cp,function(error, result){
                if(!error){
                    if(result.error && result.error!=="OK"){
                        //console.log("无法修改该公司数据"+result.error);
                        Session.set("validateAddCompany",(Session.get(result.error)));
                    }else{
                        //initInputField();
                        Session.set("validateAddCompany","");
                    }
                }
            });
        }

    }

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
        Session.set("modifyCompanyID",id);
        Session.set("isModifyCompany",true);
        Session.set("showAddCompanyPanel", true);
        var company = gCompanies.findOne({_id:id});
        //console.log(company);
        setInputField(company);
    }
});