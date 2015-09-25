Session.setDefault("showAddRegionPanel", false);
Session.setDefault("modifyRegionPanel", false);
Session.setDefault("modifyRegionCode", '');
Session.setDefault("modifyRegionTitle", '');
Session.setDefault("modifyRegionParent", '');
Session.setDefault("modifyRegionID", '');

Template.regionManagerTemplate.helpers({

    //下面的辅助函数是为了控制界面显示
    "showAddRegionPanel": function () {
        return Session.get("showAddRegionPanel");
    },

    //下面的辅助函数是为了界面多语言
    "langRegionManagement": function () {
        return Session.get("langRegionManagement");
    },
    "langAdd": function () {
        return Session.get("langAdd");
    }
});

Template.regionListTemplate.helpers({

    //下面的辅助函数是为了控制界面显示
    "regions": function () {
        return gRegions.find();
    },
    "getRegionParent": function (p) {
        var o = gRegions.findOne({code: p});
        if(o && o.title){
            return o.title;
        }else{
            return "";
        }
    },

    //下面的辅助函数是为了界面多语言
    "langRegionCode": function () {
        return Session.get("langRegionCode");
    },
    "langRegionTitle": function () {
        return Session.get("langRegionTitle");
    },
    "langRegionParent": function () {
        return Session.get("langRegionParent");
    }
});

Template.addRegionTemplate.helpers({
    "selected":function(v1,v2){
        if(v1===v2){
            return true;
        }else{
            return false;
        }
    },
    //下面的辅助函数是为了控制界面显示
    "modifyRegionPanel": function () {
        return Session.get("modifyRegionPanel");
    },
    "regions": function () {
        return gRegions.find();
    },
    "modifyRegionCode": function () {
        return Session.get("modifyRegionCode");
    },
    "modifyRegionTitle": function () {
        return Session.get("modifyRegionTitle");
    },
    "modifyRegionParent": function () {
        return Session.get("modifyRegionParent");
    },
    "modifyRegionID": function () {
        return Session.get("modifyRegionID");
    },
    //错误处理
    "verifyRegionCodeError": function () {
        return Session.get("verifyRegionCodeError");
    },
    "verifyRegionTitleError": function () {
        return Session.get("verifyRegionTitleError");
    },

    //下面的辅助函数是为了界面多语言
    "langAdd": function () {
        return Session.get("langAdd");
    },
    "langSelect": function () {
        return Session.get("langSelect");
    },
    "langModify": function () {
        return Session.get("langModify");
    },
    "langRegionCode": function () {
        return Session.get("langRegionCode");
    },
    "langRegionTitle": function () {
        return Session.get("langRegionTitle");
    },
    "langRegionParent": function () {
        return Session.get("langRegionParent");
    }
});

function initInputField() {
    Session.set('verifyRegionCodeError', '');
    Session.set('verifyRegionTitleError', '');
    Session.set('modifyRegionID', '');
    Session.set('modifyRegionParent', '');
    Session.set('modifyRegionTitle', '');
    Session.set('modifyRegionCode', '');
}

function setInputField(region) {
    Session.set('verifyRegionCodeError', '');
    Session.set('verifyRegionTitleError', '');
    Session.set('modifyRegionID', region._id);
    Session.set('modifyRegionParent', region.parentCode);
    Session.set('modifyRegionTitle', region.title);
    Session.set('modifyRegionCode', region.code);
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

    'click #btn_add_region': function (e) {
        var region = {};

        region.code = $('#input_region_code').val();
        if (region.code === "") {
            Session.set('verifyRegionCodeError', Session.get('langErrorCannotEmpty'));
            return;
        } else {
            Session.set('verifyRegionCodeError', '');
        }

        region.title = $('#input_region_title').val();
        if (region.title === "") {
            Session.set('verifyRegionTitleError', Session.get('langErrorCannotEmpty'));
            return;
        } else {
            Session.set('verifyRegionTitleError', '');
        }

        region.parentCode = $('#input_region_parent').val();

        console.log(region);

        if (Session.get('modifyRegionPanel') === false) {
            //create
            Meteor.call("addNewRegion", region, function (error, result) {
                if (result.error !== "OK") {
                    alert(Session.get(result.error));
                } else {
                    initInputField();
                }
            });
        } else {
            //modify
            Meteor.call("updateRegion", Session.get("modifyRegionID"), region, function (error, result) {
                if (!error) {
                    if (result && result.error && result.error !== "OK") {
                        alert(Session.get(result.error));
                    } else {
                        //initInputField();
                    }
                }
            });
        }
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
        console.log(region);
        setInputField(region);
        Session.set("modifyRegionPanel",true);
        Session.set("showAddRegionPanel", true);
    }
});