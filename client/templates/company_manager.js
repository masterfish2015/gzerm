Template.addCompanyTypeTemplate.events({

});

Template.addCompanyTemplate.helpers({
    "companyTypeOptions":function(){
        var cps=gCompanyType.find().fetch();
        //console.log(cps);
        var rt=[],o;
        for(i in cps){
            o={label: cps[i].title, value: cps[i]._id}
            rt.push(o);
            //console.log(o);
        }
        //console.log(rt);
        return rt;
    },
    "bossOptions":function(){
        var cps=gEmployees.find().fetch();
        //console.log(cps);
        var rt=[],o;
        for(i in cps){
            o={label: cps[i].name, value: cps[i]._id}
            rt.push(o);
            //console.log(o);
        }
        //console.log(rt);
        return rt;
    },
    "supervisorOptions":function(){
        var cps=gCompanies.find().fetch();
        //console.log(cps);
        var rt=[],o;
        for(i in cps){
            o={label: cps[i].title, value: cps[i]._id}
            rt.push(o);
            //console.log(o);
        }
        //console.log(rt);
        return rt;
    },
    "regionOptions":function(){
        var cps=gRegions.find().fetch();
        //console.log(cps);
        var rt=[],o;
        for(i in cps){
            o={label: cps[i].title, value: cps[i]._id}
            rt.push(o);
            //console.log(o);
        }
        //console.log(rt);
        return rt;
    }

});

Template.companyManagerTemplate.events({
    "click #btn_add_company": function(e,v){
        $('#addCompanyModal').modal('show');
    }
});



Template.companyListTemplate.helpers({
    "companies":function(){
        return gCompanies.find();
    },
    "getCompanyType":function(companyTypeID) {
        return gCompanyType.findOne({_id: companyTypeID}).title;
    },
    "getBoss":function(bossCode){
        if(bossCode==="null"){
            return "";
        }else{
            return gEmployees.findOne({code:bossCode}).name;
        }
    },
    "getSupervisor":function(supervisorCode){
        if(supervisorCode==="null"){
            return "";
        }else{
            return gCompanies.findOne({code:supervisorCode}).title;
        }
    },
    "getRegion":function(regionCode){
        if(regionCode==="null"){
            return "";
        }else{
            return gRegions.findOne({code:regionCode}).title;
        }
    }

});