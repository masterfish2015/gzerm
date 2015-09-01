Session.setDefault("activePage","");

Template.sidebarTemplate.helpers({
    "realTime":function(){
        return Session.get("currentTime");
    },
    "isMyPageActive":function(page){
        return page===Session.get("activePage");
    },
    //下面的辅助函数是为了界面多语言
    "langSystemManagement":function(){
        return Session.get("langSystemManagement");
    },
    "langUserManagement":function(){
        return Session.get("langUserManagement");
    },
    "langBaseDataManagement":function(){
        return Session.get("langBaseDataManagement");
    },
    "langOrganizeTypeManagement":function(){
        return Session.get("langOrganizeTypeManagement");
    },
    "langOrganizeManagement":function(){
        return Session.get("langOrganizeManagement");
    },
    "langCompanyManagement":function(){
        return Session.get("langCompanyManagement");
    },
    "langBusinessProcessManagement":function(){
        return Session.get("langBusinessProcessManagement");
    },
    "langBusinessReportManagement":function(){
        return Session.get("langBusinessReportManagement");
    }
})