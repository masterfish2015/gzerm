Session.setDefault("activePage","");

Template.sidebarTemplate.helpers({
    "realTime":function(){
        return Session.get("currentTime");
    },
    "isMyPageActive":function(page){
        return page===Session.get("activePage");
    }
});

