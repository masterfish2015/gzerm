Session.setDefault("activePage","");

Template.sidebarTemplate.helpers({
    "realTime":function(){
        return Session.get("currentTime");
    },
    "isMyPageActive":function(page){
        return page===Session.get("activePage");
    }
});

Template.sidebarTemplate.events({
	'click .panel-heading': function(e){
		$('.panel').removeClass('panel-info');
		$(e.currentTarget).parents('.panel').addClass('panel-info');
	},
      'click .list-group-item': function(e){
             $('.list-group-item').removeClass('list-group-item-success');
             $(e.currentTarget).addClass('list-group-item-success');
      } //list-group-item-info 
});