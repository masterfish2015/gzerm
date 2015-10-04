Session.setDefault("showAddRegionPanel", false);
Session.setDefault("modifyRegionPanel", false);
Session.setDefault("modifyRegionCode", '');
Session.setDefault("modifyRegionTitle", '');
Session.setDefault("modifyRegionParent", '');
Session.setDefault("modifyRegionID", '');
Session.setDefault("modifyRegionGroupID", '');
Session.setDefault("validateRegionError", '');
Session.setDefault("validateRegionGroup", '');
Session.setDefault("verifyRegionCodeError", '');
Session.setDefault("verifyRegionTitleError", '');
Session.setDefault("validateRegionParent", '');

Template.regionManagerTemplate.helpers({
    //下面的辅助函数是为了控制界面显示
    showAddRegionPanel: function () {
        return Session.get("showAddRegionPanel");
    }
});

Template.regionListTemplate.helpers({

    //下面的辅助函数是为了控制界面显示
    regions: function () {
        return gRegions.find();
    },
    getRegionParent: function (regionCode, groupID) {
        var o = gRegions.findOne({groupID:groupID, code: regionCode});
        if(o && o.title){
            return o.title;
        }else{
            return "";
        }
    },
    getGroupName:function(groupID){
        return gGroups.findOne({_id:groupID}).title;
    }
});

Template.addRegionTemplate.helpers({
    //下面的辅助函数是为了控制界面显示
    modifyRegionPanel: function () {
        return Session.get("modifyRegionPanel");
    },
    groups:function(){
        return gGroups.find();
    },
    regions: function () {
        if(Meteor.get_user_grade()===0){
            //如果是超级管理员，则根据选择的group来确定可用区域
            var groupID = Session.get("modifyRegionGroupID");;
            //console.log(groupID);
            if(groupID){
                return gRegions.find({groupID:groupID});
            }
            return [];
        }
        return gRegions.find();
    },
    modifyRegionCode: function () {
        return Session.get("modifyRegionCode");
    },
    modifyRegionTitle: function () {
        return Session.get("modifyRegionTitle");
    },
    modifyRegionParent: function () {
        return Session.get("modifyRegionParent");
    },
    modifyRegionID: function () {
        return Session.get("modifyRegionID");
    },
    modifyRegionGroupID: function () {
        return Session.get("modifyRegionGroupID");
    },
    //错误处理
    verifyRegionCodeError: function () {
        return Session.get("verifyRegionCodeError");
    },
    verifyRegionTitleError: function () {
        return Session.get("verifyRegionTitleError");
    },
    validateRegionGroup: function () {
        return Session.get("validateRegionGroup");
    },
    validateRegionParent: function () {
        return Session.get("validateRegionParent");
    }
});

function initInputField() {
    Session.set('verifyRegionCodeError', '');
    Session.set('verifyRegionTitleError', '');
    Session.set('validateRegionGroup', '');
    Session.set('validateRegionParent', '');
    Session.set('modifyRegionID', '');
    Session.set('modifyRegionParent', '');
    Session.set('modifyRegionTitle', '');
    Session.set('modifyRegionCode', '');
    Session.set('modifyRegionGroupID', '');
    var bootstrapValidator = $('#add_region_form').data('bootstrapValidator');
    if(bootstrapValidator)
        bootstrapValidator.resetForm(true);
}

function setInputField(region) {
    Session.set('verifyRegionCodeError', '');
    Session.set('verifyRegionTitleError', '');

    Session.set('modifyRegionID', region._id);    

    Session.set('modifyRegionParent', region.parentCode);
    $('#input_region_parent').val( region.parentCode||'' );

    Session.set('modifyRegionTitle', region.title);
    $('#input_region_title').val( region.title||'' );

    Session.set('modifyRegionCode', region.code);
    $('#input_region_code').val( region.code||'' );
    
    Session.set('modifyRegionGroupID', region.groupID);
    $('#input_region_group').val( region.groupID||'' );
}

Template.regionManagerTemplate.events({

    'click #btn_show_or_hide_addRegion_panel': function (e) {
        var v1 = Session.get('showAddRegionPanel');
        var v2 = Session.get('modifyRegionPanel');

        if (v1 === true && v2 === true) {
            //情况1：v1=true表示面板已经打开，v2=true表示现在是修改状态，所以这时候按这个按钮，应该切换为添加状态，保持面板打开
            Session.set("modifyRegionPanel", false);
            initInputField();
        }
        if (v1 === true && v2 === false) {
            //情况2： v1=true表示面板已经打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该把面板收起来
            Session.set("showAddRegionPanel", false);
        }
        if (v1 === false && v2 === true) {
            //情况3： v1=false表示面板未打开，v2=true表示现在是添加状态，所以这时候按这个按钮，就应该切换为添加状态，且把面板打开
            Session.set("showAddRegionPanel", true);
            Session.set("modifyRegionPanel", false);
            initInputField();
        }
        if (v1 === false && v2 === false) {
            //情况4： v1=false表示面板未打开，v2=false表示现在是新建状态，所以这时候按这个按钮，就应该把面板打开
            Session.set("showAddRegionPanel", true);
            initInputField();
        }

    }
});

Template.addRegionTemplate.events({

    'change  #input_region_group':function(e){
        var groupID = e.currentTarget.value;
        //console.log(gCompanies.findOne({_id:companyID}));
        Session.set('modifyRegionGroupID',groupID);
    },
    'change  #input_region_parent':function(e){
       //
    },

    'click #btn_add_region': function (e) {
        e.preventDefault();
        $('#add_region_form').bootstrapValidator('validate');

        // console.log(region);
    }
});

Template.regionListTemplate.events({
    'click .regionRemove': function (e) {
        var id = e.currentTarget.value;
        if (confirm(Session.get('langAreYouSure')) === true) {
            Meteor.call('removeRegion', id, function (error, result) {
                if (!error) {
                    if (result && result.error && result.error !== 'OK') {
                        alert(Session.get(result.error));
                    }
                }
            });
        }
    }
    ,
    "click .regionEdit": function (e) {
        var id = e.currentTarget.value;

        var region = gRegions.findOne({_id: id});
        //console.log(region);
        initInputField();
        setInputField(region);
        Session.set("modifyRegionPanel",true);
        Session.set("showAddRegionPanel", true);
    }
});

Template.addRegionTemplate.rendered = function(){
    $('#add_region_form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            input_region_group: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_region_code: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_region_title: {
                validators: {
                    notEmpty: {
                        message: Session.get('langErrorCannotEmpty')
                    }
                }
            },
            input_region_parent: {
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

            var r ={}; // region data
            if(Meteor.get_user_grade()===0){
                //admin 
                r.groupID = $('#input_region_group').val();
            }else{
                r.groupID = Meteor.get_group_id();
            }
            r.title = $('#input_region_title').val();
            r.code = $('#input_region_code').val();
            r.parentCode = $('#input_region_parent').val();

            // console.log(r);            
        });
};