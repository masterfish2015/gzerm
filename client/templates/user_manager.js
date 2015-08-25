Template.userManagerTemplate.helpers({
    isShowAddUserPanel:function(){
        return Session.get('isShowAddUserPanel');
    },
    isPermitedToshowUsers:function(){
        return true;
    },
    users:function(){
        var users=[
            {code:"10001",
             name:"jack",
             realname:"Jack Smith"
            },
            {code:"10002",
             name:"tom",
             realname:"Tom Lee"
            }
        ];
        return users;
    }
});

Template.userManagerTemplate.events({
    'click #btn_add_user':function(){
        Session.set('isShowAddUserPanel',true);
    }
});

Template.userAddTemplate.events({
    'click #btn_return':function(){
        Session.set('isShowAddUserPanel',false);
    }
});