Template.sidebarTemplate.helpers({
    "realTime":function(){
        return Session.get("currentTime");
    },
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