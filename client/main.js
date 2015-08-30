Session.setDefault('isShowAddUserPanel',false);

Meteor.setInterval(function(){
    var d=new Date();
    Session.set("currentTime", d.toLocaleDateString()+ d.toLocaleTimeString());
},1000);
