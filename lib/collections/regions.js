gRegions = new Mongo.Collection("regions");
gRegions.attachSchema(new SimpleSchema({
    groupID:{
        type:String,
        label:"归属的集团ID"
    },
    code:{
        type:String,
        label:"区域编码"
    },
    title:{
        type:String,
        label:"区域名称"
    },
    parentCode:{
        type:String,
        label:"上级区域编码"
    }
}));
