

Template.companyTypeMangagerTemplate.helpers({
    "langOrganizeTypeManagement": function () {
        return Session.get("langOrganizeTypeManagement");
    },
    "langAddOrganizeType": function () {
        return Session.get("langAddOrganizeType");
    },
    "showAddCompanyTypePanel":function(){return Session.get("showAddCompanyTypePanel");}

});

Template.companyTypeListTemplate.helpers({
    "companyTypes": function () {
        return gCompanyType.find();
    },
    "langCurrentOrganizeTypes": function () {
        return Session.get("langCurrentOrganizeTypes");
    }
});

Template.addCompanyTypeTemplate.helpers({
    //下面的辅助函数是为了输入验证
    "verifyCompanyTypeError":function(){
        return Session.get("verifyCompanyTypeError") ;
    },
    //下面的辅助函数是为了界面多语言
    "langAddOrganizeType": function () {
        return Session.get("langAddOrganizeType");
    },
    "langOrganizeType": function () {
        return Session.get("langOrganizeType");
    },
    "langAdd": function () {
        return Session.get("langAdd");
    },
    "langCancel": function () {
        return Session.get("langCancel");
    }
});


Template.companyTypeMangagerTemplate.events({
    "click #btn_show_or_hide_addCompanyType_panel": function (e, v) {
        var v = !Session.get("showAddCompanyTypePanel");
        Session.set("showAddCompanyTypePanel",v);
    }
});

Template.addCompanyTypeTemplate.events({
    "click #btn_add_company_type": function (e, v) {
        var title = $('#text_add_organize_type').val();
        if(title===""){
            Session.set("verifyCompanyTypeError",Session.get("langErrorCompanyTypeEmpty"));
            return ;
        }else{
            Session.set("verifyCompanyTypeError","");
        }
        Meteor.call("addNewCompanyType",title,function(error, result){
            if(result.error!=="OK"){
                Session.set("verifyCompanyTypeError",result.error);
                //Session.set("errorMessage",Session.get(result.error));
            }else{
               // Session.set("errorMessage","");
            }
        });
    }
});

Template.companyTypeListTemplate.events({
    "click .companyTypeRemove": function (e) {
        var companyTypeID = e.currentTarget.value;
        var rt=confirm(Session.get("langAreYouSure"));//询问是否确认删除
        if(rt===true){
            //console.log(p);
            Meteor.call("removeCompanyType", companyTypeID, function(e,r){
                if(r.error!=="OK"){
                    Session.set("errorMessage",Session.get(result.error));
                }else{
                    Session.set("errorMessage","");
                }
            });
        }
    }
});